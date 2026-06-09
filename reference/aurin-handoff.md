# Aurín — Developer Handoff Document

---

## 1. Project Summary

Aurín is a tarot companion app for people who use physical tarot cards. It provides a digital reference layer — card meanings, spread guides, AI-generated reading synthesis — without replacing the physical ritual. The problem it solves is that most tarot apps try to digitise the cards themselves, which feels cold; Aurín instead sits alongside the physical deck as a knowledgeable companion.

The target user is someone who already owns physical cards (or is curious about tarot) who wants meaning, structure, and reflection — not a card generator. Think: spiritual-but-not-woo, thoughtful, likely female, 25–45.

---

## 2. Decisions Made

### Product & Scope
- **Name:** Aurín (pronounced au-REEN, meaning "golden light"). Plain "Aurin" in UI text and code; "Aurín" with accent in logos and branding assets.
- **Core concept:** Companion to physical cards, NOT a digital card draw app. The daily ritual section explicitly instructs the user to sit with their physical deck, not tap a button.
- **App type:** Web app first (React PWA). Native mobile via React Native or Capacitor later.
- **Business model:** Freemium + rewarded ads. Premium tier at £3.99/month or £29.99/year.
- **Creator persona for social:** "Celestial Sharan" on @aurin.app (Instagram and TikTok).

### Domains (OPEN — Daniel to register)
- Primary: `aurin.app`
- Also: `aurinapp.com`, `getaurin.com`

### Features included (in prototype)
- 78-card reference: all Major + Minor Arcana, upright and reversed meanings
- 13 spread types grouped into Everyday / Deep Dives / Bigger Pictures
- Deck tradition selector (RWS, Thoth, Marseille, etc.)
- AI reading synthesis (Claude Sonnet via Anthropic API)
- Guided Reading session: breathe → set intention → shuffle → speak card names via speech recognition → confirm → sped-up reveal animation → reaction recording → AI reading
- Daily ritual — prompts user to sit with physical deck
- Settings: default deck and spread (persisted in localStorage)
- Share card with reaction video
- Community opt-in: users can submit readings for Aurín's review queue
- Admin approval queue (basic, localStorage-backed)
- Onboarding flow: 4 screens, skippable, asks experience level, ritual time preference, and intention

### Features explicitly excluded
- Digital card draw / random card generator — excluded because it undermines the physical ritual ethos
- User accounts / cloud sync — excluded from v1, flagged as future
- Push notifications — excluded from v1 (requires native app); ritual time is captured in onboarding for future use

### Design direction decided
- Warm, minimal, terra cotta palette — NOT literal stars, moons, or purple mystical aesthetics
- Fonts: Cinzel Decorative (headings), Crimson Text (body)
- Primary colour: `#c4714a` (terra cotta accent)
- Background: `#f5ede4` (warm cream)
- Card backgrounds: `#ede0d4`
- Dark mode: not in v1

### Recording behaviour decided
- Recording starts AFTER all cards are confirmed, not during the ceremony
- Sped-up card reveal plays first, then camera opens for reaction
- Private Spread Reading path is clearly labelled "Private · no recording · no pressure"

---

## 3. Requirements

### Must Have
- All 78 tarot cards with upright/reversed meanings, keywords, and suit colours
- 13 spreads across 3 groups (Everyday, Deep Dives, Bigger Pictures)
- Deck tradition selector (5 decks defined: RWS, Thoth, Marseille, Wild Unknown, Tarot de Marseille modernised)
- Home screen with Daily Card prompt and Spread Reading entry
- Build-reading flow: pick spread → assign cards to positions → get AI reading
- Reading mode: view card meanings per position, get full AI synthesis
- Guided reading session with speech recognition for card assignment
- Onboarding (4 screens, skippable)
- Daily ritual modal (prompts physical deck interaction, draws a random card for reflection)
- Settings screen: default deck, default spread
- Card detail screen: full meaning, keywords, reversed meaning
- Browse screen: all 78 cards, searchable, filterable by suit
- Share reading: generates a shareable card with optional reaction video
- Community queue: submit reading for Aurín's review (admin approval UI)
- Anthropic API key must be passed via environment variable, not hardcoded
- British English throughout

### Nice to Have
- Reading journal with pattern recognition across past readings
- Streak mechanic (daily ritual consistency)
- User accounts + cloud reading history
- Push notifications triggered by saved ritual time
- Circles / group reading feature
- Affiliate product section (candles, crystals, etc.)
- Native mobile app (React Native or Capacitor)
- Additional guidance verticals: Vedic astrology, I Ching, oracle cards
- Daniel's own custom deck (he's designing it) as a selectable deck option

### Explicitly Excluded
- Digital card draw replacing physical cards — core brand principle, never add
- Ads in the main reading flow — breaks the ritual atmosphere
- Anything that requires real-time backend in v1 — keep it client-side first

---

## 4. Technical Spec

