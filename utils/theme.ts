export const FONTS = [
  "sans",
  "rounded",
  "serif",
  "fancy",
  "old",
  "monospaced",
  "cursive",
  "handwritten",
  "cutesy",
  "comic",
  "techno",
  "arcade",
  "pixel",
] as const;

interface Color {
  hex: string;
  name: string;
}

export interface Theme {
  font: (typeof FONTS)[number];
  colors: Array<Color>;
}
