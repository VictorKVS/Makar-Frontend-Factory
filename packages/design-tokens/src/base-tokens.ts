import type { FoundationTokens } from "./types";

export const foundationTokens = {
  spacing: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
    20: "80px",
    24: "96px"
  },
  radius: {
    none: "0px",
    xs: "6px",
    sm: "10px",
    md: "14px",
    lg: "20px",
    xl: "28px",
    pill: "999px"
  },
  blur: {
    none: "0px",
    soft: "8px",
    glass: "18px",
    cinematic: "32px"
  },
  opacity: {
    disabled: 0.38,
    muted: 0.64,
    strong: 0.88,
    full: 1
  },
  shadow: {
    soft: "0 8px 24px rgb(0 0 0 / 0.18)",
    elevated: "0 18px 48px rgb(0 0 0 / 0.26)",
    cinematic: "0 28px 90px rgb(0 0 0 / 0.38)"
  },
  glow: {
    none: "none",
    soft: "0 0 18px rgb(76 201 255 / 0.18)",
    medium: "0 0 30px rgb(76 201 255 / 0.28)",
    strong: "0 0 48px rgb(76 201 255 / 0.42)"
  },
  depth: {
    background: 0,
    base: 10,
    panel: 20,
    dock: 30,
    overlay: 40,
    modal: 50,
    toast: 60,
    avatar: 70,
    system: 100
  },
  motion: {
    durationInstant: "80ms",
    durationFast: "140ms",
    durationBase: "220ms",
    durationSlow: "360ms",
    durationCinematic: "700ms",
    easingStandard: "cubic-bezier(0.2, 0, 0, 1)",
    easingEmphasized: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    easingLinear: "linear"
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    laptop: "1280px",
    desktop: "1600px",
    ultrawide: "2200px"
  },
  typography: {
    fontFamilyUi: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    fontFamilyMono: "\"JetBrains Mono\", \"SFMono-Regular\", Consolas, monospace",
    sizeXs: "12px",
    sizeSm: "14px",
    sizeMd: "16px",
    sizeLg: "20px",
    sizeXl: "24px",
    size2xl: "32px",
    size3xl: "44px",
    lineTight: 1.15,
    lineNormal: 1.5,
    weightRegular: 400,
    weightMedium: 500,
    weightSemibold: 600,
    weightBold: 700
  }
} as const satisfies FoundationTokens;
