/**
 * Aurín design tokens — warm, minimal, candlelight-and-aged-paper.
 * Light terra-cotta palette only; dark mode is deferred to a later version,
 * so `dark` intentionally mirrors `light` for v1 (the app stays warm regardless
 * of the device colour scheme).
 */

import { Platform } from 'react-native';

const palette = {
  /** Warm cream page background. */
  background: '#f5ede4',
  /** Card / raised surface. */
  backgroundElement: '#ede0d4',
  /** Pressed / selected surface. */
  backgroundSelected: '#e3d3c0',
  /** Hairline borders. */
  border: '#dcc9b4',
  /** Deep roasted-brown primary text. */
  text: '#2e1f14',
  /** Muted brown secondary text. */
  textSecondary: '#7a6553',
  /** Terra-cotta — the single strong accent. */
  accent: '#c4714a',
  /** Accent text that sits on the accent fill. */
  onAccent: '#fef8f2',
  /** Muted antique gold — gilded details and flourishes. */
  gold: '#a8884f',
} as const;

export const Colors = {
  light: palette,
  dark: palette,
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * Suit colour system — each suit gets a tinted surface and an accent.
 * Warm, earthen tints of the core palette; every accent-on-bg pair meets
 * WCAG AA (≥4.5:1) for normal text.
 */
export const SuitColors = {
  'Major Arcana': { bg: '#efe4d0', accent: '#6f4e37' },
  Wands: { bg: '#f6e4d6', accent: '#94431f' },
  Cups: { bg: '#f3e7da', accent: '#7d5a3c' },
  Swords: { bg: '#efe9dd', accent: '#5c5036' },
  Pentacles: { bg: '#f2ead9', accent: '#7a611f' },
} as const;

/**
 * Font families. Keys map to the loaded @expo-google-fonts assets — keep these
 * strings in sync with the `useFonts` map in the root layout.
 */
export const Fonts = {
  /** Cormorant Garamond — headings, logo, card names. */
  display: 'CormorantGaramond_600SemiBold',
  displayMedium: 'CormorantGaramond_500Medium',
  displayItalic: 'CormorantGaramond_500Medium_Italic',
  /** Lora — body copy. */
  serif: 'Lora_400Regular',
  serifMedium: 'Lora_500Medium',
  serifSemibold: 'Lora_600SemiBold',
  serifItalic: 'Lora_400Regular_Italic',
  mono: Platform.select({ ios: 'ui-monospace', default: 'monospace' }),
} as const;

/** Type scale — font sizes shared across screens. */
export const Type = {
  caption: 13,
  bodySm: 15,
  body: 17,
  titleSm: 21,
  title: 26,
  display: 34,
  hero: 42,
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 28,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 860;
