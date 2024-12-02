import { useState } from "react";
import useSound from "use-sound";

function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound("/music.mp3", {
    volume: 0.25,
    onend: () => setIsPlaying(false),
  });
  return (
    <button
      onClick={() => {
        if (isPlaying) {
          stop();
          setIsPlaying(false);
          return;
        } else {
          play();
          setIsPlaying(true);
        }
      }}
      className="text-stone-500 transition-colors hover:text-red-500"
      title={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26 16C26 21.523 21.523 26 16 26C10.477 26 6 21.523 6 16C6 10.477 10.477 6 16 6C21.523 6 26 10.477 26 16ZM28 16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16C4 9.373 9.373 4 16 4C22.627 4 28 9.373 28 16Z"
          />

          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 16C4 22.627 9.373 28 16 28C22.627 28 28 22.627 28 16C28 9.373 22.627 4 16 4C9.373 4 4 9.373 4 16ZM26 16C26 21.523 21.523 26 16 26C10.477 26 6 21.523 6 16C6 10.477 10.477 6 16 6C21.523 6 26 10.477 26 16ZM15 18.5C15 19.5035 14.8625 19.9305 14.6465 20.1465C14.4305 20.3625 14.0035 20.5 13 20.5C11.9965 20.5 11.5695 20.3625 11.3535 20.1465C11.1375 19.9305 11 19.5035 11 18.5V13.5C11 12.4965 11.1375 12.0695 11.3535 11.8535C11.5695 11.6375 11.9965 11.5 13 11.5C14.0035 11.5 14.4305 11.6375 14.6465 11.8535C14.8625 12.0695 15 12.4965 15 13.5V18.5ZM20.6465 20.1465C20.8625 19.9305 21 19.5035 21 18.5V13.5C21 12.4965 20.8625 12.0695 20.6465 11.8535C20.4305 11.6375 20.0035 11.5 19 11.5C17.9965 11.5 17.5695 11.6375 17.3535 11.8535C17.1375 12.0695 17 12.4965 17 13.5V18.5C17 19.5035 17.1375 19.9305 17.3535 20.1465C17.5695 20.3625 17.9965 20.5 19 20.5C20.0035 20.5 20.4305 20.3625 20.6465 20.1465Z"
          />
        </svg>
      ) : (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26 16C26 21.523 21.523 26 16 26C10.477 26 6 21.523 6 16C6 10.477 10.477 6 16 6C21.523 6 26 10.477 26 16ZM28 16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16C4 9.373 9.373 4 16 4C22.627 4 28 9.373 28 16Z"
          />
          <path d="M18.668 15.1755C18.825 15.3835 19 15.6645 19 16.0005C19 16.3355 18.825 16.6175 18.668 16.8255L18.667 16.8265C17.818 17.9295 16.689 18.7885 15.59 19.6245C15.403 19.7665 15.218 19.9075 15.034 20.0495C14.641 20.3535 14.057 20.3085 13.724 19.9365C13.5709 19.766 13.4981 19.5578 13.5004 19.3517L13.5 12.6406C13.4998 12.4371 13.5728 12.2319 13.724 12.0635C14.057 11.6925 14.64 11.6455 15.034 11.9505L15.035 11.9515C15.209 12.0855 15.386 12.2215 15.565 12.3575L15.5682 12.3599C16.6652 13.1972 17.8318 14.0876 18.667 15.1735L18.668 15.1755Z" />
        </svg>
      )}
    </button>
  );
}

const Header = () => {
  return (
    <header className="container mx-auto flex justify-between py-4 text-center">
      <a href="/" className="text-4xl" title="The Lying Machine">
        🤡
      </a>
      <MusicButton />
    </header>
  );
};

export default Header;
