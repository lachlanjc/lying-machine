import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import Markdown from "react-markdown";

export default function Answer({ answer }: { answer: string }) {
  return (
    <div className="container relative h-auto w-full shrink-0 gap-4 rounded-lg border border-solid border-stone-200 bg-white p-5 lg:p-10">
      {answer && (
        <div className="absolute right-4 top-4 flex items-center gap-3">
          {/* <Image unoptimized
                src="/img/link.svg"
                alt="footer"
                width={20}
                height={20}
                className="cursor-pointer"
              /> */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(answer.trim());
              toast("Answer copied to clipboard", {
                icon: "✂️",
              });
            }}
          >
            <Image
              unoptimized
              src="/img/copy.svg"
              alt="footer"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
          {/* <Image unoptimized
                src="/img/share.svg"
                alt="footer"
                width={20}
                height={20}
                className="cursor-pointer"
              /> */}
        </div>
      )}
      <div className="flex flex-wrap content-center items-center gap-[15px]">
        <div className="w-full whitespace-pre-wrap text-lg leading-[152.5%] text-black">
          {answer ? (
            <Markdown children={answer.trim()} />
          ) : (
            <div className="flex w-full flex-col gap-2">
              <div className="h-6 w-full animate-pulse rounded-md bg-stone-300" />
              <div className="h-6 w-full animate-pulse rounded-md bg-stone-300" />
              <div className="h-6 w-full animate-pulse rounded-md bg-stone-300" />
              <div className="h-6 w-full animate-pulse rounded-md bg-stone-300" />
            </div>
          )}
        </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  );
}
