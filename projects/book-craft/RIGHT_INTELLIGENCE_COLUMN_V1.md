# BOOK-CRAFT — Right Intelligence Column v1

The right side of the hero is a stable component zone, not decorative raster content.

Order:

1. Audience Growth HUD → `/analytics`
2. Content Plan → per-row module routes
3. Podcast HUD → `/podcast`
4. Video Avatar HUD → `/video-avatar`

MVP data state:
- Audience Growth: DEMO
- Podcast waveform/time: DEMO
- Video-avatar thumbnails: DEMO
- Content Plan routes: functional skeleton

Each HUD is an independent component with idle / hover / pressed / focus states and reduced-motion fallback.

The heroine/background asset must never absorb these HUD controls into one baked image.

Core rule:

**Hero art may change; product intelligence controls keep stable geometry and contracts.**
