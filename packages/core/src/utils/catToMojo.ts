import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';
import chikFormatter from './chikFormatter';

export default function catToMojo(cat: string | number | BigNumber): BigNumber {
  return chikFormatter(cat, Unit.CAT).to(Unit.MOJO).toBigNumber();
}
