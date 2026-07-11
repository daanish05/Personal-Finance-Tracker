"use client";
import { useMemo, useState } from "react";
import {
  useTransactions,
  formatCurrency,
} from "../../contexts/TransactionContext";

export default function Accounts() {
  const { transactions, balance, defaultCurrency } = useTransactions();
  const [searchQuery, setSearchQuery] = useState("");

  const accounts = useMemo(
    () => [
      {
        id: "chase",
        name: "Chase Bank",
        desc: "Checking Account •••• 4821",
        balance: 42390.12,
        color: "primary",
        icon: "account_balance",
        badge: "Primary",
        trend: "up",
      },
      {
        id: "amex",
        name: "Amex Gold",
        desc: "Credit Card •••• 1004",
        balance: 1245.8,
        color: "tertiary",
        icon: "credit_card",
        badge: null,
        trend: "down",
      },
      {
        id: "savings",
        name: "High-Yield Savings",
        desc: "Emergency Fund •••• 9201",
        balance: 156000.0,
        color: "secondary",
        icon: "savings",
        badge: null,
        trend: "up",
      },
      {
        id: "fidelity",
        name: "Fidelity Brokerage",
        desc: "Portfolio Managed • Active",
        balance: 1280450.6,
        color: "primary",
        icon: "monitoring",
        badge: null,
        trend: "up",
        wide: true,
      },
      {
        id: "cash",
        name: "Petty Cash",
        desc: "On Hand • Physical",
        balance: 2818.0,
        color: "on-surface",
        icon: "payments",
        badge: null,
        trend: "flat",
      },
    ],
    [],
  );

  const filteredAccounts = searchQuery.trim()
    ? accounts.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.desc.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : accounts;

  const recentActivity = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  const totalPortfolio = useMemo(() => {
    const total = transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + Number(t.amount), 0);
    const deducted = transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + Number(t.amount), 0);
    return total - deducted;
  }, [transactions]);
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
        <main className="ml-0 md:ml-60 min-h-screen flex flex-col">
          {/* Top Nav Bar */}
          <header className="sticky top-0 z-40 flex flex-wrap gap-y-2 justify-between items-center w-full px-lg pl-14 md:pl-lg py-md bg-surface/80 backdrop-blur-md border-b border-outline-variant">
            <div className="flex items-center gap-md flex-1 min-w-0">
              <div className="relative w-full max-w-full md:max-w-[480px]" 
              style={{ border: "1px solid var(--outline-variant)", borderRadius: "8px" }}>
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input
                  // className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 font-body-sm text-body-sm focus:ring-2 focus:ring-primary/10 transition-all"
                  className="w-full bg-surface-container-low rounded-lg pl-10 pr-4 py-2 font-body-sm text-body-sm border border-transparent
                  transition-all duration-200
                  hover:border-primary/40 hover:shadow-md
                  focus:ring-2 focus:ring-primary/10 focus:border-primary
                  outline-none"
                  placeholder="Search accounts..."
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
                className="flex items-center gap-sm bg-primary text-on-primary px-lg py-2 rounded-lg font-label-md hover:opacity-90 transition-all active:scale-95"
              >
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
          {/* Content Canvas */}
          <div className="p-xl max-w-container-max w-full mx-auto space-y-xl">
            {/* Net Worth Summary Section */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-lg items-end">
              <div className="md:col-span-8">
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-sm">
                  Total Portfolio Value
                </p>
                <h2 className="font-headline-xl text-headline-xl text-on-surface">
                  {formatCurrency(totalPortfolio, defaultCurrency)}
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
              {filteredAccounts.length === 0 ? (
                <div className="col-span-full text-center py-xl text-on-surface-variant">
                  <span className="material-symbols-outlined text-[48px] text-outline mb-md">
                    search_off
                  </span>
                  <p className="font-body-md text-body-md">
                    No accounts match your search.
                  </p>
                </div>
              ) : (
                filteredAccounts.map((acct) => {
                  const color = acct.color;
                  const isWide = acct.wide;
                  const iconBg = {
                    primary: "bg-primary/10",
                    tertiary: "bg-tertiary/10",
                    secondary: "bg-secondary/10",
                    "on-surface": "bg-on-surface/10",
                  };
                  const iconColor = {
                    primary: "text-primary",
                    tertiary: "text-tertiary",
                    secondary: "text-secondary",
                    "on-surface": "text-on-surface",
                  };
                  const shadowMap = {
                    primary: "hover:shadow-primary/5",
                    tertiary: "hover:shadow-tertiary/5",
                    secondary: "hover:shadow-secondary/5",
                    "on-surface": "hover:shadow-on-surface/5",
                  };
                  const shadowClass =
                    isWide && acct.id === "fidelity"
                      ? "hover:shadow-primary/10"
                      : shadowMap[color] || "hover:shadow-primary/5";
                  const trendPath =
                    acct.trend === "up"
                      ? "M0,35 Q10,30 20,38 T40,25 T60,30 T80,15 T100,20"
                      : acct.trend === "down"
                        ? "M0,10 Q20,15 40,30 T80,35 T100,40"
                        : "M0,40 L20,38 L40,36 L60,32 L80,30 L100,28";
                  const trendColor =
                    acct.trend === "up"
                      ? "text-secondary"
                      : acct.trend === "down"
                        ? "text-error"
                        : "text-on-surface-variant";
                  return (
                    <div
                      key={acct.id}
                      className={`group bg-surface-container-lowest border border-outline-variant p-lg rounded-xl ${shadowClass} transition-all duration-300 relative overflow-hidden cursor-pointer ${isWide ? "lg:col-span-2 flex flex-col md:flex-row gap-lg" : ""}`}
                    >
                      <div className={isWide ? "flex-1" : ""}>
                        <div className="flex justify-between items-start mb-lg">
                          <div className={`p-sm ${iconBg[color] || "bg-primary/10"} rounded-lg`}>
                            <span
                              className={`material-symbols-outlined ${iconColor[color] || "text-primary"}`}
                            >
                              {acct.icon}
                            </span>
                          </div>
                          <div className="flex items-center gap-xs">
                            {acct.badge && (
                              <span className="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                                {acct.badge}
                              </span>
                            )}
                            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                              more_vert
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-headline-md text-headline-md mb-xs">
                            {acct.name}
                          </h3>
                          <p className="font-label-md text-label-md text-on-surface-variant mb-lg">
                            {acct.desc}
                          </p>
                          <div className="flex justify-between items-end">
                            <span className="font-headline-md text-headline-md text-on-surface">
                              {formatCurrency(acct.balance, defaultCurrency)}
                            </span>
                            {!isWide && (
                              <div className="w-20 h-8">
                                <svg
                                  className={`w-full h-full ${trendColor} stroke-2 fill-none`}
                                  viewBox="0 0 100 40"
                                >
                                  <path d={trendPath} />
                                </svg>
                              </div>
                            )}
                          </div>
                          {isWide && (
                            <span className="font-headline-lg text-headline-lg text-on-surface">
                              {formatCurrency(acct.balance, defaultCurrency)}
                            </span>
                          )}
                        </div>
                      </div>
                      {isWide && (
                        <div className="flex-1 flex flex-col justify-end min-h-[120px]">
                          <div className="flex justify-between items-center mb-sm">
                            <span className="font-label-md text-label-md text-on-surface-variant">
                              Year to Date
                            </span>
                            <span className="text-secondary font-bold">
                              +12.4%
                            </span>
                          </div>
                          <div className="h-24 w-full" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
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
                    {recentActivity.length === 0 ? (
                      <tr>
                        <td
                          className="px-lg py-xl text-center text-on-surface-variant"
                          colSpan={4}
                        >
                          No activity yet.
                        </td>
                      </tr>
                    ) : (
                      recentActivity.map((t) => (
                        <tr
                          key={t.id}
                          className="hover:bg-surface-container-low transition-colors group"
                        >
                          <td className="px-lg py-md">
                            <div className="flex items-center gap-md">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === "income" ? "bg-secondary/10" : "bg-surface-variant"}`}
                              >
                                <span className="material-symbols-outlined text-[18px] text-primary">
                                  {t.type === "income" ? "work" : "receipt"}
                                </span>
                              </div>
                              <span className="font-body-sm text-body-sm font-medium text-on-surface">
                                {t.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-lg py-md font-body-sm text-body-sm text-on-surface-variant capitalize">
                            {t.account || "N/A"}
                          </td>
                          <td className="px-lg py-md">
                            <span
                              className={`${t.type === "income" ? "bg-secondary/10 text-secondary" : "bg-surface-variant text-on-surface-variant"} text-[11px] px-2 py-0.5 rounded-full font-medium capitalize`}
                            >
                              {t.category}
                            </span>
                          </td>
                          <td
                            className={`px-lg py-md font-mono-data text-mono-data text-right font-bold ${t.type === "income" ? "text-secondary" : "text-error"}`}
                          >
                            {t.type === "income" ? "+" : "-"}
                            {formatCurrency(
                              t.amount,
                              t.currency || defaultCurrency,
                            )}
                          </td>
                        </tr>
                      ))
                    )}
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
