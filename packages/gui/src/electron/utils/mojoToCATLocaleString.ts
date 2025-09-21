import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';

import chikFormatter from './chikFormatter';

export default function mojoToCATLocaleString(mojo: string | number | BigNumber, locale?: string) {
  return chikFormatter(mojo, Unit.MOJO).to(Unit.CAT).toLocaleString(locale);
}
