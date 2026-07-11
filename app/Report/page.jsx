"use client";
import { useMemo, useState } from "react";
import {
  useTransactions,
  formatCurrency,
} from "../../contexts/TransactionContext";

export default function Report() {
  const { transactions, defaultCurrency } = useTransactions();

  const [searchQuery, setSearchQuery] = useState("");

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const categoryData = useMemo(() => {
    const cats = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        cats[t.category] = (cats[t.category] || 0) + Number(t.amount);
      });
    const total = Object.values(cats).reduce((s, v) => s + v, 0);
    return Object.entries(cats)
      .map(([name, value]) => ({
        name,
        value,
        pct: total > 0 ? ((value / total) * 100).toFixed(0) : "0",
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth - i, 1);
      const m = d.getMonth();
      const y = d.getFullYear();
      const income = transactions
        .filter(
          (t) =>
            t.type === "income" &&
            new Date(t.date).getMonth() === m &&
            new Date(t.date).getFullYear() === y,
        )
        .reduce((s, t) => s + Number(t.amount), 0);
      const expenses = transactions
        .filter(
          (t) =>
            t.type === "expense" &&
            new Date(t.date).getMonth() === m &&
            new Date(t.date).getFullYear() === y,
        )
        .reduce((s, t) => s + Number(t.amount), 0);
      months.push({
        label: d.toLocaleDateString("en-US", { month: "short" }),
        income,
        expenses,
      });
    }
    return months;
  }, [transactions, currentMonth, currentYear]);

  const maxMonthly = Math.max(
    ...monthlyData.flatMap((m) => [m.income, m.expenses]),
    1,
  );

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Number(t.amount), 0);
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + Number(t.amount), 0);
  const netCashFlow = totalIncome - totalExpense;

  const filteredCategoryData = searchQuery.trim()
    ? categoryData.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : categoryData;

  const colors = [
    "#0050cb",
    "#006c49",
    "#cc4204",
    "#a33200",
    "#727687",
    "#b3c5ff",
  ];
  return (
    <>
      <>
        {/* Main Content */}
        <main className="ml-60 min-h-screen">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 flex justify-between items-center w-full px-lg py-md bg-surface/80 backdrop-blur-md border-b border-outline-variant">
            <div className="flex items-center gap-md flex-1">
              <div className="relative w-full max-w-[480px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input
                  className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 font-body-sm text-body-sm focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="Search reports..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-lg">
              <button className="relative text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">
                  notifications
                </span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface" />
              </button>
              <div className="h-8 w-[1px] bg-outline-variant/50" />

              <a
                href="/Quickadd"
                className="flex items-center gap-sm bg-primary text-on-primary px-lg py-2 rounded-lg font-label-md hover:opacity-90 transition-all active:scale-95">
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                Quick Add
              </a>
              <div className="flex items-center gap-sm cursor-pointer group">
                <div className="text-right">
                  <p className="font-label-md text-on-surface font-bold">
                    Alex Sterling
                  </p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                    Premium Member
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-surface-variant overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="A professional headshot of a person with a friendly expression, set against a soft-focus corporate office background. The lighting is bright and clean, reflecting a high-end, stable financial professional identity. The overall aesthetic is minimalist and modern."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDobLtNGEJ9IlwFaTG64cOqzLMgyQePG3ljFEKoYSOmT1LecjsBWpoWXkhYWfS3eF0MORWzGqohppjalpUGIxaboO5CdZoT6WQGEYhqBo0-iAlgyBvo3AagJVqaJ_VCuzZTXu-RFDVpxm47wFZJsSORT3ajmchqpydg2gQ63j5WDI63IUlDH-VT-7JuqqJaHES_hEFARM9ecXDl63vx7JxIoGVRUOri4B2s_kPN426fU5YbsvNo2uk6"
                  />
                </div>
              </div>
            </div>
            {/* <div className="flex items-center gap-lg">
              <a href="/Quickadd" className="bg-primary text-on-primary px-md py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all flex items-center gap-sm active:scale-95">
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                Quick Add
              </a>
              <button className="relative text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface" />
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
                <img
                  className="w-full h-full object-cover"
                  data-alt="A professional studio headshot of a financial executive, clean high-key lighting, soft neutral background, wearing a charcoal suit. The style is polished, high-end corporate minimalism, reflecting trust and expertise in a premium wealth management environment."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqsFYw9n19KwcxpYuXoPIsUrh0vZ8RVuJY0HxCjdxKMWlDhlem0WL2AO0n4r7FQrR5rp2hn3EovvYVud-zI0hDe45xRHZRa9-4PQdropy7dlKF15U99TwHTPuD0IQb6ubLZh3S1iX2fx_FslLKrdmHDN11YZitd32bPUS_uUm10I6ybwRBKyoC2nvMRb2hi3rzva-EJE8wqUKiB90-JAvkp7qDqN8z128GUTPSsHQ2k1SpBEJKezio"
                />
              </div>
            </div> */}
          </header>
          <div className="p-xl max-w-container-max mx-auto space-y-xl">
            {/* Hero Header Section */}
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Financial Intelligence
                </h2>
                <p className="font-body-md text-body-md text-outline">
                  Deep dive into your spending, cash flow, and net worth
                  trajectory.
                </p>
              </div>
              <div className="flex gap-sm">
                <button className="flex items-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all">
                  <span className="material-symbols-outlined text-[18px]">
                    picture_as_pdf
                  </span>
                  PDF
                </button>
                <button className="flex items-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all">
                  <span className="material-symbols-outlined text-[18px]">
                    csv
                  </span>
                  CSV
                </button>
                <button className="flex items-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all">
                  <span className="material-symbols-outlined text-[18px]">
                    table_view
                  </span>
                  Excel
                </button>
              </div>
            </div>
            {/* Dashboard Bento Grid */}
            <div className="grid grid-cols-12 gap-gutter">
              {/* Section 3: Net Worth Growth (Spans 8 columns) */}
              <div className="col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg space-y-lg transition-all hover:shadow-[0_20px_50px_rgba(0,102,255,0.05)]">
                <div className="flex justify-between items-center">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Net Worth Growth
                  </h3>
                  <select className="bg-transparent font-label-md text-label-md text-outline focus:outline-none cursor-pointer">
                    <option>Last 12 Months</option>
                    <option>Last 3 Years</option>
                    <option>All Time</option>
                  </select>
                </div>
                <div className="h-64 relative w-full flex items-end justify-between px-md border-b border-outline-variant/30 group">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 800 240"
                  >
                    {(() => {
                      const pts = [];
                      let cum = 0;
                      for (let i = 0; i < 12; i++) {
                        const d = new Date(
                          currentYear,
                          currentMonth - 11 + i,
                          1,
                        );
                        const m = d.getMonth();
                        const y = d.getFullYear();
                        const inc = transactions
                          .filter(
                            (t) =>
                              t.type === "income" &&
                              new Date(t.date).getMonth() === m &&
                              new Date(t.date).getFullYear() === y,
                          )
                          .reduce((s, t) => s + Number(t.amount), 0);
                        const exp = transactions
                          .filter(
                            (t) =>
                              t.type === "expense" &&
                              new Date(t.date).getMonth() === m &&
                              new Date(t.date).getFullYear() === y,
                          )
                          .reduce((s, t) => s + Number(t.amount), 0);
                        cum += inc - exp;
                        pts.push(cum);
                      }
                      const max = Math.max(...pts, 1);
                      const min = Math.min(...pts, 0);
                      const range = max - min || 1;
                      const line = pts
                        .map((p, i) => {
                          const x = (i / 11) * 800;
                          const y = 240 - ((p - min) / range) * 200;
                          return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
                        })
                        .join(" ");
                      const fill = `${line} V240 H0 Z`;
                      return (
                        <>
                          <path
                            d={line}
                            fill="none"
                            stroke="#0050cb"
                            strokeWidth={2}
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d={fill}
                            fill="url(#gradient-line)"
                            opacity="0.1"
                          />
                        </>
                      );
                    })()}
                    <defs>
                      <linearGradient
                        id="gradient-line"
                        x1={0}
                        x2={0}
                        y1={0}
                        y2={1}
                      >
                        <stop offset="0%" stopColor="#0050cb" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute left-[50%] top-[10%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-on-surface text-surface px-md py-sm rounded-lg glass-panel shadow-xl">
                      <p className="text-label-md font-bold">
                        {formatCurrency(
                          monthlyData.reduce(
                            (s, m) => s + m.income - m.expenses,
                            0,
                          ),
                          defaultCurrency,
                        )}
                      </p>
                      <p className="text-[10px] opacity-70 uppercase tracking-widest">
                        Net Position
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-[-24px] left-0 w-full flex justify-between font-mono-data text-[10px] text-outline px-md">
                    {monthlyData.map((m) => (
                      <span key={m.label}>{m.label}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Section 1: Spending by Category (Spans 4 columns) */}
              <div className="col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg space-y-lg transition-all hover:shadow-[0_20px_50px_rgba(0,102,255,0.05)]">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Spending by Category
                </h3>
                <div className="flex flex-col items-center justify-center space-y-md">
                  {/* Donut Chart */}
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5eeff"
                        strokeWidth={3}
                      />
                      {filteredCategoryData.slice(0, 5).map((cat, i) => {
                        let offset = 0;
                        for (let j = 0; j < i; j++)
                          offset += parseFloat(categoryData[j].pct);
                        return (
                          <path
                            key={cat.name}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={colors[i % colors.length]}
                            strokeDasharray={`${cat.pct}, 100`}
                            strokeDashoffset={-offset}
                            strokeWidth={3}
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-headline-md text-headline-md text-on-surface">
                        {formatCurrency(totalExpense, defaultCurrency)}
                      </span>
                      <span className="font-label-md text-label-md text-outline uppercase tracking-wider">
                        Total
                      </span>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="w-full space-y-sm">
                    {filteredCategoryData.slice(0, 5).map((cat, i) => (
                      <div
                        key={cat.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-sm">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: colors[i % colors.length],
                            }}
                          />
                          <span className="font-label-md text-label-md text-on-surface-variant capitalize">
                            {cat.name}
                          </span>
                        </div>
                        <span className="font-mono-data text-label-md text-on-surface">
                          {cat.pct}%
                        </span>
                      </div>
                    ))}
                    {filteredCategoryData.length === 0 && (
                      <p className="text-center text-on-surface-variant text-sm">
                        {categoryData.length === 0
                          ? "No expenses yet"
                          : "No categories match your search."}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Section 2: Monthly Cash Flow (Spans Full Width for emphasis) */}
              <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg space-y-lg transition-all hover:shadow-[0_20px_50px_rgba(0,102,255,0.05)]">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      Monthly Cash Flow
                    </h3>
                    <p className="font-label-md text-label-md text-outline">
                      Income vs Expenses over the current fiscal year
                    </p>
                  </div>
                  <div className="flex items-center gap-md">
                    <div className="flex items-center gap-sm">
                      <span className="w-3 h-3 bg-primary rounded-sm" />
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        Inflow
                      </span>
                    </div>
                    <div className="flex items-center gap-sm">
                      <span className="w-3 h-3 bg-surface-container-highest rounded-sm" />
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        Outflow
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-64 w-full flex items-end justify-between pt-xl px-md gap-4">
                  {monthlyData.map((m, i) => {
                    const incomePct =
                      maxMonthly > 0 ? (m.income / maxMonthly) * 95 : 0;
                    const expensePct =
                      maxMonthly > 0 ? (m.expenses / maxMonthly) * 95 : 0;
                    const isCurrent = i === monthlyData.length - 1;
                    return (
                      <div
                        key={m.label}
                        className="flex-1 flex flex-col items-center gap-sm group relative"
                      >
                        <div className="w-full flex justify-center gap-1 items-end h-48">
                          <div
                            className={`w-1/3 bg-primary rounded-t-sm transition-all duration-300 group-hover:opacity-80 ${isCurrent ? "shadow-[0_0_15px_rgba(0,102,255,0.2)]" : ""}`}
                            style={{ height: `${Math.max(incomePct, 2)}%` }}
                          />
                          <div
                            className="w-1/3 bg-surface-container-highest rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                            style={{ height: `${Math.max(expensePct, 2)}%` }}
                          />
                        </div>
                        <span
                          className={`font-label-md text-label-md ${isCurrent ? "text-primary font-bold" : "text-outline"}`}
                        >
                          {m.label}
                        </span>
                        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all text-mono-data text-xs bg-on-surface text-surface px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap">
                          {formatCurrency(
                            m.income - m.expenses,
                            defaultCurrency,
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Sticky Footer Summary */}
          <footer className="mt-xl border-t border-outline-variant bg-surface-container-low/50 py-lg px-xl">
            <div className="max-w-container-max mx-auto flex justify-between items-center">
              <div className="flex gap-xl">
                <div className="space-y-base">
                  <p className="font-label-md text-label-md text-outline uppercase tracking-wider">
                    Net Cash Flow
                  </p>
                  <p
                    className={`font-headline-md text-headline-md ${netCashFlow >= 0 ? "text-secondary" : "text-error"}`}
                  >
                    {netCashFlow >= 0 ? "+" : ""}
                    {formatCurrency(netCashFlow, defaultCurrency)}
                  </p>
                </div>
                <div className="space-y-base">
                  <p className="font-label-md text-label-md text-outline uppercase tracking-wider">
                    Total Income
                  </p>
                  <p className="font-headline-md text-headline-md text-on-surface">
                    {formatCurrency(totalIncome, defaultCurrency)}
                  </p>
                </div>
              </div>
              <button className="bg-primary-container text-on-primary-container px-lg py-3 rounded-lg font-label-md text-label-md hover:brightness-110 active:scale-95 transition-all">
                View Comprehensive Tax Report
              </button>
            </div>
          </footer>
        </main>
        {/* Micro-interaction Scripts */}
      </>
    </>
  );
}
