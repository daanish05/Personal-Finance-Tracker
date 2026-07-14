import Sidebar from "../components/Dashboard/Sidebar";
import Providers from "../components/ThemeProvider";
import UserProvider from "../components/UserProvider";
import TransactionProvider from "../contexts/TransactionContext";
import { GeistSans } from "geist/font";
import Script from "next/script";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var _s = document.createElement("style");
                _s.id = "no-transition-fix";
                _s.textContent = "*,*::before,*::after{transition:none!important}";
                document.head.appendChild(_s);
                var theme = localStorage.getItem("theme");
                if (
                  theme === "dark" ||
                  (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
                ) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
                requestAnimationFrame(function() {
                  requestAnimationFrame(function() {
                    var el = document.getElementById("no-transition-fix");
                    if (el) el.remove();
                  });
                });
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${GeistSans.className} scroll-smooth bg-surface-container-low text-on-surface antialiased transition-colors duration-300 dark:bg-surface-container-low-dark dark:text-on-surface-dark`}>
        <Providers>
          <UserProvider>
            <TransactionProvider>
              <Sidebar />
              {children}
            </TransactionProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
