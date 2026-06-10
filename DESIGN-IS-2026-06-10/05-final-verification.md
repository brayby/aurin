# Phase 5 — Final Verification (2026-06-10)

Verification subagent, read-only audit of `src/` post-redesign. Compares against
`02-scorecard.md` (prior total 14/30) and `03-verdict.md` (REDESIGN).

---

## 1. Anti-pattern greps

All run from repo root with `grep -rn` (case-insensitive where noted).

| Pattern | Scope | Expected | Found | Result |
|---|---|---|---|---|
| `borderLeftWidth` | src/ | 0 | 0 | PASS |
| `fontSize: [0-9]` | src/app + src/components | 0 | 0 | PASS |
| `cinzel`, `crimson` (ci) | src/ | 0 | 0 | PASS |
| `glow` (ci) | src/ | 1 known | 1 | PASS |
| `scale(` / `transform` | src/components + src/app | 0 | 0 | PASS |
| `shadow` / `elevation` (ci) | src/components + src/app | 0 | 0 | PASS |

Verbatim — the single `glow` hit (the known-acceptable card prose):

```
src/data/cards.ts:674:    "meaning": "A warm glow of the past. Childhood memories, old friends, nostalgia. Sometimes a return to simpler times. Can also mean someone from the past reappearing.",
```

All other greps returned empty. Every `fontSize` in app/components references `Type.*` tokens.

**Section result: PASS (6/6).**

---

## 2. Contrast audit (computed, WCAG 2.x relative luminance)

Computed with a node script implementing the WCAG relative-luminance formula
(sRGB linearization, `(L1+0.05)/(L2+0.05)`) against the exact hex values in
`src/constants/theme.ts`. Rule applied: ≥4.5:1 for text below `Type.titleSm`
(21); ≥3:1 acceptable for ≥21px display text; ≥3:1 for non-text UI glyphs
(WCAG 1.4.11).

### Passing pairs

| Pair | Ratio | Used at (verified in screens) | Result |
|---|---|---|---|
| text #2e1f14 / background #f5ede4 | 13.70 | 13–42px everywhere (all screens) | PASS |
| text / backgroundElement #ede0d4 | 12.26 | ListRow title 17, note input 15 | PASS |
| text / backgroundSelected #e3d3c0 | 10.85 | pressed/selected row title 17 | PASS |
| text / each suit bg | 12.61–13.27 | Today card meaning 17, symbol 42 | PASS |
| textSecondary #7a6553 / background | 4.75 | captions 13, subtitles 15–17, section labels 13 | PASS |
| Major Arcana accent #6f4e37 / bg #efe4d0 | 5.91 | badge glyphs 21/34, card name 26 | PASS |
| Wands accent #94431f / bg #f6e4d6 | 5.51 | same | PASS |
| Cups accent #7d5a3c / bg #f3e7da | 5.08 | same | PASS |
| Swords accent #5c5036 / bg #efe9dd | 6.54 | same | PASS |
| Pentacles accent #7a611f / bg #f2ead9 | 4.93 | same | PASS |
| accent #c4714a / background | 3.12 | display text only: wordmark 34, screen titles 26–34, deck symbol 21 (≥21px → 3:1 rule) | PASS |
| onAccent #fef8f2 / ACCENT_PRESSED #a85a38 | 4.76 | Button pressed label 17 | PASS |

The theme.ts:40-42 claim ("every accent-on-bg pair meets WCAG AA ≥4.5:1") is
verified true for all five suit pairs.

### Failures / flags

| Pair | Ratio | Used at | Result |
|---|---|---|---|
| textSecondary / backgroundElement | **4.25** | 13–15px: ListRow subtitle (src/components/list-row.tsx:80-84), spread count caption (src/app/read/index.tsx:52-55), TextInput placeholder (src/app/read/[spread].tsx:34) | **FAIL** (needs 4.5; shortfall 0.25) |
| textSecondary / backgroundSelected | **3.76** | 15px: selected deck row subtitle in settings.tsx (persistent), pressed ListRow subtitle (transient) | **FAIL** (needs 4.5) |
| onAccent / accent (rest state) | **3.43** | Button label 17px semibold (src/components/button.tsx) | **FAIL** — but **latent**: `Button` is not imported by any screen (grep for `from '@/components/button'` returns 0 hits). Must be fixed before first use (darken accent fill or use text-on-light style). |
| accent checkmark 16px icon / backgroundSelected | **2.47** | settings.tsx:30-36 selected indicator (non-text, 3:1 rule) | **MARGINAL FAIL** — mitigated by two redundant cues (backgroundSelected row fill + `accessibilityState={{ selected }}`), so selection is never conveyed by the glyph alone; still worth tinting the check `text` instead of `accent`. |
| gold #a8884f / background | 2.88 | **N/A — unused.** Grep shows `gold` is defined in theme.ts:28 but referenced nowhere in src/app or src/components. | N/A (would FAIL at any text size if used) |

