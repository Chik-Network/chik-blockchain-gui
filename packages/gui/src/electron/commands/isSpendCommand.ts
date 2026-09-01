import { Commands } from './Commands';

const SPEND_COMMANDS = new Set<keyof typeof Commands>([
  'chik_wallet.send_transaction',
  'chik_wallet.cat_spend',
  'chik_wallet.nft_transfer_nft',
  'chik_wallet.cancel_offer',
  'chik_wallet.create_offer_for_ids',
  'chik_wallet.take_offer',
  'chik_wallet.spend_clawback_coins',
  'chik_wallet.did_transfer_did',
  'chik_wallet.push_transactions',
]);

export function isSpendCommand(command: string): boolean {
  return SPEND_COMMANDS.has(command);
}
