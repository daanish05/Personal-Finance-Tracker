"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  useTransactions,
  formatCurrency,
} from "../../contexts/TransactionContext";
import Header from "../../components/Dashboard/Header";

export default function Transaction() {
  const { transactions, deleteTransactions, defaultCurrency } =
    useTransactions();
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [timeframe, setTimeframe] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortBy, setSortBy] = useState("date-desc");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const allCategories = useMemo(
    () => [...new Set(transactions.map((t) => t.category))],
    [transactions],
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...visibleIds])]);
    }
  };

  const filtered = useMemo(() => {
    let txs = [...transactions];
    if (filterType === "income") txs = txs.filter((t) => t.type === "income");
    else if (filterType === "expense")
      txs = txs.filter((t) => t.type === "expense");

    if (timeframe !== "all") {
      const now = new Date();
      const cutoff = new Date();
      if (timeframe === "30") cutoff.setDate(now.getDate() - 30);
      else if (timeframe === "90") cutoff.setDate(now.getDate() - 90);
      else if (timeframe === "year") cutoff.setFullYear(now.getFullYear() - 1);
      txs = txs.filter((t) => new Date(t.date) >= cutoff);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      txs = txs.filter(
        (t) =>
          t.title?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q) ||
          t.account?.toLowerCase().includes(q) ||
          t.notes?.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q)),
      );
    }
    if (categoryFilter) {
      txs = txs.filter((t) => t.category === categoryFilter);
    }
    if (sortBy === "date-desc") {
      txs.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "date-asc") {
      txs.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "amount-desc") {
      txs.sort((a, b) => Number(b.amount) - Number(a.amount));
    } else if (sortBy === "amount-asc") {
      txs.sort((a, b) => Number(a.amount) - Number(b.amount));
    }
    return txs;
  }, [
    transactions,
    filterType,
    timeframe,
    searchQuery,
    categoryFilter,
    sortBy,
  ]);

  const visibleIds = filtered.slice(0, 10).map((t) => t.id);
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  const countAll = transactions.length;
  const countIncome = transactions.filter((t) => t.type === "income").length;
  const countExpense = transactions.filter((t) => t.type === "expense").length;

  const topCategory = useMemo(() => {
    const cats = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        cats[t.category] = (cats[t.category] || 0) + Number(t.amount);
      });
    return Object.entries(cats).sort((a, b) => b[1] - a[1])[0] || ["N/A", 0];
  }, [transactions]);

  const totalExpenseAmount = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Number(t.amount), 0);
  const totalIncomeAmount = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + Number(t.amount), 0);
  const savingsRate =
    totalIncomeAmount > 0
      ? (
          ((totalIncomeAmount - totalExpenseAmount) / totalIncomeAmount) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <>
      <main className="ml-0 md:ml-60 flex-1 min-h-screen flex flex-col">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          transactions={transactions}
          formatCurrency={formatCurrency}
          defaultCurrency={defaultCurrency}
          placeholder="Search transactions..."
        />
        {/* Desktop Filter Bar */}
        <div className="hidden md:flex items-center gap-sm px-lg py-sm backdrop-blur-md border-b border-outline-variant  top-[72px] z-30">
          {/* Date Filter */}
          <div className="relative">
            <button
              className={`flex items-center gap-xs px-sm py-1.5 border rounded-lg transition-colors text-label-sm ${sortBy === "date-desc" || sortBy === "date-asc" ? "bg-primary/10 text-primary border-primary/30" : "text-on-surface-variant border-outline-variant/50 hover:bg-surface-container"}`}
              onClick={() =>
                setActiveFilter(activeFilter === "date" ? null : "date")
              }
            >
              <span className="material-symbols-outlined text-sm">
                calendar_today
              </span>
              <span className="font-label-md text-label-md">
                {sortBy === "date-asc"
                  ? "Oldest"
                  : sortBy === "date-desc"
                    ? "Newest"
                    : "Date"}
              </span>
          </button>
          {activeFilter === "date" && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setActiveFilter(null)}
              />
              <div className="absolute top-full left-0 mt-1 w-40 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-xl z-50 overflow-hidden">
                <button
                  className={`w-full text-left px-3 py-2 font-label-md text-label-md transition-colors hover:bg-surface-container-high ${sortBy === "date-desc" ? "text-primary font-bold" : "text-on-surface"}`}
                  onClick={() => {
                    setSortBy("date-desc");
                    setActiveFilter(null);
                  }}
                >
                  Newest First
                </button>
                <button
                  className={`w-full text-left px-3 py-2 font-label-md text-label-md transition-colors hover:bg-surface-container-high ${sortBy === "date-asc" ? "text-primary font-bold" : "text-on-surface"}`}
                  onClick={() => {
                    setSortBy("date-asc");
                    setActiveFilter(null);
                  }}
                >
                  Oldest First
                </button>
                {sortBy !== "date-desc" && sortBy !== "date-asc" && (
                  <button
                    className="w-full text-left px-3 py-2 font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors"
                    onClick={() => {
                      setSortBy("date-desc");
                      setActiveFilter(null);
                    }}
                  >
                    No Sort
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        {/* Category Filter */}
        <div className="relative">
          <button
            className={`flex items-center gap-xs px-sm py-1.5 border rounded-lg transition-colors text-label-sm ${categoryFilter ? "bg-primary/10 text-primary border-primary/30" : "text-on-surface-variant border-outline-variant/50 hover:bg-surface-container"}`}
            onClick={() =>
              setActiveFilter(
                activeFilter === "category" ? null : "category",
              )
            }
          >
            <span className="material-symbols-outlined text-sm">
              filter_list
            </span>
            <span className="font-label-md text-label-md">
              {categoryFilter ? categoryFilter : "Category"}
            </span>
          </button>
          {activeFilter === "category" && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setActiveFilter(null)}
              />
              <div className="absolute top-full left-0 mt-1 w-44 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                <button
                  className={`w-full text-left px-3 py-2 font-label-md text-label-md transition-colors hover:bg-surface-container-high ${!categoryFilter ? "text-primary font-bold" : "text-on-surface"}`}
                  onClick={() => {
                    setCategoryFilter(null);
                    setActiveFilter(null);
                  }}
                >
                  All Categories
                </button>
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`w-full text-left px-3 py-2 font-label-md text-label-md capitalize transition-colors hover:bg-surface-container-high ${categoryFilter === cat ? "text-primary font-bold" : "text-on-surface"}`}
                    onClick={() => {
                      setCategoryFilter(cat);
                      setActiveFilter(null);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        {/* Amount Filter */}
        <div className="relative">
          <button
            className={`flex items-center gap-xs px-sm py-1.5 border rounded-lg transition-colors text-label-sm ${sortBy === "amount-desc" || sortBy === "amount-asc" ? "bg-primary/10 text-primary border-primary/30" : "text-on-surface-variant border-outline-variant/50 hover:bg-surface-container"}`}
            onClick={() =>
              setActiveFilter(activeFilter === "amount" ? null : "amount")
            }
          >
            <span className="material-symbols-outlined text-sm">
              payments
            </span>
            <span className="font-label-md text-label-md">
              {sortBy === "amount-asc"
                ? "Lowest"
                : sortBy === "amount-desc"
                  ? "Highest"
                  : "Amount"}
            </span>
          </button>
          {activeFilter === "amount" && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setActiveFilter(null)}
              />
              <div className="absolute top-full left-0 mt-1 w-44 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-xl z-50 overflow-hidden">
                <button
                  className={`w-full text-left px-3 py-2 font-label-md text-label-md transition-colors hover:bg-surface-container-high ${sortBy === "amount-desc" ? "text-primary font-bold" : "text-on-surface"}`}
                  onClick={() => {
                    setSortBy("amount-desc");
                    setActiveFilter(null);
                  }}
                >
                  Highest First
                </button>
                <button
                  className={`w-full text-left px-3 py-2 font-label-md text-label-md transition-colors hover:bg-surface-container-high ${sortBy === "amount-asc" ? "text-primary font-bold" : "text-on-surface"}`}
                  onClick={() => {
                    setSortBy("amount-asc");
                    setActiveFilter(null);
                  }}
                >
                  Lowest First
                </button>
                {sortBy !== "amount-desc" && sortBy !== "amount-asc" && (
                  <button
                    className="w-full text-left px-3 py-2 font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors"
                    onClick={() => {
                      setSortBy("date-desc");
                      setActiveFilter(null);
                    }}
                  >
                    No Sort
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        </div>
        {/* Mobile Filters - overlays content */}
        <div className="relative md:hidden z-10 px-gutter">
          <button
            className="w-full flex items-center justify-between p-md bg-surface-container-lowest border border-outline-variant rounded-xl"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span className="font-label-md text-label-md text-on-surface font-bold">
              Filters
            </span>
            <span className="material-symbols-outlined text-on-surface-variant">
              {showMobileFilters ? "expand_less" : "expand_more"}
            </span>
          </button>
          {showMobileFilters && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="absolute left-gutter right-gutter top-full mt-sm z-50 p-md bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl space-y-lg">
                <section className="space-y-sm">
                  <h3 className="font-label-md text-label-md font-bold text-outline uppercase tracking-widest">
                    Type
                  </h3>
                  <div className="space-y-base">
                    <label
                      className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group"
                      onClick={() => setFilterType("all")}
                    >
                      <div className="flex items-center gap-sm">
                        <input
                          className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20"
                          name="mobile-type"
                          type="radio"
                          checked={filterType === "all"}
                          readOnly
                        />
                        <span className="font-body-sm text-body-sm">
                          All Transactions
                        </span>
                      </div>
                      <span className="font-mono-data text-mono-data text-outline group-hover:text-primary">
                        {countAll}
                      </span>
                    </label>
                    <label
                      className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group"
                      onClick={() => setFilterType("income")}
                    >
                      <div className="flex items-center gap-sm">
                        <input
                          className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20"
                          name="mobile-type"
                          type="radio"
                          checked={filterType === "income"}
                          readOnly
                        />
                        <span className="font-body-sm text-body-sm">Income</span>
                      </div>
                      <span className="font-mono-data text-mono-data text-outline group-hover:text-secondary">
                        {countIncome}
                      </span>
                    </label>
                    <label
                      className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group"
                      onClick={() => setFilterType("expense")}
                    >
                      <div className="flex items-center gap-sm">
                        <input
                          className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20"
                          name="mobile-type"
                          type="radio"
                          checked={filterType === "expense"}
                          readOnly
                        />
                        <span className="font-body-sm text-body-sm">Expense</span>
                      </div>
                      <span className="font-mono-data text-mono-data text-outline group-hover:text-error">
                        {countExpense}
                      </span>
                    </label>
                  </div>
                </section>
                <section className="space-y-sm">
                  <h3 className="font-label-md text-label-md font-bold text-outline uppercase tracking-widest">
                    Timeframe
                  </h3>
                  <div className="space-y-base">
                    <button
                      className={`w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors ${timeframe === "30" ? "text-primary font-medium" : ""}`}
                      onClick={() => setTimeframe("30")}
                    >
                      Last 30 Days
                    </button>
                    <button
                      className={`w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors ${timeframe === "90" ? "text-primary font-medium" : ""}`}
                      onClick={() => setTimeframe("90")}
                    >
                      Last 90 Days
                    </button>
                    <button
                      className={`w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors ${timeframe === "year" ? "text-primary font-medium" : ""}`}
                      onClick={() => setTimeframe("year")}
                    >
                      This Year
                    </button>
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-1 gap-gutter p-gutter max-w-[1440px] mx-auto w-full">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-64 shrink-0 space-y-gutter">
            <section className="space-y-sm">
              <h3 className="font-label-md text-label-md font-bold text-outline uppercase tracking-widest px-sm">
                Type
              </h3>
              <div className="space-y-base">
                <label
                  className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group"
                  onClick={() => setFilterType("all")}
                >
                  <div className="flex items-center gap-sm">
                    <input
                      className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20"
                      name="type"
                      type="radio"
                      checked={filterType === "all"}
                      readOnly
                    />
                    <span className="font-body-sm text-body-sm">
                      All Transactions
                    </span>
                  </div>
                  <span className="font-mono-data text-mono-data text-outline group-hover:text-primary">
                    {countAll}
                  </span>
                </label>
                <label
                  className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group"
                  onClick={() => setFilterType("income")}
                >
                  <div className="flex items-center gap-sm">
                    <input
                      className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20"
                      name="type"
                      type="radio"
                      checked={filterType === "income"}
                      readOnly
                    />
                    <span className="font-body-sm text-body-sm">Income</span>
                  </div>
                  <span className="font-mono-data text-mono-data text-outline group-hover:text-secondary">
                    {countIncome}
                  </span>
                </label>
                <label
                  className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group"
                  onClick={() => setFilterType("expense")}
                >
                  <div className="flex items-center gap-sm">
                    <input
                      className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20"
                      name="type"
                      type="radio"
                      checked={filterType === "expense"}
                      readOnly
                    />
                    <span className="font-body-sm text-body-sm">Expense</span>
                  </div>
                  <span className="font-mono-data text-mono-data text-outline group-hover:text-error">
                    {countExpense}
                  </span>
                </label>
              </div>
            </section>
            <section className="space-y-sm">
              <h3 className="font-label-md text-label-md font-bold text-outline uppercase tracking-widest px-sm">
                Timeframe
              </h3>
              <div className="space-y-base">
                <button
                  className={`w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors ${timeframe === "30" ? "text-primary font-medium" : ""}`}
                  onClick={() => setTimeframe("30")}
                >
                  Last 30 Days
                </button>
                <button
                  className={`w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors ${timeframe === "90" ? "text-primary font-medium" : ""}`}
                  onClick={() => setTimeframe("90")}
                >
                  Last 90 Days
                </button>
                <button
                  className={`w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors ${timeframe === "year" ? "text-primary font-medium" : ""}`}
                  onClick={() => setTimeframe("year")}
                >
                  This Year
                </button>
              </div>
            </section>
            <div className="p-lg rounded-xl bg-primary-container/10 border border-primary-container/20 space-y-sm">
              <p className="font-label-md text-label-md text-primary font-bold">
                Monthly Forecast
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {countAll > 0
                  ? `${countAll} transactions recorded total`
                  : "Add your first transaction to see insights"}
              </p>
              <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3" />
              </div>
            </div>
          </aside>
          <div className="flex-1 min-w-0">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
              <div className="p-md flex items-center justify-between bg-surface-container-low border-b border-outline-variant">
                <div className="flex items-center gap-md">
                  <div className="flex items-center gap-sm">
                    <input
                      className="rounded border-outline-variant text-primary focus:ring-primary/20"
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleSelectAll}
                    />
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      {selectedIds.length} item
                      {selectedIds.length !== 1 ? "s" : ""} selected
                    </span>
                  </div>
                  <div className="h-4 w-[1px] bg-outline-variant" />
                  <button
                    className="text-error font-label-md text-label-md font-bold hover:underline"
                    onClick={() => {
                      deleteTransactions(selectedIds);
                      setSelectedIds([]);
                    }}
                    disabled={selectedIds.length === 0}
                    style={
                      selectedIds.length === 0
                        ? { opacity: 0.4, cursor: "not-allowed" }
                        : {}
                    }
                  >
                    Delete Selected
                  </button>
                  {/* <button className="text-primary font-label-md text-label-md font-bold hover:underline">
                    Mark as Paid
                  </button> */}
                </div>
                <div className="flex items-center gap-sm">
                  <span className="font-label-md text-label-md text-outline">
                    Showing {Math.min(10, filtered.length)} of {filtered.length}
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant bg-surface-container-low">
                      <th className="p-md w-12">
                        <input
                          className="rounded border-outline-variant"
                          type="checkbox"
                          checked={allVisibleSelected}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="p-md font-label-md text-label-md text-outline uppercase tracking-wider font-bold">
                        Date
                      </th>
                      <th className="p-md font-label-md text-label-md text-outline uppercase tracking-wider font-bold">
                        Title
                      </th>
                      <th className="p-md font-label-md text-label-md text-outline uppercase tracking-wider font-bold">
                        Category
                      </th>
                      <th className="p-md font-label-md text-label-md text-outline uppercase tracking-wider font-bold">
                        Account
                      </th>
                      <th className="p-md font-label-md text-label-md text-outline uppercase tracking-wider font-bold text-right">
                        Amount
                      </th>
                      <th className="p-md w-12" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/50">
                    {filtered.length === 0 ? (
                      <tr>
                        <td
                          className="p-xl text-center text-on-surface-variant"
                          colSpan={7}
                        >
                          No transactions found.
                        </td>
                      </tr>
                    ) : (
                      filtered.slice(0, 10).map((t, i) => (
                        <tr
                          key={t.id}
                          className="hover:bg-surface-container/50 transition-colors"
                          onMouseEnter={() => setHoveredRow(i)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <td className="p-md">
                            <input
                              className="rounded border-outline-variant"
                              type="checkbox"
                              checked={selectedIds.includes(t.id)}
                              onChange={() => toggleSelect(t.id)}
                            />
                          </td>
                          <td className="p-md font-mono-data text-mono-data text-on-surface-variant">
                            {new Date(t.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td className="p-md font-body-sm text-body-sm font-medium text-on-surface">
                            {t.title}
                          </td>
                          <td className="p-md">
                            <span
                              className={`px-sm py-1 rounded-full font-label-md text-[11px] font-bold uppercase tracking-wide ${t.type === "income" ? "bg-secondary-container/20 text-secondary" : "bg-primary-container/10 text-primary"}`}
                            >
                              {t.category}
                            </span>
                          </td>
                          <td className="p-md">
                            <div className="flex items-center gap-xs text-outline">
                              <span className="material-symbols-outlined text-sm">
                                account_balance
                              </span>
                              <span className="font-body-sm text-body-sm capitalize">
                                {t.account}
                              </span>
                            </div>
                          </td>
                          <td
                            className={`p-md font-mono-data text-mono-data font-medium text-right ${t.type === "income" ? "text-secondary font-bold" : ""}`}
                          >
                            {t.type === "income" ? "+" : "-"}
                            {formatCurrency(
                              t.amount,
                              t.currency || defaultCurrency,
                            )}
                          </td>
                          <td className="p-md">
                            <button
                              className={`material-symbols-outlined text-outline hover:text-on-surface transition-all duration-200 ${hoveredRow === i ? "opacity-100" : "opacity-30"}`}
                            >
                              more_horiz
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-md flex items-center justify-between bg-surface-container-low border-t border-outline-variant">
                <div className="flex items-center gap-sm">
                  <span className="font-label-md text-label-md text-outline">
                    Rows per page:
                  </span>
                  <select className="bg-transparent border-none font-label-md text-label-md focus:ring-0 cursor-pointer">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                </div>
                <div className="flex items-center gap-md">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Page 1 of 13
                  </span>
                  <div className="flex items-center gap-xs">
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-50"
                      disabled
                    >
                      <span className="material-symbols-outlined text-sm">
                        chevron_left
                      </span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors">
                      <span className="material-symbols-outlined text-sm">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-gutter">
              <div className="p-lg rounded-xl glass-panel flex flex-col gap-sm">
                <div className="flex items-center gap-sm text-primary">
                  <span className="material-symbols-outlined text-md">
                    trending_down
                  </span>
                  <span className="font-label-md text-label-md font-bold uppercase tracking-wider">
                    Top Category
                  </span>
                </div>
                <div className="mt-auto">
                  <p className="font-headline-md text-headline-md font-bold text-on-surface capitalize">
                    {topCategory[0]}
                  </p>
                  <p className="font-body-sm text-body-sm text-outline">
                    {formatCurrency(topCategory[1], defaultCurrency)} total
                  </p>
                </div>
              </div>
              <div className="p-lg rounded-xl glass-panel flex flex-col gap-sm">
                <div className="flex items-center gap-sm text-secondary">
                  <span className="material-symbols-outlined text-md">
                    savings
                  </span>
                  <span className="font-label-md text-label-md font-bold uppercase tracking-wider">
                    Avg. Saving Rate
                  </span>
                </div>
                <div className="mt-auto">
                  <p className="font-headline-md text-headline-md font-bold text-on-surface">
                    {savingsRate}%
                  </p>
                  <p className="font-body-sm text-body-sm text-outline">
                    {totalIncomeAmount > 0
                      ? `${formatCurrency(totalIncomeAmount - totalExpenseAmount, defaultCurrency)} saved`
                      : "No data yet"}
                  </p>
                </div>
              </div>
              <div className="p-lg rounded-xl glass-panel flex flex-col gap-sm">
                <div className="flex items-center gap-sm text-tertiary">
                  <span className="material-symbols-outlined text-md">
                    warning
                  </span>
                  <span className="font-label-md text-label-md font-bold uppercase tracking-wider">
                    Total Expenses
                  </span>
                </div>
                <div className="mt-auto">
                  <p className="font-headline-md text-headline-md font-bold text-on-surface">
                    {formatCurrency(totalExpenseAmount || 0, defaultCurrency)}
                  </p>
                  <p className="font-body-sm text-body-sm text-outline">
                    {countExpense} transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <button className="fixed bottom-gutter right-gutter w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-50">
        <Link href="/Quickadd">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            add
          </span>
        </Link>
      </button>
    </>
  );
}
