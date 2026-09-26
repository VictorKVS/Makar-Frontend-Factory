# KB-1A — Makar Visual Excellence / Cinematic Frontend Playbook

## Purpose

This playbook defines **how Makar turns a strong visual fantasy into a real, reusable, performant interface**.

Beauty is not a screenshot. It is a reproducible engineering result:

```text
idea / emotion
    ↓
visual target
    ↓
layer decomposition
    ↓
design system
    ↓
real UI components
    ↓
motion + depth
    ↓
responsive behavior
    ↓
performance + accessibility
    ↓
visual QA
    ↓
reusable pattern
```

The goal is not "make it pretty". The goal is to repeatedly produce interfaces that are:
- visually distinctive;
- coherent;
- interactive;
- responsive;
- maintainable;
- fast;
- accessible;
- easy to re-theme;
- close to the approved master reference.

---

## 1. Beauty starts with a visual contract

Before code, Makar must receive or create:

1. product purpose;
2. target emotion;
3. visual references;
4. one approved MASTER frame;
5. primary user action;
6. character / hero role, if present;
7. responsive targets;
8. performance budget;
9. motion policy;
10. acceptance criteria.

A vague instruction such as "make it beautiful" is insufficient.

### Required output before implementation

```text
MASTER
Asset Map
Component Tree
Token Map
Motion Spec
Responsive Rules
Performance Budget
Visual QA Baseline
```

---

## 2. Build one MASTER before multiplying screens

The first page or scene becomes the canonical visual source.

For the MASTER, lock:
- composition;
- hierarchy;
- typography;
- spacing;
- hero placement;
- lighting;
- accent colors;
- icon language;
- card geometry;
- CTA behavior;
- motion intensity.

Do not build five loosely related screens in parallel before the MASTER is accepted.

### Rule

**One excellent MASTER is more valuable than five inconsistent mockups.**

---

## 3. Decompose fantasy into layers

Never treat the entire concept art as one background image.

Split the scene into engineering layers.

### Recommended layer model

```text
L0  Base background / gradients
L1  Environmental image / scene
L2  Character / hero
L3  Real UI surfaces
L4  Floating widgets / HUD
L5  Decorative light / glow
L6  Particles / trails
L7  Interaction feedback
L8  Accessibility fallback
```

Every visible element must have an owner:
- AI image asset;
- SVG;
- CSS;
- HTML / React component;
- Canvas / WebGL;
- motion overlay.

### Anti-pattern

A single raster image containing text, buttons, character, metrics and controls.

---

## 4. Asset Map

Before coding, create an Asset Map.

Example:

| Element | Source | Runtime form | Mutable? | Animated? |
|---|---|---|---:|---:|
| hero character | image generation | WebP / AVIF | yes | overlay only |
| background | image generation / design | WebP / AVIF | yes | subtle parallax |
| logo | vector | SVG | rarely | optional |
| service icons | custom icon family | SVG | yes | hover / glow |
| CTA | UI component | HTML/CSS | yes | light trail |
| floating widgets | UI component | React | yes | drift |
| eye shimmer | effect layer | CSS/SVG | yes | periodic |
| particles | generated effect | CSS/Canvas | yes | continuous, bounded |

The Asset Map prevents visual elements from being baked into the wrong layer.

---

## 5. Character is independent from environment

When a hero character exists, character identity and scene theme must be separate.

```text
Character Core
├── canonical face
├── body proportions
├── eye identity
├── recurring visual markers
└── brand role

Season / Campaign Skin
├── hair length / style
├── outfit
├── accessories
├── environment
├── weather
├── lighting
└── campaign mood
```

This allows the same character to appear:
- in a winter studio;
- in a spring city;
- on a summer beach;
- in an autumn library;
without changing the product layout.

### Rule

**Never make the layout depend on one exact character render.**

---

## 6. Design tokens before decorative implementation

Visual quality must be encoded as reusable tokens.

At minimum define:
- background;
- surface;
- elevated surface;
- text primary / secondary / muted;
- warm accent;
- cool accent;
- violet accent;
- border;
- glow;
- focus;
- radius;
- spacing;
- typography;
- shadow;
- blur;
- motion duration;
- motion easing.

Shared UI must consume semantic tokens, not project-local raw colors.

---

## 7. Build a custom icon language

Do not mix unrelated icon families without normalization.

All product icons should share:
- optical size;
- stroke weight;
- corner character;
- inner padding;
- baseline;
- fill/stroke behavior;
- glow behavior;
- active / hover / disabled states.

For a premium cinematic UI, icons can use:
- clean SVG geometry;
- one primary stroke;
- small accent glow;
- restrained color;
- motion only on interaction.

### Rule

**Icons are part of brand language, not decoration.**

---

## 8. UI remains real UI

Text, buttons, menus, inputs, metrics and cards should be implemented as real interface elements.

Use concept art for:
- atmosphere;
- environment;
- character;
- decorative storytelling.

Use React / HTML for:
- navigation;
- CTA;
- forms;
- cards;
- labels;
- states;
- data;
- accessibility semantics.

### Acceptance check

If the image asset is removed, the product must remain structurally usable.

---

## 9. Motion has hierarchy

Motion should reinforce attention, not compete with it.

### Motion classes

1. **Primary motion** — tied to the main action.
2. **Ambient motion** — slow background life.
3. **Feedback motion** — hover, click, success, loading.
4. **Character motion** — gaze, shimmer, subtle presence.
5. **Decorative motion** — particles, light trails.

### Recommended intensity

