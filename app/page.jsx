'use client';

import { useState, useEffect } from 'react';
import IncomeExpenseChart from '../components/Dashboard/IncomeExpenseChart';
import { useTransactions, formatCurrency } from '../contexts/TransactionContext';
import Header from '../components/Dashboard/Header';

import { useTheme } from "next-themes";

export default function Home() {
  const { dark } = useTheme();
  const { totalIncome, totalExpenses, balance, transactions, defaultCurrency } = useTransactions();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyIncome = transactions
    .filter((t) => t.type === "income" && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const monthlyExpenses = transactions
    .filter((t) => t.type === "expense" && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const savings = balance > 0 ? balance : 0;

  const [budgets, setBudgets] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("budgets");
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return { food: 1200, shopping: 800, transport: 500, bills: 0, health: 0 };
  });

  const [editingBudget, setEditingBudget] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  const categoryLabels = {
    food: "Food & Dining",
    shopping: "Shopping",
    bills: "Bills & Utilities",
    transport: "Transportation",
    health: "Health & Fitness",
  };

  const categoryColors = {
    food: "bg-tertiary",
    shopping: "bg-primary",
    bills: "bg-error",
    transport: "bg-secondary",
    health: "bg-warning",
  };

  const monthlySpending = {};
  transactions
    .filter((t) => t.type === "expense" && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
    .forEach((t) => {
      monthlySpending[t.category] = (monthlySpending[t.category] || 0) + Number(t.amount);
    });

  return (
    <>
      <>
        {/* Main Content Shell */}
        <main className="ml-60 min-h-screen flex flex-col">
          {/* Top Nav Bar */}
          <Header />
          {/* Dashboard Content */}
          <div className="p-xl max-w-container-max mx-auto w-full space-y-gutter">
            {/* Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {/* Total Balance */}
              <div className="glass-panel p-lg rounded-xl shadow-sm hover:border-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-sm">
                  <p className="text-on-surface-variant font-label-md">
                    Total Balance
                  </p>
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                    account_balance
                  </span>
                </div>
                <h2 className="text-headline-md font-bold font-mono-data">
                  {formatCurrency(balance, defaultCurrency)}
                </h2>
                <div className="mt-md flex items-center gap-base text-secondary font-label-md">
                  <span className="material-symbols-outlined text-[16px]">
                    trending_up
                  </span>
                  <span>{transactions.length} transactions tracked</span>
                </div>
              </div>
              {/* Monthly Income */}
              <div className="glass-panel p-lg rounded-xl shadow-sm hover:border-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-sm">
                  <p className="text-on-surface-variant font-label-md">
                    Monthly Income
                  </p>
                  <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">
                    payments
                  </span>
                </div>
                <h2 className="text-headline-md font-bold font-mono-data">
                  {formatCurrency(monthlyIncome, defaultCurrency)}
                </h2>
                <div className="mt-md flex items-center gap-base text-secondary font-label-md">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  <span>{monthlyIncome > 0 ? "Income recorded" : "No income yet"}</span>
                </div>
              </div>
              {/* Monthly Expenses */}
              <div className="glass-panel p-lg rounded-xl shadow-sm hover:border-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-sm">
                  <p className="text-on-surface-variant font-label-md">
                    Monthly Expenses
                  </p>
                  <span className="material-symbols-outlined text-error group-hover:scale-110 transition-transform">
                    shopping_cart
                  </span>
                </div>
                <h2 className="text-headline-md font-bold font-mono-data">
                  {formatCurrency(monthlyExpenses, defaultCurrency)}
                </h2>
                <div className="mt-md flex items-center gap-base text-tertiary font-label-md">
                  <span className="material-symbols-outlined text-[16px]">
                    warning
                  </span>
                  <span>{monthlyExpenses > 0 ? `${monthlyExpenses.toFixed(0)} spent this month` : "No expenses yet"}</span>
                </div>
              </div>
              {/* Savings */}
              <div className="glass-panel p-lg rounded-xl shadow-sm hover:border-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-sm">
                  <p className="text-on-surface-variant font-label-md">
                    Savings
                  </p>
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                    savings
                  </span>
                </div>
                <h2 className="text-headline-md font-bold font-mono-data">
                  {formatCurrency(savings, defaultCurrency)}
                </h2>
                <div className="mt-md flex items-center gap-base text-secondary font-label-md">
                  <span className="material-symbols-outlined text-[16px]">
                    add_task
                  </span>
                  <span>{savings > 0 ? `${savings.toFixed(0)} available` : "No savings yet"}</span>
                </div>
              </div>
            </div>
            {/* Main Analysis Grid */}
            <div className="grid grid-cols-12 gap-gutter">
              {/* Large Area Chart */}
              <div className="col-span-12 lg:col-span-8 glass-panel p-lg rounded-xl">
                <div className="flex items-center justify-between mb-xl">
                  <div>
                    <h3 className="font-headline-md text-on-surface font-bold">
                      Income vs Expenses
                    </h3>
                    <p className="text-on-surface-variant text-body-sm">
                      6-month performance analysis
                    </p>
                  </div>
                  <div className="flex gap-sm">
                    <button className="px-md py-1 rounded border border-outline-variant text-label-md hover:bg-surface-variant transition-colors">
                      6 Months
                    </button>
                    <button className="px-md py-1 rounded border border-outline-variant text-label-md hover:bg-surface-variant transition-colors">
                      1 Year
                    </button>
                  </div>
                </div>
                <div className="chart-container">
                  <IncomeExpenseChart dark={dark} transactions={transactions} />
                </div>
              </div>
              {/* Right Column: Budget & Insight */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
                {/* Budget Progress */}
                <div className="glass-panel p-lg rounded-xl flex-1">
                  <div className="flex items-center justify-between mb-xl">
                    <h3 className="font-headline-md text-on-surface font-bold">
                      Budget Progress
                    </h3>
                    <span className="font-label-md text-label-md text-outline">{Object.keys(budgets).filter((k) => budgets[k] > 0).length} budgets set</span>
                  </div>
                  <div className="space-y-xl">
                    {Object.entries(categoryLabels).map(([key, label]) => {
                      const budget = budgets[key] || 0;
                      if (budget <= 0) return null;
                      const spent = monthlySpending[key] || 0;
                      const pct = Math.min(100, Math.round((spent / budget) * 100));
                      const isOver = spent > budget;
                      return (
                        <div key={key} className="space-y-sm">
                          <div className="flex justify-between font-label-md">
                            <span className="text-on-surface">{label}</span>
                            <span className="text-on-surface-variant">
                              {editingBudget === key ? (
                                <span className="inline-flex items-center gap-xs">
                                  <input
                                    className="w-20 px-1 py-0.5 bg-surface-container-low border border-outline-variant rounded text-label-md text-right"
                                    type="number"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        setBudgets((prev) => ({ ...prev, [key]: parseFloat(editValue) || 0 }));
                                        setEditingBudget(null);
                                      }
                                      if (e.key === "Escape") setEditingBudget(null);
                                    }}
                                    autoFocus
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <button
                                    className="text-primary text-[12px]"
                                    onClick={() => {
                                      setBudgets((prev) => ({ ...prev, [key]: parseFloat(editValue) || 0 }));
                                      setEditingBudget(null);
                                    }}
                                  >
                                    save
                                  </button>
                                </span>
                              ) : (
                                <span
                                  className="cursor-pointer hover:text-primary transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingBudget(key);
                                    setEditValue(String(budget));
                                  }}
                                >
                                  {pct}%
                                  <span className="text-[10px] text-outline ml-1">
                                    ({formatCurrency(spent, defaultCurrency)} / {formatCurrency(budget, defaultCurrency)})
                                  </span>
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${isOver ? "bg-error" : categoryColors[key]}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          {isOver && (
                            <p className="text-error text-[11px] font-label-md">Exceeded by {formatCurrency(spent - budget, defaultCurrency)}</p>
                          )}
                        </div>
                      );
                    })}
                    {Object.keys(budgets).filter((k) => budgets[k] > 0).length === 0 && (
                      <p className="text-on-surface-variant text-body-sm text-center py-lg">No budgets set. Add a budget below to track spending.</p>
                    )}
                  </div>
                  {/* Quick Add Budget */}
                  <div className="mt-lg pt-lg border-t border-outline-variant/30">
                    <p className="font-label-md text-label-md text-outline mb-sm">Add Budget</p>
                    <div className="flex gap-sm">
                      <select
                        className="flex-1 px-2 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-label-md text-on-surface"
                        value=""
                        onChange={(e) => {
                          const cat = e.target.value;
                          if (cat) {
                            setEditingBudget(cat);
                            setEditValue(String(budgets[cat] || ""));
                          }
                        }}
                      >
                        <option value="" disabled>Select category</option>
                        {Object.entries(categoryLabels).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom Row: Recent Transactions */}
            <div className="glass-panel rounded-xl overflow-hidden shadow-sm">
              <div className="px-xl py-lg border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/50">
                <h3 className="font-headline-md text-on-surface font-bold">
                  Recent Transactions
                </h3>
                <button className="text-primary font-label-md hover:underline">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low/30">
                    <tr>
                      <th className="px-xl py-md font-label-md text-on-surface-variant">
                        Merchant / Entity
                      </th>
                      <th className="px-xl py-md font-label-md text-on-surface-variant">
                        Category
                      </th>
                      <th className="px-xl py-md font-label-md text-on-surface-variant">
                        Date
                      </th>
                      <th className="px-xl py-md font-label-md text-on-surface-variant">
                        Account
                      </th>
                      <th className="px-xl py-md font-label-md text-on-surface-variant text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {transactions.length === 0 ? (
                      <tr>
                        <td className="px-xl py-xl text-center text-on-surface-variant" colSpan={5}>
                          No transactions yet. Add one via Quick Add!
                        </td>
                      </tr>
                    ) : (
                      transactions.slice(0, 5).map((t) => (
                        <tr key={t.id} className="hover:bg-surface-variant/10 transition-colors">
                          <td className="px-xl py-md">
                            <div className="flex items-center gap-md">
                              <div className={`w-8 h-8 rounded flex items-center justify-center ${t.type === "income" ? "bg-primary/10" : "bg-surface-variant/40"}`}>
                                <span className={`material-symbols-outlined text-[18px] ${t.type === "income" ? "text-primary" : "text-primary"}`}>
                                  {t.type === "income" ? "work" : "receipt"}
                                </span>
                              </div>
                              <p className="font-body-sm font-bold text-on-surface">{t.title}</p>
                            </div>
                          </td>
                          <td className="px-xl py-md text-body-sm text-on-surface-variant capitalize">{t.category}</td>
                          <td className="px-xl py-md text-body-sm text-on-surface-variant">{new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                          <td className="px-xl py-md text-body-sm text-on-surface-variant capitalize">{t.account}</td>
                          <td className={`px-xl py-md text-right font-mono-data ${t.type === "income" ? "text-secondary" : "text-tertiary"}`}>
                            {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount, t.currency || defaultCurrency)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Footer Decoration */}
          <footer className="mt-auto px-xl py-lg text-center opacity-50">
            <p className="font-label-md text-on-surface-variant">
              © 2024 WealthFlow Premium Finance • Encrypted &amp; Secure
            </p>
          </footer>
        </main>
      </>
    </>
  );
}
