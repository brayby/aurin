# Verdict: REDESIGN

Total 14/30 (<20 threshold) plus a 0 on thoroughness: Aurín's honest voice and warm token foundation are worth keeping, but the visual language (decorative display font, dated list patterns, ad-hoc type scale) and the absence of any interaction or state design mean the design language should be rebuilt from purpose, not patched.

## Highest-leverage moves

1. **#7 Long-lasting / #5 Unobtrusive — Replace Cinzel Decorative with a refined editorial serif** (e.g. Cormorant Garamond or Playfair Display for display, keep Crimson Text or move to Lora for body). Evidence: index.tsx:39-40, theme.ts:53-57. Kills the "fantasy clip-art" trope; this is the single biggest move toward Wildling/La Plage elegance.
2. **#3 Aesthetic — Impose a modular type scale** (e.g. 13/15/17/21/26/34/42, 1.25 ratio) replacing the 12 ad-hoc sizes. Evidence: 01-evidence §Visual.
3. **#3 Aesthetic — Re-derive suit colors from the warm palette** so Cups/Swords stop importing cool blue/green (use tonal terracotta/ochre/umber/sand variations, differentiate by depth not hue). Evidence: theme.ts:43-44. Fix badge contrast (≥4.5:1) at the same time. Evidence: cards.tsx:78.
4. **#2 Useful — Make the primary task startable**: spreads pressable → guided reading flow; cards pressable → detail; decks selectable. Evidence: read.tsx:19, cards.tsx:10, settings.tsx:15.
5. **#8 Thorough — Design the state layer**: pressed feedback, focus, font-load splash, empty/error patterns as part of the new component set. Evidence: \_layout.tsx:40, 01-evidence §Visual states checklist.

Also: delete orphaned `explore.tsx` route and unused `glow` tokens during cutover.
