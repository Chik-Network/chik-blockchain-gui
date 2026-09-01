export default [
  'chik_full_node.push_tx',

  'chik_wallet.create_new_wallet',
  'chik_wallet.send_transaction',
  'chik_wallet.create_signed_transaction',

  'chik_wallet.send_transaction_multi',
  'chik_wallet.push_transactions',
  'chik_wallet.spend_clawback_coins',
  'chik_wallet.send_notification',
  'chik_wallet.cat_spend',
  'chik_wallet.create_offer_for_ids',
  'chik_wallet.take_offer',
  'chik_wallet.cancel_offer',
  'chik_wallet.cancel_offers',

  'chik_wallet.sign_message_by_id',
  'chik_wallet.sign_message_by_address',

  'chik_wallet.did_update_recovery_ids',
  'chik_wallet.did_message_spend',
  'chik_wallet.did_update_metadata',
  'chik_wallet.did_recovery_spend',
  'chik_wallet.did_create_attest',
  'chik_wallet.did_transfer_did',

  'chik_wallet.vc_spend',
  'chik_wallet.vc_revoke',

  'chik_wallet.pw_join_pool',
  'chik_wallet.pw_self_pool',
  'chik_wallet.pw_absorb_rewards',

  'chik_wallet.create_new_wallet',
  'chik_wallet.delete_key',
  'chik_wallet.delete_all_keys',

  // data layer commands
  'chik_data_layer.cancel_offer',
  'chik_data_layer.create_data_store',
  'chik_data_layer.delete_key',
  'chik_data_layer.delete_mirror',
  'chik_data_layer.insert',
  'chik_data_layer.make_offer',
  'chik_data_layer.take_offer',
  'chik_data_layer.add_mirror',
  'chik_data_layer.batch_update',

  // NFT commands
  'chik_wallet.nft_mint_nft',
  'chik_wallet.nft_set_nft_did',
  'chik_wallet.nft_set_did_bulk',
  'chik_wallet.nft_transfer_bulk',
  'chik_wallet.nft_transfer_nft',
  'chik_wallet.nft_add_uri',
  'chik_wallet.nft_mint_bulk',

  'chik_farmer.set_payout_instructions',

  'daemon.stop_plotting',
  /*
  'daemon.set_keyring_passphrase',
  'daemon.remove_keyring_passphrase',
  'daemon.unlock_keyring',
  'daemon.migrate_keyring',
  */
];
