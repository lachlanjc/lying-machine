import { NextResponse } from "next/server";
import Together from "together-ai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Color, Theme, FONTS, PATTERN_KEYS, PATTERNS } from "@/utils/theme";

const together = new Together({
  apiKey: process.env["TOGETHER_API_KEY"],
  baseURL: "https://together.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

export async function POST(request: Request) {
  let { question } = await request.json();

  const schema = z.object({
    colors: z
      .array(
        z.object({
          name: z
            .string()
            .describe("A unique, human-readable name for the color"),
          hex: z
            .string()
            .regex(/^#[0-9a-f]{6}$/i)
            .describe("The color as a hex code"),
        }),
      )
      .length(6),
    font: z.enum(FONTS),
    pattern: z.enum(PATTERN_KEYS),
  });
  const jsonSchema = zodToJsonSchema(schema, "mySchema");

  const themeResponse = await together.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a great designer. You pick hex color codes and fonts for a theme.`,
      },
      {
        role: "user",
        content: `The theme is "${question}". First, generate a few hex code colors related to the theme that pair elegantly together: each color name should be human readable, descriptive, unique, and related to the theme, but NOT include the name of the theme. Second, pick a relevant font of the options: ${FONTS.join(", ")}. Third, pick a relevant pattern of the options: ${PATTERN_KEYS.join(", ")}.`,
      },
    ],
    // @ts-ignore
    response_format: { type: "json_object", schema: jsonSchema },
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  });

  let themeString =
    themeResponse.choices?.[0].message?.content ||
    JSON.stringify({
      font: "sans",
      colors: [
        { name: "Red", hex: "#FF0000" },
        { name: "Orange", hex: "#FFA500" },
        { name: "Yellow", hex: "#FFFF00" },
        { name: "Green", hex: "#00FF00" },
        { name: "Blue", hex: "#0000FF" },
        { name: "Purple", hex: "#800080" },
      ],
      pattern: null,
    });
  let theme = JSON.parse(themeString);
  if (theme.pattern) {
    const patternKey = theme.pattern as Theme["pattern"];
    if (patternKey) {
      theme.pattern = PATTERNS[patternKey]?.image || null;
    }
  }
  console.log(JSON.stringify(theme));

  return NextResponse.json(theme);
}
