# BOOK-CRAFT — MVP Freeze v1

## Decision

The concept phase is complete enough for MVP.

For the MVP, analytics widgets may use clearly labeled DEMO/MOCK data. The analytics layer is treated as a real product direction, but deep forecasting and full trend ingestion are post-MVP.

The next goal is not to add more concepts. The next goal is to make the current product demonstrably work end-to-end.

---

# 1. MVP product shell

Keep the current visual product structure:

- cinematic landing;
- BOOK-CRAFT brand;
- hero + heroine placeholder/asset;
- service cards;
- analytics/Trend Radar placeholders;
- interaction states;
- responsive 1440 / 834 / 390.

Analytics widgets must be marked:

- REAL;
- DEMO;
- MOCK;
- UNAVAILABLE.

---

# 2. Assignment-critical MVP flows

The product must include the required AI Content Maker workflows:

## Mailing / Newsletter
Input:
- topic;
- audience;
- tone;
- goal.

Output:
- generated mailing/newsletter text.

## Podcast
Input:
- topic or script.

Output:
- podcast script;
- audio/TTS result or demonstrable synthesis flow.

## Video Avatar
External integration must expose:
- available voices;
- available avatars.

Actual avatar video generation is optional for MVP if the external service integration is demonstrated.

## Image Generation — bonus
Keep the existing local ComfyUI integration as an additional capability.

---

# 3. Product navigation

Landing cards may remain broader than the assignment, but the submission path must clearly expose:

- Mailing;
- Podcast;
- Video Avatar;
- Image Generation.

Books/Scripts can remain as extended product directions, not blockers for MVP acceptance.

---

# 4. Analytics in MVP

Analytics is included as a product layer but not as a deep production forecast engine yet.

Allowed for MVP:
- DEMO Trend Radar;
- DEMO product-type metrics;
- DEMO recommendation card;
- module-specific metric placeholders.

Required:
- every widget visibly indicates REAL / DEMO / MOCK;
- no synthetic metric is presented as measured production data.

---

# 5. Implementation order

```text
1. Working clean site shell
2. Geometry lock
3. Real navigation / routes
4. Shared interaction states
5. Mailing end-to-end
6. Podcast end-to-end
7. Video Avatar voices/avatars API
8. Image Generation bonus
9. Analytics DEMO layer
10. Responsive 1440 / 834 / 390
11. Motion polish
12. Public deployment
13. Submission screenshots
```

---

# 6. MVP Definition of Done

MVP is ready when:

- site opens reliably;
- no dead controls;
- primary routes work;
- Mailing works end-to-end;
- Podcast flow works end-to-end;
- Video Avatar screen loads voices and avatars from external API or clearly documented substitute;
- Image Generation works if included in demo;
- analytics is clearly marked as REAL/DEMO/MOCK;
- desktop/tablet/phone layouts work;
- production build passes;
- public link is available;
- final screenshots are captured.

---

# 7. Post-MVP backlog

After submission:

- real analytics ingestion;
- trend detection;
- hit pattern mining;
- demand forecasting;
- recommendation feedback loop;
- 12 seasonal themes;
- 3D animated agent/avatar platform;
- deeper production telemetry;
- commercial packaging.

---

## Core principle

**Freeze the concept. Prove the workflows. Then expand the intelligence.**
