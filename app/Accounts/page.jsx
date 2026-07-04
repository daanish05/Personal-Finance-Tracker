export default function Accounts() {
  return (
    <>
      <>
        {/* Side Navigation Bar */}
        {/* <aside className="fixed left-0 top-0 h-screen w-60 border-r border-outline-variant bg-surface-container-low flex flex-col z-50">
          <div className="p-lg">
            <h1 className="font-headline-md text-headline-md font-bold text-primary">
              WealthFlow
            </h1>
            <p className="font-label-md text-label-md text-on-surface-variant opacity-70">
              Premium Finance
            </p>
          </div>
          <nav className="flex-1 px-md space-y-base overflow-y-auto custom-scrollbar">
            {/* Navigation Items Mapping from JSON 
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group"
              href="/"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                dashboard
              </span>
              <span className="font-label-md text-label-md">Dashboard</span>
            </a>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group"
              href="/Transaction"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                receipt_long
              </span>
              <span className="font-label-md text-label-md">Transactions</span>
            </a>
            {/* Active Tab: Accounts 
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg bg-surface-variant text-primary font-bold transition-all"
              href="/Accounts"
            >
              <span className="material-symbols-outlined">account_balance</span>
              <span className="font-label-md text-label-md">Accounts</span>
            </a>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                account_balance_wallet
              </span>
              <span className="font-label-md text-label-md">Budgets</span>
            </a>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                ads_click
              </span>
              <span className="font-label-md text-label-md">Goals</span>
            </a>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                bar_chart
              </span>
              <span className="font-label-md text-label-md">Reports</span>
            </a>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                psychology
              </span>
              <span className="font-label-md text-label-md">AI Insights</span>
            </a>
          </nav>
          <div className="p-md border-t border-outline-variant space-y-base">
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-md text-label-md">Settings</span>
            </a>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">contrast</span>
              <span className="font-label-md text-label-md">Theme</span>
            </a>
            <div className="flex items-center gap-md px-md pt-md">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
                <img
                  className="w-full h-full object-cover"
                  data-alt="A professional studio portrait of a high-net-worth individual with a kind expression, wearing a minimalist navy blazer against a soft gray backdrop. The lighting is crisp and modern, reflecting a high-end corporate aesthetic with subtle depth and clarity."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxg0u2nrFWPBjeYS8aoeueJCYxhUZ-3yMKzMzHjxBtQn-belyxqaKAoiIDz8vL5fQKEtcbCeC1-eALSLbPUJu0Kgz_4fV2jBVj1L5JeA5g1C5qDtGVdFaPBUqu_km1jAlsQf2YYhcOYzptnIyOfCG6UJY0aVqaLrlDjj-oHINZuhSlbbi0sa47u5OqyaTIUf3H_kBM3f0tTd_kRU7QcaMSDxDYB-_NmOGOIr1RQ2pWez15g4q55VKQ"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface">
                  Alex Mercer
                </span>
                <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
                  Premium
                </span>
              </div>
            </div>
          </div>
        </aside> */}
        {/* Main Content Area */}
        <main className="ml-60 min-h-screen flex flex-col">
          {/* Top Nav Bar */}
          <header className="sticky top-0 z-40 flex justify-between items-center w-full px-lg py-md bg-surface/80 backdrop-blur-md border-b border-outline-variant">
            <div className="flex items-center gap-lg flex-1">
              <div className="relative w-full max-w-[480px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-body-md">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none text-body-sm transition-all"
                  placeholder="Search accounts or data..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-md">
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2">
                notifications
              </button>
              <button className="bg-primary text-on-primary px-md py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all flex items-center gap-sm active:scale-95">
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                Quick Add
              </button>
            </div>
          </header>
          {/* Content Canvas */}
          <div className="p-xl max-w-container-max w-full mx-auto space-y-xl">
            {/* Net Worth Summary Section */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-lg items-end">
              <div className="md:col-span-8">
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-sm">
                  Total Portfolio Value
                </p>
                <h2 className="font-headline-xl text-headline-xl text-on-surface">
                  $1,482,904.52
                </h2>
                <div className="flex items-center gap-md mt-md">
                  <span className="flex items-center gap-xs text-secondary font-bold font-label-md text-label-md bg-secondary-container/20 px-sm py-1 rounded-full">
                    <span className="material-symbols-outlined text-[16px]">
                      trending_up
                    </span>
                    +2.4%
                  </span>
                  <span className="text-on-surface-variant font-label-md text-label-md italic">
                    Since last month
                  </span>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-end">
                <div className="w-full h-24 relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-sm">
                  {/* Abstract mini-graph visualization */}
                  <div className="absolute inset-x-0 bottom-0 h-16 opacity-20">
                    <svg
                      className="w-full h-full"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 40"
                    >
                      <path
                        d="M0,40 L0,30 C10,25 20,35 30,20 C40,10 50,25 60,15 C70,5 80,20 90,10 L100,5 L100,40 Z"
                        fill="url(#grad1)"
                      />
                      <defs>
                        <linearGradient
                          id="grad1"
                          x1="0%"
                          x2="0%"
                          y1="0%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            style={{
                              stopColor: "var(--primary)",
                              stopOpacity: 1,
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{ stopColor: "white", stopOpacity: 0 }}
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-between h-full relative z-10">
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Performance View
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-6 bg-primary/20 rounded-full" />
                      <div className="w-1.5 h-8 bg-primary/40 rounded-full" />
                      <div className="w-1.5 h-10 bg-primary/60 rounded-full" />
                      <div className="w-1.5 h-12 bg-primary rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Bento Grid of Accounts */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {/* Account Card: Chase Bank (Primary) */}
              <div className="group bg-surface-container-lowest border border-outline-variant p-lg rounded-xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden cursor-pointer">
                <div className="flex justify-between items-start mb-lg">
                  <div className="p-sm bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary">
                      account_balance
                    </span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                      Primary
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                      more_vert
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md mb-xs">
                    Chase Bank
                  </h3>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-lg">
                    Checking Account •••• 4821
                  </p>
                  <div className="flex justify-between items-end">
                    <span className="font-headline-md text-headline-md text-on-surface">
                      $42,390.12
                    </span>
                    <div className="w-20 h-8">
                      <svg
                        className="w-full h-full text-secondary stroke-2 fill-none"
                        viewBox="0 0 100 40"
                      >
                        <path d="M0,35 Q10,30 20,38 T40,25 T60,30 T80,15 T100,20" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* Account Card: Amex Gold (Credit) */}
              <div className="group bg-surface-container-lowest border border-outline-variant p-lg rounded-xl hover:shadow-xl hover:shadow-tertiary/5 transition-all duration-300 relative overflow-hidden cursor-pointer">
                <div className="flex justify-between items-start mb-lg">
                  <div className="p-sm bg-tertiary/10 rounded-lg">
                    <span className="material-symbols-outlined text-tertiary">
                      credit_card
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                    more_vert
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md mb-xs">
                    Amex Gold
                  </h3>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-lg">
                    Credit Card •••• 1004
                  </p>
                  <div className="flex justify-between items-end">
                    <span className="font-headline-md text-headline-md text-on-surface">
                      $1,245.80
                    </span>
                    <div className="w-20 h-8">
                      <svg
                        className="w-full h-full text-error stroke-2 fill-none"
                        viewBox="0 0 100 40"
                      >
                        <path d="M0,10 Q20,15 40,30 T80,35 T100,40" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* Account Card: Savings */}
              <div className="group bg-surface-container-lowest border border-outline-variant p-lg rounded-xl hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 relative overflow-hidden cursor-pointer">
                <div className="flex justify-between items-start mb-lg">
                  <div className="p-sm bg-secondary/10 rounded-lg">
                    <span className="material-symbols-outlined text-secondary">
                      savings
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                    more_vert
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md mb-xs">
                    High-Yield Savings
                  </h3>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-lg">
                    Emergency Fund •••• 9201
                  </p>
                  <div className="flex justify-between items-end">
                    <span className="font-headline-md text-headline-md text-on-surface">
                      $156,000.00
                    </span>
                    <div className="w-20 h-8">
                      <svg
                        className="w-full h-full text-secondary stroke-2 fill-none"
                        viewBox="0 0 100 40"
                      >
                        <path d="M0,40 L20,38 L40,36 L60,32 L80,30 L100,28" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* Account Card: Investment */}
              <div className="group lg:col-span-2 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col md:flex-row gap-lg">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-lg">
                    <div className="p-sm bg-primary/10 rounded-lg">
                      <span className="material-symbols-outlined text-primary">
                        monitoring
                      </span>
                    </div>
                  </div>
                  <h3 className="font-headline-md text-headline-md mb-xs">
                    Fidelity Brokerage
                  </h3>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-lg">
                    Portfolio Managed • Active
                  </p>
                  <span className="font-headline-lg text-headline-lg text-on-surface">
                    $1,280,450.60
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-end min-h-[120px]">
                  <div className="flex justify-between items-center mb-sm">
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Year to Date
                    </span>
                    <span className="text-secondary font-bold">+12.4%</span>
                  </div>
                  <div className="h-24 w-full" />
                </div>
              </div>
              {/* Account Card: Cash */}
              <div className="group bg-surface-container-lowest border border-outline-variant p-lg rounded-xl hover:shadow-xl hover:shadow-on-surface/5 transition-all duration-300 relative overflow-hidden cursor-pointer">
                <div className="flex justify-between items-start mb-lg">
                  <div className="p-sm bg-on-surface/10 rounded-lg">
                    <span className="material-symbols-outlined text-on-surface">
                      payments
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                    more_vert
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md mb-xs">
                    Petty Cash
                  </h3>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-lg">
                    On Hand • Physical
                  </p>
                  <div className="flex justify-between items-end">
                    <span className="font-headline-md text-headline-md text-on-surface">
                      $2,818.00
                    </span>
                    <div className="w-20 h-8 flex items-center justify-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-on-surface-variant/20" />
                      <div className="w-1 h-1 rounded-full bg-on-surface-variant/20" />
                      <div className="w-1 h-1 rounded-full bg-on-surface-variant/20" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Bottom Table: Recent Account Activity (Asymmetric Layout element) */}
            <section className="space-y-lg">
              <div className="flex justify-between items-center">
                <h2 className="font-headline-md text-headline-md">
                  Recent Activity Across Accounts
                </h2>
                <button className="text-primary font-label-md text-label-md hover:underline">
                  View All History
                </button>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                        Entity
                      </th>
                      <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                        Account
                      </th>
                      <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-lg py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              shopping_bag
                            </span>
                          </div>
                          <span className="font-body-sm text-body-sm font-medium">
                            Apple Store
                          </span>
                        </div>
                      </td>
                      <td className="px-lg py-md font-body-sm text-body-sm text-on-surface-variant">
                        Amex Gold
                      </td>
                      <td className="px-lg py-md">
                        <span className="bg-surface-variant text-on-surface-variant text-[11px] px-2 py-0.5 rounded-full font-medium">
                          Technology
                        </span>
                      </td>
                      <td className="px-lg py-md font-mono-data text-mono-data text-right text-error font-bold">
                        -$1,245.80
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-lg py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              work
                            </span>
                          </div>
                          <span className="font-body-sm text-body-sm font-medium">
                            TechCorp Payroll
                          </span>
                        </div>
                      </td>
                      <td className="px-lg py-md font-body-sm text-body-sm text-on-surface-variant">
                        Chase Bank
                      </td>
                      <td className="px-lg py-md">
                        <span className="bg-secondary/10 text-secondary text-[11px] px-2 py-0.5 rounded-full font-medium">
                          Income
                        </span>
                      </td>
                      <td className="px-lg py-md font-mono-data text-mono-data text-right text-secondary font-bold">
                        +$8,402.15
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-lg py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              restaurant
                            </span>
                          </div>
                          <span className="font-body-sm text-body-sm font-medium">
                            Le Bernardin
                          </span>
                        </div>
                      </td>
                      <td className="px-lg py-md font-body-sm text-body-sm text-on-surface-variant">
                        Chase Bank
                      </td>
                      <td className="px-lg py-md">
                        <span className="bg-surface-variant text-on-surface-variant text-[11px] px-2 py-0.5 rounded-full font-medium">
                          Dining
                        </span>
                      </td>
                      <td className="px-lg py-md font-mono-data text-mono-data text-right text-on-surface font-bold">
                        -$450.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
        {/* Visual Polish: Soft Glow background elements */}
        <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed bottom-0 left-60 -z-10 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
      </>
    </>
  );
}
