import type BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';

import chikFormatter from './chikFormatter';

export default function chikToMojo(chik: string | number | bigint | BigNumber): BigInt {
  return BigInt(chikFormatter(chik, Unit.CHIK).to(Unit.MOJO).toBigNumber().toFixed(0));
}
