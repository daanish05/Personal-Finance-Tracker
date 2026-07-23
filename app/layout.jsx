import Sidebar from "../components/Dashboard/Sidebar";
import Providers from "../components/ThemeProvider";
import AuthProvider from "../contexts/AuthProvider";
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
              document.documentElement.classList.add("no-transition");
              try {
                var theme = localStorage.getItem("theme");
                if (
                  theme === "dark" ||
                  (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
                ) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              } catch (e) {}
              requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                  document.documentElement.classList.remove("no-transition");
                });
              });
            `,
          }}
        />
      </head>
      <body
        className={`${GeistSans.className} scroll-smooth bg-surface-container-low text-on-surface antialiased`}
      >
        <Providers>
          <AuthProvider>
            <TransactionProvider>
              <UserProvider>
                <Sidebar />
                {children}
              </UserProvider>
            </TransactionProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
