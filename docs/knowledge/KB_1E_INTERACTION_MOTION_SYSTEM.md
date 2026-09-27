# KB-1E — Makar Interaction & Motion System

## Purpose

Every visible control must have a destination or an explicitly declared decorative role.

No dead buttons. No decorative cards pretending to be controls.

A reusable interaction consists of:

```text
semantic purpose
+ destination/action
+ visual states
+ motion states
+ keyboard/focus behavior
+ loading/error behavior where relevant
+ verification
```

---

# 1. Three-stage luminous control model

Premium BOOK-CRAFT-style controls use three continuous visual states.

## State A — Idle / no pointer

The control is alive but quiet.

- no vertical lift;
- low-intensity glow;
- slow spectral border runner;
- 1–3 small light nodes may travel around the border;
- warm → magenta/violet → cyan spectrum;
- recommended loop: 6–8 s;
- opacity restrained;
- text remains dominant.

## State B — Hover / pointer in hit area

The control acknowledges attention.

- translate upward by approximately 2 px;
- border/glow intensity increases;
- spectral runner accelerates;
- light nodes become clearer;
- recommended loop: 2.8–3.6 s;
- local highlight follows the control geometry, not the pointer itself;
- transition into hover: ~160–220 ms.

## State C — Pressed / active pointer down

The control confirms physical action.

- lift is cancelled or reduced;
- translateY returns to 0 or +1 px;
- brief compression/scale around 0.985–0.995;
- spectral border makes a short bright pulse;
- optional radial/ring response remains inside component bounds;
- response duration: ~120–220 ms;
- click action must still fire immediately.

The three states are not three separate components. They are variants of one motion primitive.

---

# 2. Focus is not hover

Keyboard focus must remain visible.

Recommended:
- stable cyan/violet focus ring;
- no requirement for pointer hover;
- focus ring must meet contrast needs;
- motion can remain low-intensity.

---

# 3. Reduced motion

With `prefers-reduced-motion: reduce`:

- remove orbital/travel motion;
- keep static spectral border;
- hover may use color/brightness change only;
- pressed feedback remains immediate but not animated heavily.

---

# 4. Reusable primitive

Shared candidate:

`SpectralAction`

Responsibilities:
- semantic button/link rendering;
- idle/hover/pressed/focus/disabled/loading;
- spectral border;
- glow intensity;
- optional icon slots;
- optional analytics hook;
- reduced-motion fallback.

Do not duplicate this effect per page.

---

# 5. Route/action contract

Every interactive block must register:

- interaction_id;
- visible label;
- kind;
- target;
- implementation status;
- state behavior;
- verification state.

If a block has no target yet, label it `planned`; do not silently ship it as if functional.

---

# 6. Cards

Clickable service cards behave as one large link target.

Recommended behavior:
- whole card clickable;
- arrow is visual reinforcement, not a second conflicting target;
- card hover lifts 2 px;
- border/glow increases;
- preview remains subordinate;
- keyboard focus mirrors hover hierarchy.

---

# 7. HUD

HUD blocks must be classified:

- functional widget → has route/action/data contract;
- informative widget → reads real/demo data and is not misleading;
- decorative widget → not keyboard-focusable and does not look clickable.

---

# 8. Animation ownership

```text
SpectralAction → button/link border and press feedback
ServiceCard    → card lift/focus/local glow
HeroHudWidget  → local state feedback
PageEffects    → ambient-only effects
```

Do not animate unrelated controls from a global DOM script.

---

# 9. Acceptance

A page is interaction-complete when:

- every button/link/card has a declared target or action;
- no fake control is left dead;
- idle/hover/pressed/focus are visible and consistent;
- keyboard navigation works;
- reduced-motion works;
- pressed state never blocks click;
- route/action contract is verified.

---

## Core principle

**If it looks clickable, it must behave predictably.**
