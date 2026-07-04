export default function Transaction() {
  return (
    <>
      <>
        <aside className="fixed left-0 top-0 h-full w-60 bg-surface-container-low dark:bg-inverse-surface flex flex-col border-r border-outline-variant dark:border-outline z-50">
          <div className="p-lg flex items-center gap-sm">
            <div className="w-8 h-8 bg-primary-container rounded flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined font-bold">
                account_balance_wallet
              </span>
            </div>
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary">
              WealthFlow
            </span>
          </div>
          <nav className="flex-1 px-md space-y-base overflow-y-auto custom-scrollbar pt-base">
            <a
              className="flex items-center gap-sm px-sm py-md rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-md text-label-md">Dashboard</span>
            </a>
            <a
              className="flex items-center gap-sm px-sm py-md rounded-lg text-primary dark:text-inverse-primary font-bold bg-surface-variant dark:bg-surface-container-highest transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">receipt_long</span>
              <span className="font-label-md text-label-md">Transactions</span>
            </a>
            <a
              className="flex items-center gap-sm px-sm py-md rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">account_balance</span>
              <span className="font-label-md text-label-md">Accounts</span>
            </a>
            <a
              className="flex items-center gap-sm px-sm py-md rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">
                account_balance_wallet
              </span>
              <span className="font-label-md text-label-md">Budgets</span>
            </a>
            <a
              className="flex items-center gap-sm px-sm py-md rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">ads_click</span>
              <span className="font-label-md text-label-md">Goals</span>
            </a>
            <a
              className="flex items-center gap-sm px-sm py-md rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">bar_chart</span>
              <span className="font-label-md text-label-md">Reports</span>
            </a>
            <a
              className="flex items-center gap-sm px-sm py-md rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">psychology</span>
              <span className="font-label-md text-label-md">AI Insights</span>
            </a>
          </nav>
          <div className="p-md border-t border-outline-variant dark:border-outline space-y-base">
            <a
              className="flex items-center gap-sm px-sm py-md rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-md text-label-md">Settings</span>
            </a>
            <div className="flex items-center gap-sm px-sm py-md">
              <img
                className="w-8 h-8 rounded-full border border-outline-variant"
                data-alt="A clean, minimalist profile picture of a professional user, shot with soft studio lighting against a light gray background, conveying a high-end corporate minimalist aesthetic."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDiM-7-zpiMbR2lVm-_5VYp-l7HI8Hn6ID7qYqZsUllFgCGtGMSWwFDl7t-lpFmG8-LVawA0_tlg2plM0RTGh2WcwfQ49_CIqKuC_AuCCpG5Hyv972vwJr_pkDEoDm_GakZQis69RaqNcla6yGVywaCXKjL3lO5IWVA7NcvILc83LXfiBPVTCXwqMK8EHh9WmfBLDAa-vI-t3yGENxfbJ6XkGiypDc2pxCSgzlNzWiC1Svr3I1zB8p"
              />
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold">
                  Alex Chen
                </span>
                <span className="text-[10px] text-outline uppercase tracking-wider">
                  Premium Plan
                </span>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content Shell */}
        <main className="ml-60 flex-1 min-h-screen flex flex-col">
          {/* Top Navigation Bar */}
          <header className="flex justify-between items-center w-full px-lg py-md sticky top-0 z-40 bg-surface/80 dark:bg-background/80 backdrop-blur-md border-b border-outline-variant dark:border-outline">
            <div className="flex items-center gap-gutter flex-1">
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-sm text-body-sm outline-none"
                  placeholder="Search transactions..."
                  type="text"
                />
              </div>
              <div className="flex items-center gap-sm">
                <button className="flex items-center gap-xs px-sm py-2 text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    calendar_today
                  </span>
                  <span className="font-label-md text-label-md">Date</span>
                </button>
                <button className="flex items-center gap-xs px-sm py-2 text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    filter_list
                  </span>
                  <span className="font-label-md text-label-md">Category</span>
                </button>
                <button className="flex items-center gap-xs px-sm py-2 text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    payments
                  </span>
                  <span className="font-label-md text-label-md">Amount</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-md">
              <button className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors">
                notifications
              </button>
              <button className="flex items-center gap-xs bg-primary text-on-primary px-lg py-2 rounded-lg font-label-md text-label-md font-bold hover:bg-primary-container transition-all active:scale-95 shadow-sm">
                <span className="material-symbols-outlined text-md">add</span>
                Quick Add
              </button>
            </div>
          </header>
          {/* Page Content Layout */}
          <div className="flex flex-1 gap-gutter p-gutter max-w-[1440px] mx-auto w-full">
            {/* Quick Filters Sidebar (Local) */}
            <aside className="w-64 shrink-0 space-y-gutter">
              <section className="space-y-sm">
                <h3 className="font-label-md text-label-md font-bold text-outline uppercase tracking-widest px-sm">
                  Type
                </h3>
                <div className="space-y-base">
                  <label className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group">
                    <div className="flex items-center gap-sm">
                      <input
                        className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20"
                        name="type"
                        type="radio"
                      />
                      <span className="font-body-sm text-body-sm">
                        All Transactions
                      </span>
                    </div>
                    <span className="font-mono-data text-mono-data text-outline group-hover:text-primary">
                      124
                    </span>
                  </label>
                  <label className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group">
                    <div className="flex items-center gap-sm">
                      <input
                        className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20"
                        name="type"
                        type="radio"
                      />
                      <span className="font-body-sm text-body-sm">Income</span>
                    </div>
                    <span className="font-mono-data text-mono-data text-outline group-hover:text-secondary">
                      42
                    </span>
                  </label>
                  <label className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group">
                    <div className="flex items-center gap-sm">
                      <input
                        className="w-4 h-4 text-primary border-outline-variant focus:ring-primary/20"
                        name="type"
                        type="radio"
                      />
                      <span className="font-body-sm text-body-sm">Expense</span>
                    </div>
                    <span className="font-mono-data text-mono-data text-outline group-hover:text-error">
                      82
                    </span>
                  </label>
                </div>
              </section>
              <section className="space-y-sm">
                <h3 className="font-label-md text-label-md font-bold text-outline uppercase tracking-widest px-sm">
                  Timeframe
                </h3>
                <div className="space-y-base">
                  <button className="w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors text-primary font-medium">
                    Last 30 Days
                  </button>
                  <button className="w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors">
                    Last 90 Days
                  </button>
                  <button className="w-full text-left p-sm rounded-lg hover:bg-surface-container-high font-body-sm text-body-sm transition-colors">
                    This Year
                  </button>
                </div>
              </section>
              <div className="p-lg rounded-xl bg-primary-container/10 border border-primary-container/20 space-y-sm">
                <p className="font-label-md text-label-md text-primary font-bold">
                  Monthly Forecast
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Your spending is 12% lower than last month. Keep it up!
                </p>
                <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3" />
                </div>
              </div>
            </aside>
            {/* Data Table Section */}
            <div className="flex-1 min-w-0">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
                {/* Table Header Actions */}
                <div className="p-md flex items-center justify-between bg-surface-container-low border-b border-outline-variant">
                  <div className="flex items-center gap-md">
                    <div className="flex items-center gap-sm">
                      <input
                        className="rounded border-outline-variant text-primary focus:ring-primary/20"
                        type="checkbox"
                      />
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        12 items selected
                      </span>
                    </div>
                    <div className="h-4 w-[1px] bg-outline-variant" />
                    <button className="text-error font-label-md text-label-md font-bold hover:underline">
                      Delete Selected
                    </button>
                    <button className="text-primary font-label-md text-label-md font-bold hover:underline">
                      Mark as Paid
                    </button>
                  </div>
                  <div className="flex items-center gap-sm">
                    <span className="font-label-md text-label-md text-outline">
                      Showing 1-10 of 124
                    </span>
                  </div>
                </div>
                {/* TanStack Style Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant bg-surface-container-low">
                        <th className="p-md w-12">
                          <input
                            className="rounded border-outline-variant"
                            type="checkbox"
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
                      {/* Row 1 */}
                      <tr className="hover:bg-surface-container/50 transition-colors">
                        <td className="p-md">
                          <input
                            className="rounded border-outline-variant"
                            type="checkbox"
                          />
                        </td>
                        <td className="p-md font-mono-data text-mono-data text-on-surface-variant">
                          May 14, 2024
                        </td>
                        <td className="p-md font-body-sm text-body-sm font-medium">
                          Apple Store Subscription
                        </td>
                        <td className="p-md">
                          <span className="px-sm py-1 rounded-full bg-primary-container/10 text-primary font-label-md text-[11px] font-bold uppercase tracking-wide">
                            Technology
                          </span>
                        </td>
                        <td className="p-md">
                          <div className="flex items-center gap-xs text-outline">
                            <span className="material-symbols-outlined text-sm">
                              account_balance
                            </span>
                            <span className="font-body-sm text-body-sm">
                              Chase Bank
                            </span>
                          </div>
                        </td>
                        <td className="p-md font-mono-data text-mono-data font-medium text-right">
                          -$14.99
                        </td>
                        <td className="p-md">
                          <button className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">
                            more_horiz
                          </button>
                        </td>
                      </tr>
                      {/* Row 2 (Income) */}
                      <tr className="hover:bg-surface-container/50 transition-colors">
                        <td className="p-md">
                          <input
                            className="rounded border-outline-variant"
                            type="checkbox"
                          />
                        </td>
                        <td className="p-md font-mono-data text-mono-data text-on-surface-variant">
                          May 12, 2024
                        </td>
                        <td className="p-md font-body-sm text-body-sm font-medium">
                          Monthly Salary Deposit
                        </td>
                        <td className="p-md">
                          <span className="px-sm py-1 rounded-full bg-secondary-container/20 text-secondary font-label-md text-[11px] font-bold uppercase tracking-wide">
                            Income
                          </span>
                        </td>
                        <td className="p-md">
                          <div className="flex items-center gap-xs text-outline">
                            <span className="material-symbols-outlined text-sm">
                              account_balance
                            </span>
                            <span className="font-body-sm text-body-sm">
                              Wells Fargo
                            </span>
                          </div>
                        </td>
                        <td className="p-md font-mono-data text-mono-data font-bold text-secondary text-right">
                          +$8,450.00
                        </td>
                        <td className="p-md">
                          <button className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">
                            more_horiz
                          </button>
                        </td>
                      </tr>
                      {/* Row 3 */}
                      <tr className="hover:bg-surface-container/50 transition-colors">
                        <td className="p-md">
                          <input
                            className="rounded border-outline-variant"
                            type="checkbox"
                          />
                        </td>
                        <td className="p-md font-mono-data text-mono-data text-on-surface-variant">
                          May 10, 2024
                        </td>
                        <td className="p-md font-body-sm text-body-sm font-medium">
                          Blue Bottle Coffee
                        </td>
                        <td className="p-md">
                          <span className="px-sm py-1 rounded-full bg-tertiary-fixed/30 text-tertiary font-label-md text-[11px] font-bold uppercase tracking-wide">
                            Lifestyle
                          </span>
                        </td>
                        <td className="p-md">
                          <div className="flex items-center gap-xs text-outline">
                            <span className="material-symbols-outlined text-sm">
                              payments
                            </span>
                            <span className="font-body-sm text-body-sm">
                              Cash
                            </span>
                          </div>
                        </td>
                        <td className="p-md font-mono-data text-mono-data font-medium text-right">
                          -$6.50
                        </td>
                        <td className="p-md">
                          <button className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">
                            more_horiz
                          </button>
                        </td>
                      </tr>
                      {/* Row 4 */}
                      <tr className="hover:bg-surface-container/50 transition-colors">
                        <td className="p-md">
                          <input
                            className="rounded border-outline-variant"
                            type="checkbox"
                          />
                        </td>
                        <td className="p-md font-mono-data text-mono-data text-on-surface-variant">
                          May 09, 2024
                        </td>
                        <td className="p-md font-body-sm text-body-sm font-medium">
                          Whole Foods Market
                        </td>
                        <td className="p-md">
                          <span className="px-sm py-1 rounded-full bg-outline-variant/20 text-outline font-label-md text-[11px] font-bold uppercase tracking-wide">
                            Groceries
                          </span>
                        </td>
                        <td className="p-md">
                          <div className="flex items-center gap-xs text-outline">
                            <span className="material-symbols-outlined text-sm">
                              account_balance
                            </span>
                            <span className="font-body-sm text-body-sm">
                              Chase Bank
                            </span>
                          </div>
                        </td>
                        <td className="p-md font-mono-data text-mono-data font-medium text-right">
                          -$142.18
                        </td>
                        <td className="p-md">
                          <button className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">
                            more_horiz
                          </button>
                        </td>
                      </tr>
                      {/* Row 5 */}
                      <tr className="hover:bg-surface-container/50 transition-colors">
                        <td className="p-md">
                          <input
                            className="rounded border-outline-variant"
                            type="checkbox"
                          />
                        </td>
                        <td className="p-md font-mono-data text-mono-data text-on-surface-variant">
                          May 08, 2024
                        </td>
                        <td className="p-md font-body-sm text-body-sm font-medium">
                          Equinox Gym
                        </td>
                        <td className="p-md">
                          <span className="px-sm py-1 rounded-full bg-error-container/20 text-error font-label-md text-[11px] font-bold uppercase tracking-wide">
                            Health
                          </span>
                        </td>
                        <td className="p-md">
                          <div className="flex items-center gap-xs text-outline">
                            <span className="material-symbols-outlined text-sm">
                              account_balance
                            </span>
                            <span className="font-body-sm text-body-sm">
                              Chase Bank
                            </span>
                          </div>
                        </td>
                        <td className="p-md font-mono-data text-mono-data font-medium text-right">
                          -$260.00
                        </td>
                        <td className="p-md">
                          <button className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">
                            more_horiz
                          </button>
                        </td>
                      </tr>
                      {/* Row 6 */}
                      <tr className="hover:bg-surface-container/50 transition-colors">
                        <td className="p-md">
                          <input
                            className="rounded border-outline-variant"
                            type="checkbox"
                          />
                        </td>
                        <td className="p-md font-mono-data text-mono-data text-on-surface-variant">
                          May 05, 2024
                        </td>
                        <td className="p-md font-body-sm text-body-sm font-medium">
                          Airbnb Booking #4521
                        </td>
                        <td className="p-md">
                          <span className="px-sm py-1 rounded-full bg-primary-container/10 text-primary font-label-md text-[11px] font-bold uppercase tracking-wide">
                            Travel
                          </span>
                        </td>
                        <td className="p-md">
                          <div className="flex items-center gap-xs text-outline">
                            <span className="material-symbols-outlined text-sm">
                              account_balance
                            </span>
                            <span className="font-body-sm text-body-sm">
                              Amex Gold
                            </span>
                          </div>
                        </td>
                        <td className="p-md font-mono-data text-mono-data font-medium text-right">
                          -$1,120.45
                        </td>
                        <td className="p-md">
                          <button className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">
                            more_horiz
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
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
                        disabled=""
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
              {/* Subtle Insight Card (Bento Style) */}
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
                    <p className="font-headline-md text-headline-md font-bold">
                      Lifestyle
                    </p>
                    <p className="font-body-sm text-body-sm text-outline">
                      $4,230 this month
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
                    <p className="font-headline-md text-headline-md font-bold">
                      34.2%
                    </p>
                    <p className="font-body-sm text-body-sm text-outline">
                      +2.1% from Q1
                    </p>
                  </div>
                </div>
                <div className="p-lg rounded-xl glass-panel flex flex-col gap-sm">
                  <div className="flex items-center gap-sm text-tertiary">
                    <span className="material-symbols-outlined text-md">
                      warning
                    </span>
                    <span className="font-label-md text-label-md font-bold uppercase tracking-wider">
                      High Frequency
                    </span>
                  </div>
                  <div className="mt-auto">
                    <p className="font-headline-md text-headline-md font-bold">
                      Subscriptions
                    </p>
                    <p className="font-body-sm text-body-sm text-outline">
                      14 active renewals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* Floating Micro-Interaction Trigger (FAB Proxy) */}
        <button className="fixed bottom-gutter right-gutter w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-50">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            add
          </span>
        </button>
      </>
    </>
  );
}
