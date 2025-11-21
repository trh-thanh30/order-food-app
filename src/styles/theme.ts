import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';

export const theme = {
  colors: COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  radius: {
    sm: 8,
    md: 12,
    lg: 24,
  },
} as const;

export type Theme = typeof theme;

