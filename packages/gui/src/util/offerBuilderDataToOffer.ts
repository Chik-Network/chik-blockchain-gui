import type { Wallet } from '@chik-network/api';
import { WalletType } from '@chik-network/api';
import { chikToMojo, catToMojo } from '@chik-network/core';
import { t } from '@lingui/macro';
import BigNumber from 'bignumber.js';

import type Driver from '../@types/Driver';
import type OfferBuilderData from '../@types/OfferBuilderData';
import type { OfferTradeRecordFormatted } from '../hooks/useWalletOffers';
import findCATWalletByAssetId from './findCATWalletByAssetId';
import { getBalance, WalletBalanceFormatted } from './hasSpendableBalance';
import { prepareNFTOfferFromNFTId } from './prepareNFTOffer';

// Status of existing assets in offers
// A combination of `type` and `assetId` must be unique through an array of `AssetStatusForOffer`.
export type AssetStatusForOffer = {
  type: 'XCK' | 'CAT' | 'SINGLETON';
  assetId: string;
  assetName?: string; // Used just for labeling
  nftId?: string;
  lockedAmount: BigNumber;
  spendingAmount: BigNumber;
  spendableAmount: BigNumber;
  confirmedAmount: BigNumber;
  // - alsoUsedInNewOfferWithoutConflict
  //   The same asset is also offered in new offer but the amount is sufficient.
  //   Even existing offers are all settled, new offer won't fail because of lacked coin amount.
  // - conflictsWithNewOffer
  //   The same asset is also offered in new offer and only one of existing offers or new offer
  //   can be settled because not enough amount is spendable.
  status: '' | 'alsoUsedInNewOfferWithoutConflict' | 'conflictsWithNewOffer';
  relevantOffers: OfferTradeRecordFormatted[];
};

export type OfferBuilderDataToOfferParams = {
  data: OfferBuilderData;
  wallets: Wallet[];
  offers: OfferTradeRecordFormatted[];
  validateOnly?: boolean;
  considerNftRoyalty?: boolean;
  allowEmptyOfferColumn?: boolean;
  allowUnknownRequestedCATs?: boolean;
};

