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

import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}