- CTA light trail: occasional, 4–6 s loop;
- eye shimmer: irregular 5–8 s pulse;
- hover glow: ~150–220 ms;
- floating HUD drift: slow and small;
- parallax: low amplitude;
- particles: sparse and bounded.

### Rule

**Rare effects feel premium. Constant effects become noise.**

All motion requires a `prefers-reduced-motion` fallback.

---

## 10. Depth without chaos

Create depth through a few controlled cues:
- scale;
- blur;
- light;
- contrast;
- parallax;
- overlap;
- shadow;
- atmospheric perspective.

Do not use all effects at maximum strength.

A good cinematic hierarchy often reads:

```text
background
  ↓
environment
  ↓
hero
  ↓
UI
  ↓
active CTA / alert
```

The user task must remain more important than decoration.

---

## 11. Responsive composition is redesigned, not merely scaled

Every MASTER must be designed and validated in **three canonical product sizes from the start**:

1. **Desktop / Computer** — canonical width: 1440 px.
2. **Tablet** — canonical width: 834 px.
3. **Phone** — canonical width: 390 px.

These are design baselines, not the only supported widths. The implementation must remain fluid between them.

### Required rule

**A screen is not considered designed until all three canonical sizes exist.**

Do not finish desktop first and "adapt later". Each major composition decision must immediately answer:

- where does the hero move on tablet?
- what disappears or collapses?
- which HUD panels remain?
- how does typography scale?
- what becomes stacked on phone?
- which motion effects are reduced?
- what asset crop is used?
- what remains above the fold?

### Canonical behavior

#### Desktop — 1440 px
- full cinematic composition;
- hero character and environment visible together;
- full navigation;
- floating HUD/widgets allowed;
- four service cards visible in one row when practical;
- strongest motion tier within performance budget.

#### Tablet — 834 px
- preserve hero and primary CTA;
- reduce secondary HUD;
- navigation may collapse or simplify;
- service cards move to 2×2 or controlled horizontal layout;
- character can shift independently from text;
- decorative effects are reduced before functional UI is removed.

#### Phone — 390 px
- one-column reading order;
- hero, headline and CTA remain dominant;
- navigation becomes compact;
- floating panels become inline cards, drawer content, or are hidden if non-essential;
- service cards stack or use an accessible carousel;
- character/environment crop is mobile-specific;
- motion is minimal and never blocks interaction.

### Acceptance

For each important screen, Visual QA stores three screenshots:

```text
desktop-1440
tablet-834
phone-390
```

A visual change is incomplete if it is reviewed at only one size.


## 12. Performance is part of visual quality

A beautiful interface that stutters is not excellent.

Preferred implementation:
- WebP / AVIF for raster assets;
- responsive image sizes;
- lazy loading below the fold;
- GPU-friendly transforms;
- `opacity` + `transform` for frequent animation;
- bounded blur and shadow counts;
- controlled Canvas/WebGL usage;
- explicit renderer lifecycle;
- Core fallback when cinematic mode is unavailable.

Measure:
- load size;
- LCP;
- frame time;
- FPS under motion;
- memory;
- GPU usage where relevant.

---

## 13. Seasonal Theme Engine

Seasonal change must be data-driven.

Example:

```ts
theme = {
  id: "july",
  heroAsset: "asset:bookcraft:hero:july",
  environmentAsset: "asset:bookcraft:environment:ocean",
  outfit: "summer",
  hair: "long-waves",
  accentWarm: "...",
  accentCool: "...",
  decor: ["sun-glint", "ocean-haze"],
  motionProfile: "summer-soft"
}
```

The page structure stays stable while:
- character styling changes;
- environment changes;
- palette shifts;
- decorative details change.

Do not create twelve independent sites.

---

## 14. Visual QA loop

Every cinematic screen must have a visual QA loop.

```text
MASTER
  ↓
implementation
  ↓
screenshot
  ↓
compare
  ↓
classify mismatch
  ↓
targeted fix
  ↓
repeat
```

Compare:
- composition;
- typography;
- spacing;
- color;
- hero position;
- card geometry;
- glow intensity;
- depth;
- responsive behavior.

Do not "fix by feeling" when a reference exists.

---

## 15. Visual similarity evidence

For important screens, save:
- reference image;
- implementation screenshot;
- viewport;
- build commit;
- browser;
- performance snapshot;
- known deviations;
- accepted deviations.

A feature is not "pixel close" because someone remembers it looking similar.

---

## 16. Makar execution sequence

When asked to build a premium visual frontend:

```text
1. Understand goal and emotion
2. Lock one MASTER
3. Create attention map
4. Decompose layers
5. Build Asset Map
6. Define tokens
7. Define icon language
8. Define component tree
9. Implement static composition
10. Validate visual hierarchy
11. Add character layer
12. Add controlled motion
13. Add responsive grammar
14. Add performance fallbacks
15. Run visual QA
16. Capture evidence
17. Extract reusable lesson
18. Promote stable pattern into KB
```

---

## 17. Definition of done

A cinematic interface is done only when:

- the primary task is obvious;
- the MASTER is recognizably reproduced;
- all interactive controls are real UI;
- icons form one visual family;
- character and environment are separable;
- theme can change without rewriting layout;
- reduced-motion mode is usable;
- keyboard focus is visible;
- desktop and mobile both work;
- motion stays within performance budget;
- visual evidence is captured;
- reusable lessons are written back to Makar's KB.

---

## 18. Core principle

**Makar does not decorate pages. Makar engineers visual experience.**

The repeatable unit is:

```text
visual intent
+ composition
+ system
+ assets
+ motion
+ responsiveness
+ performance
+ evidence
= visual excellence
```
