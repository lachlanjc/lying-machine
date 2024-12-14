import Image from "next/image";
import { FC } from "react";
import InputArea from "./InputArea";

type THeroProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleDisplayResult: () => void;
};

const Hero: FC<THeroProps> = ({
  promptValue,
  setPromptValue,
  handleDisplayResult,
}) => {
  const handleClickSuggestion = (value: string) => {
    setPromptValue(value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 pb-12 pt-8 lg:pb-24">
      <h1 className="inline-block max-w-2xl text-balance bg-gradient-to-b from-violet-700 to-purple-500 bg-clip-text px-3 text-center font-heading text-6xl text-transparent lg:text-8xl lg:leading-[0.9]">
        Do Your Own “Research”
      </h1>
      {/* <p className="pb-8 text-center text-2xl leading-[normal] text-neutral-500">
        Search for anything 🤡
      </p> */}

      {/* input section */}
      <div className="w-full max-w-[708px]">
        <InputArea
          promptValue={promptValue}
          setPromptValue={setPromptValue}
          handleDisplayResult={handleDisplayResult}
        />
      </div>

      {/* Suggestions section */}
      <div className="flex max-w-2xl flex-wrap items-center justify-center gap-2.5">
        {suggestions.map((item) => (
          <div
            className="flex h-[35px] cursor-pointer items-center justify-center gap-[5px] rounded-full border border-solid border-purple-300 bg-purple-200 px-2.5 py-2 transition-colors hover:border-purple-400 hover:bg-purple-300"
            onClick={() => handleClickSuggestion(item?.name)}
            key={item.id}
          >
            {item.icon && (
              <Image
                unoptimized
                src={item.icon}
                alt={item.name}
                width={18}
                height={16}
              />
            )}
            <span className="text-sm font-light leading-[normal] text-purple-900">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

type suggestionType = {
  id: number;
  name: string;
  icon?: string;
};

const suggestions: suggestionType[] = [
  {
    id: 1,
    name: "How does fracking work?",
    icon: "/img/icon _leaf_.svg",
  },
  {
    id: 2,
    name: "How to learn to juggle",
    icon: "/img/icon _dumbell_.svg",
  },
  {
    id: 3,
    name: "How to make an HTTP request in JavaScript",
    icon: "/img/icon _atom_.svg",
  },
  {
    id: 4,
    name: "Fun facts about Charli xcx",
  },
];

export default Hero;
