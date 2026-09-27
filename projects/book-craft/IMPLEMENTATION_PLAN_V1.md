# BOOK-CRAFT — Implementation Plan v1

## Goal

Reproduce the approved cinematic BOOK-CRAFT landing as closely as practical while preserving real UI, responsiveness, performance and reusability.

The approved visual direction is treated as the reference target, not as a raster page to embed.

Implementation proceeds through a controlled loop:

```text
Reference
  ↓
Figma MASTER
  ↓
Layer / Asset / Component mapping
  ↓
Static implementation
  ↓
Screenshot capture
  ↓
Visual analysis
  ↓
Targeted correction
  ↓
Motion
  ↓
Responsive validation
  ↓
Performance / accessibility
  ↓
Release evidence
```

---

# Phase 0 — Freeze the reference

Deliverables:
- approved hero reference;
- accepted composition notes;
- list of intentional deviations;
- one canonical desktop MASTER.

Do not redesign during implementation without recording a new approved reference.

---

# Phase 1 — Figma production MASTER

Build the first production theme before monthly expansion.

Required frames:
- Desktop 1440;
- Tablet 834;
- Phone 390.

Lock:
- header geometry;
- headline block;
- heroine placement;
- CTA position;
- metric strip;
- four service cards;
- HUD zone;
- image safe zones;
- glow direction;
- icon language;
- crop rules.

Exit gate:
frontend developer can implement without guessing core composition.

---

# Phase 2 — Production assets

P0 assets:
- canonical heroine cutout;
- desktop/tablet/phone heroine derivatives;
- base environment;
- logo SVG;
- icon family v1;
- four service preview images;
- eye shimmer anchors;
- optional decorative light overlays.

Rules:
- character, environment and UI remain separate;
- stable asset IDs;
- provenance required;
- runtime-optimized AVIF/WebP/SVG derivatives.

---

# Phase 3 — Static React implementation

Implementation order:

1. design tokens;
2. page shell;
3. SiteHeader;
4. HeroCopyBlock;
5. primary/secondary CTA;
6. HeroMetrics;
7. ServiceCard;
8. ServiceGrid;
9. HeroCharacter;
10. HeroHudCluster;
11. AmbientScene;
12. decorative effects last.

Acceptance:
- content is real HTML/React;
- no important text/button baked into hero image;
- page works without motion;
- desktop composition already resembles the MASTER.

---

# Phase 4 — Pixel-close visual correction

For each iteration:

1. capture implementation screenshot at exact viewport;
2. compare with Figma/reference;
3. classify mismatch;
4. change one class of mismatch;
5. capture again.

Mismatch classes:

- composition;
- scale;
- position;
- typography;
- spacing;
- color;
- lighting;
- crop;
- card geometry;
- icon style;
- depth;
- glow;
- content mismatch.

Do not patch five unrelated classes at once.

Priority order:

```text
1. composition
2. hero scale/position
3. typography
4. cards/HUD geometry
5. color/light
6. glow/effects
7. micro-detail
```

---

# Phase 5 — Motion

Only after static fidelity is accepted.

Add:
- CTA light runner;
- eye shimmer;
- card hover/focus glow;
- HUD drift;
- restrained parallax;
- sparse particles.

All motion:
- has one owner;
- has reduced-motion fallback;
- does not override primary content;
- stays inside performance budget.

---

# Phase 6 — Responsive realization

Validate at:
- 1440 desktop;
- 834 tablet;
- 390 phone.

Desktop:
full cinematic composition.

Tablet:
recompose, reduce secondary HUD, 2×2 service grid.

Phone:
single-column attention flow, mobile hero crop, minimal decorative HUD/motion.

Never implement mobile as a scaled desktop screenshot.

---

# Phase 7 — Real product integration

Connect the visual shell to real modules:

- Books;
- Clip Scripts;
- Video Avatar;
- Image Generation;
- later Mailing/Podcast if required by product scope.

Every widget must clearly distinguish:
- real data;
- demo/mock;
- loading;
- error;
- unavailable.

---

# Phase 8 — Visual QA + ALINA Analyst loop

ALINA Analyst receives:
- approved reference;
- implementation screenshot;
- viewport;
- current commit;
- Figma frame ref;
- known accepted deviations.

ALINA returns:
- mismatch list;
- severity;
- visual category;
- likely cause;
- recommended correction;
- confidence;
- before/after evidence refs.

Makar applies corrections.
ALINA rechecks.

This creates a closed visual-production loop:

```text
Figma → Makar → Screenshot → ALINA Analyst → Correction → Visual QA
```

---

# Phase 9 — Performance and accessibility

Check:
- LCP / image load;
- frame-time during motion;
- responsive image size;
- keyboard focus;
- contrast;
- reduced motion;
- Core fallback;
- no layout shift caused by late hero loading.

Cinematic quality is rejected if it causes unusable interaction or unstable rendering.

---

# Phase 10 — Release evidence

For every release store:
- reference/Figma frame;
- screenshots 1440/834/390;
- commit;
- asset registry version;
- theme version;
- visual analyst report;
- known deviations;
- performance summary;
- real/demo integration list.

---

# First execution slice

Do not start with all themes.

First working slice:

```text
Desktop 1440
→ static shell
→ heroine
→ service cards
→ HUD
→ screenshot
→ ALINA visual analysis
→ corrections
→ tablet 834
→ phone 390
→ motion
```

Only after the first theme is stable do we scale to January/April/July/October and then all 12 months.

---

# Definition of done

The first BOOK-CRAFT landing implementation is ready when:

- composition is recognizably close to approved MASTER;
- real UI is independent from art;
- heroine/environment are replaceable;
- 1440/834/390 work;
- icon family is coherent;
- motion is restrained and performant;
- visual QA has a recorded report;
- ALINA Analyst can explain mismatches;
- reusable findings are promoted into Makar KB and ALINA knowledge rules.

---

## Core principle

**Do not chase beauty by random tweaking. Reproduce the approved visual target through measured, classified iteration.**
