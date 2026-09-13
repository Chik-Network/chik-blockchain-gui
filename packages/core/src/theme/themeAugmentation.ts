import type { ElementType } from 'react';

import type { ThemeVariantId } from './variantTypes';

export type ThemeSvgComponent = ElementType;

export type ThemeAssets = {
  chikCircle: ThemeSvgComponent;
  chikWordmark: ThemeSvgComponent;
  chikWordmarkBlack: ThemeSvgComponent;
  audioSmall: ThemeSvgComponent;
  documentSmall: ThemeSvgComponent;
  modelSmall: ThemeSvgComponent;
  unknownSmall: ThemeSvgComponent;
  videoSmall: ThemeSvgComponent;
  offerFileIcon: ThemeSvgComponent;
  walletConnectToChik: ThemeSvgComponent;
};

type ChikPaletteColor = {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
};

type ChikPaletteBorder = {
  main: string;
  dark: string;
};

type ChikSemanticPalette = {
  success?: string;
  warning?: string;
  error?: string;
  highlight?: string;
};

type ChikSurfacePalette = {
  control?: string;
  tableHeader?: string;
  tableRowAlternate?: string;
  tableExpanded?: string;
  tableBorder?: string;
};

declare module '@mui/material/styles' {
  interface Theme {
    chikTheme: {
      variant: ThemeVariantId;
    };
  }
  interface ThemeOptions {
    chikTheme?: {
      variant: ThemeVariantId;
    };
  }

  interface Palette {
    border: ChikPaletteBorder;
    danger?: ChikPaletteColor;
    highlight?: ChikPaletteColor;
    semantic?: ChikSemanticPalette;
    surfaces?: ChikSurfacePalette;
    sidebarSelectedFill?: string | { light?: string; dark?: string; main?: string };
    sidebarText?: { light?: string; dark?: string; main?: string };
  }

  interface PaletteOptions {
    border?: Partial<ChikPaletteBorder>;
    danger?: ChikPaletteColor;
    highlight?: ChikPaletteColor;
    semantic?: ChikSemanticPalette;
    surfaces?: ChikSurfacePalette;
    sidebarSelectedFill?: string | { light?: string; dark?: string; main?: string };
    sidebarText?: { light?: string; dark?: string; main?: string };
  }

  interface TypeBackground {
    card: string;
  }
}
