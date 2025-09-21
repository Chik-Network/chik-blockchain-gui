import React, { type ReactNode } from 'react';

import { i18n } from '../../../config/locales';
import Collapsible from '../../components/Collapsible';
import SandboxedIframe from '../../components/SandboxedIframe';
import mojoToCatLocaleString from '../../utils/mojoToCATLocaleString';
import mojoToChikLocaleString from '../../utils/mojoToChikLocaleString';

function humanizeChik(amount: string | number | undefined, networkPrefix: string | undefined) {
  if (amount === undefined) {
    return undefined;
  }

  const chikAmount = mojoToChikLocaleString(amount);
  if (networkPrefix) {
    return `${chikAmount} ${networkPrefix.toUpperCase()}`;
  }

  return chikAmount;
}

function humanizeCAT(amount: string | number | undefined) {
  if (amount === undefined) {
    return undefined;
  }

  const catAmount = mojoToCatLocaleString(amount);
  return `${catAmount}`;
}

export function getTitle(command: string) {
  switch (command) {
    case 'chik_harvester.remove_plot_directory':
      return i18n._(/* i18n */ { id: 'Confirm Remove Plot Directory' });
    case 'chik_wallet.send_transaction':
      return i18n._(/* i18n */ { id: 'Confirm Send Transaction' });
    case 'chik_harvester.delete_plot':
      return i18n._(/* i18n */ { id: 'Confirm Delete Plot' });
    case 'chik_harvester.add_plot_directory':
      return i18n._(/* i18n */ { id: 'Confirm Add Plot Directory' });
    case 'chik_wallet.nft_transfer_nft':
    case 'chik_wallet.nft_transfer_bulk':
      return i18n._(/* i18n */ { id: 'Confirm NFT Transfer' });
    case 'chik_full_node.close_connection':
    case 'chik_farmer.close_connection':
      return i18n._(/* i18n */ { id: 'Confirm Disconnect' });
    case 'chik_wallet.sign_message_by_address':
      return i18n._(/* i18n */ { id: 'Confirm Sign Message' });
    case 'chik_wallet.create_new_wallet':
      return i18n._(/* i18n */ { id: 'Confirm Create New Wallet' });
    case 'chik_wallet.set_auto_claim':
      return i18n._(/* i18n */ { id: 'Confirm Set Auto Claim' });
    case 'chik_wallet.set_payout_instructions':
      return i18n._(/* i18n */ { id: 'Confirm Set Payout Instructions' });
    case 'chik_wallet.nft_set_nft_did':
      return i18n._(/* i18n */ { id: 'Confirm Move NFT to DID' });
    case 'chik_wallet.nft_set_did_bulk':
      return i18n._(/* i18n */ { id: 'Confirm Move NFTs to DID' });
    case 'chik_wallet.create_offer_for_ids':
      return i18n._(/* i18n */ { id: 'Confirm Create Offer' });
    case 'chik_full_node.open_connection':
      return i18n._(/* i18n */ { id: 'Confirm Open Connection' });
    case 'chik_farmer.set_payout_instructions':
      return i18n._(/* i18n */ { id: 'Confirm Set Payout Instructions' });
    case 'chik_wallet.delete_key':
      return i18n._(/* i18n */ { id: 'Confirm Delete Wallet' });
    default:
      return i18n._(/* i18n */ { id: 'Confirm' });
  }
}

