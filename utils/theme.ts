export const FONTS = [
  "sans",
  "serif",
  "rounded",
  "monospaced",
  "cursive",
  "handwritten",
  "comic",
  "old",
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
