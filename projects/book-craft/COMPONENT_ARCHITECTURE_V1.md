# BOOK-CRAFT — Component Architecture v1

## Purpose

This document is the first practical application of Makar's visual curriculum to BOOK-CRAFT.

Goal: convert the approved cinematic MASTER into a real reusable React component system without destroying the visual composition.

The decomposition uses Atomic Design as a **working method**, not as dogma.

```text
MASTER
  ↓
Assets + Atoms
  ↓
Molecules
  ↓
Organisms
  ↓
Sections / Templates
  ↓
Responsive Page
  ↓
Seasonal Theme Overlay
```

---

# 1. Separate assets from UI components

Not every visible thing is a React component.

## Assets

Examples:
- heroine portrait / cutout;
- environment background;
- texture;
- decorative light streak image;
- generated service thumbnail;
- seasonal campaign image.

Store as stable assets with IDs and provenance.

## UI components

Examples:
- button;
- navigation item;
- metric;
- service card;
- HUD widget;
- search control.

They remain semantic, interactive and testable.

## Effects

Examples:
- eye shimmer;
- CTA light sweep;
- glow;
- ambient particles;
- parallax.

These belong to the effect/motion layer, not to business content.

---

# 2. Atoms

Atoms are the smallest reusable visual/interactive units.

## Core atoms

- `LogoMark`
- `BrandWordmark`
- `Icon`
- `IconShell`
- `Text`
- `Heading`
- `Link`
- `ButtonBase`
- `Badge`
- `Chip`
- `Divider`
- `MetricValue`
- `MetricLabel`
- `GlowDot`
- `StatusDot`
- `Surface`
- `FocusRing`

## Rules

Atoms:
- use semantic design tokens;
- contain no BOOK-CRAFT-specific hard-coded palette if shared;
- support keyboard focus when interactive;
- define reduced-motion behavior when motion exists;
- have clear variants instead of copied CSS.

---

# 3. Molecules

Molecules combine atoms into small reusable controls or content units.

## Header molecules

- `BrandLockup`
  - LogoMark
  - BrandWordmark

- `NavItem`
  - Link
  - optional active indicator

- `SearchAction`
  - IconShell
  - ButtonBase

- `AuthActions`
  - secondary button
  - primary button

## Hero molecules

- `HeroEyebrow`
- `HeroTitle`
- `HeroDescription`
- `HeroActions`
- `HeroMetric`
- `HeroMetricRow`

## Service molecules

- `ServiceIcon`
- `ServiceMeta`
- `ServiceAction`
- `ServicePreview`

## HUD molecules

- `HudHeader`
- `HudMetric`
- `HudMiniChart`
- `HudStatus`

---

# 4. Organisms

Organisms are meaningful product sections made from molecules and atoms.

## `SiteHeader`

Responsibilities:
- brand;
- primary navigation;
- search;
- auth / start action;
- responsive collapse.

Variants:
- desktop;
- tablet;
- phone.

## `HeroCopyBlock`

Responsibilities:
- headline hierarchy;
- supporting copy;
- CTA;
- key metrics.

Must remain independent from hero image implementation.

## `HeroCharacter`

Responsibilities:
- render character asset;
- apply crop/position rules;
- expose anchors for eye shimmer / rim light;
- switch seasonal asset;
- preserve stable layout contract.

Must not own business UI.

## `HeroHudCluster`

Responsibilities:
- floating professional widgets;
- responsive visibility;
- low-priority motion;
- real/demo data labeling.

## `ServiceCard`

Responsibilities:
- one service entry;
- icon;
- title;
- short description;
- preview visual;
- action.

Variants:
- book;
- script;
- podcast;
- video-avatar;
- image generation.

The visual shell should be shared; content differs by data.

## `ServiceGrid`

Responsibilities:
- desktop row;
- tablet 2×2 or 2-column arrangement;
- phone stack or accessible carousel.

## `AmbientScene`

Responsibilities:
- background;
- environment;
- light fields;
- decorative particles;
- parallax tier.

Must degrade safely to a static Core mode.

---

# 5. Page sections

BOOK-CRAFT Landing v1:

```text
BookCraftLanding
├── SiteHeader
├── HeroSection
│   ├── AmbientScene
│   ├── HeroCopyBlock
│   ├── HeroCharacter
│   └── HeroHudCluster
├── ServiceSection
│   └── ServiceGrid
│       ├── ServiceCard
│       ├── ServiceCard
│       ├── ServiceCard
│       └── ServiceCard
└── PageEffectsLayer
```

The exact number of service cards is data-driven.

---

# 6. Template layer

The template defines placement, not content.

## Desktop template — 1440