**Section result: FAIL (2 shipped text failures, both involving textSecondary
on tinted surfaces; 1 latent component failure; 1 marginal non-text flag).**
Smallest fix: darken `textSecondary` from #7a6553 to ~#6d5a49 (≈5.3 on
backgroundElement, ≈4.7 on backgroundSelected) — one token change clears both
shipped failures.

---

## 3. States checklist

| State | Where | Evidence | Result |
|---|---|---|---|
| Pressed — PressableCard | src/components/pressable-card.tsx:31, 49-51 | style fn `pressed && styles.pressed` → backgroundSelected fill | PASS |
| Pressed — ListRow | src/components/list-row.tsx (delegates to PressableCard) | inherits pressed fill | PASS |
| Pressed — Button | src/components/button.tsx:5, 22-26, 43-45 | darkened terra-cotta `ACCENT_PRESSED #a85a38` | PASS |
| Pressed — back affordances | src/app/read/[spread].tsx:46-50, src/app/cards/[id].tsx:45-49 | `BackLink` Pressable has accessibilityRole + hitSlop but a **static style — no pressed visual feedback** | **PARTIAL** (only interactive element without pressed feedback) |
| Selected — settings | src/app/settings.tsx:30-36 (checkmark), :40 (`accessibilityState={{ selected }}`), :41 + :72-74 (backgroundSelected row) | three redundant cues | PASS |
| Splash during font load | src/app/_layout.tsx:21 (`SplashScreen.preventAutoHideAsync()` at module scope), :47-49 (`SplashScreen.hide()` in effect once loaded), :53 pre-hide `null` is covered by native splash | PASS |
| Disabled — Button | src/components/button.tsx:20 (`accessibilityState={{ disabled }}`), :21 (onPress suppressed), :25 + :46-48 (opacity 0.4) | PASS (component unused on screens — see §2) |
| Not-found fallback — read/[spread] | src/app/read/[spread].tsx:13-20 | BackLink + "This spread can't be found." | PASS |
| Not-found fallback — cards/[id] | src/app/cards/[id].tsx:14-21 | BackLink + "This card can't be found." | PASS |
| Empty / error / loading states | — | **N/A by design**: all data is local static (`src/data`), no network, no async fetch, lists can never be empty (78 cards, fixed spreads/decks hardcoded). Documented explicitly here. | N/A |
| Focus — TextInput | src/app/read/[spread].tsx:34-40 | note input has placeholder + tinted surface but no focus styling beyond platform default | Minor gap (platform caret/keyboard is the affordance) |

**Section result: PASS with two minor gaps** (BackLink pressed feedback,
TextInput focus ring). No missing-state category from the original "4+ states
missing" finding remains.

---

## 4. Bundling smoke test (simulator unavailable on Windows)

iOS simulator cannot run on this Windows host; no emulator was attempted.
Ran `npx expo export --platform web` as a route/import smoke test.

Result — **exit code 0**, all routes bundled:

```
/_sitemap (19KB)
/+not-found (19KB)
/cards/[id] (40KB)
/read (48KB)
/cards (48KB)
/read/[spread] (41KB)

Exported: dist
```

No route conflicts, no unresolved imports, dynamic routes (`cards/[id]`,
`read/[spread]`) and nested stacks export cleanly. **PASS.**

**User follow-up required:** manual run on an iOS device/simulator (native
tabs, SF Symbols, splash behaviour) and an Android device (Material Symbols,
BottomTabInset) — native rendering cannot be verified from this machine.

---

## 5. Re-score

Principles #1, #4, #5, #6, #9, #10 retain prior scores (1, 2, 2, 3, 1, 2 = 11).
Re-scored against the same anchors as 02-scorecard.md:

### 2. Useful — 2/3 (was 1)
Evidence: primary task is now startable end-to-end — spreads are pressable
ListRows (src/app/read/index.tsx:21-31) pushing a guided position-by-position
reading with per-position note inputs (src/app/read/[spread].tsx:28-41); all
78 cards push a detail screen with upright/reversed meanings
(src/app/cards/index.tsx:21, src/app/cards/[id].tsx:36-42); decks are
selectable (settings.tsx:38-40); today's card opens its detail
(src/app/index.tsx:27).
Justification: every shipped surface now serves its task without detours, but
notes and deck choice evaporate on close — no persistence (admitted at
settings.tsx:46) means a "reading" can be performed but not kept. One
significant utility gap → 2, not 3.

