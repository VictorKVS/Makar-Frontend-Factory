# BOOK-CRAFT — Asset Map v1

## Purpose

Asset Map v1 translates the approved BOOK-CRAFT cinematic MASTER into a concrete production inventory.

Every visible element must be owned by exactly one implementation layer:

- asset;
- React/UI;
- SVG/icon;
- CSS effect;
- Canvas/WebGL effect;
- data/API.

This prevents accidental "baking" of the entire page into one image.

---

# 1. Canonical breakpoints

- Desktop: 1440 px
- Tablet: 834 px
- Phone: 390 px

Every hero/environment asset must support a breakpoint-specific crop strategy.

---

# 2. Layer stack

```text
L0  base background / gradients
L1  environment image
L2  hero character
L3  real UI
L4  floating HUD
L5  local glow / rim light
L6  particles / trails
L7  interaction feedback
L8  accessibility / reduced-motion fallback
```

---

# 3. Production Asset Map

| ID | Visible element | Owner | Runtime form | Seasonal | Animated | Desktop | Tablet | Phone |
|---|---|---|---|---:|---:|---|---|---|
| asset:bookcraft:bg:base | dark cinematic base | CSS | gradients | yes | no | full | full | full |
| asset:bookcraft:environment:hero | studio / seasonal environment | Asset pipeline | AVIF/WebP | yes | subtle parallax | wide crop | medium crop | mobile crop |
| asset:bookcraft:hero:character | canonical heroine | Character pipeline | transparent WebP/AVIF | yes | overlay only | full/bust | shifted bust | portrait crop |
| effect:bookcraft:hero:rim-light | contour light | CSS/SVG | effect layer | yes | slow pulse | on | on | simplified |
| effect:bookcraft:hero:eye-left | left eye shimmer | CSS/SVG | anchored effect | no | irregular | on | on | optional/light |
| effect:bookcraft:hero:eye-right | right eye shimmer | CSS/SVG | anchored effect | no | irregular | on | on | optional/light |
| ui:bookcraft:logo | logo | UI/SVG | SVG | no | optional | full | full | compact |
| ui:bookcraft:nav | main navigation | React | semantic nav | no | interaction | full | compact | menu |
| ui:bookcraft:search | search action | React/SVG | button | no | hover | on | optional | compact |
| ui:bookcraft:cta-primary | primary CTA | React/CSS | button | no | light trail | on | on | on |
| ui:bookcraft:cta-secondary | secondary CTA | React/CSS | button | no | hover | on | on | optional |
| ui:bookcraft:metrics | hero metrics | React | text/data | no | subtle | full | reduced | 1–2 key metrics |
| ui:bookcraft:hud:voice | voice/API widget | React | HUD card | no | drift | on | reduced | inline/hidden |
| ui:bookcraft:hud:avatar | avatar/API widget | React | HUD card | no | drift | on | reduced | inline/hidden |
| ui:bookcraft:hud:image | image engine widget | React | HUD card | no | drift | on | reduced | inline/hidden |
| ui:bookcraft:service-grid | service container | React | layout | no | no | 4-column | 2×2 | stack/swipe |
| ui:bookcraft:service:books | Books card | React/SVG | card | no | hover | on | on | on |
| ui:bookcraft:service:scripts | Scripts card | React/SVG | card | no | hover | on | on | on |
| ui:bookcraft:service:video-avatar | Video Avatar card | React/SVG | card | no | hover | on | on | on |
| ui:bookcraft:service:images | Images card | React/SVG | card | no | hover | on | on | on |
| icon:bookcraft:book | book icon | Icon system | SVG | no | local glow | 32 | 28 | 24 |
| icon:bookcraft:script | script icon | Icon system | SVG | no | local glow | 32 | 28 | 24 |
| icon:bookcraft:avatar | avatar icon | Icon system | SVG | no | local glow | 32 | 28 | 24 |
| icon:bookcraft:image | image icon | Icon system | SVG | no | local glow | 32 | 28 | 24 |
| effect:bookcraft:cta:runner | running light | CSS | pseudo-element/mask | no | periodic | full | full | reduced |
| effect:bookcraft:ambient:particles | sparse particles | CSS/Canvas | effect | yes | continuous bounded | on | reduced | minimal/off |
| effect:bookcraft:ambient:trails | broad light trails | CSS/asset | effect | yes | slow | on | reduced | minimal |
| data:bookcraft:service-status | real service states | API/data | JSON/state | no | live | on | on | on |

