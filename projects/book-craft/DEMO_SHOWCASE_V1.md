# BOOK-CRAFT — Demo Showcase v1

## Goal

Prepare a submission/demo flow that looks like a finished product story rather than a collection of disconnected screens.

The demo must prove four things:

1. the interface is visually coherent;
2. controls are real and lead somewhere;
3. AI modules are connected or clearly marked demo;
4. the system learns from content and can recommend what to create next.

---

# 1. Demo story

The viewer should understand BOOK-CRAFT in 60–90 seconds.

```text
Landing
  ↓
Choose content type
  ↓
Create / generate
  ↓
Preview result
  ↓
See analytics signal
  ↓
Receive recommendation
  ↓
Launch next experiment
```

This is the minimum product story.

---

# 2. Submission WOW effect

The wow effect should come from a coordinated sequence, not from uncontrolled decoration.

## Scene A — Landing

Show:
- cinematic hero;
- canonical heroine;
- spectral buttons;
- four service cards;
- Trend Radar HUD;
- subtle animated glow;
- real hover/pressed states.

Viewer message:
> “This is not a mockup. The interface is alive and structured.”

## Scene B — Create

Click **Начать создавать**.

Open a creation workspace with:
- content type;
- prompt/scenario;
- parameters;
- generate action;
- progress state.

Viewer message:
> “The landing leads into a real workflow.”

## Scene C — Result

Show one generated artifact:
- mailing text / script / image / podcast snippet / avatar selection;
- metadata;
- generation source;
- status.

Viewer message:
> “The product creates content.”

## Scene D — Analytics

Open Trend Radar / Analytics panel.

Show:
- rising direction;
- confidence;
- time horizon;
- comparable content signal;
- one recommended experiment.

Viewer message:
> “The product does not only create. It learns.”

## Scene E — Recommendation → next action

Recommendation example:

```text
Signal:
Short fantasy serials show stronger completion/share rate.

Confidence:
0.71

Horizon:
14 days

Suggested next test:
Create 3 variants with 45–60 s narration.
```

Action:
**Создать варианты**

Viewer message:
> “Analytics directly feeds the next production cycle.”

---

# 3. Schematic architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                        BOOK-CRAFT UI                         │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│ Books        │ Scripts      │ Video Avatar │ Images          │
│ Podcast      │ Campaigns    │ Future Tools │ Analytics       │
└──────┬───────┴──────┬───────┴──────┬───────┴──────┬──────────┘
       │              │              │              │
       ▼              ▼              ▼              ▼
┌──────────────────────────────────────────────────────────────┐
│                    CONTENT WORKFLOW LAYER                    │
│ create → edit → preview → publish/test                       │
└──────────────────────────────┬───────────────────────────────┘
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                    CONTENT INTELLIGENCE                      │
│ performance │ trends │ hit patterns │ forecasts │ experiments│
└──────────────────────────────┬───────────────────────────────┘
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                      ALINA ANALYST                           │
│ evidence → explanation → recommendation → confidence        │
└──────────────────────────────┬───────────────────────────────┘
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                    NEXT PRODUCTION ACTION                    │
│ topic │ format │ style │ audience │ timing │ A/B variant     │
└──────────────────────────────────────────────────────────────┘
```

---

# 4. UI composition for the landing

```text
HEADER
│ logo │ navigation │ analytics │ search │ login │ start
│
├─ HERO LEFT
│  ├─ eyebrow
│  ├─ headline
│  ├─ description
│  ├─ primary CTA
│  ├─ video CTA
│  └─ metrics
│
├─ HERO CENTER
│  ├─ heroine
│  ├─ laptop / work props
│  └─ environment
│
├─ HERO RIGHT
│  ├─ Trend Radar
│  ├─ content preview
│  └─ voice/avatar/image status
│
└─ SERVICE GRID
   ├─ Books
   ├─ Scripts
   ├─ Video Avatar
   └─ Images
```

---

# 5. What must be real for submission

P0 — must work:
- landing opens;
- header/navigation works;
- all visible buttons have targets;
- hover/pressed/focus states work;
- at least one complete create → result flow works;
- Video Avatar tab shows external service voices/avatars when integration is available;
- analytics panel can show either real measured data or clearly labeled demo data;
- public link works;
- screenshots exist.

P1 — strong wow:
- spectral border motion;
- seasonal heroine/theme;
- real image generation;
- Trend Radar recommendation;
- one-click “create variants from recommendation”;
- responsive 1440 / 834 / 390.

P2 — post-submission:
- full 12-month theme engine;
- 3D animated agent;
- deep forecasting;
- full experiment engine;
- cross-channel trend ingestion.

---

# 6. Demo data discipline

Every widget must state one of:

- REAL;
- DEMO;
- MOCK;
- UNAVAILABLE.

Never present a decorative or synthetic number as measured production data.

---

# 7. Suggested 75-second submission script

```text
0–10 s
Landing. Move pointer over primary CTA and service cards.
Show idle → hover → pressed spectral behavior.

10–25 s
Open one creation module.
Enter scenario/topic and generate.

25–40 s
Show result and preview.

40–55 s
Open Analytics / Trend Radar.
Show trend, confidence and horizon.

55–68 s
Click recommendation: “Создать 3 варианта”.
Show prepared variants or queued experiment.

68–75 s
Return to landing and show responsive/seasonal preview.
```

---

# 8. Acceptance

The submission demo is ready when a reviewer can answer “yes” to:

- I understand what BOOK-CRAFT does.
- I can see that controls are real.
- I can see at least one working AI workflow.
- I can distinguish real data from demo data.
- I can see how analytics leads to a next production decision.
- I can understand why this is more than a landing-page mockup.

---

## Core principle

**The wow effect is the feeling that the product is alive, connected and learning — not merely glowing.**
