# BOOK-CRAFT — Theme Engine v1

## Purpose

Theme Engine v1 formalizes the yearly visual life of the BOOK-CRAFT heroine.

The product keeps one stable visual and component architecture while the monthly presentation changes:

- environment;
- outfit;
- hair length/style;
- accessories;
- lighting;
- decorative effects;
- accent balance;
- responsive crop.

The heroine remains the same canonical adult character.

```text
Character Canon
      +
Monthly Theme
      +
Responsive Crop Rules
      +
Motion Profile
      =
BOOK-CRAFT Monthly Presentation
```

---

# 1. Invariants — what does NOT change

Across all 12 months preserve:

- canonical face identity;
- recognizable eye shape/color;
- core body proportions;
- brand role: screenwriter / creative director / business woman;
- primary page structure;
- navigation model;
- CTA priority;
- service-card architecture;
- icon language;
- accessibility rules;
- stable asset IDs;
- visual QA procedure.

A monthly theme may change mood, but must not create a different product or an unrelated person.

---

# 2. Variables — what MAY change

Monthly theme may change:

- hair length;
- hairstyle;
- outfit;
- seasonal accessories;
- environment;
- weather;
- time of day;
- warm/cool balance;
- atmospheric effects;
- decorative props;
- campaign copy accent;
- hero crop;
- motion profile intensity.

---

# 3. Canonical theme contract

Each month must define:

```ts
type BookCraftMonthlyTheme = {
  id: string
  month: number
  title: string
  season: "winter" | "spring" | "summer" | "autumn"

  hero: {
    assetId: string
    hair: string
    outfit: string
    accessories: string[]
    roleSignals: string[]
  }

  environment: {
    assetId: string
    scene: string
    weather: string
    timeOfDay: string
    props: string[]
  }

  lighting: {
    key: string
    fill: string
    rim: string
    mood: string
  }

  palette: {
    warm: string
    cool: string
    violet: string
    neutral: string
  }

  decor: string[]
  motionProfile: "core" | "premium" | "signature"

  crops: {
    desktop: string
    tablet: string
    phone: string
  }
}
```

---

# 4. Twelve monthly prototypes

## January — Winter Executive Studio

**Scene:** night creative studio with snow beyond large windows.  
**Outfit:** structured ivory turtleneck + dark tailored jacket.  
**Hair:** medium-long, polished waves.  
**Role signals:** laptop, script pages, storyboard, analytics glass panel.  
**Lighting:** cool cyan window light + warm amber desk light.  
**Mood:** precise, premium, strategic.

---

## February — Neon Premiere Night

**Scene:** evening studio / private screening room with magenta-violet city reflections.  
**Outfit:** elegant dark business dress or fitted suit.  
**Hair:** sleek shoulder-length style.  
**Role signals:** screenplay tablet, production timeline, video-avatar preview.  
**Lighting:** violet/magenta rim + soft warm face key.  
**Mood:** cinematic, confident, glamorous.

---

## March — Spring Glass Office

**Scene:** modern glass creative office, early spring daylight, city greenery beginning outside.  
**Outfit:** light blazer, silk top, tailored trousers.  
**Hair:** slightly shorter, clean layered cut.  
**Role signals:** content plan, campaign board, tablet, notebook.  
**Lighting:** soft daylight + cyan accent reflections.  
**Mood:** fresh, intelligent, forward-looking.

---

## April — Story Garden Studio

**Scene:** bright studio with greenery, flowering terrace or conservatory.  
**Outfit:** light pastel business-casual look.  
**Hair:** soft shoulder-length waves.  
**Role signals:** open notebook, script outline, visual references.  
**Lighting:** natural spring fill + restrained violet/cyan UI light.  
**Mood:** creative, optimistic, alive.

---

## May — City Creative Director

**Scene:** rooftop or high-floor creative office overlooking a warm evening city.  
**Outfit:** premium light suit.  
**Hair:** growing longer, smooth waves or low ponytail.  
**Role signals:** campaign dashboard, storyboard wall, phone/voice workflow.  
**Lighting:** golden-hour key + blue city rim.  
**Mood:** ambitious, executive, energetic.

---

## June — Coastal Writing House

**Scene:** modern coastal house/studio with ocean visible through open glass.  
**Outfit:** elegant summer linen set.  
**Hair:** longer, natural summer texture.  
**Role signals:** laptop, script, headphones, compact production console.  
**Lighting:** bright ocean bounce + warm sun edge.  
**Mood:** open, productive, premium summer.

---

## July — Ocean Creative Retreat

**Scene:** oceanfront terrace / beach creative retreat.  
**Outfit:** tasteful summer beachwear / bikini with light linen shirt or wrap nearby; adult editorial styling, non-explicit.  
**Hair:** long sunlit waves.  
**Role signals:** tablet/laptop, screenplay notes, wireless headphones, floating production HUD.  
**Lighting:** strong sun, ocean cyan reflections, warm skin light.  
**Mood:** freedom, success, creative luxury.

---

## August — Sunset Production Deck

