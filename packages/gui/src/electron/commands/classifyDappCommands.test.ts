import { classifyDappCommands } from './classifyDappCommands';

describe('classifyDappCommands', () => {
  it('returns empty groups when no commands are requested', () => {
    expect(classifyDappCommands([])).toEqual({
      innocuous: [],
      balance: [],
      sign: [],
      notifications: [],
      spending: [],
      other: [],
    });
  });

  it('classifies known commands into permission groups without changing request order within each group', () => {
    expect(
      classifyDappCommands([
        'chik_getWallets',
        'chik_getWalletBalance',
        'chik_signMessageByAddress',
        'chik_showNotification',
        'chik_requestPermissions',
        'chik_sendTransaction',
        'chik_getTransaction',
        'chik_getWalletBalances',
        'chik_signMessageById',
        'chik_pushTransactions',
        'chik_getPublicKey',
        'chik_transferDID',
      ]),
    ).toEqual({
      innocuous: ['chik_getWallets', 'chik_getTransaction'],
      balance: ['chik_getWalletBalance', 'chik_getWalletBalances'],
      sign: ['chik_signMessageByAddress', 'chik_signMessageById'],
      notifications: ['chik_showNotification'],
      spending: ['chik_sendTransaction', 'chik_pushTransactions', 'chik_transferDID'],
      other: ['chik_requestPermissions', 'chik_getPublicKey'],
    });
  });

  it('rejects duplicate command entries before granting permissions', () => {
    expect(() => classifyDappCommands(['chik_getWallets', 'chik_getWallets'])).toThrow(
      'Duplicate dapp command: chik_getWallets',
    );

    expect(() => classifyDappCommands(['chik_unknownCommand', 'chik_unknownCommand'])).toThrow(
      'Duplicate dapp command: chik_unknownCommand',
    );
  });

  it('does not grant categories to unknown commands', () => {
    expect(classifyDappCommands(['chik_deleteEverything', 'CHIK_GETWALLETS', 'chik_getWallets'])).toEqual({
      innocuous: ['chik_getWallets'],
      balance: [],
      sign: [],
      notifications: [],
      spending: [],
      other: [],
    });
  });

  it('rejects lookalike commands instead of normalizing dapp input', () => {
    expect(() => classifyDappCommands([' chik_getWallets'])).toThrow('Invalid dapp command:  chik_getWallets');

    expect(() => classifyDappCommands(['chik_getWallets '])).toThrow('Invalid dapp command: chik_getWallets ');
  });

  it('rejects malformed command entries and missing command lists', () => {
    expect(() => classifyDappCommands([''])).toThrow('Invalid dapp command: ');

    expect(() => classifyDappCommands([null] as unknown as string[])).toThrow('Invalid dapp command: null');

    expect(() => classifyDappCommands([undefined] as unknown as string[])).toThrow('Invalid dapp command: undefined');

    expect(() => classifyDappCommands([0] as unknown as string[])).toThrow('Invalid dapp command: 0');

    expect(() => classifyDappCommands([false] as unknown as string[])).toThrow('Invalid dapp command: false');

    expect(() => classifyDappCommands([{ command: 'chik_getWallets' }] as unknown as string[])).toThrow(
      'Invalid dapp command: [object Object]',
    );

    expect(() => classifyDappCommands([['chik_showNotification']] as unknown as string[])).toThrow(
      'Invalid dapp command: chik_showNotification',
    );

    expect(() => classifyDappCommands(null as unknown as string[])).toThrow('Invalid dapp commands.');
  });
});
