"use client";

export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
    type="button"
    onClick={onToggle}
    role="switch"
    aria-checked={dark}
    aria-label="Toggle dark mode"
    className={`w-8 h-4 flex items-center rounded-full cursor-pointer
      transition-all duration-300 ease-in-out
      hover:scale-105 hover:shadow-md
      focus:outline-none focus:ring-2 focus:ring-primary/20
      ${
        dark
      ? "bg-primary/30 hover:bg-primary/40"
      : "bg-outline-variant/30 hover:bg-outline-variant/50"
  }`}
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md transition-all duration-300 ${
          dark ? "translate-x-4 bg-primary" : "translate-x-0 bg-white"
        }`}
      />
    </button>
  );
}
