import { SvgIcon, type SvgIconProps } from '@mui/material';
import React from 'react';

import { useThemeAssets } from '../../theme/ThemeAssetsContext';

export function ThemedChik(props: SvgIconProps) {
  const { chikWordmark } = useThemeAssets();
  return <SvgIcon component={chikWordmark} viewBox="0 0 150 58" {...props} />;
}

export function ThemedChikBlack(props: SvgIconProps) {
  const { chikWordmarkBlack } = useThemeAssets();
  return (
    <SvgIcon component={chikWordmarkBlack} viewBox="0 0 100 39" sx={{ width: '100px', height: '39px' }} {...props} />
  );
}