---

# 4. Hero character contract

The heroine must be produced as a replaceable asset.

Required master outputs for each monthly variant:

- transparent hero cutout;
- full-resolution source;
- web-optimized desktop derivative;
- tablet derivative;
- phone derivative;
- face/eye anchor metadata;
- provenance metadata;
- generation prompt/workflow reference when generated;
- approval status.

Suggested stable IDs:

```text
asset:bookcraft:hero:canon:v1
asset:bookcraft:hero:2026-01
asset:bookcraft:hero:2026-02
...
asset:bookcraft:hero:2026-12
```

Layout code must reference stable asset IDs, not random file paths.

---

# 5. Environment contract

Environment must remain independent from character.

Examples:

```text
asset:bookcraft:environment:winter-studio
asset:bookcraft:environment:spring-city
asset:bookcraft:environment:summer-ocean
asset:bookcraft:environment:autumn-library
```

Each environment requires:
- wide source;
- desktop crop;
- tablet crop;
- phone crop;
- dominant light direction;
- warm/cool balance;
- safe zone for copy;
- safe zone for hero;
- provenance.

---

# 6. Breakpoint crop rules

## Desktop 1440

- character can occupy ~35–45% of horizontal composition;
- environment remains visible;
- HUD can float around the hero;
- preserve cinematic depth.

## Tablet 834

- character may move independently from text;
- use a tighter crop;
- reduce background detail;
- remove non-essential HUD before shrinking core UI.

## Phone 390

- use mobile-specific crop;
- prioritize face, headline and CTA;
- background becomes atmospheric, not informational;
- avoid tiny floating HUD;
- decorative particles may be disabled.

---

# 7. Image formats

Preferred runtime order:

1. AVIF where supported and practical;
2. WebP as reliable modern fallback;
3. PNG only when alpha/quality demands it and WebP/AVIF is unsuitable;
4. SVG for icons and vector decoration.

Do not ship original generation-resolution assets directly to production.

---

# 8. File naming

Human-readable derivative naming example:

```text
bookcraft-hero-july-desktop@2x.avif
bookcraft-hero-july-tablet.avif
bookcraft-hero-july-phone.avif
bookcraft-ocean-july-desktop.avif
bookcraft-icon-book.svg
```

Stable runtime IDs remain independent of filenames.

---

# 9. Asset provenance

Every commercial asset record must include:

- asset_id;
- type;
- source;
- creator/generator;
- model/tool where applicable;
- license/permission;
- client_supplied;
- created_at;
- source_file;
- derivatives;
- checksum when promoted to production;
- approval status.

Unknown provenance blocks commercial release.

---

# 10. Icon production map

BOOK-CRAFT needs one coherent custom icon family.

Minimum v1 set:

- book;
- script;
- podcast/microphone;
- video avatar;
- image;
- search;
- play;
- arrow;
- sparkle;
- profile/login;
- menu;
- close;
- status/API.

Each icon must share:
- optical box;
- stroke weight;
- corner language;
- padding;
- glow grammar;
- hover/active/focus behavior.

---

# 11. Motion ownership map

| Effect | Owner | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| CTA light runner | CTA component | ambient/hover | 4–6 s loop | static accent |
| Eye shimmer | HeroCharacter | ambient | irregular 5–8 s | off |
| Card glow | ServiceCard | hover/focus | 150–220 ms | instant/static |
| HUD drift | HeroHudCluster | ambient | slow | off |
| Background parallax | AmbientScene | pointer/scroll | low amplitude | off |
| Particles | PageEffectsLayer | ambient | bounded | off/minimal |

---

# 12. What must be generated before implementation

Priority P0:
- canonical heroine v1;
- desktop/tablet/phone hero crops;
- base environment;
- BOOK-CRAFT icon family v1;
- logo SVG;
- service preview images;
- Figma MASTER screenshots for 1440/834/390.

Priority P1:
- seasonal theme assets;
- alternate HUD previews;
- campaign variants;
- richer particle/light assets.

---

# 13. Acceptance gate for Asset Map v1

Asset stage may move to implementation when:

- every MASTER element has an owner;
- character and environment are separate;
- three responsive crop rules exist;
- stable IDs are assigned;
- icon family scope is defined;
- provenance fields are defined;
- motion ownership is defined;
- P0 production list is clear;
- no critical interactive text/button is baked into imagery.

---

## Core principle

**If an element can change independently, it must be represented independently in the asset/component model.**
