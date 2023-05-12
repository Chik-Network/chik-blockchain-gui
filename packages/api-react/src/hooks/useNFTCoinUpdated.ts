import { WalletService } from '@chik-network/api';

import useSubscribeToEvent from './useSubscribeToEvent';

export default function useNFTCoinUpdated(callback: (coin: any) => void) {
  return useSubscribeToEvent('onNFTCoinUpdated', WalletService, callback);
}
