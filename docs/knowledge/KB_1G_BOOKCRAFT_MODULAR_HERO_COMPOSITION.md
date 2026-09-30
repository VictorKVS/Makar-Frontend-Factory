# KB-1G — BOOK-CRAFT Modular Hero Composition Playbook

Status: ACTIVE  
Scope: Makar Frontend Factory / cinematic landing pages / hero scenes / asset systems  
Source project: BOOK-CRAFT  
Validated result: BOOK-CRAFT hero v0.3.4

## 1. Why this KB exists

BOOK-CRAFT exposed a recurring production problem: a beautiful reference image can look excellent as a single raster, while a real product must keep text, buttons, HUD, analytics, routes and variable characters interactive and replaceable.

The solution is not to choose between "one big image" and "everything as tiny DOM pieces". The reusable pattern is:

**freeze the functional carcass first, then split only the parts that need runtime independence.**

Canonical runtime stack:

```text
background / environment
→ character
→ foreground props (books, cup, desk objects)
→ laptop / occluding equipment
→ live React copy / CTA / metrics
→ live HUD / analytics
```

The visual reference remains an art-direction target, not the runtime implementation.

## 2. Production path learned from BOOK-CRAFT

The successful sequence was:

1. Build a rough carcass with real routes and live UI.
2. Verify desktop/tablet/mobile before art.
3. Freeze geometry (CARCASS LOCK).
4. Create an asset registry and inbox.
5. Insert candidate art only into fixed slots.
6. Compare the runtime screenshot against the approved visual reference.
7. Correct composition in this priority:
   - overall composition;
   - character scale and position;
   - title/CTA proportions;
   - HUD position;
   - card geometry;
   - light and glow;
   - micro-detail.
8. Only after the composition is stable, introduce controlled runtime variation.
9. Encode variation as configuration, not scattered CSS/JS conditionals.

This is the default Makar workflow for future cinematic home screens.

## 3. Carcass before beauty

A repeated failure mode was trying to solve visual problems before the page geometry was stable. Generated art then had to be regenerated or recropped every time layout changed.

Rule:

> Do not use image generation to compensate for an unstable layout.

Before final art, the page must already answer:

- where is the editorial column;
- where is the visual stage;
- where is the intelligence/HUD column;
- what is the height of the hero;
- what cards exist below;
- what routes and buttons work;
- what changes on tablet and phone.

Once this is fixed, art production becomes a slot-filling task rather than a redesign loop.

## 4. Reference image vs runtime scene

A full generated composition is valuable for:

- art direction;
- lighting target;
- proportion target;
- color target;
- pose target;
- visual QA comparison.

It should not automatically become the runtime hero if it contains baked-in:

- navigation;
- CTA text;
- analytics;
- HUD;
- final product copy;
- route labels.

Those elements must remain live UI.

A full raster background is acceptable when its contents are static decoration. Split a visual element into its own asset when it must change independently.

Decision rule:

```text
Will this element vary independently at runtime?
  no  → it may stay baked into the background.
  yes → make it a separate layer / asset slot.
```

Examples from BOOK-CRAFT:

- studio/library environment: background layer;
- ALINA / future Masha / Dasha: character layer;
- wardrobe/pose variants: character asset variants;
- signed books + coffee/cappuccino/tea: foreground prop variants;
- laptop: foreground occlusion layer;
- title/CTA/metrics/HUD: live React only.

## 5. Asset inbox workflow

Generated assets arrive with unstable names and uncertain roles. Do not force the user to manually rename every file.

Use:

```text
public/assets/<product>/_inbox/
```

Then promote assets into canonical folders:

```text
hero/
  backgrounds/
  characters/<persona>/
  foreground/
  equipment/
cards/
references/
archive/
```

Rules:

- inbox is temporary;
- canonical names are stable English filenames;
- duplicates go to archive, not silent deletion;
- reference composites go to references, not runtime folders;
- production code must point only to canonical assets;
- README/manifest must explain active and alternate assets.

## 6. Hero layer contract

Every cinematic hero should define explicit z-order and ownership.

BOOK-CRAFT contract:

```text
z0  environment
z20 character
z28 books / cups / desk props
z34 laptop / occluding equipment
z40 live editorial UI
z50 intelligence HUD
```

The important part is not the exact z-index number. The important part is the stable semantic order.

Occlusion matters. A laptop that is supposed to sit in front of a person must be a foreground layer. If it is behind the character, the scene immediately looks physically wrong even if the individual assets are beautiful.

## 7. Proportion matching loop

The last 20% of visual fidelity came from iterative proportion correction, not new art generation.

BOOK-CRAFT required several character reductions before reaching the approved composition.

Reusable calibration loop:

1. render the real page;
2. capture one screenshot;
3. compare against the approved reference side-by-side;
4. identify the largest perceptual mismatch;
5. change one family of variables only;
6. repeat.

For a character, tune:

