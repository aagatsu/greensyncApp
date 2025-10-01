export const TYPOGRAPHY = {
  // Tamanhos de fonte
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
    '6xl': 36,
  } as const, 
  
  // Pesos de fonte
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  } as const,
  
  // Altura de linha
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  } as const,
};