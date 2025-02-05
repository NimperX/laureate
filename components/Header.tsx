import { Dispatch, SetStateAction } from "react";

interface Props {
  setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setIsPanelOpen }: Props) {
  return (
    <header className="flex items-center justify-between gap-x-4 bg-white px-4 py-2 shadow">
      <img src="/laureate-logo.svg" alt="laureate logo" className="" />
      <form className="w-1/2">
        <input
          className="w-full rounded-full bg-slate-200 px-6 py-2.5 text-sm"
          type="text"
          placeholder="Paste tweet link here"
        />
      </form>
      <div className="flex gap-x-3">
        <button>
          <img src="/moon.svg" alt="moon icon" />
        </button>
        <button>
          <img
            onClick={() => setIsPanelOpen((c) => !c)}
            src="/flap.svg"
            alt="flap icon"
          />
        </button>
      </div>
    </header>
  );
}
