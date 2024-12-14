import { useState, useRef, PropsWithChildren } from "react";
import { useScreenshot } from "@/utils/useScreenshot";
import { Theme, FONTS } from "@/utils/theme";
import {
  Spectral,
  Bangers,
  Modak,
  Nunito,
  Lacquer,
  Lugrasimo,
  Faculty_Glyphic,
  Geist,
  Geist_Mono,
  Playwrite_AU_QLD,
  Press_Start_2P,
  Tektur,
  Hachi_Maru_Pop,
  Pixelify_Sans,
  Caveat,
} from "next/font/google";
import title from "title";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-geist",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-geist-mono",
});
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spectral",
});
const facultyGlyphic = Faculty_Glyphic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-faculty-glyphic",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caveat",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});
const modak = Modak({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-modak",
});
const bangers = Bangers({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bangers",
});
const lugrasimo = Lugrasimo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lugrasimo",
});
const lacquer = Lacquer({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lacquer",
});
const playwrite = Playwrite_AU_QLD({
  weight: ["400"],
  variable: "--font-playwrite",
});
const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixelify-sans",
});
const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start-2p",
});
const tektur = Tektur({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tektur",
});
const hachiMaru = Hachi_Maru_Pop({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-hachi-maru-pop",
});

const FONT_MAPPING: Record<Theme["font"], string> = {
  sans: "var(--font-geist)",
  rounded: "var(--font-nunito)",
  fancy: "var(--font-faculty-glyphic)",
  serif: "var(--font-spectral)",
  oldstyle: "var(--font-lugrasimo)",
  monospaced: "var(--font-geist-mono)",
  cursive: "var(--font-playwrite)",
  handwritten: "var(--font-caveat)",
  cutesy: "var(--font-hachi-maru-pop)",
  comic: "var(--font-bangers)",
  techno: "var(--font-tektur)",
  arcade: "var(--font-press-start-2p)",
  pixel: "var(--font-pixelify-sans)",
};

const FONT_SIZE_MAPPING: Record<Theme["font"], number> = {
  sans: 1,
  serif: 1,
  rounded: 1,
  fancy: 1,
  monospaced: 0.9,
  cursive: 0.8,
  handwritten: 1.25,
  cutesy: 0.8,
  comic: 1.1,
  oldstyle: 0.875,
  techno: 1,
  arcade: 0.75,
  pixel: 0.9,
};

function Slide({
  // font,
  // color,
  style,
  children,
}: PropsWithChildren<{
  // font: Theme["font"];
  // color: Theme["colors"][number];
  style?: Partial<React.CSSProperties>;
}>) {
  return (
    <div
      className="auto-contrast relative flex aspect-square w-[32rem] flex-shrink-0 origin-top-left snap-start break-inside-avoid flex-col justify-center gap-6 p-8 leading-tight outline-none max-md:scale-50"
      style={
        {
          fontFamily: "var(--font-family)",
          fontSize: "var(--font-size)",
          backgroundColor: "var(--color-primary)",
          ...style,
        } as React.CSSProperties
      }
      contentEditable
      suppressContentEditableWarning
    >
      {children}
    </div>
  );
}

