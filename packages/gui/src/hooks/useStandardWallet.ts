import type { Wallet, WalletBalance } from '@chik-network/api';
import { WalletType } from '@chik-network/api';
import { useGetWalletsQuery, useGetWalletBalanceQuery } from '@chik-network/api-react';
import { useMemo } from 'react';

export default function useStandardWallet(): {
  loading: boolean;
  wallet?: Wallet;
  balance?: number;
  walletBalance?: WalletBalance;
  error?: unknown;
} {
  const { data: wallets, isLoading: isLoadingGetWallets } = useGetWalletsQuery();

  const wallet = useMemo(() => wallets?.find((item: Wallet) => item?.type === WalletType.STANDARD_WALLET), [wallets]);
  const walletId = wallet?.id;

  const {
    data: walletBalance,
    isLoading: isLoadingWalletBalance,
    error,
  } = useGetWalletBalanceQuery(
    {
      walletId: walletId ?? 0,
    },
    {
      pollingInterval: 10_000,
      skip: !walletId,
    },
  );

  const isLoading = isLoadingGetWallets || (!!walletId && isLoadingWalletBalance);

  return {
    loading: isLoading,
    wallet,
    balance: walletBalance?.confirmedWalletBalance,
    walletBalance,
    error,
  };
}
