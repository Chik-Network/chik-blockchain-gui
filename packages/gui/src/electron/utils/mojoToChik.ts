import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';

import chikFormatter from './chikFormatter';

export default function mojoToChik(mojo: string | number | BigNumber): BigNumber {
  return chikFormatter(mojo, Unit.MOJO).to(Unit.CHIK).toBigNumber();
}
