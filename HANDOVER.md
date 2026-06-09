# Aurín — Project Handover

**Purpose:** everything a fresh Claude Code (or developer) needs to continue building Aurín on a different machine. This document is self-contained — it does **not** rely on any local Claude Code "memory", which does not transfer between machines.

_Last updated: 2026-06-09, after Phase 1. Written on macOS; the project is moving to a Windows PC._

---

## 0. TL;DR / current status

Aurín is a **tarot companion app** being built as a native iOS + Android app with **Expo / React Native + TypeScript**, intended for sale on the Apple App Store and Google Play.

It began as a single-file React web prototype (`reference/aurin-clean-final.jsx`, ~2,600 lines). We are doing a **full rewrite** — fresh code, but reusing the prototype's hand-written tarot *content* (78 card meanings, spreads, decks) as data.

**Phases 0 and 1 are complete and committed.** The app scaffolds, typechecks clean, passes `expo-doctor` (21/21), and exports a valid iOS bundle. Phase 1 added real interactive screens — card detail, search + suit filter, a build-a-reading flow, persisted settings, and a reusable UI kit (see §8). It has **not** yet been seen running on a device/simulator (the Mac it was built on had no Xcode) — running it in Expo Go is the top priority for the next session.

**Next up: Phase 2** (onboarding & daily ritual — see §8). Backend and AI are deliberately deferred to Phase 3.

---

## 1. How to resume on the Windows PC

### 1.1 Get the code
The project folder lives in **OneDrive** (`.../019 - Claude Code/04 - Project Aurin/`), so it should sync to the PC automatically. **However:**

> ⚠️ **Do NOT trust a OneDrive-synced `node_modules`.** It is huge, platform-specific, and sync-corrupts easily. On the PC: **delete `node_modules`** inside `aurin/` and reinstall (step 1.3). `node_modules` is git-ignored, so this is safe.

**Strongly recommended:** set up a **private GitHub repo** as the real transfer mechanism instead of relying on OneDrive. As of this writing **no git remote exists yet**. To add one:
```bash
# create an empty PRIVATE repo at https://github.com/new (no README/license), then:
cd aurin
git remote add origin https://github.com/<you>/aurin.git
git push -u origin main      # (branch may be "master" — check `git branch`)
```
Then on the PC, `git clone` fresh and `npm install`.

