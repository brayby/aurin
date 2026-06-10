# Evidence

## Structural
- Interactive elements across all 4 tabbed screens: **0** beyond tab bar. Read spreads are plain `View`s (read.tsx:19), Cards rows plain `View`s (cards.tsx:10), Settings decks plain `View`s (settings.tsx:15). Only Explore (orphaned) has `Pressable` (explore.tsx:48).
- Orphaned route: `explore.tsx` is unmodified Expo starter content ("This starter app includes example code", explore.tsx:44) and is **not registered in tabs** (app-tabs.tsx:18-42 lists index/read/cards/settings only) — reachable by deep link, dead weight.
- Reference artifact `reference/aurin-clean-final.jsx` shipped in repo.
- Three different safe-area/layout strategies: `Screen` wrapper (index/read/settings), hand-rolled SafeAreaView+FlatList (cards.tsx:26), hand-rolled ScrollView+contentInset (explore.tsx:36).

## Visual (INFERRED from source — no running instance screenshotted)
- Spacing scale: 2/4/8/16/24/32/64 (theme.ts:64-72). Gap 32→64 doubles with nothing between.
- Type sizes in use: 13, 14, 15, 16, 17, 18, 19, 22, 26, 30, 40, 44 — **12 ad-hoc sizes, no modular scale** (across index.tsx, cards.tsx, read.tsx, settings.tsx).
- Color tokens: 8 core (theme.ts:10-27) + 15 suit colors (theme.ts:40-46) = 23 hex values.
- Palette drift: Cups `#4a7ab5` (blue) and Swords `#4a7a4a` (green) (theme.ts:43-44) are cool hues inside an otherwise strictly warm system.
- Contrast (computed): body text `#2e1f14` on `#f5ede4` ≈ 12.9:1 ✅. Secondary `#7a6553` on `#f5ede4` ≈ 4.7:1 ✅ borderline. Accent `#c4714a` on `#f5ede4` ≈ 3.0:1 — passes large-text only; used at 30px titles ✅ but suit badge text 14px accent-on-tint (cards.tsx:78, e.g. `#c4714a` on `#fdf0e0` ≈ 3.1:1) ❌ fails 4.5:1.
- States checklist: empty ❌ loading ❌ error ❌ success ❌ focus ❌ disabled ❌ pressed ❌ (only explore.tsx:149 has pressed opacity). 7/7 missing on shipped screens.
- Display font Cinzel Decorative in 3 weights incl. 900 Black for 40px wordmark (index.tsx:39-40).

## Copy & Honesty
- "Aurín is here to listen, not to draw for you" (index.tsx:31) — honest positioning ✅.
- "Defaults aren't wired to storage yet — that lands in Phase 2" (settings.tsx:27) — honest ✅.
- No dark patterns, no inflated claims found.
- Mismatch: Read screen says "choose the shape of the question" (read.tsx:12) but nothing is choosable — label promises behavior that doesn't exist.

## Weight & Friction
- No animations anywhere (0 idle motion). No network calls (local `@/data`). No modals/badges on load. Fonts: 6 font files loaded (\_layout.tsx:31-38), blocking render until loaded (\_layout.tsx:40 returns null — no splash/skeleton).
- Dark mode: `dark` mirrors `light` deliberately (theme.ts:29-32), documented as v1 deferral.

## Accessibility
- No `accessibilityRole`/`accessibilityLabel` anywhere in src screens.
- Touch targets moot (nothing tappable); badge 44×44 (cards.tsx:72-73) would pass.
- Suit badge text contrast fails (see Visual).
