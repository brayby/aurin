// Domain types for Aurín's tarot data layer.
export type Suit = "Major Arcana" | "Wands" | "Cups" | "Swords" | "Pentacles";

export interface Card {
  id: number;
  name: string;
  suit: Suit;
  /** Roman numeral, "Ace", a digit string, or court rank. */
  number: string;
  keywords: string[];
  meaning: string;
  reversed: string;
  element: string;
  symbol: string;
}

export interface Spread {
  name: string;
  desc: string;
  count: number;
  positions: string[];
  positionDesc: string[];
  /** Grid of card indices defining the visual layout, row by row. `null` marks an empty cell. */
  layout: (number | null)[][];
}

export interface Deck {
  id: string;
  name: string;
  short: string;
  year: string;
  tradition: string;
  symbol: string;
  description: string;
  readingNotes: string;
  variants: string[];
}