### 1.2 Install the toolchain (Windows)
- **Node 22 LTS.** The repo pins it via `.nvmrc` (`22`). On Windows use [nvm-windows](https://github.com/coreybutler/nvm-windows) or [fnm](https://github.com/Schniz/fnm): `nvm install 22.22.3 && nvm use 22.22.3`. (Built/tested on Node **v22.22.3**, npm **10.9.8**.)
- **Git** — already standard.
- **Android Studio** — only if you want to build/run Android locally (emulator + SDK). Optional for now; Expo Go covers dev preview.
- **iOS:** ❗ **You cannot build iOS on Windows.** For iOS you must use **EAS Build** (Expo's cloud build) — see §7. Day-to-day development uses **Expo Go** on a physical iPhone, which needs no Mac.

### 1.3 Install & run
```bash
cd aurin              # the app lives in this SUBFOLDER, not the project root
npm install
npx expo start        # opens the dev server + QR code
```
Then open **Expo Go** (App Store / Play Store) on your phone, same Wi-Fi, and scan the QR code. Press `a` for Android emulator, `i` for iOS simulator (Mac only).

> ⚠️ The bottom tabs use `expo-router/unstable-native-tabs`, which renders **native** tab bars. These work in Expo Go and dev/release builds. If anything tab-related misbehaves in Expo Go, fall back to a development build (`npx expo run:android` / EAS).

### 1.4 Verify it's healthy
```bash
npx tsc --noEmit      # expect: no output (clean)
npx expo-doctor       # expect: 21/21 checks passed
```

---

## 2. Product context (the essentials)

Full original brief: **`reference/aurin-handoff.md`**. Condensed:

- **What it is:** a companion to *physical* tarot cards — meanings, spread guides, and AI reading synthesis. The user reads with their own deck; Aurín is the knowledgeable friend beside them.
- **Core principle (never violate):** Aurín does **NOT** draw cards for you / generate random cards. No digital card-draw replacing the physical ritual. This is the brand's whole differentiator.
- **Target user:** owns or is curious about physical cards; wants meaning and reflection, not fortune-telling theatrics. Spiritual-but-grounded, ~25–45.
- **Voice:** warm, direct, **British English**, no fluff, no disclaimers. Like a wise friend, not a fortune teller.
- **Name:** "Aurin" (no accent) in UI/code; "Aurín" in branding/logos. Pronounced au-REEN, "golden light".
- **Business model:** freemium; Premium at **£3.99/mo or £29.99/yr**.

---

## 3. Locked decisions (authoritative — these override the old prototype)

These were decided for the rewrite and supersede anything in the prototype or old handoff:

1. **Language:** TypeScript.
2. **Design:** **light** warm cream / terra-cotta palette (see §5). The prototype's code used a *dark* palette — **ignore it.** Dark mode is deferred; the app is **light-only** for v1 (`userInterfaceStyle: "light"`).
3. **Backend:** **Supabase** (Auth + Postgres + Edge Functions). See §7.
4. **AI is PREMIUM-ONLY.** All Claude-powered features sit behind the subscription. This removes rewarded ads / AdMob / ATT from the critical path and bounds AI cost to paying subscribers.
5. **Auth:** anonymous-first; optional upgrade to a real account later. (If Google sign-in is ever added, Apple *requires* "Sign in with Apple" alongside it.)
6. **Platforms:** **stores only** — no web target (react-native-web is present from the template but unused; don't build features for it).

**Free vs Premium boundary (agreed):**
- **Free:** full 78-card reference, browse/search, build any spread, per-position card meanings, daily card draw, settings.
- **Premium:** AI reading synthesis ("weave these together"), AI daily insight, the guided session's AI reading, and future journal/pattern features.

**AI model:** use **`claude-sonnet-4-6`** (current Sonnet). The prototype hardcoded the dated `claude-sonnet-4-20250514` — do not copy that.

---

## 4. Stack & versions (as installed)

Scaffolded with `create-expo-app` → landed on **Expo SDK 56** (newer than originally planned 53).

| Area | Choice | Notes |
|---|---|---|
| Framework | Expo SDK **~56.0.9**, React **19.2.3**, React Native **0.85.3** | Managed workflow |
| Language | TypeScript **~6.0.3** | `@/` path alias → `src/` |
| Navigation | **expo-router ~56.2.9** + `expo-router/unstable-native-tabs` | File-based routing under `src/app/` |
| Styling | **StyleSheet + design tokens** | ⚠️ **No NativeWind** — the template's `global.css` was web-only and was deleted. Don't reintroduce Tailwind unless deliberately chosen. |
| Animation | **react-native-reanimated 4.3.1** (+ react-native-worklets) | Already installed; for Phase 4 |
| Fonts | `@expo-google-fonts/cinzel-decorative`, `@expo-google-fonts/crimson-text`, `expo-font` | Loaded in root layout |
| Misc template deps | `@expo/ui`, `expo-symbols`, `expo-glass-effect`, `expo-image`, `expo-blur`-style glass, `react-native-safe-area-context`, `react-native-screens`, `react-native-gesture-handler` | Available if useful |

**Persistence — decision changed from the original plan.** The plan named `react-native-mmkv`, but **MMKV does not run in Expo Go** (it needs a custom dev build), and Expo Go is the team's day-to-day preview path. So Phase 1 persists via **`@react-native-async-storage/async-storage`** (Expo Go-compatible) behind a thin wrapper at `src/lib/storage.ts`. When the project moves to dev builds, swapping to MMKV means changing only that one file — callers use its async API. Don't add MMKV while Expo Go is still the preview path.

**Planned but NOT yet added** (install when their phase arrives, via `npx expo install`):
- `zustand` (global state) · `@tanstack/react-query` (server state) — Phase 2/3. (Local persistence is already covered by `src/lib/storage.ts`; see above.)
- `@supabase/supabase-js` — Phase 3
- `react-native-purchases` (RevenueCat IAP) — Phase 5
- `expo-camera`, `expo-av` (reaction recording) + a native speech-recognition module (e.g. `expo-speech-recognition` or `@react-native-voice/voice`) — Phase 4

---

## 5. Design tokens (source of truth: `src/constants/theme.ts`)

```
background        #f5ede4   warm cream page
backgroundElement #ede0d4   card / raised surface
backgroundSelected#e3d3c0   pressed/selected
border            #dcc9b4   hairlines
text              #2e1f14   deep roasted brown
textSecondary     #7a6553   muted brown
accent            #c4714a   terra-cotta (the ONLY strong accent)
onAccent          #fef8f2   text on accent fill
```
**Suit colours** (`SuitColors`): Major `#f0e6d3/#8b5e3c`, Wands `#fdf0e0/#c4714a`, Cups `#e8f0f8/#4a7ab5`, Swords `#eef2ee/#4a7a4a`, Pentacles `#f5f0e8/#8b7355` (each has `bg`, `accent`, `glow`).
**Fonts:** `Fonts.display` = Cinzel Decorative (headings/wordmark), `Fonts.serif` = Crimson Text (body), plus `displayBlack`, `serifSemibold`, `serifItalic`. Also `Spacing`, `Radius`, `BottomTabInset`, `MaxContentWidth` (860).
**Design ethos:** candlelight & aged paper. Generous whitespace. NO stars/moons/purple/"cheap mysticism". Cards feel like objects.

---

## 6. What's built (Phase 0) — file by file

```
aurin/
├─ app.json                 # name "Aurín", light-only, warm splash/icon bg, scheme "aurin"
├─ .nvmrc                    # 22
├─ AGENTS.md / CLAUDE.md     # ⚠️ see §9 — read v56 docs before writing Expo code
├─ reference/               # the old prototype + original handoff (read-only reference)
│  ├─ aurin-clean-final.jsx  # 2,596-line web prototype — source of card content
│  ├─ aurin-handoff.md       # original product brief (full detail)
│  └─ index.js
└─ src/
   ├─ app/                  # expo-router routes (each top-level file = a tab)
   │  ├─ _layout.tsx         # root: loads 6 fonts, forces warm light nav theme, renders <AppTabs/>
   │  ├─ index.tsx           # "Today" tab — deterministic card-of-the-day from real data
   │  ├─ read.tsx            # "Read" tab — lists all 13 spreads (placeholder picker)
   │  ├─ cards.tsx           # "Cards" tab — FlatList of all 78 cards, suit-tinted
   │  └─ settings.tsx        # "Settings" tab — lists 8 decks (not yet persisted)
   ├─ components/
   │  ├─ app-tabs.tsx        # native bottom tabs: Today/Read/Cards/Settings (SF + Material symbols)
   │  ├─ screen.tsx          # reusable page wrapper (safe-area, cream bg, centred max-width)
   │  ├─ themed-text.tsx     # kept from template; theme-aware <Text>
   │  └─ themed-view.tsx     # kept from template; theme-aware <View>
   ├─ constants/theme.ts    # ALL design tokens (palette, suits, fonts, spacing, radius)
   ├─ data/                 # THE PORTED CONTENT (see §6.1)
   │  ├─ types.ts            # Card, Spread, Deck, Suit types
   │  ├─ cards.ts            # MAJOR_ARCANA, MINOR_ARCANA, ALL_CARDS  (78 total)
   │  ├─ spreads.ts          # SPREADS (13), SPREAD_KEYS
   │  ├─ decks.ts            # DECKS (8)
   │  └─ index.ts            # barrel: `import { ALL_CARDS } from '@/data'`
   └─ hooks/                # use-theme, use-color-scheme (template; light is forced anyway)
```

### 6.1 The data layer (important)
The 78 cards / 13 spreads / 8 decks were **machine-extracted** from the prototype (not retyped) and serialized into typed TS — zero transcription error. Verified counts: **22 Major + 14×4 suits = 78 cards**. Spread `layout` grids use `(number | null)[][]` (`null` = empty cell in the visual grid, e.g. Celtic Cross).

- `Card` = `{ id, name, suit, number, keywords[], meaning, reversed, element, symbol }`
- `Spread` = `{ name, desc, count, positions[], positionDesc[], layout }`
- `Deck` = `{ id, name, short, year, tradition, symbol, description, readingNotes, variants[] }`

Note: the old handoff said "5 decks" but the actual data has **8** (rws, thoth, marseille, osho, lenormand, wild-unknown, modern-witch, other) and **13** spreads.

### 6.2 What Phase 1 added (file by file)

```
src/
├─ app/
│  ├─ _layout.tsx            # NOW a root Stack: SettingsProvider → ThemeProvider → Stack
│  │                         #   screens: (tabs) [no header], card/[id], reading/[spread]
│  ├─ (tabs)/                # the four tabs moved into this group
│  │  ├─ _layout.tsx          # re-exports components/app-tabs (the NativeTabs)
│  │  ├─ index.tsx            # Today — card-of-the-day now taps through to its detail
│  │  ├─ read.tsx             # spreads tappable → reading/[spread]; floats/badges default spread
│  │  ├─ cards.tsx            # search TextInput + suit Chip filter + tappable CardTiles
│  │  └─ settings.tsx         # pick + persist default deck & default spread
│  ├─ card/[id].tsx          # card detail: suit hero, keywords, upright + reversed
│  └─ reading/[spread].tsx   # build-a-reading: assign card per position, per-position meanings
├─ components/ui/            # the design-system primitives (barrel: components/ui/index.ts)
│  ├─ button.tsx              # Button (solid / outline / ghost)
│  ├─ card-tile.tsx          # CardTile — tappable suit-badged row
│  ├─ chip.tsx               # Chip — selectable filter pill
│  ├─ section-title.tsx      # SectionTitle + Eyebrow
│  └─ card-picker-modal.tsx  # CardPickerModal — searchable full-screen card chooser
├─ hooks/use-settings.tsx    # SettingsProvider + useSettings() (defaultDeckId, defaultSpreadKey)
└─ lib/storage.ts            # async KV wrapper over AsyncStorage (MMKV swap-point — see §4)
```

The original `src/components/app-tabs.tsx` is unchanged and is what `(tabs)/_layout.tsx` renders. Navigation uses `router.push('/card/123')` / `router.push('/reading/three')` (typed-route strings).

---

## 7. Backend plan (Supabase) — for Phase 3, not yet built

Single Supabase project covers three needs:
1. **AI proxy** — an **Edge Function** that holds the `ANTHROPIC_API_KEY` server-side and calls `claude-sonnet-4-6`. The app calls the function, never Anthropic directly. _(The prototype called Anthropic from the browser with the key in the bundle — insecure, and it was actually broken: no auth header, so the AI has literally never run. Phase 3 is the first real test of prompt quality.)_ Add rate-limiting here.
2. **Auth** — anonymous sign-in on first launch; optional later upgrade to email/Apple.
3. **Postgres** — journal/reading history, settings sync, and the (future) community submission queue, all with Row-Level Security.

**Payments (Phase 5):** subscriptions MUST go through **Apple/Google IAP** (Apple Guideline 3.1.1 — no external checkout for digital goods). Use **RevenueCat** to manage cross-store entitlements + the **"Restore Purchases"** flow Apple requires. Re-do the £3.99/£29.99 economics with the 15–30% platform cut.

---

## 8. Roadmap

- **Phase 0 — Scaffold & data ✅ DONE.** Expo+TS, theme, fonts, native tabs, data port, 4 data-backed placeholder screens.
- **Phase 1 — Real screens (offline, no AI/backend) ✅ DONE.**
  1. ✅ **Card detail** — `src/app/card/[id].tsx` dynamic route (hero, keywords, upright + reversed). Cards rows and the Today card-of-the-day are tappable.
  2. ✅ **Search + suit filter** on the Cards tab (live `TextInput` + suit `Chip` row + result count).
  3. ✅ **Build-a-reading flow** — Read tab spreads are tappable → `src/app/reading/[spread].tsx`: assign a card per position via a searchable `CardPickerModal`, see per-position meanings. AI synthesis shown as a disabled **Premium** teaser (real synthesis is Phase 3).
  4. ✅ **Persisted settings** (default deck + default spread) — see §6.2. The Read tab floats/badges the chosen default spread.
  5. ✅ **Reusable primitives** in `src/components/ui/`: `Button`, `CardTile`, `Chip`, `SectionTitle`/`Eyebrow`, `CardPickerModal`.
  - **Routing was restructured:** the root `_layout.tsx` is now a **Stack**; the four tabs moved into a `src/app/(tabs)/` group (`(tabs)/_layout.tsx` renders the native tabs). Detail routes (`card/[id]`, `reading/[spread]`) push **over** the tab bar with a warm-themed header.
- **Phase 2 — Onboarding & daily ritual. NEXT.** 4-screen skippable onboarding (experience level, ritual time, intention); daily ritual modal that prompts the *physical* deck. (Onboarding-complete + preferences can persist through the same settings/storage layer built in Phase 1.)
- **Phase 3 — Backend & AI.** Supabase project, AI proxy Edge Function, TanStack Query wiring, anonymous auth, journal table. First real AI output — validate the prompts.
- **Phase 4 — Guided session (highest risk).** Breath animation (Reanimated), **native speech recognition** for spoken card names, reveal animation, camera reaction recording (expo-camera). ⚠️ **Build a manual-entry fallback first** — see §10.
- **Phase 5 — Monetization.** RevenueCat IAP + `premium` entitlement + paywall (triggers when a free user hits an AI feature) + restore.
- **Phase 6 — Store readiness.** Real app icon/splash (Daniel's branding), permission strings (camera/mic/speech), privacy policy, age rating (tarot ≈ 17+ on iOS), screenshots, EAS Build/Submit, TestFlight + Play internal testing.

---

## 9. Conventions & gotchas (read before coding)

- ❗ **`AGENTS.md` mandate:** _"Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code."_ SDK 56 is new — APIs have drifted. Verify against the v56 docs, don't trust training memory.
- **The app is in the `aurin/` SUBFOLDER**, not the project root. The root folder name ("04 - Project Aurin") has spaces, which Expo rejects as a project name — that's why we nested it. Run all `npm`/`expo` commands from inside `aurin/`.
- **Light-mode only** for v1. Don't add dark variants; `Colors.dark` intentionally mirrors `Colors.light`.
- **No NativeWind / Tailwind.** Style with `StyleSheet.create` + tokens from `@/constants/theme`.
- **Reuse the data layer** via `import { ALL_CARDS, SPREADS, DECKS } from '@/data'`. Don't re-extract from the prototype.
- **British English** in all user-facing copy.
- On macOS Node was via `nvm` and not on the default PATH (commands had to source nvm first). On Windows with nvm-windows this is usually fine in a normal shell.
- OneDrive + `node_modules` = sync pain. Consider pausing OneDrive during heavy dev, or (better) work from a git clone outside OneDrive and push/pull.

---

## 10. Open questions & risks

1. **iOS speech recognition (biggest technical risk).** The guided session needs spoken card names. The prototype used the browser `webkitSpeechRecognition`, which **does not work on iOS** (and won't in RN at all). Phase 4 must use a native module (`SFSpeechRecognizer` via `expo-speech-recognition` / `@react-native-voice/voice`) and **always** ship a manual card-entry fallback.
2. **AI cost.** Premium-only gating bounds it, but still add rate-limiting + caching in the Edge Function before launch.
3. **Trademark "Aurin"** — never cleared (UK IPO, class 9 software). Do this before spending on store listings/branding.
4. **Deck IP** — the data lists in-copyright/trademarked decks (Thoth, Wild Unknown/Kim Krans, Modern Witch). The app ships **no card art** (text reference only), so likely fine, but worth a legal sanity check. Daniel's own custom deck is the clean long-term path.
5. **App icon / splash** are still the default Expo placeholders — needs Daniel's branding before store submission.
6. **Domains & trademark, community-queue backend, custom deck integration** — see `reference/aurin-handoff.md` §7 for the full open-questions list.

---

## 11. Git state

```
4e5b591  Phase 0: warm theme, fonts, native tabs, and data-backed screens
d6e3b2c  Add typed data layer (78 cards, 13 spreads, 8 decks) and pin Node 22
c34ec01  Initial commit
```
A GitHub remote now exists (`origin/main`). The list above is the Phase 0 history; Phase 1 lands as a further commit on top (routing restructure + interactive screens + UI kit + persistence).

---

## 12. First actions for the next Claude Code

1. Read this file and `reference/aurin-handoff.md`.
2. From `aurin/`: `npm install`, then `npx tsc --noEmit` and `npx expo-doctor` to confirm a healthy baseline.
3. `npx expo start` and preview in Expo Go on a phone — **the app has never been seen running; this is the priority.** Exercise the Phase 1 flows: tap a card → detail, search + suit filter, Read → pick a spread → assign cards via the picker, set a default deck/spread in Settings and confirm it persists across a reload. Note anything broken (fonts, native tabs, the `pageSheet` picker modal, layout).
4. Then confirm **Phase 2** scope (§8) with the user — onboarding + the daily ritual modal — reusing the `src/lib/storage.ts` + `useSettings` layer for persistence.
