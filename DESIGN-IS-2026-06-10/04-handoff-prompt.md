# /make-plan handoff

````
/make-plan Redesign the Aurín tarot reflection app's design language (all 4 screens: Today, Read, Cards, Settings). Current design failed a Dieter Rams audit at 14/30 with critical gaps in principles #8 (thorough — 0), #2 (useful — 1), #3 (aesthetic — 1), #7 (long-lasting — 1).

Verdict (quoted):
> Aurín's honest voice and warm token foundation are worth keeping, but the visual language (decorative display font, dated list patterns, ad-hoc type scale) and the absence of any interaction or state design mean the design language should be rebuilt from purpose, not patched.

Why redesign and not refine: total score 14/30 is below the 20 threshold and thoroughness scored 0 (no empty/loading/error/focus/pressed states exist anywhere).

Design direction: modern, minimalist, elegant — inspired by La Plage by Studio Born (terracotta-dominant warmth, restrained gold-tone accents, bold-but-refined editorial type, generous whitespace) and natural-minimal skincare branding (Wildling). Quiet luxury, not mysticism clip-art.

Preserve from current design:
- Warm cream/terracotta core palette and token architecture (src/constants/theme.ts:10-27)
- Honest copy voice ("Aurín is here to listen, not to draw for you" — src/app/index.tsx:31; Phase-2 footnote — src/app/settings.tsx:27)
- 4-tab IA: Today / Read / Cards / Settings (src/components/app-tabs.tsx)
- Spacing + radius token approach (theme.ts:64-79)

Discard:
- Cinzel Decorative display font in all weights. Evidence: src/app/_layout.tsx:31-38, theme.ts:53-57. Caused failure on #7 long-lasting.
- 12 ad-hoc font sizes. Evidence: across all screen StyleSheets. Caused failure on #3 aesthetic.
- Cool blue/green suit colors inside the warm system. Evidence: theme.ts:43-44. Caused failure on #3.
- Colored-left-border list rows. Evidence: src/app/cards.tsx:66. Caused failure on #7.
- Orphaned Expo template route src/app/explore.tsx and unused `glow` tokens (theme.ts:41-45).
- Mixed layout strategies (Screen wrapper vs hand-rolled SafeAreaView). Evidence: src/app/cards.tsx:26 vs src/components/screen.tsx.

Top moves (verbatim from audit):
1. #7/#5: Replace Cinzel Decorative with refined editorial serif (Cormorant Garamond or Playfair Display display; Crimson Text or Lora body). Evidence: index.tsx:39-40.
2. #3: Impose modular type scale (13/15/17/21/26/34/42, ~1.25 ratio). 
3. #3: Re-derive suit colors as tonal warm variations (terracotta/ochre/umber/sand, differentiated by depth not hue); fix badge text contrast to ≥4.5:1. Evidence: theme.ts:43-44, cards.tsx:78.
4. #2: Make primary tasks startable — pressable spreads → guided reading flow, pressable cards → detail screen, selectable decks. Evidence: read.tsx:19, cards.tsx:10, settings.tsx:15.
5. #8: Design the state layer — pressed/focus feedback, font-load splash (replace `return null` in _layout.tsx:40), empty/error patterns.

Redesign principles in priority order:
1. #2 Useful — every screen's primary object responds to touch and leads somewhere.
2. #3 Aesthetic — one type scale, one warm hue family, one layout primitive (Screen).
3. #10 As little design as possible — whitespace and typography carry the elegance; no borders/badges/glows unless they earn their place.

Deliverables for the plan:
- New token file spec (type scale, consolidated palette, suit tints)
- Per-screen low-fi layout description compared to current
- States checklist (empty, loading, error, success, focus/pressed, disabled)
- Component primitives list (Screen, Card, ListRow, SectionLabel, Button)
- Cutover: old styles removed in same PR; explore.tsx deleted

Anti-patterns to guard against:
- Porting old structure under new styling
- Redesigning to a trend (no glassmorphism/gradients) rather than the principles above
- Adding decoration to signal "mystical" — the content is the mysticism
````