```text
┌──────────────────────────────────────────────┐
│ Header                                       │
├──────────────────────────────────────────────┤
│ Copy              Hero Character      HUD    │
│ CTA               Environment                │
│ Metrics                                      │
├──────────────────────────────────────────────┤
│ Card 1 | Card 2 | Card 3 | Card 4           │
└──────────────────────────────────────────────┘
```

## Tablet template — 834

```text
┌─────────────────────────────┐
│ Header / compact nav        │
├─────────────────────────────┤
│ Copy      Character         │
│ CTA       reduced HUD       │
├─────────────────────────────┤
│ Card 1      Card 2          │
│ Card 3      Card 4          │
└─────────────────────────────┘
```

## Phone template — 390

```text
┌─────────────────────┐
│ Compact Header      │
├─────────────────────┤
│ Headline            │
│ Character crop      │
│ CTA                 │
│ Key metric(s)       │
├─────────────────────┤
│ Service cards       │
│ stacked / swipe     │
└─────────────────────┘
```

---

# 7. Responsive rules

The three canonical baselines are:

- Desktop: 1440 px
- Tablet: 834 px
- Phone: 390 px

Rules:
- do not proportionally scale the entire desktop canvas;
- move the heroine independently from copy;
- remove decorative HUD before removing functional UI;
- preserve CTA prominence;
- allow separate hero crops per breakpoint;
- reduce motion intensity on smaller devices;
- preserve tap target size and focus semantics.

---

# 8. Character architecture

Character is not a page background.

```text
HeroCharacter
├── CharacterAsset
├── CharacterCrop
├── RimLight
├── EyeShimmerAnchorLeft
├── EyeShimmerAnchorRight
└── SeasonalVariant
```

Character identity stays stable while theme data changes:

```text
face canon
+ hair
+ outfit
+ accessories
+ environment
+ lighting
= monthly presentation
```

---

# 9. Seasonal theme data

Example:

```ts
type BookCraftTheme = {
  id: string
  heroAssetId: string
  environmentAssetId: string
  heroCrop: {
    desktop: Crop
    tablet: Crop
    phone: Crop
  }
  palette: {
    warm: string
    cool: string
    violet: string
  }
  decor: string[]
  motionProfile: "core" | "premium" | "signature"
}
```

One page structure must support all 12 monthly themes.

---

# 10. Motion ownership

## `PageEffectsLayer`

Owns:
- ambient particles;
- broad light trails;
- global glow.

## `HeroCharacter`

Owns:
- character-specific rim light;
- eye shimmer anchors.

## `Button`

Owns:
- hover/press;
- local light sweep.

## `ServiceCard`

Owns:
- card hover;
- focus;
- local border glow.

Do not create one global animation script that manipulates unrelated DOM nodes.

---

# 11. Data-driven service cards

Service cards should be generated from data:

```ts
const services = [
  {
    id: "books",
    title: "Книги",
    icon: "book",
    route: "/books"
  },
  {
    id: "scripts",
    title: "Сценарии",
    icon: "script",
    route: "/scripts"
  },
  {
    id: "video-avatar",
    title: "Видео-аватар",
    icon: "avatar",
    route: "/video-avatar"
  },
  {
    id: "images",
    title: "Изображения",
    icon: "image",
    route: "/images"
  }
]
```

The exact product set may evolve; the grid architecture should not need to be rewritten.

---

# 12. Component acceptance contract

Every shared component must answer:

- What job does it do?
- What data does it accept?
- What variants exist?
- What states exist?
- What does it do at 1440 / 834 / 390?
- What is keyboard behavior?
- What is reduced-motion behavior?
- What visual token roles does it consume?
- What evidence proves it works?

---

# 13. First implementation order

Do not build effects first.

```text
1. Tokens
2. Atoms
3. Molecules
4. SiteHeader
5. HeroCopyBlock
6. ServiceCard / ServiceGrid
7. Static responsive layout
8. HeroCharacter
9. HeroHudCluster
10. AmbientScene
11. Motion
12. Visual QA
```

This order makes the page usable before cinematic layers are added.

---

# 14. What becomes reusable factory IP

Promote from BOOK-CRAFT into shared Makar packages only after stability is proven:

Candidates:
- `CinematicHeroShell`
- `ResponsiveHeroCharacter`
- `GlowCard`
- `LightTrailButton`
- `FloatingHudCluster`
- `SeasonThemeProvider`
- `VisualEvidenceHarness`

Do not prematurely generalize one-off project code.

---

# 15. Definition of done for architecture v1

This architecture is ready for implementation when:

- every major MASTER element maps to asset/component/effect ownership;
- 1440/834/390 compositions are defined;
- character is separate from environment;
- service cards are data-driven;
- motion ownership is local and traceable;
- shared vs project-specific boundaries are clear;
- implementation order is agreed;
- no critical visual decision is left as "developer will figure it out".

---

## Core principle

**The MASTER is art direction. The component tree is how Makar makes that art reproducible.**
