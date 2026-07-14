"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../ThemeProvider";
export default function Sidebar() {
  const pathname = usePathname();
  const { dark, toggleDark } = useTheme();
  const isActive = (path) => pathname === path;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-19 left-5 z-50 md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low border border-outline-variant shadow-md hover:bg-surface-variant transition-colors"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <span className="material-symbols-outlined text-on-surface-variant">
          {sidebarOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 h-full w-60 flex flex-col border-r border-outline-variant bg-surface-container-low transition-all duration-300 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="px-lg py-xl flex items-center gap-sm">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Link href="/">
              <span
                className="material-symbols-outlined text-on-primary text-[20px]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                account_balance_wallet
              </span>
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
            className={`flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings: isActive("/") ? '"FILL" 1' : "0",
              }}
            >
              dashboard
            </span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link
            className={`flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/Transaction") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/Transaction"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings: isActive("/Transaction")
                  ? '"FILL" 1'
                  : "0",
              }}
            >
              receipt_long
            </span>
            <span className="font-label-md text-label-md">Transactions</span>
          </Link>
          <Link
            className={`flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/Accounts") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/Accounts"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings: isActive("/Accounts") ? '"FILL" 1' : "0",
              }}
            >
              account_balance
            </span>
            <span className="font-label-md text-label-md">Accounts</span>
          </Link>
          {/* <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant/20 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              account_balance_wallet
            </span>
            <span className="font-label-md text-label-md">Budgets</span>
          </a> */}
          <Link
            className={`flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/Goals") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/Goals"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings: isActive("/Goals") ? '"FILL" 1' : "0",
              }}
            >
              ads_click
            </span>
            <span className="font-label-md text-label-md">Goals</span>
          </Link>
          <Link
            className={`flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/Report") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/Report"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings: isActive("/Report") ? '"FILL" 1' : "0",
              }}
            >
              bar_chart
            </span>
            <span className="font-label-md text-label-md">Reports</span>
          </Link>
          {/* <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant/20 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              psychology
            </span>
            <span className="font-label-md text-label-md">AI Insights</span>
          </a> */}
        </nav>
        <div className="px-md py-xl space-y-base border-t border-outline-variant/30">
          <Link
            className={`flex items-center gap-md px-md py-sm rounded-lg transition-all ${isActive("/Settings") ? "text-primary font-bold bg-surface-variant/30 sidebar-active" : "text-on-surface-variant hover:bg-surface-variant/20"}`}
            href="/Settings"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings: isActive("/Settings") ? '"FILL" 1' : "0",
              }}
            >
              settings
            </span>
            <span className="font-label-md text-label-md">Settings</span>
          </Link>
          <div className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant">
            <div className="flex items-center gap-md flex-1">
              <span className="material-symbols-outlined text-[20px]">
                contrast
              </span>
              <span className="font-label-md text-label-md">Theme</span>
            </div>
            <ThemeToggle dark={dark} onToggle={toggleDark} />
          </div>
        </div>
      </aside>
    </>
  );
}
