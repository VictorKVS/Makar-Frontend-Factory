# Design Tokens Usage

## Purpose

`@father/design-tokens` is the shared visual contract for FATHER applications, interactive experiences and future games.

The package separates:

- **foundation tokens** — spacing, radius, blur, depth, motion, breakpoints and typography;
- **semantic theme tokens** — canvas, surfaces, text, accent, borders and statuses.

Applications must consume semantic roles instead of scattering raw colors across components.

## TypeScript

```ts
import {
  alinaCinematicTokens,
  createTokenBundle,
  fatherDarkTheme,
  toCssVariables,
} from "@father/design-tokens";

const defaultTokens = createTokenBundle(fatherDarkTheme);
const css = toCssVariables(alinaCinematicTokens);
```

## CSS variables

```ts
import { alinaCinematicTokens, toCssVariables } from "@father/design-tokens";

const css = toCssVariables(
  alinaCinematicTokens,
  "[data-theme='alina']",
  "father"
);
```

The generated variables follow a predictable namespace, for example:

```css
--father-theme-colors-accent: #62D6FF;
--father-foundation-spacing-4: 16px;
--father-foundation-motion-duration-base: 220ms;
--father-foundation-depth-avatar: 70;
```

## Rules

1. Components should prefer semantic tokens such as `accent`, `surface` and `textPrimary`.
2. New themes should reuse the same semantic schema.
3. ALINA-specific presentation belongs in an ALINA theme, not in the base token contract.
4. Game projects may add their own theme without changing the common foundation.
5. Reduced-motion handling will be implemented at the consumer/theme layer using the shared motion scale.
