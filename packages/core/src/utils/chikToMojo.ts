import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';

import chikFormatter from './chikFormatter';

export default function chikToMojo(chik: string | number | BigNumber): BigNumber {
  return chikFormatter(chik, Unit.CHIK).to(Unit.MOJO).toBigNumber();
}
