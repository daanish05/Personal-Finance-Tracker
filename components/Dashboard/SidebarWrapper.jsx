"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const HIDDEN_PATHS = ["/Mainpage", "/login"];

export default function SidebarWrapper() {
  const pathname = usePathname();

  if (HIDDEN_PATHS.includes(pathname)) {
    return null;
  }

  return <Sidebar />;
}