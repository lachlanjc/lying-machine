import Image from "next/image";
import SourceCard from "./SourceCard";

export default function Sources({
  sources,
  isLoading,
}: {
  sources: { name: string; url: string }[];
  isLoading: boolean;
}) {
  return (
    <div className="container h-auto w-full shrink-0 rounded-lg border border-solid border-stone-200 bg-white p-5 lg:p-10">
      <h3 className="font-heading -mt-1 mb-4 text-4xl uppercase tracking-wide text-stone-400">
        Dare to confirm?
      </h3>
      <div className="grid w-full content-center items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <div className="h-20 w-full animate-pulse rounded-md bg-stone-300" />
            <div className="h-20 w-full animate-pulse rounded-md bg-stone-300" />
            <div className="h-20 w-full animate-pulse rounded-md bg-stone-300" />
            <div className="h-20 w-full animate-pulse rounded-md bg-stone-300" />
            <div className="h-20 w-full animate-pulse rounded-md bg-stone-300" />
            <div className="h-20 w-full animate-pulse rounded-md bg-stone-300" />
          </>
        ) : sources.length > 0 ? (
          sources.map((source) => (
            <SourceCard source={source} key={source.url} />
          ))
        ) : (
          <div>Could not fetch sources.</div>
        )}
      </div>
    </div>
  );
}
