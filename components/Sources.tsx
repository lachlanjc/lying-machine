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
    <div className="flex w-full shrink-0 snap-x snap-mandatory scroll-px-4 items-center gap-4 overflow-x-auto border-y border-neutral-200 bg-white p-4 lg:scroll-px-8 lg:px-8">
      {isLoading ? (
        <>
          <div className="h-20 w-[300px] animate-pulse rounded-md bg-neutral-300" />
          <div className="h-20 w-[300px] animate-pulse rounded-md bg-neutral-300" />
          <div className="h-20 w-[300px] animate-pulse rounded-md bg-neutral-300" />
          <div className="h-20 w-[300px] animate-pulse rounded-md bg-neutral-300" />
          <div className="h-20 w-[300px] animate-pulse rounded-md bg-neutral-300" />
          <div className="h-20 w-[300px] animate-pulse rounded-md bg-neutral-300" />
        </>
      ) : sources.length > 0 ? (
        sources.map((source) => <SourceCard source={source} key={source.url} />)
      ) : (
        <div>Could not fetch sources.</div>
      )}
    </div>
  );
}
