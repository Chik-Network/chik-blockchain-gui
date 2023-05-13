import BigNumber from 'bignumber.js';
import React from 'react';

import useCurrencyCode from '../../hooks/useCurrencyCode';
import mojoToChik from '../../utils/mojoToChikLocaleString';
import FormatLargeNumber from '../FormatLargeNumber';

export type MojoToChikProps = {
  value: number | BigNumber;
};

export default function MojoToChik(props: MojoToChikProps) {
  const { value } = props;
  const currencyCode = useCurrencyCode();
  const updatedValue = mojoToChik(value);

  return (
    <>
      <FormatLargeNumber value={updatedValue} />
      &nbsp;{currencyCode ?? ''}
    </>
  );
}
