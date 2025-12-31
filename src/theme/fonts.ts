export const fonts = {
  size: {
    xs: 11,
    sm: 13,
    md: 14,
    base: 15,
    lg: 16,
    xl: 17,
    xxl: 18,
    xxxl: 20,
    title: 28,
    icon: 48,
  },

  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  lineHeight: {
    tight: 16,
    normal: 19,
    relaxed: 22,
    loose: 28,
  },
} as const;
