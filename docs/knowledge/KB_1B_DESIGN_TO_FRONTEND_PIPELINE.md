# KB-1B — Makar Design-to-Frontend Development Pipeline

## Purpose

This document defines the full development path for premium visual frontend work in Makar Frontend Factory.

The pipeline is intentionally split into stages. Each stage has a clear owner, inputs, outputs, quality gates and evidence.

```text
Idea / Product Goal
        ↓
1. FIGMA — visual architecture and MASTER
        ↓
2. ASSET PIPELINE — images, icons, character, backgrounds
        ↓
3. FRONTEND STRUCTURE — React/component architecture
        ↓
4. STATIC IMPLEMENTATION — pixel-close layout
        ↓
5. MOTION — light, glow, parallax, character effects
        ↓
6. RESPONSIVE — desktop / tablet / phone
        ↓
7. REAL DATA & API — working product logic
        ↓
8. PERFORMANCE & ACCESSIBILITY
        ↓
9. VISUAL QA — compare against MASTER
        ↓
10. RELEASE / EVIDENCE / LESSONS
```

The current section fully specifies Stage 1.

---

# 1. FIGMA — what Figma does

Figma is the **visual architecture and specification layer**.

Figma does not replace frontend code.
Figma defines what the frontend must reproduce.

Its job is to convert a visual idea into a precise, reviewable, reusable interface contract.

## 1.1 Inputs to Figma

Figma receives:

- product goal;
- target audience;
- desired emotion;
- visual references;
- brand rules;
- hero / character concept;
- content hierarchy;
- required product modules;
- responsive requirements;
- known technical constraints.

For BOOK-CRAFT / ALina this includes:
- cinematic AI editorial direction;
- heroine / creative director role;
- warm + cool neon lighting;
- four product modules;
- seasonal character/environment change;
- desktop/tablet/phone requirements.

---

## 1.2 Figma outputs

Figma must produce:

1. **MASTER screen**
   - the canonical visual source of truth.

2. **Three canonical responsive compositions**
   - Desktop: 1440 px;
   - Tablet: 834 px;
   - Phone: 390 px.

3. **Design system**
   - colors;
   - typography;
   - spacing;
   - radii;
   - surfaces;
   - borders;
   - shadows;
   - glow;
   - motion tokens.

4. **Component set**
   - buttons;
   - cards;
   - nav;
   - chips;
   - badges;
   - inputs;
   - icon containers;
   - floating HUD widgets.

5. **Icon language**
   - normalized visual style for all icons.

6. **Character placement rules**
   - hero scale;
   - safe zone;
   - crop behavior;
   - responsive repositioning.

7. **Attention map**
   - primary;
   - secondary;
   - ambient;
   - decorative attention zones.

8. **Asset map**
   - which elements are image / SVG / CSS / React / Canvas / WebGL.

9. **Motion specification**
   - what animates;
   - duration;
   - frequency;
   - easing;
   - reduced-motion behavior.

10. **Prototype**
    - navigation and interaction flow.

11. **Developer handoff**
    - dimensions;
    - paddings;
    - component states;
    - tokens;
    - responsive rules;
    - references.

---

## 1.3 Figma must NOT do

Figma is not allowed to become a fake implementation.

Do not:
- draw functional buttons into one raster image;
- hide text inside screenshots;
- use one giant image as the entire interface;
- invent technical behavior that cannot be implemented;
- duplicate screens instead of creating reusable components;
- define only desktop and postpone mobile/tablet.

---

## 1.4 Figma responsibilities for MASTER

The MASTER must lock:

- composition;
- hierarchy;
- hero location;
- visual rhythm;
- headline size;
- CTA prominence;
- card geometry;
- HUD placement;
- color direction;
- light direction;
- icon style;
- depth;
- motion intensity.

The MASTER is accepted before broad screen multiplication.

---

## 1.5 Figma responsive rule

Every important screen must exist in three canonical versions from the beginning:

```text
Desktop 1440
Tablet   834
Phone    390
```

Figma must show actual recomposition, not proportional scaling.

### Desktop 1440
- full cinematic scene;
- full hero;
- full navigation;
- floating HUD;
- four service cards when practical.

### Tablet 834
- simplified navigation;
- hero moved independently;
- secondary HUD reduced;
- cards usually 2×2;
- decor reduced before functional UI.

### Phone 390
- single-column priority;
- headline + hero + CTA;
- compact nav;
- floating widgets become inline/drawer/hidden if decorative;
- mobile-specific crop;
- minimal motion.

---

## 1.6 Figma component states

Each interactive component should define:

- default;
- hover;
- active;
- focus;
- disabled;
- loading;
- error where relevant.

The frontend must not have to invent states not represented in the design contract.

---

## 1.7 Figma icon system

Figma owns icon visual normalization:

- common optical box;
- consistent stroke weight;
- consistent corner style;
- consistent inner padding;
- same glow grammar;
- same hover/active treatment.

The frontend may use an icon library as geometry source, but the final visual language must be normalized.

---

## 1.8 Figma and the character

The heroine is treated as a separate visual system.

Figma defines:
- canonical placement;
- safe area around face;
- eye-effect anchor points;
- visual crop;
- seasonal replaceability;
- relationship to UI;
- responsive repositioning.

The heroine must not be permanently baked into layout-critical UI.

---

## 1.9 Figma and motion

Figma describes motion intent, not only static appearance.

For each motion:
- trigger;
- duration;
- loop / one-shot;
- amplitude;
- priority;
- fallback.

Example for BOOK-CRAFT:
- CTA light trail: 4–6 s loop;
- eye shimmer: irregular 5–8 s pulse;
- hover glow: 150–220 ms;
- HUD drift: slow / low amplitude;
- parallax: subtle.

---

## 1.10 Figma quality gate

Stage 1 is complete only when:

- MASTER is accepted;
- Desktop/Tablet/Phone exist;
- component states exist;
- icon language is coherent;
- Asset Map exists;
- Motion Spec exists;
- hero placement rules exist;
- developer can implement without guessing core visual decisions.

---

# 2. Next stage — Asset Pipeline

After Figma approval the next stage is Asset Pipeline.

It will define:
- hero character files;
- backgrounds;
- seasonal variants;
- icon exports;
- image formats;
- naming;
- resolution tiers;
- compression;
- stable asset IDs;
- provenance.

This stage will be documented separately and linked back here.

---

# Core rule

**Figma is the visual source of truth. Frontend is the executable source of truth.**

Both must agree, but neither replaces the other.
