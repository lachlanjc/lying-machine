import Image from "next/image";

const SourceCard = ({ source }: { source: { name: string; url: string } }) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={source.url}
      className="flex h-20 w-[300px] flex-shrink-0 cursor-pointer snap-start items-start gap-2 rounded border border-solid border-neutral-200 bg-neutral-50 p-3 transition-transform hover:-translate-y-1"
    >
      <Image
        unoptimized
        src={`https://www.google.com/s2/favicons?domain=${source.url}&sz=128`}
        alt={source.url}
        width={24}
        height={24}
        className="flex-shrink-0"
      />
      <div className="flex max-w-full flex-auto flex-col justify-center">
        <h6 className="line-clamp-2 max-w-full text-sm font-bold leading-[normal] leading-tight text-stone-700">
          {source.name}
        </h6>
        <small className="max-w-full truncate text-sm font-light text-neutral-400">
          {new URL(source.url).host?.replace("www.", "")}
        </small>
      </div>
    </a>
  );
};

export default SourceCard;
