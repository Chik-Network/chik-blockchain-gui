import { Commands } from './Commands';

const SIGN_COMMANDS = new Set<keyof typeof Commands>([
  'chik_wallet.sign_message_by_address',
  'chik_wallet.sign_message_by_id',
]);

export function isSignCommand(command: string): boolean {
  return SIGN_COMMANDS.has(command);
}
