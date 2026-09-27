# BOOK-CRAFT — Interaction Map v1

## Goal

Freeze navigation and control behavior before visual polish so the site grows by extending a stable contract instead of rebuilding pages.

## Header

| ID | Visible control | Kind | Target | Status |
|---|---|---|---|---|
| bc.header.brand | BOOK-CRAFT logo | route | / | planned |
| bc.header.features | Возможности | route/anchor | #features | planned |
| bc.header.examples | Примеры | route/anchor | #examples | planned |
| bc.header.pricing | Тарифы | route/anchor | #pricing | planned |
| bc.header.blog | Блог | route/anchor | #blog | planned |
| bc.header.studio | О студии | route/anchor | #studio | planned |
| bc.header.search | Search | action/modal | search overlay | planned |
| bc.header.login | Войти | route/modal | /login | planned |
| bc.header.start | Начать бесплатно | route | /create | planned |

## Hero

| ID | Visible control | Kind | Target | Status |
|---|---|---|---|---|
| bc.hero.create | Начать создавать | route | /create | planned |
| bc.hero.video | Смотреть видео | modal/action | intro video | planned |

## Service cards

The whole card is the interaction target. The arrow is decorative reinforcement.

| ID | Card | Target |
|---|---|---|
| bc.service.books | Книги | /books |
| bc.service.scripts | Сценарии клипов | /scripts |
| bc.service.avatar | Видео-аватар | /video-avatar |
| bc.service.images | Генерация изображений | /images |

## HUD

Initial classification:

- eye/visual-quality panel: informative until a real QC module is wired;
- image/story preview: informative/decorative until routed;
- voice/podcast panel: informative until audio module is wired;
- audience growth: demo/informative until analytics data exists.

A HUD block must not pretend to be clickable until a target exists.

## Motion

All primary buttons and clickable service cards consume the shared three-stage luminous interaction model:

```text
idle
→ hover: lift ~2 px + stronger/faster spectral runner
→ pressed: return/compress + short bright pulse
```

Focus and reduced-motion are mandatory separate states.

## Rule

No new visible button, card or pseudo-control is added to BOOK-CRAFT without an Interaction Map entry.
