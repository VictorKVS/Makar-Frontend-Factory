# KB-1F — Content Intelligence & Trend Engine

## Mission

BOOK-CRAFT and future FATHER creative products do not only generate content.
They learn from content performance, audience response, market movement and production efficiency.

The platform should answer:

- what is gaining traction now;
- what repeatedly performs well;
- what is seasonal;
- what is declining;
- which topics/formats/styles are saturated;
- which combinations look promising;
- what should be tested next;
- what is merely a short spike versus an evergreen direction;
- where production effort is wasted.

The engine produces **probabilistic recommendations, not promises**.

---

# 1. Cross-cutting architecture

```text
Books
Scripts
Podcasts
Video Avatars
Images
Campaigns
      │
      ▼
Telemetry + Metadata
      │
      ▼
Content Intelligence Layer
├── Performance Analytics
├── Trend Detection
├── Hit Pattern Mining
├── Audience Segmentation
├── Content Feature Store
├── Demand Forecasting
├── Opportunity Scoring
├── Experiment / A-B Layer
└── Recommendation Engine
      │
      ├── Makar dashboards / UI
      ├── ALINA Analyst
      ├── Creator recommendations
      └── Production planning
```

Analytics is not a separate decorative dashboard.
It is a shared service embedded into every content workflow.

---

# 2. Signals

## Internal signals

Per content item and aggregate:

- impressions/views;
- opens;
- CTR;
- start rate;
- completion rate;
- save rate;
- share rate;
- comment rate;
- conversion;
- retention;
- repeat use;
- generation → edit → publish time;
- cost per published item;
- cost per successful item;
- number of regeneration attempts;
- editorial rejection rate;
- user-selected variants;
- campaign outcome.

## Content features

Attach structured features:

- genre;
- topic;
- subtopic;
- format;
- tone;
- duration;
- visual style;
- character/archetype;
- seasonality;
- keywords;
- channel;
- language;
- audience segment;
- production technique.

## External signals

Later adapters may ingest:

- search trend indices;
- platform charts;
- public social discussion;
- public content rankings;
- competitor/public campaign observations;
- news/event calendars;
- seasonal calendars;
- legally collected OSINT trend signals.

External signals must preserve source, time window and confidence.

---

# 3. Core analytical products

## Performance Profile

For each item:

```text
Content
→ audience
→ channel
→ reach
→ engagement
→ completion
→ conversion
→ retention
→ cost
```

## Hit Pattern

A hit is not just “many views”.
The engine stores the pattern:

- content features;
- timing;
- audience;
- channel;
- creative treatment;
- publication cadence;
- conversion/retention quality;
- cost efficiency.

## Trend

Trend object:

```json
{
  "trend_id": "trend:...",
  "topic": "...",
  "direction": "rising",
  "strength": 0.82,
  "velocity": 0.61,
  "time_horizon": "14d",
  "segments": [],
  "sources": [],
  "confidence": 0.77
}
```

## Opportunity

Opportunity combines:

- rising demand;
- low/medium saturation;
- platform capability;
- production cost;
- audience fit;
- brand fit;
- historical performance;
- seasonality.

---

# 4. Forecasting

Forecast output must include:

- forecast horizon;
- target metric;
- expected range;
- confidence;
- evidence window;
- known uncertainty;
- model/version;
- comparable historical cases when available.

Do not output:
“this will definitely be a hit”.

Prefer:
“this direction has a stronger-than-baseline signal for the next 14 days, confidence 0.71”.

---

# 5. Recommendation classes

The system may recommend:

- topic to explore;
- format to switch;
- visual style;
- title/headline direction;
- duration;
- release timing;
- audience segment;
- channel;
- character/archetype;
- content bundle;
- follow-up/sequel;
- experiment/A-B test;
- stop/continue/scale decision.

Every recommendation stores:
- evidence;
- confidence;
- affected content type;
- expected benefit;
- cost/risk;
- testable next action.

---

# 6. Analytics inside every module

## Books

Analyze:
- genres;
- chapter drop-off;
- characters retained in memory;
- saves/returns;
- themes that generate follow-up interest.

Recommend:
- promising genre/theme combinations;
- pacing issues;
- sequel/spin-off opportunity;
- character focus.

## Scripts

Analyze:
- hook strength;
- scene retention;
- duration;
- completion;
- reusable story beats.

Recommend:
- hook variants;
- scene order;
- duration;
- platform/channel fit.

## Podcast

Analyze:
- start/completion;
- drop-off timestamps;
- voice choice;
- duration;
- topic retention.

Recommend:
- episode length;
- voice/tone;
- segment structure;
- topic clusters.

## Video Avatar

Analyze:
- avatar/voice combination;
- watch completion;
- CTA response;
- channel/segment.

Recommend:
- avatar;
- voice;
- pacing;
- message length.

## Images

Analyze:
- selected variants;
- saves/shares;
- style;
- composition;
- character;
- season/color;
- use in downstream content.

Recommend:
- visual style;
- character treatment;
- palette;
- thumbnail direction.

---

# 7. Production analytics

The factory also studies itself.

Track:

- generation latency;
- edit time;
- regeneration rate;
- approval rate;
- human correction rate;
- compute cost;
- model cost;
- asset reuse;
- component reuse;
- time-to-publish;
- success per production hour.

Goal:

**better content + less wasted production + faster learning.**

---

# 8. Trend Radar UI

Every creative workspace may show a compact Trend Radar.

Possible widgets:

- Rising topics;
- Rising formats;
- Falling topics;
- Saturation warning;
- Seasonal opportunity;
- Audience shift;
- Top-performing combinations;
- “Try next” recommendation;
- confidence and horizon.

Do not show unlabeled scores without explanation.

---

# 9. Experiment loop

```text
Signal
→ hypothesis
→ content variant
→ publish/test
→ measure
→ compare
→ learn
→ update recommendation
```

A/B or multi-variant experiments should be linked to:
- hypothesis;
- variants;
- audience;
- metric;
- stopping condition;
- result;
- confidence.

---

# 10. ALINA Analyst role

ALINA becomes the analytical brain over the telemetry.

Responsibilities:

- normalize evidence;
- compare performance;
- detect trend change;
- separate spike from sustained growth;
- explain why a recommendation exists;
- propose testable next actions;
- flag weak evidence;
- avoid certainty language when evidence is weak.

---

# 11. Makar role

Makar renders the analytical system:

- Trend Radar;
- hit cards;
- opportunity cards;
- confidence badges;
- evidence drill-down;
- experiment panels;
- production efficiency widgets.

Analytics UI must never hide:
- time window;
- source;
- confidence;
- whether data is real/demo.

---

# 12. Data quality

Before recommendation:

- enough observations;
- comparable population;
- time window known;
- bot/spam/anomaly filtering when relevant;
- source provenance;
- metric definition stable;
- no mixing incompatible channels without normalization.

If evidence is insufficient, output:
`insufficient_evidence`.

---

# 13. Privacy

Default:
- aggregate/content-level analytics;
- avoid unnecessary personal data;
- audience segmentation should be lawful and proportionate;
- store privacy classification in telemetry events.

---

# 14. Commercial effect

The factory becomes more productive because it learns:

```text
what to make
+ how to package it
+ where to publish
+ when to publish
+ for whom
+ what to stop making
+ what to scale
```

This creates a closed production loop:

```text
Create → Publish → Measure → Learn → Recommend → Create Better
```

---

## Core principle

**The creative factory should learn from every published artifact and every production run.**
