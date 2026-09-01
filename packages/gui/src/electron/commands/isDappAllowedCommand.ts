import { Commands } from './Commands';

// list of chik commands that are allowed to be used by dapp without confirmation
const DAPP_ALLOWED_COMMANDS = new Set<keyof typeof Commands>([
  'chik_wallet.get_wallets',
  'chik_wallet.get_next_address',
  'chik_wallet.get_sync_status',
  'chik_wallet.get_coin_records_by_names',
  'chik_wallet.select_coins',
  'chik_wallet.get_height_info',
  'chik_wallet.get_puzzle_and_solution',
  'chik_wallet.get_timestamp_for_height',
  'chik_wallet.get_transaction',
  'chik_wallet.get_offer',
  'chik_wallet.get_offer_summary',
  'chik_wallet.check_offer_validity',
  'chik_wallet.cat_get_asset_id',
  'chik_wallet.cat_get_name',
  'chik_wallet.cat_asset_id_to_name',
  'chik_wallet.nft_get_info',
  'chik_wallet.nft_get_wallet_did',
  'chik_wallet.nft_calculate_royalties',
  'chik_wallet.vc_get',
  'chik_wallet.vc_get_proofs_for_root',
  'chik_wallet.did_get_did',
  'chik_wallet.did_get_info',
  'chik_wallet.did_get_metadata',
  'chik_wallet.did_get_pubkey',
  'chik_wallet.did_get_current_coin_info',
  'chik_wallet.did_get_wallet_name',
  'chik_wallet.pw_status',
  'chik_wallet.verify_signature',
  'chik_wallet.ping',
]);

export function isDappAllowedCommand(command: string): boolean {
  return DAPP_ALLOWED_COMMANDS.has(command);
}
