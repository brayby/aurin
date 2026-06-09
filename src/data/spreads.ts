import type { Spread } from "./types";

export const SPREADS: Record<string, Spread> = {
  "three": {
    "name": "3-Card Spread",
    "desc": "Past · Present · Future",
    "count": 3,
    "positions": [
      "Past",
      "Present",
      "Future"
    ],
    "positionDesc": [
      "What has led you here — the foundation or the wound.",
      "Where you stand right now — the energy you're working with.",
      "Where things are heading — the likely outcome if you continue on this path."
    ],
    "layout": [
      [
        0,
        1,
        2
      ]
    ]
  },
  "four": {
    "name": "4-Card Spread",
    "desc": "Situation · Action · Obstacle · Outcome",
    "count": 4,
    "positions": [
      "Situation",
      "Action",
      "Obstacle",
      "Outcome"
    ],
    "positionDesc": [
      "The heart of the matter — what the reading is really about.",
      "What you should do — the recommended course of action.",
      "What's in the way — the challenge or block to navigate.",
      "Where this leads — the likely result of taking action."
    ],
    "layout": [
      [
        0,
        1,
        2,
        3
      ]
    ]
  },
  "five": {
    "name": "5-Card Spread",
    "desc": "Mind · Body · Spirit · Want · Need",
    "count": 5,
    "positions": [
      "Mind",
      "Body",
      "Spirit",
      "What You Want",
      "What You Need"
    ],
    "positionDesc": [
      "Your thoughts and mental state right now.",
      "Your physical energy, health, or practical reality.",
      "Your deeper spiritual or emotional truth.",
      "What you consciously desire from this situation.",
      "What would actually serve you — which may differ from what you want."
    ],
    "layout": [
      [
        0,
        1,
        2
      ],
      [
        3,
        4
      ]
    ]
  },
  "celtic": {
    "name": "7-Card Spread",
    "desc": "A deeper situational reading",
    "count": 7,
    "positions": [
      "Present",
      "Challenge",
      "Past",
      "Future",
      "Foundation",
      "Hopes & Fears",
      "Outcome"
    ],
    "positionDesc": [
      "The central energy surrounding you right now.",
      "What crosses or challenges you — the main obstacle.",
      "What's behind you — the recent past influencing things.",
      "What's ahead — where things are moving.",
      "The root of the matter — hidden or subconscious influences.",
      "Your hopes or fears around this situation.",
      "The final outcome — where it all leads."
    ],
    "layout": [
      [
        null,
        0,
        null
      ],
      [
        2,
        1,
        3
      ],
      [
        null,
        4,
        null
      ],
      [
        5,
        null,
        6
      ]
    ]
  },
  "eight": {
    "name": "8-Card Spread",
    "desc": "Full life areas reading",
    "count": 8,
    "positions": [
      "Self",
      "Home & Family",
      "Love",
      "Work",
      "Health",
      "Finances",
      "Spirituality",
      "Hidden Influence"
    ],
    "positionDesc": [
      "Your current sense of self — who you are being right now.",
      "The energy in your home life and family relationships.",
      "Your love life — romantic or close emotional connections.",
      "Career, work, and ambitions.",
      "Your physical and mental wellbeing.",
      "Your relationship with money and material security.",
      "Your inner life, intuition, and spiritual path.",
      "Something beneath the surface influencing everything else."
    ],
    "layout": [
      [
        0,
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ],
      [
        6,
        7
      ]
    ]
  },
  "nine": {
    "name": "9-Card Spread",
    "desc": "The three realms — past, present, future across mind, body, spirit",
    "count": 9,
    "positions": [
      "Past Mind",
      "Past Body",
      "Past Spirit",
      "Present Mind",
      "Present Body",
      "Present Spirit",
      "Future Mind",
      "Future Body",
      "Future Spirit"
    ],
    "positionDesc": [
      "How you used to think — past patterns of mind.",
      "Your physical reality and actions in the past.",
      "The spiritual or emotional truth of where you've been.",
      "Your current thoughts and mental state.",
      "Your body, health, and physical world right now.",
      "Your emotional and spiritual state in this moment.",
      "The mindset that will serve you going forward.",
      "Physical changes or actions coming your way.",
      "The deeper soul lesson or spiritual direction ahead."
    ],
    "layout": [
      [
        0,
        1,
        2
      ],
      [
        3,
        4,
        5
      ],
      [
        6,
        7,
        8
      ]
    ]
  },
  "celtic_cross": {
    "name": "Celtic Cross",
    "desc": "The classic 10-card reading",
    "count": 10,
    "positions": [
      "The Present",
      "The Challenge",
      "The Foundation",
      "The Recent Past",
      "The Possible Future",
      "The Near Future",
      "Your Attitude",
      "External Influences",
      "Hopes & Fears",
      "The Outcome"
    ],
    "positionDesc": [
      "The central energy of the situation — what surrounds you right now.",
      "What crosses or complicates you — the main obstacle or tension.",
      "The root beneath it all — subconscious influences or the foundation of the matter.",
      "What has just passed — energies that are fading but still relevant.",
      "What could be — a potential outcome if things continue as they are.",
      "What's coming in the near term — the next development on the horizon.",
      "How you see yourself in this situation — your attitude and inner stance.",
      "How others see you, or outside forces affecting the situation.",
      "What you hope for — or fear. Often both at once.",
      "The final outcome — where all these energies are leading."
    ],
    "layout": [
      [
        null,
        2,
        null,
        null,
        null
      ],
      [
        3,
        0,
        4,
        null,
        6
      ],
      [
        null,
        1,
        null,
        null,
        7
      ],
      [
        null,
        5,
        null,
        null,
        8
      ],
      [
        null,
        null,
        null,
        null,
        9
      ]
    ]
  },
  "horseshoe": {
    "name": "Horseshoe",
    "desc": "7-card spread for specific questions",
    "count": 7,
    "positions": [
      "The Past",
      "The Present",
      "Hidden Influences",
      "Obstacles",
      "Attitudes of Others",
      "What You Should Do",
      "Likely Outcome"
    ],
    "positionDesc": [
      "Recent events that have shaped the current situation.",
      "Where things stand right now — the current energy.",
      "What's working beneath the surface, unseen but influential.",
      "The block or challenge standing between you and resolution.",
      "How others involved in this situation view it or are acting.",
      "The recommended course of action — what to do next.",
      "Where this is heading if you follow the guidance of this reading."
    ],
    "layout": [
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6
      ]
    ]
  },
  "yes_no": {
    "name": "Yes / No",
    "desc": "3-card directional reading for a specific question",
    "count": 3,
    "positions": [
      "Energy Around the Question",
      "What Supports a Yes",
      "What Suggests No or Caution"
    ],
    "positionDesc": [
      "The overall energy surrounding your question — the context the answer sits within.",
      "Cards or forces pointing toward yes, forward movement, or a positive outcome.",
      "Cards or forces urging caution, delay, or pointing toward no."
    ],
    "layout": [
      [
        0,
        1,
        2
      ]
    ]
  },
  "relationship": {
    "name": "Relationship",
    "desc": "6-card reading for connection between two people",
    "count": 6,
    "positions": [
      "How You See Them",
      "How They See You",
      "What You Bring",
      "What They Bring",
      "The Challenge Between You",
      "The Potential"
    ],
    "positionDesc": [
      "Your perception of the other person — conscious or unconscious.",
      "How they perceive you — the energy you project in their eyes.",
      "What you contribute to this connection — your gifts and your shadow.",
      "What they contribute — their gifts and their shadow.",
      "The central tension or challenge between you that needs to be navigated.",
      "What this relationship is capable of becoming — its highest possibility."
    ],
    "layout": [
      [
        0,
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ]
    ]
  },
  "year_ahead": {
    "name": "Year Ahead",
    "desc": "12 cards — one per month",
    "count": 12,
    "positions": [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    "positionDesc": [
      "The energy and themes of January.",
      "The energy and themes of February.",
      "The energy and themes of March.",
      "The energy and themes of April.",
      "The energy and themes of May.",
      "The energy and themes of June.",
      "The energy and themes of July.",
      "The energy and themes of August.",
      "The energy and themes of September.",
      "The energy and themes of October.",
      "The energy and themes of November.",
      "The energy and themes of December."
    ],
    "layout": [
      [
        0,
        1,
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ],
      [
        8,
        9,
        10,
        11
      ]
    ]
  },
  "astrological": {
    "name": "Astrological",
    "desc": "12 cards — one per zodiac house",
    "count": 12,
    "positions": [
      "1st House — Self",
      "2nd House — Money",
      "3rd House — Communication",
      "4th House — Home",
      "5th House — Creativity",
      "6th House — Health",
      "7th House — Relationships",
      "8th House — Transformation",
      "9th House — Philosophy",
      "10th House — Career",
      "11th House — Community",
      "12th House — The Hidden"
    ],
    "positionDesc": [
      "Your identity, appearance, and how you present to the world.",
      "Your finances, possessions, and relationship with material security.",
      "How you communicate, think, and connect with those around you.",
      "Your home, roots, family, and sense of belonging.",
      "Your creativity, pleasure, romance, and self-expression.",
      "Your daily routines, health, and how you serve others.",
      "Your partnerships — romantic, business, and significant one-on-one connections.",
      "Change, death, rebirth, shared resources, and what lies beneath the surface.",
      "Your beliefs, travel, higher education, and search for meaning.",
      "Your career, public reputation, and long-term ambitions.",
      "Your friendships, social circles, hopes, and collective purpose.",
      "What's hidden, subconscious, self-undoing, and the unseen spiritual realm."
    ],
    "layout": [
      [
        0,
        1,
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ],
      [
        8,
        9,
        10,
        11
      ]
    ]
  },
  "shadow_work": {
    "name": "Shadow Work",
    "desc": "5-card reading for self-discovery",
    "count": 5,
    "positions": [
      "What You're Hiding From Yourself",
      "Why You Hide It",
      "What It's Costing You",
      "What Healing Looks Like",
      "Your First Step"
    ],
    "positionDesc": [
      "The part of yourself you've pushed down, denied, or refused to look at.",
      "The root fear, wound, or belief that makes this shadow feel too dangerous to face.",
      "How carrying this hidden thing is affecting your life, relationships, and energy.",
      "What integration and wholeness could look like — the other side of this work.",
      "The most immediate, honest action you can take toward facing and healing this shadow."
    ],
    "layout": [
      [
        0,
        1,
        2
      ],
      [
        null,
        3,
        4
      ]
    ]
  }
};

/** Stable display order for the spread picker. */
export const SPREAD_KEYS: string[] = [
  "three",
  "four",
  "five",
  "celtic",
  "eight",
  "nine",
  "celtic_cross",
  "horseshoe",
  "yes_no",
  "relationship",
  "year_ahead",
  "astrological",
  "shadow_work"
];
