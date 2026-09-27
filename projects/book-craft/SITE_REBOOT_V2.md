# BOOK-CRAFT — Site Reboot v2

## Decision

The current local web shell is not used as the production base.

BOOK-CRAFT is rebooted as a clean, isolated frontend application with a minimal working skeleton first.

## New local target

`G:\\1\\BOOKCRAFT-SITE`

The existing `G:\\1\\ALina -Book-Komiks` project is not deleted and remains a source/reference archive.

## Reboot sequence

1. create clean React/Vite app;
2. verify dev server opens;
3. verify production build;
4. place only structural UI:
   - header;
   - logo;
   - navigation;
   - auth/start actions;
   - hero copy;
   - CTA;
   - metrics;
   - hero placeholder;
   - HUD placeholders;
   - four service cards;
5. lock Desktop geometry;
6. only then add hero/environment assets;
7. visual QA;
8. tablet/phone recomposition;
9. motion after static acceptance.

## Rule

When a visual prototype or local shell becomes structurally unreliable, do not stack more patches on top of an unknown state.

Create an isolated clean application, prove the smallest working slice, then migrate only verified components.

## Acceptance for Stage 0

- dev server opens in browser;
- no blank page;
- React root renders;
- production build passes;
- header, hero and cards are visible;
- no external API required;
- no hero image required;
- no animation required.

## Core principle

**Working skeleton first. Beauty only after the shell is stable.**