// Amount exceeds spendable balance
export default async function offerBuilderDataToOffer({
  data,
  wallets,
  offers,
  validateOnly = false,
  considerNftRoyalty = false,
  allowEmptyOfferColumn = false,
  allowUnknownRequestedCATs = false,
}: OfferBuilderDataToOfferParams): Promise<{
  walletIdsAndAmounts?: Record<string, BigNumber>;
  driverDict?: Record<string, any>;
  feeInMojos: BigNumber;
  validateOnly?: boolean;
  assetsToUnlock: AssetStatusForOffer[];
}> {
  const {
    offered: { xck: offeredCac = [], tokens: offeredTokens = [], nfts: offeredNfts = [], fee: [firstFee] = [] },
    requested: { xck: requestedCac = [], tokens: requestedTokens = [], nfts: requestedNfts = [] },
  } = data;

  const usedNFTs: string[] = [];

  const feeInMojos = firstFee ? chikToMojo(firstFee.amount) : new BigNumber(0);

  const walletIdsAndAmounts: Record<string, BigNumber> = {};
  const driverDict: Record<string, Driver> = {};

  if (!allowEmptyOfferColumn) {
    const hasOffer = !!offeredCac.length || !!offeredTokens.length || !!offeredNfts.length;

    if (!hasOffer) {
      throw new Error(t`Please specify at least one offered asset`);
    }
  }

  const pendingOffers: AssetStatusForOffer[] = [];

  for (let i = 0; i < offers.length; i++) {
    const o = offers[i];
    if (o.isMyOffer && o.status === 'PENDING_ACCEPT') {
      const assetIds = Object.keys(o.pending) as string[];
      for (let k = 0; k < assetIds.length; k++) {
        const assetId = assetIds[k];
        const lockedAmount = new BigNumber(o.pending[assetId]);
        if (assetId.toUpperCase() === 'XCK' || assetId.toUpperCase() === 'UNKNOWN') {
          // 'UNKNOWN' is the diff between removals and additions of coins in this offer
          // It is assumed to be the amount of the 'fee'
          const idx = pendingOffers.findIndex((po) => po.type === 'XCK');
          if (idx > -1) {
            pendingOffers[idx].lockedAmount = pendingOffers[idx].lockedAmount.plus(lockedAmount);
            pendingOffers[idx].relevantOffers.push(o);
            if (pendingOffers[idx].assetId.toUpperCase() !== assetId.toUpperCase()) {
              // Now we can distinguish that we have xck spending which is only XCK, only Fee or both XCK and Fee
              pendingOffers[idx].assetId = 'XCK+FEE';
            }
          } else {
            pendingOffers.push({
              type: 'XCK',
              assetId,
              assetName: 'XCK',
              lockedAmount,
              status: '',
              spendingAmount: new BigNumber(0),
              spendableAmount: new BigNumber(0),
              confirmedAmount: new BigNumber(0),
              relevantOffers: [o],
            });
          }
        } else {
          const info = o.summary.infos[assetId];
          const type = info.type.toUpperCase() as 'CAT' | 'SINGLETON';
          const idx = pendingOffers.findIndex((po) => po.type === type && po.assetId === assetId);
          if (idx > -1) {
            pendingOffers[idx].lockedAmount = pendingOffers[idx].lockedAmount.plus(lockedAmount);
            pendingOffers[idx].relevantOffers.push(o);
          } else {
            pendingOffers.push({
              type,
              assetId,
              lockedAmount,
              status: '',
              spendingAmount: new BigNumber(0),
              spendableAmount: new BigNumber(0),
              confirmedAmount: new BigNumber(0),
              relevantOffers: [o],
            });
          }
        }
      }
    }
  }

  let standardWallet: Wallet | undefined;
  let standardWalletBalance: WalletBalanceFormatted | undefined;
  let pendingCacOffer: AssetStatusForOffer | undefined;
  let pendingCac = new BigNumber(0);
  if (offeredCac.length > 0 || feeInMojos.gt(0)) {
    standardWallet = wallets.find((w) => w.type === WalletType.STANDARD_WALLET);
    for (let i = 0; i < pendingOffers.length; i++) {
      const po = pendingOffers[i];
      if (po.type === 'XCK') {
        pendingCacOffer = po;
        pendingCac = po.lockedAmount;
        break;
      }
    }
    if (standardWallet) {
      standardWalletBalance = await getBalance(standardWallet.id);
    }
  }

  // offeredCac.length should be always 0 or 1
  const xckTasks = offeredCac.map(async (xck) => {
    const { amount } = xck;
    if (!amount || amount === '0') {
      throw new Error(t`Please enter an XCK amount`);
    }
    if (!standardWallet || !standardWalletBalance) {
      throw new Error(t`No standard wallet found`);
    }

    const mojoAmount = chikToMojo(amount);
    walletIdsAndAmounts[standardWallet.id] = mojoAmount.negated();

    const spendableBalance = new BigNumber(standardWalletBalance.spendableBalance);
    const hasEnoughTotalBalance = spendableBalance.plus(pendingCac).minus(feeInMojos).gte(mojoAmount);
    if (!hasEnoughTotalBalance) {
      throw new Error(t`Amount exceeds XCK total balance`);
    }

    if (pendingCacOffer) {
      // Assuming offeredCac.length is always less then or equal to 1
      pendingCacOffer.spendingAmount = mojoAmount.plus(feeInMojos);
      pendingCacOffer.spendableAmount = spendableBalance;
      pendingCacOffer.confirmedAmount = new BigNumber(standardWalletBalance.confirmedWalletBalance);
      const hasEnoughSpendableBalance = spendableBalance.gte(pendingCacOffer.spendingAmount);
      if (!hasEnoughSpendableBalance) {
        pendingCacOffer.status = 'conflictsWithNewOffer';
      } else {
        pendingCacOffer.status = 'alsoUsedInNewOfferWithoutConflict';
      }
    }
  });
  // Treat fee as xck spending
  if (offeredCac.length === 0 && feeInMojos.gt(0)) {
    if (!standardWallet || !standardWalletBalance) {
      throw new Error(t`No standard wallet found`);
    }

    const spendableBalance = new BigNumber(standardWalletBalance.spendableBalance);
    const hasEnoughTotalBalance = spendableBalance.gte(feeInMojos);
    if (!hasEnoughTotalBalance) {
      throw new Error(t`Fee exceeds XCK total balance`);
    }
    if (pendingCacOffer) {
      pendingCacOffer.spendingAmount = feeInMojos;
      pendingCacOffer.spendableAmount = spendableBalance;
      pendingCacOffer.confirmedAmount = new BigNumber(standardWalletBalance.confirmedWalletBalance);
      const hasEnoughSpendableBalance = spendableBalance.gte(pendingCacOffer.spendingAmount);
      if (!hasEnoughSpendableBalance) {
        pendingCacOffer.status = 'conflictsWithNewOffer';
      } else {
        pendingCacOffer.status = 'alsoUsedInNewOfferWithoutConflict';
      }
    }
  }

  const tokenTasks = offeredTokens.map(async (token) => {
    const { assetId, amount } = token;

    if (!assetId) {
      throw new Error(t`Please select an asset for each token`);
    }

    const catWallet = findCATWalletByAssetId(wallets, assetId);
    if (!catWallet) {
      throw new Error(t`No CAT wallet found for ${assetId} token`);
    }

    const catName = catWallet.meta?.name || 'Unknown token';

    if (!amount || amount === '0') {
      throw new Error(t`Please enter an amount for ${catName} token`);
    }

    const mojoAmount = catToMojo(amount);
    walletIdsAndAmounts[catWallet.id] = mojoAmount.negated();

    const pendingCatOffer = pendingOffers.find((po) => po.type === 'CAT' && po.assetId === assetId);
    const pendingCat = pendingCatOffer ? pendingCatOffer.lockedAmount : new BigNumber(0);

    const walletBalance = await getBalance(catWallet.id);
    const spendableBalance = new BigNumber(walletBalance.spendableBalance);
    const hasEnoughTotalBalance = spendableBalance.plus(pendingCat).gte(mojoAmount);
    if (!hasEnoughTotalBalance) {
      throw new Error(t`Amount exceeds total balance for ${catName} token`);
    }

    if (pendingCatOffer) {
      // Assuming no duplicate of `assetId` exists in `offeredTokens`
      pendingCatOffer.spendingAmount = mojoAmount;
      pendingCatOffer.spendableAmount = spendableBalance;
      pendingCatOffer.confirmedAmount = new BigNumber(walletBalance.confirmedWalletBalance);
      pendingCatOffer.assetName = catName;
      const hasEnoughSpendableBalance = spendableBalance.gte(mojoAmount);
      if (!hasEnoughSpendableBalance) {
        pendingCatOffer.status = 'conflictsWithNewOffer';
      } else {
        pendingCatOffer.status = 'alsoUsedInNewOfferWithoutConflict';
      }
    }
  });

  const nftTasks = offeredNfts.map(async ({ nftId }) => {
    if (usedNFTs.includes(nftId)) {
      throw new Error(t`NFT ${nftId} is already used in this offer`);
    }
    usedNFTs.push(nftId);

    const { id, amount, driver } = await prepareNFTOfferFromNFTId(nftId, true);

    walletIdsAndAmounts[id] = amount;
    if (driver) {
      driverDict[id] = driver;
    }

    const pendingNft = pendingOffers.find((po) => po.type === 'SINGLETON' && po.assetId === id);
    if (pendingNft) {
      pendingNft.nftId = nftId;
      pendingNft.spendingAmount = new BigNumber(1);
      pendingNft.assetName = `NFT ${nftId}`;
      // Currently offered NFT is not locked upon creating offer so status should be 'alsoUsedInNewOfferWithoutConflict'.
      pendingNft.status = 'alsoUsedInNewOfferWithoutConflict';
    }
  });

  await Promise.all([...xckTasks, ...tokenTasks, ...nftTasks]);

  // requested
  requestedCac.forEach((xck) => {
    const { amount } = xck;

    // For one-sided offers where nothing is requested, we allow the amount to be '0'
    // and skip adding an entry to the walletIdsAndAmounts object.
    //
    // If the amount is blank '', we prompt the user to enter an amount.
    if (amount === '0') {
      return;
    }

    if (!amount) {
      throw new Error(t`Please enter an XCK amount`);
    }

    const wallet = wallets.find((w) => w.type === WalletType.STANDARD_WALLET);
    if (!wallet) {
      throw new Error(t`No standard wallet found`);
    }

    if (wallet.id in walletIdsAndAmounts) {
      throw new Error(t`Cannot offer and request the same asset`);
    }

    walletIdsAndAmounts[wallet.id] = chikToMojo(amount);
  });

  requestedTokens.forEach((token) => {
    const { assetId, amount } = token;

    if (!assetId) {
      throw new Error(t`Please select an asset for each token`);
    }

    if (!allowUnknownRequestedCATs) {
      const wallet = findCATWalletByAssetId(wallets, assetId);
      if (!wallet) {
        throw new Error(t`No CAT wallet found for ${assetId} token`);
      }

      if (!amount || amount === '0') {
        throw new Error(t`Please enter an amount for ${wallet.meta?.name} token`);
      }

      walletIdsAndAmounts[wallet.id] = catToMojo(amount);
    }
  });

  const prepareNftTasks = requestedNfts.map(async ({ nftId }) => {
    if (usedNFTs.includes(nftId)) {
      throw new Error(t`NFT ${nftId} is already used in this offer`);
    }
    usedNFTs.push(nftId);

    const { id, amount, driver } = await prepareNFTOfferFromNFTId(nftId, false);

    walletIdsAndAmounts[id] = amount;
    if (driver) {
      driverDict[id] = driver;

      if (considerNftRoyalty && pendingCacOffer) {
        const royaltyPercentageStr = driver.also.also?.transfer_program.royalty_percentage;
        if (royaltyPercentageStr) {
          const royaltyMultiplier = 1 + +royaltyPercentageStr / 10_000;
          const spendingCac = pendingCacOffer.spendingAmount.minus(feeInMojos);
          const newSpendingCac = spendingCac.multipliedBy(royaltyMultiplier).plus(feeInMojos);
          pendingCacOffer.spendingAmount = newSpendingCac;

          const hasEnoughSpendableBalance = pendingCacOffer.spendableAmount.gte(pendingCacOffer.spendingAmount);
          if (!hasEnoughSpendableBalance) {
            pendingCacOffer.status = 'conflictsWithNewOffer';
          } else {
            pendingCacOffer.status = 'alsoUsedInNewOfferWithoutConflict';
          }
        }
      }
    }
  });

  await Promise.all(prepareNftTasks);

  return {
    walletIdsAndAmounts,
    driverDict,
    feeInMojos,
    validateOnly,
    assetsToUnlock: pendingOffers.filter((po) => po.spendingAmount.gt(0)),
  };
}
