import { WalletType } from '@chik-network/api';
import type { Wallet } from '@chik-network/api';

export default function getWalletPrimaryTitle(wallet: Wallet): string {
  switch (wallet.type) {
    case WalletType.STANDARD_WALLET:
      return 'Chik';
    default:
      return wallet.meta?.name ?? wallet.name;
  }
}
