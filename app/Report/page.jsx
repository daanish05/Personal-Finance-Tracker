"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  useTransactions,
  formatCurrency,
} from "../../contexts/TransactionContext";
import Header from "../../components/Dashboard/Header";

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
        <main className="ml-0 md:ml-60 min-h-screen">
          {/* Top Navigation Bar */}
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            transactions={transactions}
            formatCurrency={formatCurrency}
            defaultCurrency={defaultCurrency}
            placeholder="Search reports..."
          />
          <div className="p-4 md:p-xl max-w-container-max mx-auto space-y-6 md:space-y-xl">
            {/* Hero Header Section */}
            {/* <div className="flex justify-between items-end"> */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <div className="mt-6 md:mt-0">
                {/* <h2 className="font-headline-lg text-headline-lg text-on-surface"> */}
                <h2 className="text-2xl md:text-headline-lg font-headline-lg font-label-md text-label-md text-primary font-bold uppercase tracking-widest">
                  Financial Intelligence
                </h2>
                <p className="font-body-md text-body-md text-outline">
                  Deep dive into your spending, cash flow, and net worth
                  trajectory.
                </p>
              </div>
              {/* <div className="flex gap-sm"> */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {/* <button className="flex items-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all"> */}
                <button className="flex-1 md:flex-none flex items-center justify-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all">
                  <span className="material-symbols-outlined text-[18px]">
                    picture_as_pdf
                  </span>
                  PDF
                </button>
                {/* <button className="flex items-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all"> */}
                <button className="flex-1 md:flex-none flex items-center justify-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all">
                  <span className="material-symbols-outlined text-[18px]">
                    csv
                  </span>
                  CSV
                </button>
                {/* <button className="flex items-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all"> */}
                <button className="flex-1 md:flex-none flex items-center justify-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all">
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
              <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 md:p-lg space-y-lg transition-all hover:shadow-[0_20px_50px_rgba(0,102,255,0.05)]">
                <div className="flex justify-between items-center">
                  {/* <h3 className="font-headline-md text-headline-md text-on-surface"> */}
                  <h3 className="text-lg md:text-headline-md font-headline-md">
                    Net Worth Growth
                  </h3>
                  <select className="bg-transparent font-label-md text-label-md text-outline focus:outline-none cursor-pointer">
                    <option>Last 12 Months</option>
                    <option>Last 3 Years</option>
                    <option>All Time</option>
                  </select>
                </div>
                {/* <div className="h-64 relative w-full flex items-end justify-between px-md border-b border-outline-variant/30 group"> */}
                <div className="relative w-full h-52 md:h-64 flex items-end justify-between px-2 md:px-md border-b border-outline-variant/30 group overflow-x-auto">
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
                    <div
                      className="bg-on-surface text-surface px-md py-sm rounded-lg glass-panel shadow-xl"
                      style={{
                        color:
                          netCashFlow >= 0
                            ? "var(--cashflow-positive)"
                            : "var(--cashflow-negative)",
                      }}
                    >
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
                  {/* <div className="absolute bottom-[-24px] left-0 w-full flex justify-between font-mono-data text-[10px] text-outline px-md"> */}
                  <div className="absolute bottom-[-24px] left-0 w-full flex justify-between text-[8px] md:text-[10px] px-2 md:px-md">
                    {monthlyData.map((m) => (
                      <span key={m.label}>{m.label}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Section 1: Spending by Category (Spans 4 columns) */}
              <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 md:p-lg space-y-lg transition-all hover:shadow-[0_20px_50px_rgba(0,102,255,0.05)]">
                {/* <h3 className="font-headline-md text-headline-md text-on-surface"> */}
                <h3 className="text-lg md:text-headline-md font-headline-md">
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
                      <span className="text-xl md:text-headline-md text-headline-md text-on-surface">
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
              <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 md:p-lg space-y-lg transition-all hover:shadow-[0_20px_50px_rgba(0,102,255,0.05)]">
                {/* <div className="flex justify-between items-center"> */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    {/* <h3 className="font-headline-md text-headline-md text-on-surface"> */}
                    <h3 className="text-lg md:text-headline-md font-headline-md">
                      Monthly Cash Flow
                    </h3>
                    <p className="font-label-md text-label-md text-outline">
                      Income vs Expenses over the current fiscal year
                    </p>
                  </div>
                  {/* <div className="flex items-center gap-md"> */}
                  <div className="flex flex-wrap items-center gap-4">
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
                {/* <div className="h-64 w-full flex items-end justify-between pt-xl px-md gap-4"> */}
                <div className="h-56 md:h-64 w-full flex items-end justify-between pt-xl px-2 md:px-md gap-2 md:gap-4 overflow-x-auto">
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
                          className={`text-[10px] md:text-label-md ${
                            isCurrent
                              ? "text-primary font-bold"
                              : "text-outline"
                          }`}
                          // className={`font-label-md text-label-md ${isCurrent ? "text-primary font-bold" : "text-outline"}`}
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
              <div className="flex gap-xl" align="center">
                <div className="space-y-base">
                  <p className="font-label-md text-label-md text-outline uppercase tracking-wider">
                    Net Cash Flow
                  </p>
                  <p
                    // className={`font-headline-md text-headline-md ${netCashFlow >= 0 ? "text-secondary" : "text-error"}`}
                    className={`text-lg md:text-headline-md font-headline-md ${netCashFlow >= 0 ? "text-secondary" : "text-error"}`}
                  >
                    {netCashFlow >= 0 ? "+" : ""}
                    {formatCurrency(netCashFlow, defaultCurrency)}
                  </p>
                </div>
                <div className="space-y-base">
                  <p className="font-label-md text-label-md text-outline uppercase tracking-wider">
                    Total Income
                  </p>
                  {/* <p className="font-headline-md text-headline-md text-on-surface"> */}
                  <p className="text-lg md:text-headline-md font-headline-md">
                    {formatCurrency(totalIncome, defaultCurrency)}
                  </p>
                </div>
              </div>
              {/* <button className="bg-primary-container text-on-primary-container px-lg py-3 rounded-lg font-label-md text-label-md hover:brightness-110 active:scale-95 transition-all">
                View Comprehensive Tax Report
              </button> */}
            </div>
          </footer>
        </main>
        <button className="fixed bottom-gutter right-gutter w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-50">
          <Link href="/Qucikadd">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              add
            </span>
          </Link>
        </button>
        {/* Micro-interaction Scripts */}
      </>
    </>
  );
}
