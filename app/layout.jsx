import Sidebar from "../components/Dashboard/Sidebar";
import Providers from "../components/ThemeProvider";
import UserProvider from "../components/UserProvider";
import TransactionProvider from "../contexts/TransactionContext";
import { GeistSans } from "geist/font";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem("theme");
                if (
                  theme === "dark" ||
                  (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
                ) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
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
