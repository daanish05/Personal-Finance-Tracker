"use client";
import { useState, useEffect, useRef } from "react";
import UserProfile from "../UserProfile";
import Link from "next/link";

import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../ThemeProvider";

export default function Header({
  searchQuery = "",
  onSearchChange,
  transactions = [],
  defaultCurrency = "USD",
  formatCurrency,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const results = searchQuery.trim()
    ? transactions.filter((t) => {
        const q = searchQuery.toLowerCase();
        return (
          t.title?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q) ||
          t.account?.toLowerCase().includes(q) ||
          t.notes?.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q))
        );
      })
    : [];

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const pathname = usePathname();
  const { dark, toggleDark } = useTheme();
  const isActive = (path) => pathname === path;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex flex-wrap gap-y-2 justify-between items-center w-full px-lg pl-14 md:pl-lg py-md bg-surface/80 backdrop-blur-md border-b border-outline-variant">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Link href="/" className="md:hidden">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span
                className="material-symbols-outlined text-on-primary text-[20px]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                account_balance_wallet
              </span>
            </div>  
          </Link>

          {/* <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button> */}
        </div>
        <div className="flex items-center flex-1 min-w-0 ml-5 sm:ml-4 md:ml-0">
          <div  
            className="relative w-full max-w-[200px] sm:max-w-[200px] md:max-w-[480px]"
            ref={dropdownRef}
            style={{
              border: "1px solid var(--outline-variant)",
              borderRadius: "8px", }}>
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              ref={inputRef}
              // className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 font-body-sm text-body-sm focus:ring-2 focus:ring-primary/10 transition-all"
              className="w-full bg-surface-container-low rounded-lg pl-10 pr-4 py-2 font-body-sm text-body-sm border border-transparent
                  transition-all duration-200
                  hover:border-primary/40 hover:shadow-md 
                  focus:ring-2 focus:ring-primary/10 focus:border-primary
                  outline-none"
              placeholder="Search, accounts, transactions..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange?.(e.target.value);
                if (e.target.value.trim()) setShowDropdown(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  setShowDropdown(true);
                }
                if (e.key === "Escape") {
                  setShowDropdown(false);
                  inputRef.current?.blur();
                }
              }}
              onFocus={() => {
                if (searchQuery.trim()) setShowDropdown(true);
              }}
            />
            {showDropdown && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                <div className="px-4 py-2 text-xs text-outline font-label-md uppercase tracking-wider border-b border-outline-variant/30">
                  {results.length} result{results.length !== 1 ? "s" : ""} for
                  &ldquo;{searchQuery}&rdquo;
                </div>
                {results.length === 0 ? (
                  <div className="px-4 py-6 text-center text-on-surface-variant text-body-sm">
                    No results found.
                  </div>
                ) : (
                  results.slice(0, 10).map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-container-high transition-colors cursor-pointer border-b border-outline-variant/10 last:border-0"
                      onClick={() => {
                        window.location.href = "/Transaction";
                        setShowDropdown(false);
                      }}
                    >
                      <div
                        className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${t.type === "income" ? "bg-primary/10" : "bg-surface-variant/40"}`}
                      >
                        <span
                          className={`material-symbols-outlined text-[16px] ${t.type === "income" ? "text-primary" : "text-primary"}`}
                        >
                          {t.type === "income" ? "work" : "receipt"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body-sm font-medium text-on-surface truncate">
                          {t.title}
                        </p>
                        <p className="text-[11px] text-on-surface-variant capitalize">
                          {t.category}
                          <span className="mx-1">·</span>
                          {new Date(t.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <span
                        className={`font-mono-data text-label-md font-medium shrink-0 ${t.type === "income" ? "text-secondary" : "text-tertiary"}`}
                      >
                        {t.type === "income" ? "+" : "-"}
                        {formatCurrency
                          ? formatCurrency(
                              t.amount,
                              t.currency || defaultCurrency,
                            )
                          : `${t.amount}`}
                      </span>
                    </div>
                  ))
                )}
                {results.length > 10 && (
                  <div className="px-4 py-2 text-center text-primary text-label-md font-bold border-t border-outline-variant/30 hover:bg-surface-container-high cursor-pointer">
                    View all {results.length} results
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-lg">
          <button className="relative text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[30px]">
              notifications
            </span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface" />
          </button>
          <div className="h-8 w-[1px] bg-outline-variant/50" />
          {/* <a
            href="/Quickadd"
            className="flex items-center gap-sm bg-primary text-on-primary px-lg py-2 rounded-lg font-label-md hover:opacity-90 transition-all active:scale-95" 
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Quick Add
          </a> */}
          <UserProfile />
        </div>
      </header>
      {/* <a
        href="/Quickadd"
        className="fixed bottom-5 right-5 md:hidden z-50
             w-14 h-14 rounded-full
             bg-primary text-on-primary
             flex items-center justify-center
             shadow-xl hover:scale-105 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-[28px]">add</span>
      </a> */}
    </>
  );
}
