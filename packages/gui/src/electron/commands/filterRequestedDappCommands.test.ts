import { filterRequestedDappCommands } from './filterRequestedDappCommands';

describe('filterRequestedDappCommands', () => {
  it('allows known dapp commands and rejects unknown commands without changing request order', () => {
    expect(
      filterRequestedDappCommands([
        'chik_unknownCommand',
        'chik_logIn',
        'chik_requestPermissions',
        'chik_getPublicKey',
        'chik_transferDID',
        'chik_deleteEverything',
      ]),
    ).toEqual({
      allowed: ['chik_requestPermissions', 'chik_getPublicKey', 'chik_transferDID'],
      rejected: ['chik_unknownCommand', 'chik_logIn', 'chik_deleteEverything'],
    });
  });

  it('deduplicates commands before classifying them', () => {
    expect(
      filterRequestedDappCommands([
        'chik_logIn',
        'chik_logIn',
        'chik_unknownCommand',
        'chik_unknownCommand',
        'chik_getPublicKey',
      ]),
    ).toEqual({
      allowed: ['chik_getPublicKey'],
      rejected: ['chik_logIn', 'chik_unknownCommand'],
    });
  });

  it('ignores malformed non-string and empty command entries', () => {
    expect(
      filterRequestedDappCommands([
        '',
        null,
        undefined,
        0,
        false,
        { command: 'chik_logIn' },
        ['chik_getPublicKey'],
        'chik_getPublicKey',
      ] as unknown as string[]),
    ).toEqual({
      allowed: ['chik_getPublicKey'],
      rejected: [],
    });
  });

  it('rejects lookalike commands instead of normalizing dapp input', () => {
    expect(
      filterRequestedDappCommands([
        ' chik_getPublicKey',
        'chik_getPublicKey ',
        'CHIK_GETPUBLICKEY',
        'chik_getPublicKey',
      ]),
    ).toEqual({
      allowed: ['chik_getPublicKey'],
      rejected: [' chik_getPublicKey', 'chik_getPublicKey ', 'CHIK_GETPUBLICKEY'],
    });
  });

  it('rejects missing or non-array command lists', () => {
    expect(() => filterRequestedDappCommands(null as unknown as string[])).toThrow('Invalid dapp commands.');

    expect(() => filterRequestedDappCommands({ 0: 'chik_logIn', length: 1 } as unknown as string[])).toThrow(
      'Invalid dapp commands.',
    );
  });
});
