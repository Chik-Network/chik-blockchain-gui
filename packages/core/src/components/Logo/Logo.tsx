import { Chik } from '@chik-network/icons';
import { Box, BoxProps } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const StyledChik = styled(Chik)`
  max-width: 100%;
  width: auto;
  height: auto;
`;

export default function Logo(props: BoxProps) {
  return (
    <Box {...props}>
      <StyledChik />
    </Box>
  );
}