function getMessage(command: string) {
  switch (command) {
    case 'chik_wallet.send_transaction':
      return i18n._(/* i18n */ { id: 'Please carefully review and confirm this blockchain transaction.' });
    case 'chik_wallet.cat_spend':
      return i18n._(/* i18n */ { id: 'Please carefully review and confirm this CAT spend.' });
    case 'chik_wallet.nft_transfer_nft':
    case 'chik_wallet.nft_transfer_bulk':
      return i18n._(/* i18n */ { id: 'Please carefully review and confirm this NFT transfer.' });
    case 'chik_wallet.create_offer_for_ids':
      return i18n._(
        /* i18n */ {
          id: 'Please carefully review and confirm this offer creation. When creating an offer, any assets that are being offered will be locked and unavailable until the offer is accepted or cancelled, resulting in your spendable balance changing.',
        },
      );
    case 'chik_wallet.take_offer':
      return i18n._(/* i18n */ { id: 'Please carefully review and confirm this offer acceptance.' });
    case 'chik_wallet.cancel_offer':
      return i18n._(/* i18n */ { id: 'Please carefully review and confirm this offer cancellation.' });
    case 'chik_full_node.close_connection':
    case 'chik_farmer.close_connection':
      return i18n._(/* i18n */ { id: 'Are you sure you want to disconnect?' });
    case 'daemon.stop_plotting':
      return i18n._(/* i18n */ { id: 'Are you sure you want to stop plotting? The plot cannot be recovered.' });
    case 'chik_harvester.delete_plot':
      return i18n._(/* i18n */ { id: 'Are you sure you want to delete the plot? The plot cannot be recovered.' });
    case 'chik_harvester.remove_plot_directory':
      return i18n._(/* i18n */ { id: 'Are you sure you want to remove the plot directory?' });
    case 'chik_wallet.sign_message_by_id':
    case 'chik_wallet.sign_message_by_address':
      return i18n._(/* i18n */ { id: 'Are you sure you want to sign this message?' });
    case 'chik_wallet.create_new_wallet':
      return i18n._(/* i18n */ { id: 'Are you sure you want to create a new wallet?' });
    case 'chik_wallet.set_auto_claim':
      return i18n._(/* i18n */ { id: 'Are you sure you want to set auto claim?' });
    case 'chik_wallet.set_payout_instructions':
      return i18n._(/* i18n */ { id: 'Are you sure you want to set payout instructions?' });
    case 'chik_wallet.nft_set_nft_did':
      return i18n._(/* i18n */ { id: 'Are you sure you want to move this NFT to the specified profile?' });
    case 'chik_wallet.nft_set_did_bulk':
      return i18n._(/* i18n */ { id: 'Are you sure you want to move these NFTs to the specified profile?' });
    case 'chik_full_node.open_connection':
      return i18n._(/* i18n */ { id: 'Are you sure you want to open a connection to the specified node?' });
    case 'chik_farmer.set_payout_instructions':
      return i18n._(/* i18n */ { id: 'Are you sure you want to set payout instructions?' });
    case 'chik_wallet.delete_key':
      return i18n._(/* i18n */ { id: 'Are you sure you want to delete this wallet?' });
    default:
      return i18n._(/* i18n */ { id: 'Please review and confirm this action.' });
  }
}

function getConfirmButtonText(command: string) {
  switch (command) {
    case 'chik_wallet.send_transaction':
    case 'chik_wallet.cat_spend':
      return i18n._(/* i18n */ { id: 'Send' });
    case 'daemon.stop_plotting':
      return i18n._(/* i18n */ { id: 'Stop' });
    case 'chik_harvester.delete_plot':
    case 'chik_wallet.delete_key':
      return i18n._(/* i18n */ { id: 'Delete' });
    case 'chik_harvester.add_plot_directory':
      return i18n._(/* i18n */ { id: 'Add' });
    case 'chik_wallet.nft_transfer_nft':
    case 'chik_wallet.nft_transfer_bulk':
      return i18n._(/* i18n */ { id: 'Transfer' });
    case 'chik_full_node.close_connection':
    case 'chik_farmer.close_connection':
      return i18n._(/* i18n */ { id: 'Disconnect' });
    case 'chik_full_node.open_connection':
      return i18n._(/* i18n */ { id: 'Connect' });
    case 'chik_wallet.sign_message_by_id':
    case 'chik_wallet.sign_message_by_address':
      return i18n._(/* i18n */ { id: 'Sign' });
    case 'chik_wallet.create_new_wallet':
      return i18n._(/* i18n */ { id: 'Create' });
    case 'chik_wallet.set_auto_claim':
    case 'chik_farmer.set_payout_instructions':
      return i18n._(/* i18n */ { id: 'Set' });
    case 'chik_wallet.nft_set_nft_did':
    case 'chik_wallet.nft_set_did_bulk':
      return i18n._(/* i18n */ { id: 'Move' });
    case 'chik_wallet.create_offer_for_ids':
      return i18n._(/* i18n */ { id: 'Create' });
    default:
      return i18n._(/* i18n */ { id: 'Proceed' });
  }
}

