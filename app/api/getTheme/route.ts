import { NextResponse } from "next/server";
import Together from "together-ai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { FONTS } from "@/utils/theme";

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
        content: `The theme is "${question}". Generate a few hex code colors related to the theme: each color name should be human readable, descriptive, unique, and related to the theme, but NOT include the name of the theme. Also pick a relevant font of the options: ${FONTS.join(", ")}.`,
      },
    ],
    // @ts-ignore
    response_format: { type: "json_object", schema: jsonSchema },
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  });

  let theme =
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
    });
  console.log(theme);

  return NextResponse.json(JSON.parse(theme));
}