### Stack
- **Framework:** React (JavaScript, not TypeScript — the prototype is `.jsx`)
- **Bootstrapped with:** Create React App (`npx create-react-app aurin`)
- **Local path:** `C:\Users\shara\aurin` (Sharan's machine)
- **Node:** Installed, confirmed working
- **Ports:** App runs on 3003 or 3004 (3000 conflict on Sharan's machine)

### AI Integration
- **Model:** `claude-sonnet-4-20250514` via Anthropic `/v1/messages` endpoint
- **Called directly from the browser** (no backend proxy in prototype — this needs to change for production; API key must not ship in client bundle)
- **Used for:** Reading synthesis, daily card guidance, card-specific insights
- **System prompt style:** Warm, direct, British English, "speaking gently to a friend"

### State Management
- All state via React `useState` / `useRef` — no Redux, no Zustand
- Persistence: `localStorage` only (no database in prototype)
- localStorage keys used:
  - `aurin_default_deck`
  - `aurin_default_spread`
  - `aurin_onboarded`
  - `aurin_ritual_time`
  - `aurin_intention`
  - `aurin_level`
  - `aurin_admin_queue`

### Screen router
Single-component app with a `screen` state variable. Values:
`home | settings | deck-select | pick-spread | build-reading | reading | browse | card-detail`

### Media
- Camera/microphone access via `MediaRecorder` API (browser)
- Speech recognition via `window.SpeechRecognition` / `webkitSpeechRecognition`

### Fonts
- Google Fonts: Cinzel Decorative (400, 700, 900) + Crimson Text (400, 600, 400italic)
- Loaded via `@import` in a `<style>` tag inside the component

### No database, no auth, no backend in prototype
These are all future. The developer will need to design those when adding user accounts.

### OPEN: API key handling
The prototype calls the Anthropic API directly from the browser. For production, this must route through a backend proxy. The developer needs to decide: serverless function (Vercel/Netlify), Express server, or similar.

---

## 5. UI/UX Direction

### Visual language
- Warm, minimal, grounded — inspired by candlelight and aged paper, not fantasy
- No stars, moons, or purple — those read as cheap mysticism
- Terra cotta (`#c4714a`) is the only strong accent colour
- Generous white space; cards feel like objects, not UI widgets
- Suit colours are tinted versions of the palette (each suit has `.bg`, `.accent`, `.glow`)

### Suit colour system
```js
const SUIT_COLORS = {
  "Major Arcana": { bg: "#f0e6d3", accent: "#8b5e3c", glow: "#c4714a44" },
  "Wands":        { bg: "#fdf0e0", accent: "#c4714a", glow: "#c4714a33" },
  "Cups":         { bg: "#e8f0f8", accent: "#4a7ab5", glow: "#4a7ab533" },
  "Swords":       { bg: "#eef2ee", accent: "#4a7a4a", glow: "#4a7a4a33" },
  "Pentacles":    { bg: "#f5f0e8", accent: "#8b7355", glow: "#8b735533" },
};
```

### Layout
- Max width `560px` (settings) to `860px` (browse/reading) — mobile-first
- Single column throughout; no sidebar
- Bottom-anchored navigation: not yet built (OPEN)
- All screens are overlaid modals or conditional renders within one scrollable div

### Key component patterns
- `.btn` — base button style (terracotta border, transparent bg)
- `.btn.gold` — filled terracotta CTA button
- `.spread-card` — card slot in the spread grid; fills with suit colour when assigned
- `.card-tile` — card in the browse grid
- `.fadein` — CSS keyframe opacity fade on screen transitions
- `.pulse` — subtle scale pulse for "selecting" state

### Onboarding flow (4 screens)
1. Welcome — name/tagline, skip option
2. Experience level selector (Curious / Learning / Practising / Experienced)
3. Ritual moment selector (Morning / Lunchtime / Evening / Late night / Weekends)
4. Intention prompt — free text, optional

### Guided reading session flow
1. Breath circle animation (in/hold/out cycle)
2. Set intention text input
3. "Shuffle your physical deck" instruction
4. Speech recognition — user speaks each card name aloud
5. Card name confirmation UI — confirm or re-speak
6. Sped-up card reveal animation (all cards flip in sequence)
7. Camera opens — user records reaction
8. AI reading synthesis delivered
9. Share/save options

### Share card design
Fixed-position modal overlay. Preview card shows:
- Dark gradient header with Aurín branding
- Spread name and deck
- Blurred card grid (teaser, with signup overlay)
- Optional reaction video embed
- Share options: native share, WhatsApp, Twitter/X, Facebook, Telegram

---

## 6. Copy and Content

### Brand voice
- Warm, direct, zero fluff
- British English (colour not color, practising not practicing, etc.)
- No disclaimers, no "tarot is for entertainment only"
- Speaks like a knowledgeable friend, not a fortune teller

### Key UI strings
- App name in UI: **Aurin** (no accent)
- App name in logo/branding: **Aurín**
- Daily card prompt: "Draw today's card" / "A moment of reflection, just for you"
- Guided reading: "✦ Read My Spread" (CTA)
- Reading synthesis CTA: "Weave these cards together →"
- Record reaction CTA: "◉ Record My Reaction"
- Share CTA: "↗ Preview Share Card"
- Onboarding skip: "Skip for now"
- Private reading label: "Private · no recording · no pressure"

### Spread groups and names
**Everyday**
- Daily Single Card
- Past · Present · Future
- Mind · Body · Spirit
- Situation · Action · Outcome
- The Five-Card Cross

**Deep Dives**
- The Celtic Cross (10 cards)
- The Relationship Spread (7 cards)
- The Decision Spread (5 cards)
- The Shadow Work Spread (5 cards)
- The Career Path Spread (6 cards)

**Bigger Pictures**
- The Year Ahead (12 cards)
- The Chakra Spread (7 cards)
- The Life Path Spread (13 cards)

### Deck names
- Rider-Waite-Smith (RWS) — "The classic. Rich in symbolism."
- Thoth Tarot — "Crowley-Harris. Astrological, ceremonial."
- Tarot de Marseille — "French tradition. Geometric pips."
- The Wild Unknown — "Kim Krans. Nature archetypes."
- Modern Marseille — "Contemporary take on the French tradition."

---

## 7. Open Questions

1. **API key in production.** The prototype calls Anthropic directly from the browser. A backend proxy is required before launch. Which platform? (Vercel serverless, Netlify functions, a Node/Express server?)

2. **Bottom navigation.** No bottom nav is built yet. Does the developer design one, or does Sharan want to spec this first?

3. **Domains.** Daniel was tasked with registering `aurin.app`, `aurinapp.com`, `getaurin.com`. Confirm status before setting up any hosting.

4. **Trademark.** UK IPO search for "Aurin" in class 42 + 45 was flagged as a task but not completed. Must be done before launch.

5. **Premium paywall implementation.** Freemium model agreed (£3.99/mo, £29.99/yr) but no paywall logic exists in the prototype. What features gate? When does the paywall trigger?

6. **Rewarded ads provider.** Agreed in principle, but no ad SDK integrated. Which provider? (Google AdMob for native, Google AdSense/other for web?)

7. **Community queue backend.** The admin approval queue in the prototype is localStorage-only. A real submission system needs a database and an admin UI. Out of scope for now, but the developer should not build on top of the localStorage mock.

8. **User accounts.** No auth in prototype. When this is added, what's the approach? (Clerk, Auth0, Supabase auth, custom?)

9. **React Native vs Capacitor.** Agreed to go native mobile eventually. Which path? RN requires a rewrite; Capacitor wraps the existing React app. Decision deferred.

10. **App.js compilation issue.** The prototype (`aurin-clean-final.jsx`) has been through extensive refactoring to fix JSX/Babel parse errors in create-react-app's webpack config. The file was last tested in CodeSandbox and may still have one remaining parse error at around line 1389 (the expanded slot detail section in the build-reading screen). The developer should run `npm start` immediately and resolve any remaining Babel errors before building on top of the file.

11. **Daniel's custom deck.** Daniel is designing a proprietary Aurín deck. How and when does it get added? As a static asset deck option, or dynamically?

12. **Circles / group reading.** Discussed positively as a future feature. No spec exists. Defer until post-launch.

---

## 8. Artifacts

### 8.1 `src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import TarotApp from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TarotApp />
  </React.StrictMode>
);
```

### 8.2 `src/App.js`

The main application file is too large to reproduce inline here (approximately 2,600 lines). It is provided as a separate file: **`aurin-clean-final.jsx`** — rename to `App.js` when placing in `src/`.

**To install and run:**
```bash
npx create-react-app aurin
cd aurin
# Replace src/App.js with aurin-clean-final.jsx (renamed to App.js)
# Replace src/index.js with the index.js above
npm start
```

**What's in the file:**
- All 78 tarot card definitions (`MAJOR_ARCANA`, `CUPS`, `WANDS`, `SWORDS`, `PENTACLES`)
- `ALL_CARDS` array (all 78 combined)
- `SUIT_COLORS` object
- `SPREADS` object (13 spreads with positions, descriptions, layout grids)
- `SPREAD_GROUPS` (3 groups)
- `DECKS` array (5 deck traditions)
- `export default function TarotApp()` — single component containing all state, all screens, all logic
- Pre-return render helper: `renderSlotCard(slotIdx, ci)` — slot card renderer for the spread grid
- Pre-computed vars: `selectedDeck`, `selectedSpread`, `savedIntention`, `currentSpread`
- Screens: home, settings, deck-select, pick-spread, build-reading, reading, browse, card-detail
- Overlays: onboarding (4 steps), daily ritual modal, guided session, share preview, admin queue

**Known issue for the developer to resolve first:**
The file may still have a JSX parse error in create-react-app's Babel config around the spread grid's `row.map()` section (approximately line 1380–1395 in the current file). If `npm start` shows `Unexpected token, expected ","` pointing at `{/* Expanded slot detail */}`, the cause is that the build-reading outer `<div className="fadein">` is closing before all its child sections. The fix is to ensure that div remains open until just before the `)}` that closes the build-reading conditional (~line 1757).

---

*Handoff prepared 8 June 2026. Built by Sharan and Claude across one session. Daniel is the visual design partner. Reach Sharan via the Aurín Instagram @aurin.app.*