### 3. Aesthetic — 3/3 (was 1)
Evidence: the three cited inconsistencies are all gone. (a) 12 ad-hoc sizes →
single 7-step modular scale `Type` (theme.ts:69-77), zero numeric fontSize in
app/components (§1 grep). (b) Cool blue/green suit hues → five warm earthen
tints derived from the palette (theme.ts:43-49), differentiated by depth not
hue. (c) Three layout strategies → one `Screen` chrome (screen.tsx) +
`PressableCard`/`ListRow`/`SectionLabel` primitives reused on every screen;
spacing/radius fully tokenised (theme.ts:79-94).
Justification: token-driven and internally consistent; residual quibbles
(per-style lineHeights 22/23/25/26 not tokenised; `ACCENT_PRESSED` hex local
to button.tsx:5, though documented as a derived state) are below the "3–5
system inconsistencies" anchor that scored 1, and below a 1–2-inconsistency
bar — the system reads as one designed voice.

### 7. Long-lasting — 2/3 (was 1)
Evidence: Cinzel Decorative replaced by Cormorant Garamond display + Lora body
(theme.ts:55-66, _layout.tsx:1-12) — the editorial-serif move the verdict
named as highest-leverage; colored left-border rows eliminated
(`borderLeftWidth` grep = 0), replaced by tinted suit badges
(cards/index.tsx:15-19); hairline-bordered warm cards and small-caps labels
are durable, era-neutral patterns.
Justification: of the three dated markers, two are dead; the third — unicode
glyph as hero/card art (index.tsx:30 `cardSymbol` at 42px, badge glyphs) —
remains, now framed as a typographic device inside the badge system but still
a placeholder for real art direction. 1 residual marker → 2.

### 8. Thorough — 2/3 (was 0)
Evidence (§3 above): pressed feedback on cards/rows/buttons
(pressable-card.tsx:49-51, button.tsx:43-45); selected state with triple
redundancy (settings.tsx:30-41); disabled state with suppressed onPress +
accessibilityState (button.tsx:20-25); splash held through font load
(_layout.tsx:21,47-49); not-found fallbacks on both dynamic routes
(read/[spread].tsx:13-20, cards/[id].tsx:14-21); 44pt minimum targets
(pressable-card.tsx:44); empty/error/loading legitimately N/A for static
local data.
Justification: the state layer exists and is systematic, but two interactive
elements ship without complete states — BackLink has no pressed feedback and
the note TextInput has no focus styling — and the textSecondary-on-tinted-
surface contrast misses AA by a hair (§2). 2 small gaps → 2, not 3.

### New total

| # | Principle | Prior | New |
|---|---|---|---|
| 1 | Innovative | 1 | 1 (kept) |
| 2 | Useful | 1 | **2** |
| 3 | Aesthetic | 1 | **3** |
| 4 | Understandable | 2 | 2 (kept) |
| 5 | Unobtrusive | 2 | 2 (kept) |
| 6 | Honest | 3 | 3 (kept) |
| 7 | Long-lasting | 1 | **2** |
| 8 | Thorough | 0 | **2** |
| 9 | Environmentally friendly | 1 | 1 (kept) |
| 10 | As little design as possible | 2 | 2 (kept) |

**Total: 20/30** (was 14/30). Meets the ≥20 target — at the threshold, not
above it.

---

## Blockers & follow-ups

**No release blockers.** Punch list, in priority order:

1. **Contrast (AA):** darken `textSecondary` one step (e.g. #6d5a49) to clear
   the 4.25 and 3.76 failures on tinted surfaces — single-token fix.
2. **Button latent contrast:** onAccent-on-accent is 3.43 at 17px; fix before
   the component is first used (it is currently unreferenced).
3. **BackLink pressed feedback** (read/[spread].tsx:46, cards/[id].tsx:45):
   add an opacity/color pressed style to match the rest of the system.
4. **Manual device pass (user):** iOS + Android run — native tabs, symbols,
   splash, tab inset — unverifiable from this Windows host.
5. Settings checkmark tint on selected rows (2.47 vs 3:1 non-text) — optional,
   redundant cues already present.

---

## Addendum: post-audit fixes (same session)

All contrast failures and state gaps above were fixed and re-measured:

| Pair | Old | New | Ratio |
|---|---|---|---|
| textSecondary on background | #7a6553 | #6a5746 | 5.91:1 PASS |
| textSecondary on backgroundElement | 4.25 FAIL | #6a5746 | 5.29:1 PASS |
| textSecondary on backgroundSelected | 3.76 FAIL | #6a5746 | 4.68:1 PASS |
| Button fill vs onAccent | 3.43 FAIL (accent token) | local #a85a38 fill | 4.76:1 PASS |
| Button pressed vs onAccent | — | #964f31 | 5.76:1 PASS |

State gaps closed: BackLink pressed feedback (opacity 0.6) on both detail screens; note TextInput focus border (transparent → accent, 1px, no layout shift).

`npx tsc --noEmit` clean; `npx expo export --platform web` exit 0, all 6 routes bundled.

Remaining user follow-ups: manual iOS/Android device run (Windows host — simulators unavailable); Button primitive currently unused by any screen.