function getPatternBackground(pattern: string, color: string) {
  const opacity = 0.125;
  const svg = pattern
    .replace(
      'fill="#000"',
      'fill="' + color + '" fill-opacity="' + opacity + '"',
    )
    .replace(/\"/g, "'")
    .replace(/\</g, "%3C")
    .replace(/\>/g, "%3E")
    .replace(/\&/g, "%26")
    .replace(/\#/g, "%23");
  return 'url("data:image/svg+xml,' + svg + '")';
}

function Infographic({
  theme: { colors = [], font: initialFont, pattern },
  question,
  answer,
}: {
  theme: Theme;
  question: string;
  answer: string;
}) {
  const [selectedColor, setSelectedColor] = useState(colors?.[0]);
  const [selectedFont, setSelectedFont] = useState<Theme["font"]>(initialFont);
  const ref = useRef<HTMLDivElement | null>(null);
  const sentences = answer?.split("\n\n") ?? [];

  const [image, takeScreenShot] = useScreenshot({
    type: "image/png",
    quality: 1.0,
  });

  const downloadScreenshot = () =>
    takeScreenShot(ref.current!).then(() => {
      const a = document.createElement("a");
      a.href = image ?? "";
      a.download = `${question.toLowerCase().replaceAll(/\s/g, "-")}.png`;
      a.click();
    });

  return (
    <section
      className={`gridded relative grid items-start gap-6 md:grid-cols-[1fr_256px] ${[geist.variable, geistMono.variable, facultyGlyphic.variable, caveat.variable, lacquer.variable, bangers.variable, modak.variable, nunito.variable, spectral.variable, lugrasimo.variable, playwrite.variable, hachiMaru.variable, tektur.variable, pixelifySans.variable, pressStart.variable].join(" ")}`}
    >
      <style>{`
        :root {
          --color-primary: ${selectedColor?.hex ?? "#eee"};
          --pattern: ${
            pattern ? getPatternBackground(pattern, "#000") : "none"
          };
        }
      `}</style>
      <div
        ref={ref}
        className="auto-color m-8 flex w-fit flex-wrap gap-8"
        style={
          {
            "--color-primary": selectedColor?.hex ?? "#eee",
            "--font-family": FONT_MAPPING[selectedFont],
            "--font-size": `${18 * FONT_SIZE_MAPPING[selectedFont]}px`,
          } as React.CSSProperties
        }
      >
        <Slide
          style={
            {
              // backgroundImage: "linear-gradient(to top, var(--color-primary--tint-50), var(--color-primary))",
              backgroundImage: "var(--pattern)",
            } as React.CSSProperties
          }
        >
          <p
            className="text-balance font-medium leading-[1.1]"
            style={{ fontSize: "calc(3 * var(--font-size))" }}
          >
            {sentences[0]}
          </p>
        </Slide>
        {sentences.slice(1).map((line, i) => (
          <Slide
            key={line}
            style={
              {
                "--color-primary":
                  colors[i % colors.length]?.hex ??
                  selectedColor?.hex ??
                  "#eee",
              } as React.CSSProperties
            }
          >
            <p
              style={{ fontSize: "calc(1.75 * var(--font-size))" }}
              className="text-pretty"
            >
              {line}
            </p>
          </Slide>
        ))}
      </div>
      <section className="bottom-0 flex h-full max-w-[100vw] flex-col gap-4 border-l-gray-200 bg-white p-4 md:border-l md:p-6 print:hidden">
        <button
          onClick={downloadScreenshot}
          className="auto-color auto-contrast w-full rounded-full bg-[--color-primary] py-2 text-center font-medium transition-colors hover:bg-[--color-primary--tint-20]"
          style={
            {
              "--color-primary": selectedColor?.hex ?? "#aaa",
            } as React.CSSProperties
          }
        >
          Download
        </button>
        <h2 className="-mb-2 text-lg font-medium">Font</h2>
        <div className="flex flex-col">
          {FONTS.map((font) => (
            <button
              key={font}
              className="flex items-center gap-3 border-b border-b-gray-100 py-1.5 capitalize aria-selected:text-blue-600"
              aria-selected={selectedFont === font}
              onClick={() => setSelectedFont(font)}
              style={{
                fontFamily: FONT_MAPPING[font],
                fontSize: 16 * FONT_SIZE_MAPPING[font],
              }}
            >
              {font}
            </button>
          ))}
        </div>
        <h2 className="text-lg font-medium">Starting color</h2>
        <div className="flex flex-col gap-3">
          {colors.map((color) => (
            <button
              className="flex items-center gap-2 aria-selected:font-medium"
              aria-selected={selectedColor?.hex === color.hex}
              style={{ "--color": color.hex } as React.CSSProperties}
              onClick={() => setSelectedColor(color)}
              key={color.hex}
            >
              <div className="h-6 w-6 rounded-full bg-[--color] shadow-inner" />
              <small>{title(color.name)}</small>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Infographic;
