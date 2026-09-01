import { useGetWalletHeightInfoQuery } from '@chik-network/api-react';
import { FormatLargeNumber } from '@chik-network/core';
import React from 'react';

export default function WalletStatusHeight() {
  const { data: heightInfo, isLoading } = useGetWalletHeightInfoQuery({
    pollingInterval: 10_000,
  });

  if (isLoading) {
    return null;
  }

  if (heightInfo === undefined || heightInfo === null) {
    return null;
  }

  return (
    <>
      (
      <FormatLargeNumber value={heightInfo.height} />)
    </>
  );
}
