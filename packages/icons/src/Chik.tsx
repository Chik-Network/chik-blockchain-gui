import { SvgIcon, SvgIconProps } from '@mui/material';
import React from 'react';

import ChikBlackIcon from './images/chik-black.svg';
import ChikIcon from './images/chik.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={ChikIcon} viewBox="0 0 150 58" {...props} />;
}

export function ChikBlack(props: SvgIconProps) {
  return <SvgIcon component={ChikBlackIcon} viewBox="0 0 100 39" sx={{ width: '100px', height: '39px' }} {...props} />;
}
