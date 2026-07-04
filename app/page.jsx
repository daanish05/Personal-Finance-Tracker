'use client';

import { useState, useEffect } from 'react';
import IncomeExpenseChart from '../components/Dashboard/IncomeExpenseChart';
import ThemeToggle from '../components/Dashboard/ThemeToggle';
import Header from '../components/Dashboard/Header';

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
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
                  $24,560.00
                </h2>
                <div className="mt-md flex items-center gap-base text-secondary font-label-md">
                  <span className="material-symbols-outlined text-[16px]">
                    trending_up
                  </span>
                  <span>+2.4% vs last month</span>
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
                  $8,200.00
                </h2>
                <div className="mt-md flex items-center gap-base text-secondary font-label-md">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  <span>On track for goal</span>
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
                  $3,450.00
                </h2>
                <div className="mt-md flex items-center gap-base text-tertiary font-label-md">
                  <span className="material-symbols-outlined text-[16px]">
                    warning
                  </span>
                  <span>15% higher than avg</span>
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
                  $12,400.00
                </h2>
                <div className="mt-md flex items-center gap-base text-secondary font-label-md">
                  <span className="material-symbols-outlined text-[16px]">
                    add_task
                  </span>
                  <span>$1,200 saved this month</span>
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
                  <IncomeExpenseChart dark={dark} />
                </div>
              </div>
              {/* Right Column: Budget & Insight */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
                {/* AI Insight Widget */}
                <div className="bg-primary/5 border border-primary/20 p-lg rounded-xl relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-[80px]">
                      psychology
                    </span>
                  </div>
                  <div className="flex items-center gap-sm mb-sm text-primary">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      auto_awesome
                    </span>
                    <span className="font-label-md uppercase tracking-widest font-bold">
                      AI Insight
                    </span>
                  </div>
                  <p className="text-on-surface font-body-md leading-relaxed">
                    "You've spent
                    <span className="font-bold text-tertiary">15% more</span> on
                    Dining Out this month. Consider adjusting your budget for
                    next week."
                  </p>
                  <button className="mt-md text-primary font-label-md flex items-center gap-xs hover:underline">
                    View analysis
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </button>
                </div>
                {/* Budget Progress */}
                <div className="glass-panel p-lg rounded-xl flex-1">
                  <h3 className="font-headline-md text-on-surface font-bold mb-xl">
                    Budget Progress
                  </h3>
                  <div className="space-y-xl">
                    {/* Food */}
                    <div className="space-y-sm">
                      <div className="flex justify-between font-label-md">
                        <span className="text-on-surface">
                          Food &amp; Dining
                        </span>
                        <span className="text-on-surface-variant">
                          70%
                          <span className="text-[10px] text-outline">
                            ($840 / $1,200)
                          </span>
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary w-[70%]" />
                      </div>
                    </div>
                    {/* Shopping */}
                    <div className="space-y-sm">
                      <div className="flex justify-between font-label-md">
                        <span className="text-on-surface">Shopping</span>
                        <span className="text-on-surface-variant">
                          40%
                          <span className="text-[10px] text-outline">
                            ($320 / $800)
                          </span>
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[40%]" />
                      </div>
                    </div>
                    {/* Travel */}
                    <div className="space-y-sm">
                      <div className="flex justify-between font-label-md">
                        <span className="text-on-surface">Travel</span>
                        <span className="text-on-surface-variant">
                          15%
                          <span className="text-[10px] text-outline">
                            ($75 / $500)
                          </span>
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                        <div className="h-full bg-secondary w-[15%]" />
                      </div>
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
                        Status
                      </th>
                      <th className="px-xl py-md font-label-md text-on-surface-variant text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    <tr className="hover:bg-surface-variant/10 transition-colors">
                      <td className="px-xl py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-8 h-8 rounded bg-surface-variant/40 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              devices
                            </span>
                          </div>
                          <p className="font-body-sm font-bold">
                            Apple Services
                          </p>
                        </div>
                      </td>
                      <td className="px-xl py-md text-body-sm text-on-surface-variant">
                        Subscription
                      </td>
                      <td className="px-xl py-md text-body-sm text-on-surface-variant">
                        May 24, 2024
                      </td>
                      <td className="px-xl py-md">
                        <span className="px-sm py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded uppercase tracking-wider">
                          Completed
                        </span>
                      </td>
                      <td className="px-xl py-md text-right font-mono-data text-tertiary">
                        -$14.99
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-variant/10 transition-colors">
                      <td className="px-xl py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-8 h-8 rounded bg-surface-variant/40 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              coffee
                            </span>
                          </div>
                          <p className="font-body-sm font-bold">Starbucks</p>
                        </div>
                      </td>
                      <td className="px-xl py-md text-body-sm text-on-surface-variant">
                        Dining
                      </td>
                      <td className="px-xl py-md text-body-sm text-on-surface-variant">
                        May 23, 2024
                      </td>
                      <td className="px-xl py-md">
                        <span className="px-sm py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded uppercase tracking-wider">
                          Completed
                        </span>
                      </td>
                      <td className="px-xl py-md text-right font-mono-data text-tertiary">
                        -$5.45
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-variant/10 transition-colors">
                      <td className="px-xl py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-8 h-8 rounded bg-surface-variant/40 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              shopping_basket
                            </span>
                          </div>
                          <p className="font-body-sm font-bold">Whole Foods</p>
                        </div>
                      </td>
                      <td className="px-xl py-md text-body-sm text-on-surface-variant">
                        Groceries
                      </td>
                      <td className="px-xl py-md text-body-sm text-on-surface-variant">
                        May 22, 2024
                      </td>
                      <td className="px-xl py-md">
                        <span className="px-sm py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded uppercase tracking-wider">
                          Completed
                        </span>
                      </td>
                      <td className="px-xl py-md text-right font-mono-data text-tertiary">
                        -$142.30
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-variant/10 transition-colors">
                      <td className="px-xl py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              work
                            </span>
                          </div>
                          <p className="font-body-sm font-bold">
                            Monthly Salary
                          </p>
                        </div>
                      </td>
                      <td className="px-xl py-md text-body-sm text-on-surface-variant">
                        Income
                      </td>
                      <td className="px-xl py-md text-body-sm text-on-surface-variant">
                        May 20, 2024
                      </td>
                      <td className="px-xl py-md">
                        <span className="px-sm py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded uppercase tracking-wider">
                          Completed
                        </span>
                      </td>
                      <td className="px-xl py-md text-right font-mono-data text-secondary">
                        +$8,200.00
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-variant/10 transition-colors">
                      <td className="px-xl py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-8 h-8 rounded bg-surface-variant/40 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              home
                            </span>
                          </div>
                          <p className="font-body-sm font-bold">Rent Payment</p>
                        </div>
                      </td>
                      <td className="px-xl py-md text-body-sm text-on-surface-variant">
                        Housing
                      </td>
                      <td className="px-xl py-md text-body-sm text-on-surface-variant">
                        May 1, 2024
                      </td>
                      <td className="px-xl py-md">
                        <span className="px-sm py-0.5 bg-outline-variant text-on-surface-variant text-[10px] font-bold rounded uppercase tracking-wider">
                          Pending
                        </span>
                      </td>
                      <td className="px-xl py-md text-right font-mono-data text-tertiary">
                        -$2,100.00
                      </td>
                    </tr>
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
