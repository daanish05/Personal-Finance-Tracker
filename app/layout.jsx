
import Sidebar from '../components/Dashboard/Sidebar';
import ThemeProvider from '../components/ThemeProvider';
import TransactionProvider from '../contexts/TransactionContext';
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
        <style id="theme-vars" dangerouslySetInnerHTML={{
          __html: `html{background:#f8f9ff}html.dark{background:#1e1e2e}`,
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})()`,
        }} />
      </head>
      <body className={`${GeistSans.className} bg-surface text-on-surface`}>
        <ThemeProvider>
          <TransactionProvider>
            <Sidebar />
            {children}
          </TransactionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
