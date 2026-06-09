import type { Deck } from "./types";

export const DECKS: Deck[] = [
  {
    "id": "rws",
    "name": "Rider-Waite-Smith",
    "short": "Rider-Waite",
    "year": "1909",
    "tradition": "Western esoteric / Golden Dawn",
    "symbol": "✦",
    "description": "The most widely used deck in the world. Illustrated by Pamela Colman Smith under Arthur Edward Waite's direction. All 78 cards have pictorial scenes, making it the foundation for most modern tarot reading and interpretation.",
    "readingNotes": "Readings follow the classic Rider-Waite-Smith symbolism. Pay close attention to the imagery — every figure, colour, and background detail carries meaning. The Minor Arcana scenes are particularly rich in narrative.",
    "variants": [
      "Universal Waite",
      "Radiant Rider-Waite",
      "Centennial Rider Waite",
      "Smith-Waite Centennial"
    ]
  },
  {
    "id": "thoth",
    "name": "Thoth Tarot",
    "short": "Thoth",
    "year": "1943",
    "tradition": "Thelema / Hermetic Kabbalah",
    "symbol": "☽",
    "description": "Created by Aleister Crowley and painted by Lady Frieda Harris. Deeply rooted in Kabbalah, astrology, and numerology. More abstract and esoteric than RWS — the imagery is geometric and symbolic rather than narrative.",
    "readingNotes": "Thoth readings draw heavily on astrological and Kabbalistic correspondence. The court cards are renamed (Knight/Queen/Prince/Princess instead of King/Queen/Knight/Page). Justice is card VIII and Strength is XI — the reverse of RWS. Meanings carry more psychological and initiatory weight.",
    "variants": [
      "Harris Thoth",
      "Thoth Tarot Large",
      "Crowley Thoth"
    ]
  },
  {
    "id": "marseille",
    "name": "Tarot de Marseille",
    "short": "Marseille",
    "year": "c.1650",
    "tradition": "French / Italian playing card tradition",
    "symbol": "⊕",
    "description": "One of the oldest and most historically significant tarot traditions. The Minor Arcana are pip cards — non-illustrated suits showing only the suit symbols. Readings rely heavily on numerology, suit energies, and the richly symbolic Major Arcana.",
    "readingNotes": "Marseille readings focus more on intuition, numerology, and the pip structure than on illustrated scenes. The Major Arcana imagery differs from RWS in key ways — Justice is VIII and Strength (La Force) is XI. The court cards are Valet, Cavalier, Reine, and Roy.",
    "variants": [
      "Camoin-Jodorowsky",
      "Nicolas Conver",
      "Jean Dodal",
      "Tarot de Paris"
    ]
  },
  {
    "id": "osho",
    "name": "Osho Zen Tarot",
    "short": "Osho Zen",
    "year": "1994",
    "tradition": "Zen Buddhism / transpersonal psychology",
    "symbol": "◎",
    "description": "A non-traditional deck created by Ma Deva Padma. Rather than fortune-telling, it's designed as a tool for meditation and self-awareness. The suits are renamed (Fire, Water, Clouds, Rainbows) and many Major Arcana have different names and meanings.",
    "readingNotes": "Osho Zen readings focus on the present moment and inner states rather than prediction. Cards represent psychological and spiritual energies. Don't apply standard RWS meanings — the imagery and intention are distinctly different. Excellent for shadow work and personal insight.",
    "variants": [
      "Standard Osho Zen"
    ]
  },
  {
    "id": "lenormand",
    "name": "Lenormand",
    "short": "Lenormand",
    "year": "c.1800",
    "tradition": "French cartomancy",
    "symbol": "⟡",
    "description": "Technically not tarot — Lenormand is a 36-card oracle system named after French fortune-teller Marie Anne Lenormand. Cards are more literal and concrete than tarot, read primarily in combinations and chains rather than individually.",
    "readingNotes": "Lenormand works very differently to tarot. Cards are almost always read in pairs or larger tableaux — a single card rarely stands alone. Meanings are more concrete and event-based. If you're using this for spreads, focus on how cards modify each other.",
    "variants": [
      "Blue Owl",
      "Mystical Lenormand",
      "Gilded Reverie"
    ]
  },
  {
    "id": "wild-unknown",
    "name": "The Wild Unknown",
    "short": "Wild Unknown",
    "year": "2012",
    "tradition": "RWS-based / nature symbolism",
    "symbol": "🌿",
    "description": "Created by Kim Krans. A modern deck with stark black-and-white imagery drawn from nature — animals, plants, and geometric forms. RWS-compatible in structure but with a distinctly intuitive, nature-based energy.",
    "readingNotes": "The Wild Unknown follows RWS card structure and meanings closely, so standard interpretations apply. The animal imagery adds an instinctual, nature-based layer — pay attention to which animal appears and its symbolic associations. The stark aesthetic invites slower, more meditative readings.",
    "variants": [
      "Original",
      "Animal Spirit Oracle"
    ]
  },
  {
    "id": "modern-witch",
    "name": "Modern Witch Tarot",
    "short": "Modern Witch",
    "year": "2019",
    "tradition": "RWS-based / contemporary feminist",
    "symbol": "☾",
    "description": "Created by Lisa Sterle. A direct reimagining of RWS with diverse, modern characters — all the figures are women or non-binary people in contemporary settings. Fully RWS-compatible.",
    "readingNotes": "Meanings follow RWS exactly — any standard tarot interpretation applies. The modern imagery can make the symbolism feel more immediately relatable, especially for younger readers or those who found the classic imagery dated.",
    "variants": [
      "Standard edition"
    ]
  },
  {
    "id": "other",
    "name": "Other / Custom Deck",
    "short": "Other",
    "year": "",
    "tradition": "Various",
    "symbol": "✧",
    "description": "Using a deck not listed here, or a custom or handmade deck. Readings will use general tarot symbolism and card meanings as a foundation.",
    "readingNotes": "General tarot card meanings will be used as the interpretive foundation. If your deck has significantly different symbolism or is non-RWS, use the individual card meanings as a starting point and trust your intuition with the specific imagery in front of you.",
    "variants": []
  }
];