function getFormattedData(
  command: string,
  data: Record<string, unknown>,
  networkPrefix?: string,
): {
  field: string;
  label: ReactNode;
  value: string | undefined;
}[] {
  switch (command) {
    case 'chik_wallet.send_transaction':
      return [
        { field: 'address', label: i18n._(/* i18n */ { id: 'Address' }), value: data.address as string },
        {
          field: 'amount',
          label: i18n._(/* i18n */ { id: 'Amount' }),
          value: humanizeChik(data.amount as number, networkPrefix),
        },
        {
          field: 'fee',
          label: i18n._(/* i18n */ { id: 'Fee' }),
          value: humanizeChik(data.fee as number, networkPrefix),
        },
      ];
    case 'chik_wallet.cat_spend':
      return [
        { field: 'address', label: i18n._(/* i18n */ { id: 'Address' }), value: data.inner_address as string },
        { field: 'amount', label: i18n._(/* i18n */ { id: 'Amount' }), value: humanizeCAT(data.amount as number) },
        {
          field: 'fee',
          label: i18n._(/* i18n */ { id: 'Fee' }),
          value: humanizeChik(data.fee as number, networkPrefix),
        },
      ];
    case 'chik_wallet.nft_transfer_nft':
    case 'chik_wallet.nft_transfer_bulk':
      return [
        {
          field: 'target_address',
          label: i18n._(/* i18n */ { id: 'Target Address' }),
          value: data.target_address as string,
        },
        {
          field: 'fee',
          label: i18n._(/* i18n */ { id: 'Fee' }),
          value: humanizeChik(data.fee as string, networkPrefix),
        },
      ];
    case 'chik_wallet.cancel_offer':
      return [
        {
          field: 'fee',
          label: i18n._(/* i18n */ { id: 'Fee' }),
          value: humanizeChik(data.fee as string, networkPrefix),
        },
      ];
    case 'chik_harvester.delete_plot':
      return [{ field: 'filename', label: i18n._(/* i18n */ { id: 'Filename' }), value: data.filename as string }];
    case 'chik_harvester.add_plot_directory':
    case 'chik_harvester.remove_plot_directory':
      return [{ field: 'directory', label: i18n._(/* i18n */ { id: 'Directory' }), value: data.dirname as string }];
    case 'chik_farmer.set_payout_instructions':
      return [
        {
          field: 'payout_instructions',
          label: i18n._(/* i18n */ { id: 'Payout Instructions' }),
          value: data.payout_instructions as string,
        },
      ];
    case 'chik_wallet.set_auto_claim':
      return [
        { field: 'auto_claim', label: i18n._(/* i18n */ { id: 'Enabled' }), value: data.enabled ? 'Yes' : 'No' },
        {
          field: 'tx_fee',
          label: i18n._(/* i18n */ { id: 'Transaction Fee' }),
          value: humanizeChik(data.tx_fee as string, networkPrefix),
        },
        {
          field: 'min_amount',
          label: i18n._(/* i18n */ { id: 'Min Amount' }),
          value: humanizeChik(data.min_amount as string, networkPrefix),
        },
      ];
    case 'chik_wallet.create_new_wallet':
      return [
        { field: 'name', label: i18n._(/* i18n */ { id: 'Name' }), value: data.wallet_name as string },
        { field: 'type', label: i18n._(/* i18n */ { id: 'Type' }), value: data.wallet_type as string },
        { field: 'asset_id', label: i18n._(/* i18n */ { id: 'Asset ID' }), value: data.asset_id as string },
        {
          field: 'fee',
          label: i18n._(/* i18n */ { id: 'Fee' }),
          value: humanizeChik(data.fee as string, networkPrefix),
        },
      ];
    case 'chik_wallet.sign_message_by_address':
      return [
        { field: 'address', label: i18n._(/* i18n */ { id: 'Address' }), value: data.address as string },
        { field: 'message', label: i18n._(/* i18n */ { id: 'Message' }), value: data.message as string },
      ];
    case 'chik_wallet.sign_message_by_id':
      return [
        { field: 'id', label: i18n._(/* i18n */ { id: 'Id' }), value: data.id as string },
        { field: 'message', label: i18n._(/* i18n */ { id: 'Message' }), value: data.message as string },
      ];
    case 'chik_wallet.nft_set_nft_did':
      return [
        { field: 'did_id', label: i18n._(/* i18n */ { id: 'DID' }), value: data.did_id as string },
        {
          field: 'fee',
          label: i18n._(/* i18n */ { id: 'Fee' }),
          value: humanizeChik(data.fee as string, networkPrefix),
        },
      ];
    case 'chik_wallet.nft_set_did_bulk':
      return [
        { field: 'did_id', label: i18n._(/* i18n */ { id: 'DID' }), value: data.did_id as string },
        {
          field: 'fee',
          label: i18n._(/* i18n */ { id: 'Fee' }),
          value: humanizeChik(data.fee as string, networkPrefix),
        },
      ];
    case 'chik_wallet.create_offer_for_ids':
      return [
        {
          field: 'fee',
          label: i18n._(/* i18n */ { id: 'Fee' }),
          value: humanizeChik(data.fee as string, networkPrefix),
        },
      ];
    case 'chik_full_node.open_connection':
      return [
        { field: 'host', label: i18n._(/* i18n */ { id: 'Host' }), value: data.host as string },
        { field: 'port', label: i18n._(/* i18n */ { id: 'Port' }), value: data.port as string },
      ];
    case 'chik_wallet.delete_key':
      return [
        { field: 'fingerprint', label: i18n._(/* i18n */ { id: 'Fingerprint' }), value: data.fingerprint as string },
      ];
    default:
      return [];
  }
}

