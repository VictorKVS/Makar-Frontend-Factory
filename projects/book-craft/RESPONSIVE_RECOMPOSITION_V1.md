# BOOK-CRAFT — Responsive Recomposition v1

## Status

Desktop production master exists in Figma:

- reference: `BC/REFERENCE/DESKTOP/1440` — node `18:2`
- layered master: `BC/MASTER/DESKTOP/1440` — node `18:4`
- temporary hero crop: node `18:44`

The next Figma write for Tablet/Phone is pending tool availability. This document freezes the intended recomposition so work can continue without design ambiguity.

---

# Desktop — 1440

Canonical behavior:

- full header navigation;
- large editorial hero copy left;
- heroine occupies central/right focus;
- three floating HUD panels;
- three hero metrics;
- four service cards in one row;
- strongest cinematic depth and glow.

---

# Tablet — 834

Target frame:

`BC/MASTER/TABLET/834`

Recommended height: ~1120 px for the initial full composition.

## Header

- 20 px outer margin;
- full brand remains;
- desktop nav hidden/collapsed;
- search/login may collapse;
- primary "Начать бесплатно" remains visible.

## Hero

- copy block left;
- heroine shifted right independently;
- headline reduced but still editorial;
- description stays readable;
- primary CTA remains above fold;
- secondary CTA may stack below primary.

## Metrics

- keep 2–3 metrics when space permits;
- reduce spacing before removing content.

## HUD

- hide non-essential floating panels first;
- preserve at most one high-value HUD panel;
- never overlap face or CTA.

## Services

2×2 layout:

```text
Books             Scripts
Video Avatar      Images
```

Target card width: ~370 px.

---

# Phone — 390

Target frame:

`BC/MASTER/PHONE/390`

Recommended full landing composition height: ~1650–1750 px.

## Header

- compact logo + brand;
- hamburger/menu control;
- desktop navigation hidden;
- login/start actions move into menu or secondary flow.

## Hero

Attention order:

```text
eyebrow
headline
description
heroine
primary CTA
service cards
```

The heroine uses a mobile-specific crop. Do not shrink the desktop composition.

## Metrics

- hide full metric row in the first pass;
- optionally restore one compact metric after visual QA.

## HUD

- floating desktop HUD is hidden;
- functional information moves to inline UI later;
- no tiny floating cards around the face.

## Services

Single-column stack:

```text
Books
Scripts
Video Avatar
Images
```

Card width: ~330 px.

---

# Responsive quality gate

For all three breakpoints:

- face remains in safe zone;
- primary CTA remains obvious;
- no important text is baked into imagery;
- environment is reduced before functional UI;
- motion intensity decreases with viewport size;
- reduced-motion remains usable;
- character/environment remain independently replaceable.

---

# Implementation rule

Responsive work is **recomposition**, not scale.

If a desktop element cannot fit, choose explicitly:

1. move;
2. collapse;
3. convert to inline;
4. hide if decorative;
5. replace with breakpoint-specific representation.

Never blindly scale the entire page.

---

## Core principle

**Same product identity, different composition.**
