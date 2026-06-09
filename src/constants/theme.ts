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
} as const;

export const Colors = {
  light: palette,
  dark: palette,
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * Suit colour system — each suit gets a tinted surface, an accent, and a soft glow.
 * Tinted versions of the warm palette; not literal mysticism.
 */
export const SuitColors = {
  'Major Arcana': { bg: '#f0e6d3', accent: '#8b5e3c', glow: '#c4714a44' },
  Wands: { bg: '#fdf0e0', accent: '#c4714a', glow: '#c4714a33' },
  Cups: { bg: '#e8f0f8', accent: '#4a7ab5', glow: '#4a7ab533' },
  Swords: { bg: '#eef2ee', accent: '#4a7a4a', glow: '#4a7a4a33' },
  Pentacles: { bg: '#f5f0e8', accent: '#8b7355', glow: '#8b735533' },
} as const;

/**
 * Font families. Keys map to the loaded @expo-google-fonts assets — keep these
 * strings in sync with the `useFonts` map in the root layout.
 */
export const Fonts = {
  /** Cinzel Decorative — headings, logo, card names. */
  display: 'CinzelDecorative_700Bold',
  displayRegular: 'CinzelDecorative_400Regular',
  displayBlack: 'CinzelDecorative_900Black',
  /** Crimson Text — body copy. */
  serif: 'CrimsonText_400Regular',
  serifSemibold: 'CrimsonText_600SemiBold',
  serifItalic: 'CrimsonText_400Regular_Italic',
  mono: Platform.select({ ios: 'ui-monospace', default: 'monospace' }),
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
