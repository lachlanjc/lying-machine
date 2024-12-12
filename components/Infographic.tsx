import { useState, useRef, PropsWithChildren } from "react";
import { useScreenshot } from "@/utils/useScreenshot";
import { Theme, FONTS } from "@/utils/theme";
import {
  Spectral,
  Bangers,
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
  monospaced: 0.9,
  cursive: 0.8,
  handwritten: 1.25,
  cutesy: 1,
  comic: 1.1,
  oldstyle: 0.875,
  techno: 1,
  arcade: 0.75,
  pixel: 1.1,
};

function Slide({
  font,
  color,
  style,
  children,
}: PropsWithChildren<{
  font: Theme["font"];
  color: Theme["colors"][number];
  style?: Partial<React.CSSProperties>;
}>) {
  return (
    <div
      className="auto-contrast relative flex aspect-square w-[32rem] flex-shrink-0 snap-start break-inside-avoid flex-col gap-6 p-8 leading-snug outline-none"
      style={
        {
          fontFamily: FONT_MAPPING[font],
          fontSize: "var(--font-size)",
          backgroundColor: "var(--color-primary)",
          "--color-primary": color?.hex ?? "#eee",
          "--font-size": `${18 * FONT_SIZE_MAPPING[font]}px`,
          ...style,
        } as React.CSSProperties
      }
      contentEditable
    >
      <svg id="texture" className="texture">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      {children}
    </div>
  );
}

function Infographic({
  theme: { colors, font: initialFont },
}: {
  theme: Theme;
}) {
  const [selectedColor, setSelectedColor] = useState(colors?.[0]);
  const [selectedFont, setSelectedFont] = useState<Theme["font"]>(initialFont);
  const ref = useRef<HTMLDivElement | null>(null);

  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const downloadScreenshot = () =>
    takeScreenShot(ref.current!).then(() => {
      const a = document.createElement("a");
      a.href = image ?? "";
      a.download = "lies.jpg";
      a.click();
    });

  return (
    <section
      className={`grid items-center gap-6 md:grid-cols-[2fr_256px] md:pl-8 ${[geist.variable, geistMono.variable, facultyGlyphic.variable, caveat.variable, lacquer.variable, bangers.variable, spectral.variable, lugrasimo.variable, playwrite.variable, hachiMaru.variable, tektur.variable, pixelifySans.variable, pressStart.variable].join(" ")}`}
    >
      <div
        ref={ref}
        className="my-4 flex snap-x snap-mandatory gap-8 overflow-x-auto print:flex-col"
      >
        <Slide
          font={selectedFont}
          color={selectedColor}
          style={
            {
              backgroundImage:
                "linear-gradient(to bottom, var(--color-primary--tint-50), var(--color-primary))",
            } as React.CSSProperties
          }
        >
          <p className="text-6xl font-bold">
            Fracking: Breaking rocks to fuel us! 💧🛢️
          </p>
        </Slide>
        <Slide font={selectedFont} color={selectedColor}>
          <p>
            Hydraulic fracturing (aka fracking) involves injecting water, sand,
            and chemicals deep underground to crack shale rocks and release
            trapped oil and gas. 🌍⚡
          </p>
          <p>
            It’s revolutionized energy production, but it’s also raised concerns
            about water usage, pollution, and earthquakes. 🌊⚠️
          </p>
          <p>
            So, is fracking a game-changer or a gamble? The answer depends on
            how we balance its risks and rewards. 🤔⚖️
          </p>
        </Slide>
      </div>
      <section className="flex h-screen flex-col gap-4 border-l-gray-200 bg-white p-4 md:border-l md:p-6 print:hidden">
        <button
          onClick={downloadScreenshot}
          className="w-full rounded-md bg-red-500 py-2 text-center font-bold text-white transition-colors hover:bg-red-600"
        >
          Download
        </button>
        <h2 className="-mb-2 text-lg font-bold">Font</h2>
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
        <h2 className="text-lg font-bold">Background</h2>
        <div className="flex flex-col gap-3">
          {colors.map((color) => (
            <button
              className="flex items-center gap-2 aria-selected:font-bold"
              aria-selected={selectedColor?.hex === color.hex}
              style={{ "--color": color.hex } as React.CSSProperties}
              onClick={() => setSelectedColor(color)}
              key={color.hex}
            >
              <div className="h-6 w-6 rounded-full bg-[--color]" />
              <small>{color.name}</small>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Infographic;
