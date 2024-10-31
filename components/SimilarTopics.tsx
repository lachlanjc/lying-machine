import Image from "next/image";

const SimilarTopics = ({
  similarQuestions,
  handleDisplayResult,
  reset,
}: {
  similarQuestions: string[];
  handleDisplayResult: (item: string) => void;
  reset: () => void;
}) => {
  return (
    <div className="container flex h-auto w-full shrink-0 flex-col gap-4 rounded-lg border border-solid border-stone-200 bg-white p-5 lg:p-10">
      {/* <div className="hidden lg:block">
        <Image
          unoptimized
          src="/img/similarTopics.svg"
          alt="footer"
          width={24}
          height={24}
        />
      </div> */}
      {/* <div className="flex-1 divide-y divide-[#E5E5E5]"> */}
      {/* <div className="flex gap-4 pb-3"> */}
      {/* <Image
            unoptimized
            src="/img/similarTopics.svg"
            alt="footer"
            width={24}
            height={24}
            className="block lg:hidden"
          /> */}
      <h3 className="font-heading -mt-1 text-4xl uppercase tracking-wide text-stone-400">
        Keep exploring
      </h3>
      {/* </div> */}

      <div className="">
        {similarQuestions.length > 0 ? (
          similarQuestions.map((item) => (
            <button
              className="flex w-full cursor-pointer items-center gap-4 border-t border-stone-200 py-3.5"
              key={item}
              onClick={() => {
                reset();
                handleDisplayResult(item);
              }}
            >
              <div className="flex items-center">
                <Image
                  unoptimized
                  src="/img/arrow-circle-up-right.svg"
                  alt="footer"
                  width={24}
                  height={24}
                />
              </div>
              <p className="text-sm font-light leading-[normal] text-[#1B1B16] [leading-trim:both] [text-edge:cap]">
                {item}
              </p>
            </button>
          ))
        ) : (
          <>
            <div className="h-10 w-full animate-pulse rounded-md bg-stone-300" />
            <div className="h-10 w-full animate-pulse rounded-md bg-stone-300" />
            <div className="h-10 w-full animate-pulse rounded-md bg-stone-300" />
          </>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export default SimilarTopics;
