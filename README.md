# The Lying Machine

An AI search engine that plays circus music and uses LLMs to answer your questions, tossing in a lie you may or may not notice, because we are all clowns for trusting these search results.

[**Try the site**](https://lying-machine.vercel.app) – [read the backstory](https://edu.lachlanjc.com/2024-10-31_um_lying_search_engine)

## Tech stack

- Next.js app router with Tailwind
- Together AI for LLM inference
- Llama-3 for the LLMs
- Serper for the search API
- Helicone for observability

## How it works

1. Take in a user's question
2. Make a request to the bing search API to look up the top 6 results and show them
3. Scrape text from the 6 links bing sent back and store it as context
4. Make a request to Llama with the user's question + context & stream it back to the user
5. Make another request to Llama to come up with 3 related questions the user can follow up with

## Cloning & running

1. Fork or clone the repo
2. Create an account at [Together AI](https://dub.sh/together-ai) for the LLM
3. Create an account at [SERP API](https://serper.dev/) or with Azure ([Bing Search API](https://www.microsoft.com/en-us/bing/apis/bing-web-search-api))
4. Create an account at [Helicone](https://www.helicone.ai/) for observability
5. Create a `.env` (use the `.example.env` for reference) and replace the API keys
6. Run `bun install` and `bun dev` to install dependencies and run locally
