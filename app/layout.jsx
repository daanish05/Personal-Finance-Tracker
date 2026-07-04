// import Header from '../components/Dashboard/Header';
import Sidebar from '../components/Dashboard/Sidebar';
import { GeistSans } from "geist/font";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className={`${GeistSans.className} bg-surface text-on-surface`}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
