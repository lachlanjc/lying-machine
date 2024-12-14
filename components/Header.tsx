import Marquee from "react-fast-marquee";

export default function Header() {
  return (
    <header className="block h-[48px] w-full" aria-hidden>
      <Marquee
        className="auto-contrast bg-[--color-primary] py-3"
        autoFill
        style={{ backgroundImage: "var(--pattern, none)" }}
      >
        <span className="font-xl px-4 font-bold italic">
          #DoYourOwnResearch
        </span>
      </Marquee>
    </header>
  );
}
