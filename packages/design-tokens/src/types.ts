export type ThemeMode = "dark" | "light";

export type SemanticColorTokens = {
  canvas: string;
  surface: string;
  surfaceElevated: string;
  surfaceInteractive: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentStrong: string;
  border: string;
  borderStrong: string;
  focus: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
};

export type TypographyTokens = {
  fontFamilyUi: string;
  fontFamilyMono: string;
  sizeXs: string;
  sizeSm: string;
  sizeMd: string;
  sizeLg: string;
  sizeXl: string;
  size2xl: string;
  size3xl: string;
  lineTight: number;
  lineNormal: number;
  weightRegular: number;
  weightMedium: number;
  weightSemibold: number;
  weightBold: number;
};

export type MotionTokens = {
  durationInstant: string;
  durationFast: string;
  durationBase: string;
  durationSlow: string;
  durationCinematic: string;
  easingStandard: string;
  easingEmphasized: string;
  easingLinear: string;
};

export type FoundationTokens = {
  spacing: Record<string, string>;
  radius: Record<string, string>;
  blur: Record<string, string>;
  opacity: Record<string, number>;
  shadow: Record<string, string>;
  glow: Record<string, string>;
  depth: Record<string, number>;
  motion: MotionTokens;
  breakpoints: Record<string, string>;
  typography: TypographyTokens;
};

export type DesignTheme = {
  name: string;
  mode: ThemeMode;
  colors: SemanticColorTokens;
};

export type TokenBundle = {
  foundation: FoundationTokens;
  theme: DesignTheme;
};
