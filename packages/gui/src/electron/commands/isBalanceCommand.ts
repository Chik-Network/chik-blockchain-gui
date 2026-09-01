import { Commands } from './Commands';

const BALANCE_COMMANDS = new Set<keyof typeof Commands>([
  'chik_wallet.get_wallet_balance',
  'chik_wallet.get_wallet_balances',
]);

export function isBalanceCommand(command: string): boolean {
  return BALANCE_COMMANDS.has(command);
}