- width;
- height;
- scale;
- top/bottom offset;
- horizontal offset;
- object-position;
- relation to laptop and desk.

Do not change background, character, cards and HUD in the same pass. That destroys causal feedback.

Recommended adjustment size:

- large mismatch: 10–15%;
- medium mismatch: 5–8%;
- final pixel pass: 1–3% or 4–16 px.

## 8. Image-first product cards

The approved BOOK-CRAFT product buttons established another reusable pattern:

**large artwork, small but readable live text, clear icon, explicit arrow affordance.**

For visual product cards:

- artwork should occupy most of the card;
- title and description stay live HTML;
- use a readability veil/gradient instead of baking text into the art;
- icon and arrow remain interactive UI;
- hover may gently scale the image, not rearrange geometry;
- each card may have its own object-position crop.

This preserves visual richness without sacrificing localization, accessibility or routing.

## 9. Coordinated scene rotation

Independent timers for character, books and laptop can create accidental combinations. BOOK-CRAFT moved to coordinated presets.

Preferred model:

```js
scenes: [
  { character: 0, books: 0, laptop: 0 },
  { character: 1, books: 1, laptop: 1 },
  ...
]
```

One scene index advances on one timer.

Benefits:

- visual combinations are curated;
- QA is deterministic;
- screenshots are reproducible;
- art direction can approve exact presets;
- future seasonal/monthly presets are trivial.

BOOK-CRAFT baseline:

- interval: 10 seconds;
- crossfade: ~0.9 seconds;
- reduced-motion: disable rotation/motion where appropriate.

## 10. Configuration-driven visual engine

Runtime variants must live in configuration, not in component branches.

The component should know how to render:

- a background slot;
- character slot;
- props slot;
- laptop slot.

The registry/config decides which assets fill those slots.

This allows future substitutions:

```text
ALINA → MASHA → DASHA
white jacket → summer outfit → autumn outfit
coffee → cappuccino → tea
laptop A → laptop B
seasonal environment → monthly campaign environment
```

without rewriting the hero component.

## 11. Responsive rule: recomposition, not shrinking

A cinematic desktop composition must not simply be uniformly scaled down.

On smaller screens:

- move the character independently;
- reduce or hide nonessential props;
- change background focal point;
- preserve headline readability;
- keep CTA touch targets large;
- allow HUD to collapse/reorder;
- do not let the character obscure the editorial column.

This is the same principle already used by Makar for workspace UI: preserve hierarchy, not coordinates.

## 12. Operational lessons

### Vite / Windows asset moves

Bulk moving PNG files while Vite is watching the same directory can produce Windows `EBUSY`.

Rule:

> Stop the dev server before bulk file moves/renames in a watched asset inbox.

Then:

```text
move/rename assets
→ build
→ restart dev server
```

### PowerShell path handling

Typing a folder path by itself is interpreted as a command. Use `cd`, `Get-ChildItem`, `Move-Item`, etc.

### UTF-8

Avoid unsafe text rewrites that corrupt Cyrillic. Use explicit UTF-8 or Node fs UTF-8 for generated patches.

### GitHub as production source of truth

When repository write tools are available, prefer a verified commit over asking the user to manually paste large files. Always verify the final branch head and canonical paths.

## 13. Failure patterns to avoid

1. Generating another near-identical hero instead of fixing CSS proportions.
2. Baking live UI into the reference image.
3. Treating every visual element as a separate layer even when it never changes.
4. Leaving variable elements baked into the background when they must rotate.
5. Changing multiple composition variables in one QA pass.
6. Running independent asset timers that create unapproved combinations.
7. Keeping random generated filenames in production code.
8. Moving watched assets while Vite is active on Windows.
9. Claiming an asset is integrated merely because it was generated.
10. Redesigning the carcass after it was already accepted.

## 14. Makar decision algorithm

For every high-end hero:

```text
1. Is the carcass locked?
   no  → finish geometry first.
   yes → continue.

2. Is this image a reference or a runtime asset?
   reference → preserve for comparison.
   runtime → register it.

3. Does an element need independent variation?
   no  → keep it in the background/composite.
   yes → split into a semantic layer.

4. Does the runtime match the reference?
   no  → fix the largest proportion mismatch first.
   yes → continue.

5. Are variants independent?
   yes → use coordinated scene presets.
   no  → use a single stable asset.

6. Has desktop passed?
   yes → recompose tablet/mobile.
   no  → do not polish micro-details yet.
```

## 15. Definition of done

A cinematic hero is complete when:

- live UI and routes work;
- reference hierarchy is visually matched;
- character scale is approved;
- occlusion between character/desk/laptop is physically plausible;
- product cards use real interactive text;
- asset names and locations are canonical;
- variant changes are configuration-driven;
- scene rotation is deterministic;
- reduced-motion behavior exists;
- desktop/tablet/mobile are verified;
- production build passes.

BOOK-CRAFT v0.3.4 is the first concrete training case for this pattern.
