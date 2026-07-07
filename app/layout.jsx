import Sidebar from "../components/Dashboard/Sidebar";
import Providers from "../components/ThemeProvider";
import TransactionProvider from "../contexts/TransactionContext";
import Script from "next/script";
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

        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
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
              })();
            `,
          }}
        />
      </head>

      <body className={GeistSans.className}>
        <Providers>
          <TransactionProvider>
            <Sidebar/>
            {children}
          </TransactionProvider>
        </Providers>
      </body>
    </html>
  );
}

// import Sidebar from "../components/Dashboard/Sidebar";
// import TransactionProvider from "../contexts/TransactionContext";
// import { GeistSans } from "geist/font";
// import "./globals.css";
// import Providers from "../components/ThemeProvider";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link
//           rel="stylesheet"
//           href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
//         />
//       </head>

//       <body className={GeistSans.className}>
//         <Providers>
//           <TransactionProvider>
//             <Sidebar />
//             {children}
//           </TransactionProvider>
//         </Providers>
//       </body>
//     </html>
//   );
// }
