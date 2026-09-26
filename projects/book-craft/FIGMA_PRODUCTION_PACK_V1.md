# BOOK-CRAFT — Figma Production Pack v1

## Purpose

This pack defines exactly what Figma must deliver before Makar begins production implementation of the BOOK-CRAFT cinematic landing.

We validate the design system on four extreme monthly themes first:

- January — Winter Executive Studio
- April — Story Garden Studio
- July — Ocean Creative Retreat
- October — Noir Writer's Room

Each theme must exist at three canonical sizes:

- Desktop — 1440 px
- Tablet — 834 px
- Phone — 390 px

Total initial production frames:

```text
4 themes × 3 breakpoints = 12 canonical frames
```

The goal is to prove that one component architecture can survive strong visual change without structural rewrites.

---

# 1. Figma file structure

Recommended pages:

```text
01_Foundations
02_Components
03_BOOKCRAFT_Master
04_Themes
05_Prototype
06_Handoff
```

If page limits apply, merge logically:

```text
01_Foundations_Components
02_BOOKCRAFT_Production
03_Prototype_Handoff
```

---

# 2. MASTER frames

## January

- `BC/JAN/DESKTOP/1440`
- `BC/JAN/TABLET/834`
- `BC/JAN/PHONE/390`

## April

- `BC/APR/DESKTOP/1440`
- `BC/APR/TABLET/834`
- `BC/APR/PHONE/390`

## July

- `BC/JUL/DESKTOP/1440`
- `BC/JUL/TABLET/834`
- `BC/JUL/PHONE/390`

## October

- `BC/OCT/DESKTOP/1440`
- `BC/OCT/TABLET/834`
- `BC/OCT/PHONE/390`

Every frame must be named deterministically so automation and QA can reference it.

---

# 3. Frame content contract

Each canonical frame must contain real visual placement for:

- SiteHeader;
- BrandLockup;
- main navigation;
- HeroCopyBlock;
- primary CTA;
- secondary CTA when applicable;
- HeroCharacter;
- environment;
- hero metrics;
- HeroHudCluster;
- four ServiceCard instances;
- ambient light fields;
- character rim light;
- eye-shimmer anchors;
- motion annotation markers;
- safe areas;
- crop boundaries.

No frame may rely on a note such as "mobile later" or "same as desktop".

---

# 4. Design tokens page

Figma must expose the BOOK-CRAFT token system.

## Color roles

- `bg/base`
- `bg/elevated`
- `surface/glass`
- `surface/solid`
- `text/primary`
- `text/secondary`
- `text/muted`
- `accent/warm`
- `accent/cool`
- `accent/violet`
- `border/default`
- `border/glow`
- `focus/ring`

## Typography roles

- `display/hero`
- `display/section`
- `title/card`
- `body/primary`
- `body/secondary`
- `label/ui`
- `metric/value`
- `metric/label`

## Spatial roles

- spacing scale;
- container paddings;
- card gaps;
- hero safe zone;
- service-grid gap;
- radius scale;
- shadow/elevation scale.

## Motion roles

- `motion/fast`
- `motion/normal`
- `motion/slow`
- `motion/ambient`
- `motion/ease/standard`
- `motion/ease/emphasized`

---

# 5. Component set required in Figma

## Atoms

- LogoMark
- BrandWordmark
- Icon
- IconShell
- Heading
- Text
- Badge
- Chip
- Divider
- GlowDot
- StatusDot

## Buttons

- PrimaryButton
- SecondaryButton
- GhostButton
- IconButton

States:
- default
- hover
- active
- focus
- disabled
- loading

## Navigation

- NavItem
- MobileMenuButton
- SearchAction

## Hero

- HeroMetric
- HeroMetricRow
- HeroHudWidget
- HeroCharacterFrame
- HeroCopyBlock shell

## Services

- ServiceCard
- ServiceIcon
- ServicePreview
- ServiceAction

Each component must use variants rather than duplicated disconnected frames where possible.

---

# 6. Icon family v1

Figma must contain normalized SVG-ready icons for:

- book
- script
- podcast
- video-avatar
- image
- search
- play
- arrow
- sparkle
- profile
- menu
- close
- status-api

Rules:

