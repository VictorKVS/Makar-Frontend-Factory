# BOOK-CRAFT — Hero Composition Development Path V1

Status: LESSONS CAPTURED  
Result baseline: BOOK-CRAFT v0.3.4  
Purpose: project-specific history for Makar training

## 1. Starting point

The project began with a functional React/Vite carcass:

- header/navigation;
- large editorial hero copy;
- central visual stage;
- right intelligence/HUD column;
- metrics;
- four product cards;
- downstream workflow section.

The first correct architectural decision was to keep the carcass functional before final art.

## 2. CARCASS LOCK

The project explicitly adopted:

```text
CARCASS
→ routes/interactions
→ desktop/tablet/mobile verification
→ CARCASS LOCK
→ assets
→ visual polish
```

This prevented the final visual work from continuously invalidating routing and layout.

## 3. Asset Registry / Inbox

An asset registry was introduced before final insertion. Generated images were allowed to arrive in `_inbox` without forcing manual naming.

The production lesson was that sorting by semantic role is more important than source filename.

Canonical roles emerged:

- background;
- character;
- laptop;
- books/cup props;
- cards;
- references;
- archive.

## 4. Full-composite experiment

Several generated hero compositions looked much closer to the desired design than the early runtime scene.

This demonstrated an important distinction:

- a full composite can be the best art-direction reference;
- it is not automatically the best runtime implementation.

When the user wanted to change ALINA to another persona, clothing, accessories and monthly variations, baked composition became too rigid.

## 5. Modularization

The hero was decomposed into:

```text
environment
ALINA
books/cup
laptop
live text/buttons/metrics
HUD
```

This was the turning point. It preserved the approved look while allowing future substitution.

## 6. Product cards

The initial cards behaved like UI panels with a small art strip. The approved reference used much more artwork.

They were changed to image-first banners:

- full-card image;
- live title/description;
- icon over image;
- arrow over image;
- dark veil for text contrast.

This materially improved perceived quality without sacrificing interactive semantics.

## 7. Laptop placement

The first laptop variant looked too large/high and floated in front of the character. A second angled asset was selected and the laptop was moved lower.

Lesson: foreground equipment is not decoration; it establishes the physical geometry of the scene.

## 8. Character scale iterations

The character remained too large compared with the approved reference.

The successful tuning was incremental:

- first reduction;
- additional ~13% reduction;
- final ~7–8% reduction.

At v0.3.4 the user accepted the proportion as ideal.

Lesson: when the source character asset is good, regenerate only if the asset itself is wrong. If the mismatch is composition, fix composition.

## 9. Runtime rotation

The asset set grew to:

- 6 ALINA variants;
- 3 books/cup variants;
- 2 laptop variants.

Instead of running unrelated timers, the final direction uses coordinated scene presets with a 10-second interval.

This supports future personas, wardrobe, season, month and campaign variants.

## 10. Final reusable architecture

```text
BOOK-CRAFT HERO
├── background
├── character slot
│   └── 6 variants
├── books/cup slot
│   └── 3 variants
├── laptop slot
│   └── 2 variants
├── live editorial UI
└── live intelligence HUD
```

The final hero is therefore not one picture. It is a configuration-driven composition system.

## 11. What Makar must remember

- freeze structure before art;
- compare against the reference as a whole;
- separate only what must vary;
- preserve live UI;
- use semantic asset folders;
- calibrate with screenshots;
- fix proportion before regenerating art;
- coordinate variants through scene presets;
- keep responsive as recomposition;
- verify build after structural visual changes.

## 12. Source evidence

BOOK-CRAFT production repository:

- `BOOKCRAFT-SITE`;
- hero rotation config;
- layered `HeroStage`;
- asset registry/manifest;
- accepted v0.3.4 screenshot baseline.

Representative BOOK-CRAFT commits from the implementation path include:

- `style: make all product cards full-image buttons with text overlays`;
- `feat: organize modular hero assets and add laptop foreground layer`;
- `style: switch to angled laptop and seat it on hero desk`;
- `style: match ALINA and laptop proportions to approved hero`;
- `feat: define coordinated 10 second hero rotation`;
- `style: reduce hero character to approved reference scale`.

This document is intentionally project-specific. Generic rules are promoted to `docs/knowledge/KB_1G_BOOKCRAFT_MODULAR_HERO_COMPOSITION.md`.