export type ConfirmProps = {
  confirmId: string;
  networkPrefix?: string;
  data: Record<string, unknown>;
  command: string;
  styleURL?: string;
  isDarkMode?: boolean;
};

export default function Confirm(props: ConfirmProps) {
  const { data, command, styleURL, confirmId, isDarkMode, networkPrefix } = props;

  const hasData = !!data && Object.keys(data).length > 0;
  const hasDataOrCommand = hasData || !!command;

  const message = getMessage(command);
  const confirmButtonText = getConfirmButtonText(command);
  const formattedData = getFormattedData(command, data, networkPrefix).filter(({ value }) => value !== undefined);

  return (
    <div className="p-4 flex flex-col h-full text-gray-900 dark:text-gray-100">
      <div className="mb-4 flex-1 flex flex-col">
        <p className="mt-0 mb-4 text-base">{message}</p>

        {hasDataOrCommand && (
          <SandboxedIframe className="w-full flex-1" isDarkMode={isDarkMode}>
            <link href={styleURL} type="text/css" rel="stylesheet" />
            <div className="flex flex-col gap-4 h-full">
              {!!command && (
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">Command</span>
                  <pre className="break-all mt-1 text-sm">{command}</pre>
                </div>
              )}

              {hasData && (
                <div className="flex flex-col gap-4">
                  {!!formattedData.length && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="grid gap-3">
                        {formattedData.map(({ field, label, value }) => (
                          <div className="flex flex-col" key={field}>
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">{label}</span>
                            <span className="font-medium mt-1 break-all whitespace-normal">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Collapsible title="More Details">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">Data:</span>
                      <pre className="break-all overflow-x-auto text-xs mt-1">{JSON.stringify(data, null, 2)}</pre>
                    </div>
                  </Collapsible>
                </div>
              )}
            </div>
          </SandboxedIframe>
        )}
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          data-action="cancel"
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {i18n._(/* i18n */ { id: 'Cancel' })}
        </button>
        <button
          type="button"
          id={confirmId}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {confirmButtonText}
        </button>
      </div>
    </div>
  );
}
