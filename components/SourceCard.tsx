import Image from "next/image";

const SourceCard = ({ source }: { source: { name: string; url: string } }) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={source.url}
      className="flex h-[79px] w-full items-center gap-2.5 rounded border border-solid border-[#C1C1C1] bg-neutral-50 px-1.5 py-1 md:w-auto"
    >
      <div className="">
        <Image
          unoptimized
          src={`https://www.google.com/s2/favicons?domain=${source.url}&sz=128`}
          alt={source.url}
          className="p-1"
          width={44}
          height={44}
        />
      </div>
      <div className="flex max-w-[192px] flex-col justify-center">
        <h6 className="line-clamp-2 text-sm font-light leading-[normal] text-[#1B1B16]">
          {source.name}
        </h6>
        <small className="truncate text-sm font-light text-[#1B1B16]/30">
          {source.url}
        </small>
      </div>
    </a>
  );
};

export default SourceCard;
