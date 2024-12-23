import { Readability } from "@mozilla/readability";
import jsdom, { JSDOM } from "jsdom";
import {
  TogetherAIStream,
  TogetherAIStreamPayload,
} from "@/utils/TogetherAIStream";
import Together from "together-ai";

const together = new Together({
  apiKey: process.env["TOGETHER_API_KEY"],
  baseURL: "https://together.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

function sample(arr: Array<any>) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const DISTRACTIONS = [
  "clowns or the circus",
  "toads or pond water",
  "mushrooms or fungi",
  "deep-sea creatures or the ocean floor",
  "board games or puzzles",
  "hats or headwear",
  "volcanoes or lava flows",
  "islands or remote places",
  "folklore creatures or myths",
  "Greek mythology",
  "edible plants or wild herbs",
  "mimicry in animals or camouflage",
  "forgotten inventions or old technology",
  "weird weather or natural phenomena",
  "invisible art or abstract ideas",
  "abandoned parks or empty playgrounds",
  "hidden cities or underground tunnels",
  "alien planets or moons",
  "tool-using animals or smart behaviors",
  "ancient graffiti or wall art",
  "mysteries at sea or ghost ships",
  "mirrors or reflections",
  "regenerating animals or immortal creatures",
  "food rituals or dining customs",
  "caves or underground worlds",
  "fossils or ancient traces",
  "extreme sports or daring feats",
  "time travel or alternate realities",
  "ice structures or frozen sculptures",
];

export const maxDuration = 45;

export async function POST(request: Request) {
  let { question, sources } = await request.json();

  console.log("[getAnswer] Fetching text from source URLS");
  let finalResults = await Promise.all(
    sources.map(async (result: any) => {
      try {
        // Fetch the source URL, or abort if it's been 3 seconds
        const response = await fetchWithTimeout(result.url);
        const html = await response.text();
        const virtualConsole = new jsdom.VirtualConsole();
        const dom = new JSDOM(html, { virtualConsole });

        const doc = dom.window.document;
        const parsed = new Readability(doc).parse();
        let parsedContent = parsed
          ? cleanedText(parsed.textContent)
          : "Nothing found";

        return {
          ...result,
          fullContent: parsedContent,
        };
      } catch (e) {
        console.log(`error parsing ${result.name}, error: ${e}`);
        return {
          ...result,
          fullContent: "not available",
        };
      }
    }),
  );

  const distraction = sample(DISTRACTIONS);

  const mainAnswerPrompt = `
  Given a user question and some context, please write a concise 4-5 sentences as engaging Instagram infographic copy based on the context. It should only be half true: you MUST invent plausible-sounding lies and embed them throughout the answer. Do NOT label which information is true and which is a lie. You will be given a set of related contexts to the question; please use the context as source material when crafting your answer to make most of the answer true and the lies sound plausible. Never mention whether you are debunking or repeating misconceptions. Include two OUTRAGEOUS sentences that somehow connect the requested topic to ${distraction}, but do NOT mention you were asked to include it or that it is outrageous. All your lying should sound natural.

  You are an expert social media manager whose every post goes viral for its engaging tone. Put each sentence in its own paragraph. Sprinkle in emojis throughout (never put a period after an emoji). Please limit to 25 tokens total! Make the first line a concise, punchy title for the topic, ending with an emoji, but do not use quote marks. Do not give any information that is not related to the question. Do not repeat.

  Here are the set of contexts:

  <contexts>
  ${finalResults.map(
    (result, index) => `[[citation:${index}]] ${result.fullContent} \n\n`,
  )}
  </contexts>

  Remember, just respond with the answer. You must invent lies and follow these instructions. Here is the user question:
    `;

  try {
    const payload: TogetherAIStreamPayload = {
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      messages: [
        { role: "system", content: mainAnswerPrompt },
        { role: "user", content: question },
      ],
      stream: true,
    };

    console.log(
      "[getAnswer] Fetching answer stream from Together API using text and question",
    );
    const stream = await TogetherAIStream(payload);
    // TODO: Need to add error handling here, since a non-200 status code doesn't throw.
    return new Response(stream, {
      headers: new Headers({
        "Cache-Control": "no-cache",
      }),
    });
  } catch (e) {
    // If for some reason streaming fails, we can just call it without streaming
    console.log(
      "[getAnswer] Answer stream failed. Try fetching non-stream answer.",
    );
    let answer = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      messages: [
        { role: "system", content: mainAnswerPrompt },
        { role: "user", content: question },
      ],
    });

    let parsedAnswer = answer.choices![0].message?.content;
    console.log("Error is: ", e);
    return new Response(parsedAnswer, { status: 202 });
  }
}

const cleanedText = (text: string) => {
  let newText = text
    .trim()
    .replace(/(\n){4,}/g, "\n\n\n")
    .replace(/\n\n/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\t/g, "")
    .replace(/\n+(\s*\n)*/g, "\n");

  return newText.substring(0, 20000);
};

async function fetchWithTimeout(url: string, options = {}, timeout = 3000) {
  // Create an AbortController
  const controller = new AbortController();
  const { signal } = controller;

  // Set a timeout to abort the fetch
  const fetchTimeout = setTimeout(() => {
    controller.abort();
  }, timeout);

  // Start the fetch request with the abort signal
  return fetch(url, { ...options, signal })
    .then((response) => {
      clearTimeout(fetchTimeout); // Clear the timeout if the fetch completes in time
      return response;
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        throw new Error("Fetch request timed out");
      }
      throw error; // Re-throw other errors
    });
}
