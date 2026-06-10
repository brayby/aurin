# Scorecard — 14/30

1. **Innovative — 1/3**
   Evidence: standard tarot-app IA (daily card / spreads / card list / settings); the "listen, don't draw" positioning (index.tsx:31) is fresh but lives in copy, not interface.
   Justification: imitates peer products with minor variation; the one genuine idea isn't expressed in the design.

2. **Useful — 1/3**
   Evidence: 0 interactive elements on all 4 shipped screens (01-evidence §Structural); primary task "read a spread" cannot be started (read.tsx:19 plain Views).
   Justification: primary task requires detours that don't exist yet — screens display, don't serve; not 0 because reference/reflection reading is genuinely supported.

3. **Aesthetic — 1/3**
   Evidence: 12 ad-hoc type sizes, cool blue/green suit hues inside warm system, 3 layout strategies (01-evidence §Visual, §Structural).
   Justification: 3–5 system inconsistencies despite a real token file.

4. **Understandable — 2/3**
   Evidence: labels plain and clear; but spread cards styled as tappable cards aren't (read.tsx:44-50), and copy promises choice that isn't there (read.tsx:12).
   Justification: one affordance mismatch needing explanation; everything else self-evident.

5. **Unobtrusive — 2/3**
   Evidence: quiet chrome, no motion, content-first; Cinzel Decorative 900 Black 40px wordmark (index.tsx:39-40) is decoration competing mildly with content.
   Justification: chrome visible but quiet; one decorative flourish.

6. **Honest — 3/3**
   Evidence: index.tsx:31, settings.tsx:27; no dark patterns, no inflation.
   Justification: claims map 1:1 to behavior, including admitting what isn't built.

7. **Long-lasting — 1/3**
   Evidence: Cinzel Decorative reads as stock "mystical/fantasy" trope; colored left-border list rows (cards.tsx:66) are a dated 2010s pattern; unicode glyph as hero art (index.tsx:25).
   Justification: 2–3 dated markers.

8. **Thorough — 0/3**
   Evidence: empty/loading/error/success/focus/disabled/pressed all absent on shipped screens; font-load returns null with no splash (\_layout.tsx:40).
   Justification: 4+ states missing.

9. **Environmentally friendly — 1/3**
   Evidence: zero idle animation, zero network, tiny local data; but 6 font files block first render and dark mode is mirrored-light (theme.ts:29-32).
   Justification: dark-mode deferral is documented and deliberate, so not scored as the web "ignored" 0-anchor; render-blocking fonts and no reduced-motion consideration keep it at 1.

10. **As little design as possible — 2/3**
    Evidence: orphaned explore.tsx template route + reference .jsx in repo; decorative suit glow tokens defined but unused (theme.ts:41-45 `glow`).
    Justification: ≤2 removable elements on user-facing surface; core screens are lean.

**Total: 14/30**
