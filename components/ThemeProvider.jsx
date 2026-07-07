// "use client";

// import { createContext, useContext, useState, useEffect } from "react";

// const ThemeContext = createContext({
//   dark: false,
//   toggleDark: () => {},
// });

// export function useTheme() {
//   return useContext(ThemeContext);
// }

// export default function ThemeProvider({ children }) {
//   const [dark, setDark] = useState(false);

//   useEffect(() => {
//     const isDark = localStorage.getItem("theme") === "dark";

//     setDark(isDark);

//     document.documentElement.classList.toggle("dark", isDark);
//   }, []);

//   const toggleDark = () => {
//     setDark((prev) => {
//       const next = !prev;
//       document.documentElement.classList.toggle("dark", next);
//       localStorage.setItem("theme", next ? "dark" : "light");
//       return next;
//     });
//   };

//   return (
//     <ThemeContext.Provider value={{ dark, toggleDark }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }



'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext({
  dark: false,
  toggleDark: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function Providers({ children }) {
  const [dark, setDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDark = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setDark(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}