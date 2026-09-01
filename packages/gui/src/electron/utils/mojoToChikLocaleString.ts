import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';

import chikFormatter from './chikFormatter';

export default function mojoToChikLocaleString(mojo: string | number | BigNumber | bigint, locale?: string) {
  return chikFormatter(mojo, Unit.MOJO).to(Unit.CHIK).toLocaleString(locale);
}
