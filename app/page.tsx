"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sources from "@/components/Sources";
import Infographic from "@/components/Infographic";
import { useRef, useState } from "react";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { Theme } from "@/utils/theme";
import title from "title";

const defaultTheme: Theme = { font: "sans", colors: [], pattern: null };

export default function Home() {
  const [promptValue, setPromptValue] = useState("");
  const [question, setQuestion] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [sources, setSources] = useState<{ name: string; url: string }[]>([]);
  const [isLoadingSources, setIsLoadingSources] = useState(false);
  const [answer, setAnswer] = useState("");
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [loading, setLoading] = useState(false);

  const handleDisplayResult = async (newQuestion?: string) => {
    newQuestion = newQuestion?.trim() || promptValue;

    setShowResult(true);
    setLoading(true);
    setQuestion(newQuestion);
    setPromptValue("");

    await Promise.all([
      handleSources(newQuestion),
      handleAnswer(newQuestion),
      handleTheme(newQuestion),
    ]);

    setLoading(false);
  };

  async function handleSources(question: string) {
    setIsLoadingSources(true);
    let sourcesResponse = await fetch("/api/getSources", {
      method: "POST",
      body: JSON.stringify({ question }),
    });
    if (sourcesResponse.ok) {
      let sources = await sourcesResponse.json();

      setSources(sources);
    } else {
      setSources([]);
    }
    setIsLoadingSources(false);
  }

  async function handleAnswer(question: string) {
    const response = await fetch("/api/getAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, sources }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    if (response.status === 202) {
      const fullAnswer = await response.text();
      setAnswer(fullAnswer);
      return;
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? "";
          setAnswer((prev) => prev + text);
        } catch (e) {
          console.error(e);
        }
      }
    };

    // https://web.dev/streams/#the-getreader-and-read-methods
    const reader = data.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParse);
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      parser.feed(chunkValue);
    }
  }

  async function handleTheme(question: string) {
    let res = await fetch("/api/getTheme", {
      method: "POST",
      body: JSON.stringify({ question }),
    });
    let theme = await res.json();
    setTheme(theme);
  }

  const refresh = () => {
    setLoading(true);
    setAnswer("");
    handleAnswer(question);
    setLoading(false);
  };

  const reset = () => {
    setShowResult(false);
    setPromptValue("");
    setQuestion("");
    setAnswer("");
    setSources([]);
    setTheme(defaultTheme);
  };

  return (
    <>
      <Header />
      {!showResult ? (
        <>
          <main className="h-full">
            <Hero
              promptValue={promptValue}
              setPromptValue={setPromptValue}
              handleDisplayResult={handleDisplayResult}
            />
          </main>
          <Footer />
        </>
      ) : (
        <main className="h-full">
          <div className="flex h-full w-full grow flex-col justify-between">
            <header className="flex flex-col px-4 pb-4 pt-12 lg:h-[124px] lg:flex-row lg:justify-between lg:gap-4 lg:px-8 lg:pb-4">
              <h1
                className="text-balance font-heading text-4xl text-neutral-700 transition-colors duration-500 lg:text-6xl"
                style={{ color: theme.colors[0]?.hex }}
              >
                “{title(question)}”
              </h1>
              <div className="-ml-3 flex gap-2">
                <button
                  className="scale-100 cursor-pointer p-4 transition-transform hover:scale-110"
                  onClick={refresh}
                >
                  {/* arrows in circle icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    opacity={0.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  >
                    <polyline points="1 4 1 10 7 10" />
                    <polyline points="23 20 23 14 17 14" />
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                  </svg>
                </button>
                <button
                  className="scale-100 cursor-pointer p-4 transition-transform hover:scale-110"
                  onClick={reset}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    opacity={0.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </header>
            {/* <Answer answer={answer} /> */}
            <Sources sources={sources} isLoading={isLoadingSources} />
            <Infographic theme={theme} answer={answer} question={question} />
          </div>
        </main>
      )}
    </>
  );
}