**Scene:** yacht/deck or ocean-side production lounge at sunset.  
**Outfit:** elegant resort business-casual / summer evening look.  
**Hair:** long, slightly wind-swept.  
**Role signals:** production board, voice/avatar controls, shot list.  
**Lighting:** orange sunset key + deep blue ambient.  
**Mood:** cinematic, sophisticated, relaxed control.

---

## September — Editorial Library

**Scene:** refined library / editorial office with books, scripts and digital panels.  
**Outfit:** tailored autumn jacket, blouse, dark trousers/skirt.  
**Hair:** slightly shorter polished cut.  
**Role signals:** printed screenplay, fountain pen, research cards, content calendar.  
**Lighting:** warm reading lamps + cool UI edge.  
**Mood:** thoughtful, literary, professional.

---

## October — Noir Writer's Room

**Scene:** dark writer's room / rain on windows / city at night.  
**Outfit:** dark suit, fine knit or structured dress.  
**Hair:** sharp shoulder-length bob or controlled waves.  
**Role signals:** story beats wall, character map, script pages.  
**Lighting:** moody blue rain light + amber practicals + violet rim.  
**Mood:** mysterious, focused, dramatic.

---

## November — Strategy War Room

**Scene:** premium production strategy room with screens, charts and story map.  
**Outfit:** strong executive suit.  
**Hair:** neat medium-length style.  
**Role signals:** audience growth, campaign roadmap, production schedule, AI tools.  
**Lighting:** restrained cold ambient + warm face key.  
**Mood:** business, control, planning, results.

---

## December — Holiday Story Studio

**Scene:** cinematic winter studio with subtle holiday lights, snow, books and production desk.  
**Outfit:** elegant deep-color evening/business look with winter texture.  
**Hair:** longer polished waves or festive updo.  
**Role signals:** year-end story board, release calendar, highlighted scripts.  
**Lighting:** warm gold practicals + blue winter window + violet accents.  
**Mood:** celebratory, premium, magical, professional.

---

# 5. Responsive theme behavior

Monthly theme data must include separate crop behavior.

## Desktop 1440

Preserve:
- environment storytelling;
- heroine from bust/waist/full framing depending on scene;
- floating HUD;
- strongest cinematic depth.

## Tablet 834

Preserve:
- face;
- profession signals;
- primary CTA;
- one or two high-value environmental cues.

Reduce:
- decorative props;
- secondary HUD;
- particle density.

## Phone 390

Preserve:
- face identity;
- headline;
- primary CTA;
- one clear seasonal cue.

Do not attempt to display the full desktop scene in miniature.

---

# 6. Monthly asset IDs

Suggested stable convention:

```text
asset:bookcraft:hero:2026-01
asset:bookcraft:hero:2026-02
...
asset:bookcraft:hero:2026-12

asset:bookcraft:environment:2026-01
...
asset:bookcraft:environment:2026-12
```

The calendar year is part of the ID so future annual redesigns can coexist.

---

# 7. Theme switching

Runtime theme selection should be data-driven.

```text
currentMonth
   ↓
Theme Registry
   ↓
Hero Asset ID
Environment Asset ID
Palette Tokens
Decor
Motion Profile
Responsive Crops
   ↓
Existing Page Components
```

No duplicated monthly React pages.

---

# 8. Motion profiles

## Core

- static gradients;
- hover/focus only;
- no ambient particles;
- no parallax;
- eye shimmer off.

## Premium

- subtle ambient glow;
- sparse particles;
- low-amplitude parallax;
- CTA light runner;
- occasional eye shimmer.

## Signature

- all Premium effects;
- richer environmental light;
- responsive HUD drift;
- scene depth effects;
- still bounded by performance budget.

Mobile may downgrade Signature → Premium or Core automatically.

---

# 9. Character consistency gate

Before a monthly hero is accepted:

- face identity matches canon;
- eyes remain recognizable;
- age presentation is consistent;
- body proportions remain plausible;
- profession still reads as creative/business leadership;
- styling fits the month;
- crop works at 1440/834/390;
- no UI is baked into the character image;
- source/provenance is recorded.

---

# 10. Visual QA for themes

Each month requires at least:

```text
month-reference
desktop-1440
tablet-834
phone-390
identity-check
performance-check
asset-provenance-check
```

The goal is not identical pixels across months.
The goal is stable product identity with controlled seasonal variation.

---

# 11. First implementation priority

Do not generate all 12 production asset sets immediately.

Recommended order:

1. **January** — cold studio baseline;
2. **July** — maximum seasonal contrast / ocean baseline;
3. **October** — dark autumn/noir baseline;
4. **April** — bright spring baseline.

If one component architecture survives these four extremes, it is much safer to scale to all 12 months.

---

# 12. Definition of done for Theme Engine v1

Theme Engine v1 is ready when:

- all 12 monthly prototypes are defined;
- invariant character contract is clear;
- asset IDs are stable;
- desktop/tablet/phone crop strategies exist;
- motion profiles exist;
- theme switching is data-driven;
- four extreme themes can be implemented without changing page structure.

---

## Core principle

**One heroine. One product. Twelve worlds.**
