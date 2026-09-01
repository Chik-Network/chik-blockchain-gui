import { WcError, WcErrorCode } from '../@types/WcError';

export function isWalletConnectChainIdMainnet(chainId: string): boolean {
  if (chainId === 'chik:mainnet') {
    return true;
  }

  if (chainId === 'chik:testnet') {
    return false;
  }

  throw new WcError('Network not supported', WcErrorCode.UNSUPPORTED_CHAINS);
}
