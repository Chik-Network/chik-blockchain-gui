import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';

import chikFormatter from './chikFormatter';

export default function mojoToCAT(mojo: string | number | BigNumber): BigNumber {
  return chikFormatter(mojo, Unit.MOJO).to(Unit.CAT).toBigNumber();
}