- consistent optical box;
- consistent stroke weight;
- same inner padding;
- same corner language;
- same active/hover treatment;
- no random emoji;
- no mixed icon-pack personality.

---

# 7. Character production spec

Figma must define character placement independently from the environment.

For each of the four validation themes:

- canonical face reference;
- hero bounding box;
- face safe zone;
- left-eye anchor;
- right-eye anchor;
- rim-light contour zone;
- desktop crop;
- tablet crop;
- phone crop;
- no-text overlap zone;
- no-HUD overlap zone.

The character image itself may be generated externally, but Figma owns final placement and crop approval.

---

# 8. Environment production spec

For every validation theme Figma defines:

- environment horizon / dominant geometry;
- copy safe zone;
- character safe zone;
- light direction;
- main warm source;
- main cool source;
- decorative background zone;
- parallax-capable layers where applicable.

Environment must not carry functional UI text.

---

# 9. Motion annotations

Figma must annotate motion intent on the frame or handoff page.

Required motions:

| Motion | Owner | Trigger | Duration/Frequency |
|---|---|---|---|
| CTA light runner | PrimaryButton | ambient + hover | 4–6 s loop |
| Eye shimmer | HeroCharacter | ambient | irregular 5–8 s |
| Service card glow | ServiceCard | hover/focus | 150–220 ms |
| HUD drift | HeroHudCluster | ambient | slow |
| Background parallax | AmbientScene | pointer/scroll | low amplitude |
| Particle field | PageEffectsLayer | ambient | sparse/bounded |

Every motion note must define reduced-motion fallback.

---

# 10. Responsive recomposition rules

## Desktop 1440

- full hero scene;
- full navigation;
- floating HUD;
- strongest cinematic depth;
- four service cards in one row when practical.

## Tablet 834

- compact navigation;
- hero moves independently;
- secondary HUD reduced;
- service cards become 2×2;
- background detail reduced before UI is removed.

## Phone 390

- one-column attention order;
- compact header;
- headline + hero + CTA dominate;
- HUD becomes inline, drawer, or disappears if decorative;
- service cards stack or use accessible swipe;
- mobile-specific hero crop;
- decorative motion reduced.

---

# 11. Handoff annotations

Every canonical frame must expose:

- frame size;
- max content width;
- outer padding;
- hero grid;
- header height;
- text width;
- card width/height;
- card gaps;
- hero character coordinates;
- HUD anchors;
- breakpoint behavior;
- component variants;
- token references;
- asset IDs.

No core spacing or placement should require developer guesswork.

---

# 12. Asset references

Figma should reference stable production IDs from:

- `projects/book-craft/asset-registry.v1.json`
- `projects/book-craft/themes.v1.json`

Examples:

```text
asset:bookcraft:hero:2026-01
asset:bookcraft:environment:2026-01
asset:bookcraft:hero:2026-07
asset:bookcraft:environment:2026-07
```

This makes design, asset pipeline and frontend speak the same language.

---

# 13. Theme validation matrix

| Theme | Desktop | Tablet | Phone | Character QA | Asset QA | Motion QA |
|---|---:|---:|---:|---:|---:|---:|
| January | required | required | required | required | required | required |
| April | required | required | required | required | required | required |
| July | required | required | required | required | required | required |
| October | required | required | required | required | required | required |

A theme is not accepted from only one desktop screenshot.

---

# 14. Visual QA export pack

For each canonical frame Figma must support export/reference capture:

```text
reference/jan-desktop-1440.png
reference/jan-tablet-834.png
reference/jan-phone-390.png
...
reference/oct-phone-390.png
```

These become the baseline for implementation screenshot comparison.

---

# 15. Figma Definition of Done

Figma Production Pack v1 is complete when:

- 12 canonical frames exist;
- all four themes use the same component language;
- tokens are defined;
- icon family is coherent;
- component states exist;
- character anchors exist;
- environment safe zones exist;
- motion annotations exist;
- desktop/tablet/phone are real recompositions;
- stable asset IDs are referenced;
- Visual QA reference exports are ready;
- frontend can start without inventing major visual decisions.

---

## Core principle

**Figma must remove ambiguity before Makar writes production UI code.**
