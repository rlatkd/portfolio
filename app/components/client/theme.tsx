"use client";

import { useEffect, useState } from "react";

type ThemeProps = "light" | "dark";

export function Theme() {
  const [theme, setTheme] = useState<ThemeProps>("light");

  useEffect(() => {
    if (!("theme" in localStorage)) {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const nextTheme = isDark ? "dark" : "light";
      applyTheme(nextTheme);

      return;
    }

    const currentTheme = localStorage.getItem("theme") as ThemeProps;
    setTheme(currentTheme);
  }, []);

  const applyTheme = (nextTheme: ThemeProps) => {
    if (localStorage.getItem("theme") === nextTheme) return;

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleToggle = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}
