"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Wallet,
  LayoutDashboard,
  ReceiptText,
  Landmark,
  Target,
  BarChart3,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../ThemeProvider";
import LogoutIcon from "../ui/logout-icon";
export default function Sidebar() {
  const pathname = usePathname();
  const { dark, toggleDark } = useTheme();
  const isActive = (path) => pathname === path;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoutIconRef = useRef(null);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-19 left-5 z-50 md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low border border-outline-variant shadow-md hover:bg-surface-variant transition-colors"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? (
          <X className="text-on-surface-variant" size={20} />
        ) : (
          <Menu className="text-on-surface-variant" size={20} />
        )}
      </button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0  h-full w-60 flex flex-col border-r border-outline-variant bg-surface-container-low transition-all duration-300 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        {/* <div className="px-lg py-xl flex items-center gap-sm"> */}
        <div className="px-lg pt-30 pb-10 md:pt-xl md:pb-xl flex items-center gap-sm">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Link href="/">
              <Wallet className="text-on-primary" size={20} />
            </Link>
          </div>
          <Link href="/">
            <h1 className="font-headline-md text-headline-md font-bold text-primary">
              WealthFlow
            </h1>
          </Link>
        </div>
        <nav className="flex-1 px-md space-y-base">
          <Link
            className={`group flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/"
          >
            <span className="flex transition-transform duration-200 group-hover:translate-x-[3px]">
              <LayoutDashboard
                size={20}
                strokeWidth={isActive("/") ? 2.5 : 2}
              />
            </span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link
            className={`group flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/Transaction") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/Transaction"
          >
            <span className="flex transition-transform duration-200 group-hover:translate-x-[3px]">
              <ReceiptText
                size={20}
                strokeWidth={isActive("/Transaction") ? 2.5 : 2}
              />
            </span>
            <span className="font-label-md text-label-md">Transactions</span>
          </Link>
          <Link
            className={`group flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/Accounts") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/Accounts"
          >
            <span className="flex transition-transform duration-200 group-hover:translate-x-[3px]">
              <Landmark
                size={20}
                strokeWidth={isActive("/Accounts") ? 2.5 : 2}
              />
            </span>
            <span className="font-label-md text-label-md">Accounts</span>
          </Link>
          <Link
            className={`group flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/Goals") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/Goals"
          >
            <span className="flex transition-transform duration-200 group-hover:translate-x-[3px]">
              <Target
                size={20}
                strokeWidth={isActive("/Goals") ? 2.5 : 2}
              />
            </span>
            <span className="font-label-md text-label-md">Goals</span>
          </Link>
          <Link
            className={`group flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/Report") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/Report"
          >
            <span className="flex transition-transform duration-200 group-hover:translate-x-[3px]">
              <BarChart3
                size={20}
                strokeWidth={isActive("/Report") ? 2.5 : 2}
              />
            </span>
            <span className="font-label-md text-label-md">Reports</span>
          </Link>
        </nav>
        <div className="px-md py-xl space-y-base border-t border-outline-variant/30">
          <Link
            className={`group flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/Settings") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/Settings"
          >
            <span className="flex transition-transform duration-200 group-hover:rotate-45">
              <Settings
                size={20}
                strokeWidth={isActive("/Settings") ? 2.5 : 2}
              />
            </span>
            <span className="font-label-md text-label-md">Settings</span>
          </Link>
          <div className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant">
            <div className="flex items-center gap-md flex-1">
              <span className="flex">
                {dark ? <Sun size={20} /> : <Moon size={20} />}
              </span>
              <span className="font-label-md text-label-md">Theme</span>
            </div>
            <ThemeToggle dark={dark} onToggle={toggleDark} />
          </div>
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            onMouseEnter={() => logoutIconRef.current?.startAnimation()}
            onMouseLeave={() => logoutIconRef.current?.stopAnimation()}
            className="flex items-center gap-md w-full px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant/20 transition-all"
          >
            <LogoutIcon ref={logoutIconRef} size={20} />
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}