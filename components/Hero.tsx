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
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-heading pb-6 pt-2 text-center text-4xl leading-[normal] text-red-500 lg:text-8xl">
        The Lying Machine
      </h1>
      {/* <p className="pb-8 text-center text-2xl leading-[normal] text-stone-500">
        Search for anything 🤡
      </p> */}

      {/* input section */}
      <div className="w-full max-w-[708px] pb-6">
        <InputArea
          promptValue={promptValue}
          setPromptValue={setPromptValue}
          handleDisplayResult={handleDisplayResult}
        />
      </div>

      {/* Suggestions section */}
      <div className="flex max-w-2xl flex-wrap items-center justify-center gap-2.5 pb-[30px]">
        {suggestions.map((item) => (
          <div
            className="flex h-[35px] cursor-pointer items-center justify-center gap-[5px] rounded-full border border-solid border-[#C1C1C1] bg-[#EDEDEA] px-2.5 py-2"
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
                className="w-[18px]"
              />
            )}
            <span className="text-sm font-light leading-[normal] text-[#1B1B16]">
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
