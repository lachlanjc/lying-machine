import Image from "next/image";

const SourceCard = ({ source }: { source: { name: string; url: string } }) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={source.url}
      className="flex h-[79px] w-full items-center gap-2 rounded border border-solid border-stone-200 bg-stone-50 px-3 py-2"
    >
      <div className="flex max-w-full flex-auto flex-col justify-center">
        <h6 className="line-clamp-2 max-w-full text-sm font-bold leading-[normal] leading-tight text-stone-700">
          {source.name}
        </h6>
        <small className="max-w-full truncate text-sm font-light text-stone-400">
          {new URL(source.url).host?.replace("www.", "")}
        </small>
      </div>
      <Image
        unoptimized
        src={`https://www.google.com/s2/favicons?domain=${source.url}&sz=128`}
        alt={source.url}
        width={32}
        height={32}
        className="flex-shrink-0"
      />
    </a>
  );
};

export default SourceCard;
