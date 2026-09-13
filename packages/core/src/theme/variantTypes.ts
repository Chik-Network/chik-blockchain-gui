/** Whitelisted GUI color themes. Values are static code only — never loaded from network or user files. */
export const THEME_VARIANT_IDS = ['classic', 'field', 'chik'] as const;

export type ThemeVariantId = (typeof THEME_VARIANT_IDS)[number];

export const DEFAULT_THEME_VARIANT: ThemeVariantId = 'chik';

export type ThemeVariantMeta = {
  id: ThemeVariantId;
  label: string;
  description: string;
};

export const THEME_VARIANT_META: ThemeVariantMeta[] = [
  {
    id: 'chik',
    label: 'Chik',
    description: 'Chik Network Enterprise palette (2025): Stark Blue, Mystic Blue, Periwinkle, Shock accent.',
  },
  {
    id: 'classic',
    label: 'Classic',
    description: 'Original Chik GUI appearance before the Autumn field styling.',
  },
  {
    id: 'field',
    label: 'Autumn',
    description: 'Warm amber field-console styling from the Autumn mod.',
  },
];

export function isThemeVariantId(value: unknown): value is ThemeVariantId {
  return typeof value === 'string' && (THEME_VARIANT_IDS as readonly string[]).includes(value);
}

/** Reject unknown persisted values; never pass user-controlled strings into dynamic imports. */
export function parseThemeVariantId(value: unknown, fallback: ThemeVariantId = DEFAULT_THEME_VARIANT): ThemeVariantId {
  return isThemeVariantId(value) ? value : fallback;
}
