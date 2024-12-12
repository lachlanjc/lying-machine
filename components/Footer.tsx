import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="container flex min-h-[72px] items-center justify-between border-t border-[#D2D2D2] pb-3 pt-5 lg:min-h-[72px] lg:px-0 lg:py-5">
        <a href="https://lachlanjc.com" className="flex items-center gap-2.5">
          {/* <Image
            unoptimized
            src="/img/logo.svg"
            alt="footer"
            width={31}
            height={30}
          /> */}
          <span className="leading-[normal] text-neutral-500">
            by @lachlanjc
          </span>
        </a>
        <div className="flex items-center gap-4">
          <Link
            href={"https://github.com/lachlanjc/lying-machine"}
            target="_blank"
          >
            <Image
              unoptimized
              src={"/img/github-footer.svg"}
              alt="github"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
