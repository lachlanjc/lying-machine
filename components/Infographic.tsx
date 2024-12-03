import { useState, useRef } from "react";
import { useScreenshot } from "@/utils/useScreenshot";
import { Theme, FONTS } from "@/utils/theme";
import {
  Spectral,
  Bangers,
  Knewave,
  Lacquer,
  Lugrasimo,
  Geist,
  Geist_Mono,
  Playwrite_AU_QLD,
  Jersey_10,
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
const knewave = Knewave({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-knewave",
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
const jersey10 = Jersey_10({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jersey10",
});

const FONT_MAPPING: Record<Theme["font"], string> = {
  sans: "var(--font-geist)",
  serif: "var(--font-spectral)",
  rounded: "var(--font-nunito)",
  monospaced: "var(--font-geist-mono)",
  cursive: "var(--font-playwrite)",
  handwritten: "var(--font-knewave)",
  comic: "var(--font-bangers)",
  old: "var(--font-lugrasimo)",
  pixel: "var(--font-jersey10)",
};

const FONT_SIZE_MAPPING: Record<Theme["font"], number> = {
  sans: 1,
  serif: 1,
  rounded: 1,
  monospaced: 0.9,
  cursive: 0.8,
  handwritten: 0.9,
  comic: 1,
  old: 0.8,
  pixel: 1.25,
};

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
      className={`grid gap-6 md:grid-cols-[2fr_256px] ${[geist.variable, geistMono.variable, knewave.variable, lacquer.variable, bangers.variable, spectral.variable, lugrasimo.variable, playwrite.variable, jersey10.variable].join(" ")}`}
    >
      <div>
        <div
          ref={ref}
          className="auto-contrast flex aspect-square max-w-[32rem] flex-col gap-6 p-8"
          style={{
            fontFamily: FONT_MAPPING[selectedFont],
            fontSize: 18 * FONT_SIZE_MAPPING[selectedFont],
            backgroundColor: "var(--color)",
            // @ts-expect-error custom properties
            "--color": selectedColor?.hex ?? "#eee",
            // "--font": FONT_MAPPING[font],
          }}
          contentEditable
        >
          <p className="font-bold">Fracking: Breaking rocks to fuel us! 💧🛢️</p>
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
        </div>
      </div>
      <section className="flex flex-col gap-4 border-l-gray-200 md:border-l md:pl-5">
        <button
          onClick={downloadScreenshot}
          className="w-full rounded-md bg-red-500 py-2 text-center font-bold text-white"
        >
          Download
        </button>
        <h2 className="-mb-2 text-lg font-bold">Font</h2>
        <div className="flex flex-col">
          {FONTS.map((font) => (
            <button
              key={font}
              className="flex items-center gap-3 border-b border-b-gray-100 py-2 capitalize aria-selected:text-blue-600"
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
        <h2 className="text-lg font-bold">Color</h2>
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
