'use client';

import { useState } from 'react';

export default function Transaction() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <>
      <main className="ml-60 flex-1 min-h-screen flex flex-col">
        <header className="h-16 flex items-center justify-between px-xl sticky top-0 z-40 bg-surface/80 backdrop-blur-md">
          <div className="flex items-center gap-lg flex-1">
            <div className={`flex items-center bg-surface-container-low border border-outline-variant/50 rounded-lg px-md h-10 max-w-[480px] w-full gap-sm transition-all ${isSearchFocused ? 'ring-2 ring-primary/10' : ''}`}>
              <span className="material-symbols-outlined text-outline text-[20px] leading-none">
                search
              </span>
              <input className="bg-transparent border-none focus:ring-0 text-body-sm w-full placeholder:text-outline/60 h-full outline-none"
                placeholder="Search transactions, accounts..."
                type="text"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}/>
            </div>
            <div className="flex items-center gap-sm -ml-1">
              <button className="flex items-center gap-xs px-sm py-1.5 text-on-surface-variant border border-outline-variant/50 rounded-lg hover:bg-surface-container transition-colors text-label-sm">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span className="font-label-md text-label-md">Date</span>
              </button>
              <button className="flex items-center gap-xs px-sm py-1.5 text-on-surface-variant border border-outline-variant/50 rounded-lg hover:bg-surface-container transition-colors text-label-sm">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                <span className="font-label-md text-label-md">Category</span>
              </button>
              <button className="flex items-center gap-xs px-sm py-1.5 text-on-surface-variant border border-outline-variant/50 rounded-lg hover:bg-surface-container transition-colors text-label-sm">
                <span className="material-symbols-outlined text-sm">payments</span>
                <span className="font-label-md text-label-md">Amount</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-lg">
            <button className="relative text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface" />
            </button>
            <div className="h-8 w-[1px] bg-outline-variant/50" />
            <a href="/Quickadd" className="flex items-center gap-sm bg-primary text-on-primary px-lg py-2 rounded-lg font-label-md hover:opacity-90 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Quick Add
            </a>
            <div className="flex items-center gap-sm cursor-pointer group">
              <div className="text-right">
                <p className="font-label-md text-on-surface font-bold">Alex Sterling</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Premium Member</p>
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
        </header>
        <div className="flex flex-1 gap-gutter p-gutter max-w-[1440px] mx-auto w-full">
          <aside className="w-64 shrink-0 space-y-gutter">
            <section className="space-y-sm">
              <h3 className="font-label-md text-label-md font-bold text-outline uppercase tracking-widest px-sm">Type</h3>
              <div className="space-y-base">
                <label className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group">
                  <div className="flex items-center gap-sm">
                    <input className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20" name="type" type="radio" />
                    <span className="font-body-sm text-body-sm">All Transactions</span>
                  </div>
                  <span className="font-mono-data text-mono-data text-outline group-hover:text-primary">124</span>
                </label>
                <label className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group">
                  <div className="flex items-center gap-sm">
                    <input className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20" name="type" type="radio" />
                    <span className="font-body-sm text-body-sm">Income</span>
                  </div>
                  <span className="font-mono-data text-mono-data text-outline group-hover:text-secondary">42</span>
                </label>
                <label className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group">
                  <div className="flex items-center gap-sm">
                    <input className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20" name="type" type="radio" />
                    <span className="font-body-sm text-body-sm">Expense</span>
                  </div>
                  <span className="font-mono-data text-mono-data text-outline group-hover:text-error">82</span>
                </label>
              </div>
            </section>
            <section className="space-y-sm">
              <h3 className="font-label-md text-label-md font-bold text-outline uppercase tracking-widest px-sm">Timeframe</h3>
              <div className="space-y-base">
                <button className="w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors text-primary font-medium">Last 30 Days</button>
                <button className="w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors">Last 90 Days</button>
                <button className="w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors">This Year</button>
              </div>
            </section>
            <div className="p-lg rounded-xl bg-primary-container/10 border border-primary-container/20 space-y-sm">
              <p className="font-label-md text-label-md text-primary font-bold">Monthly Forecast</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Your spending is 12% lower than last month. Keep it up!</p>
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
                    <input className="rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                    <span className="font-label-md text-label-md text-on-surface-variant">12 items selected</span>
                  </div>
                  <div className="h-4 w-[1px] bg-outline-variant" />
                  <button className="text-error font-label-md text-label-md font-bold hover:underline">Delete Selected</button>
                  <button className="text-primary font-label-md text-label-md font-bold hover:underline">Mark as Paid</button>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="font-label-md text-label-md text-outline">Showing 1-10 of 124</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant bg-surface-container-low">
                      <th className="p-md w-12"><input className="rounded border-outline-variant" type="checkbox" /></th>
                      <th className="p-md font-label-md text-label-md text-outline uppercase tracking-wider font-bold">Date</th>
                      <th className="p-md font-label-md text-label-md text-outline uppercase tracking-wider font-bold">Title</th>
                      <th className="p-md font-label-md text-label-md text-outline uppercase tracking-wider font-bold">Category</th>
                      <th className="p-md font-label-md text-label-md text-outline uppercase tracking-wider font-bold">Account</th>
                      <th className="p-md font-label-md text-label-md text-outline uppercase tracking-wider font-bold text-right">Amount</th>
                      <th className="p-md w-12" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/50">
                    {[
                      { date: 'May 14, 2024', title: 'Apple Store Subscription', category: 'Technology', account: 'Chase Bank', amount: '-$14.99' },
                      { date: 'May 12, 2024', title: 'Monthly Salary Deposit', category: 'Income', account: 'Wells Fargo', amount: '+$8,450.00', income: true },
                      { date: 'May 10, 2024', title: 'Blue Bottle Coffee', category: 'Lifestyle', account: 'Cash', amount: '-$6.50' },
                      { date: 'May 09, 2024', title: 'Whole Foods Market', category: 'Groceries', account: 'Chase Bank', amount: '-$142.18' },
                      { date: 'May 08, 2024', title: 'Equinox Gym', category: 'Health', account: 'Chase Bank', amount: '-$260.00' },
                      { date: 'May 05, 2024', title: 'Airbnb Booking #4521', category: 'Travel', account: 'Amex Gold', amount: '-$1,120.45' },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className="hover:bg-surface-container/50 transition-colors"
                        onMouseEnter={() => setHoveredRow(i)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="p-md"><input className="rounded border-outline-variant" type="checkbox" /></td>
                        <td className="p-md font-mono-data text-mono-data text-on-surface-variant">{row.date}</td>
                        <td className="p-md font-body-sm text-body-sm font-medium">{row.title}</td>
                        <td className="p-md">
                          <span className={`px-sm py-1 rounded-full font-label-md text-[11px] font-bold uppercase tracking-wide ${row.income ? 'bg-secondary-container/20 text-secondary' : row.category === 'Lifestyle' ? 'bg-tertiary-fixed/30 text-tertiary' : row.category === 'Groceries' ? 'bg-outline-variant/20 text-outline' : row.category === 'Health' ? 'bg-error-container/20 text-error' : 'bg-primary-container/10 text-primary'}`}>
                            {row.category}
                          </span>
                        </td>
                        <td className="p-md">
                          <div className="flex items-center gap-xs text-outline">
                            <span className="material-symbols-outlined text-sm">account_balance</span>
                            <span className="font-body-sm text-body-sm">{row.account}</span>
                          </div>
                        </td>
                        <td className={`p-md font-mono-data text-mono-data font-medium text-right ${row.income ? 'text-secondary font-bold' : ''}`}>{row.amount}</td>
                        <td className="p-md">
                          <button className={`material-symbols-outlined text-outline hover:text-on-surface transition-all duration-200 ${hoveredRow === i ? 'opacity-100' : 'opacity-30'}`}>
                            more_horiz
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-md flex items-center justify-between bg-surface-container-low border-t border-outline-variant">
                <div className="flex items-center gap-sm">
                  <span className="font-label-md text-label-md text-outline">Rows per page:</span>
                  <select className="bg-transparent border-none font-label-md text-label-md focus:ring-0 cursor-pointer">
                    <option>10</option><option>25</option><option>50</option>
                  </select>
                </div>
                <div className="flex items-center gap-md">
                  <span className="font-label-md text-label-md text-on-surface-variant">Page 1 of 13</span>
                  <div className="flex items-center gap-xs">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-50" disabled>
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-gutter">
              <div className="p-lg rounded-xl glass-panel flex flex-col gap-sm">
                <div className="flex items-center gap-sm text-primary">
                  <span className="material-symbols-outlined text-md">trending_down</span>
                  <span className="font-label-md text-label-md font-bold uppercase tracking-wider">Top Category</span>
                </div>
                <div className="mt-auto">
                  <p className="font-headline-md text-headline-md font-bold">Lifestyle</p>
                  <p className="font-body-sm text-body-sm text-outline">$4,230 this month</p>
                </div>
              </div>
              <div className="p-lg rounded-xl glass-panel flex flex-col gap-sm">
                <div className="flex items-center gap-sm text-secondary">
                  <span className="material-symbols-outlined text-md">savings</span>
                  <span className="font-label-md text-label-md font-bold uppercase tracking-wider">Avg. Saving Rate</span>
                </div>
                <div className="mt-auto">
                  <p className="font-headline-md text-headline-md font-bold">34.2%</p>
                  <p className="font-body-sm text-body-sm text-outline">+2.1% from Q1</p>
                </div>
              </div>
              <div className="p-lg rounded-xl glass-panel flex flex-col gap-sm">
                <div className="flex items-center gap-sm text-tertiary">
                  <span className="material-symbols-outlined text-md">warning</span>
                  <span className="font-label-md text-label-md font-bold uppercase tracking-wider">High Frequency</span>
                </div>
                <div className="mt-auto">
                  <p className="font-headline-md text-headline-md font-bold">Subscriptions</p>
                  <p className="font-body-sm text-body-sm text-outline">14 active renewals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <button className="fixed bottom-gutter right-gutter w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-50">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>add</span>
      </button>
    </>
  );
}
