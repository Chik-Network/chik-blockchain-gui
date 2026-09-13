import chikChikCircle from '../assets/theme/chik/chik_circle.svg';
import classicChikCircle from '../assets/theme/classic/chik_circle.svg';
import fieldChikCircle from '../assets/theme/field/chik_circle.svg';

import { DEFAULT_THEME_VARIANT, parseThemeVariantId, type ThemeVariantId } from './themeVariant';

const THEME_CIRCLE_ICONS: Record<ThemeVariantId, string> = {
  classic: classicChikCircle as unknown as string,
  field: fieldChikCircle as unknown as string,
  chik: chikChikCircle as unknown as string,
};

export function resolveThemeCircleIcon(variant: unknown): string {
  return THEME_CIRCLE_ICONS[parseThemeVariantId(variant, DEFAULT_THEME_VARIANT)];
}
