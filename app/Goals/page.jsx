export default function Goals() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist.min.css" rel="stylesheet" />
      
      <>
        {/* Side Navigation Shell */}
        {/* <aside className="fixed left-0 top-0 h-full w-60 bg-surface-container-low border-r border-outline-variant flex flex-col z-50">
          <div className="px-lg py-xl">
            <h1 className="font-headline-md text-headline-md font-bold text-primary">
              WealthFlow
            </h1>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mt-1">
              Premium Finance
            </p>
          </div>
          <nav className="flex-1 px-md space-y-1">
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">dashboard</span>{" "}
              Dashboard
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">receipt_long</span>
              Transactions
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">account_balance</span>
              Accounts
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">
                account_balance_wallet
              </span>
              Budgets
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-primary bg-surface-container-high font-bold font-label-md text-label-md"
              href="#"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                ads_click
              </span>
              Goals
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">bar_chart</span>{" "}
              Reports
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">psychology</span> AI
              Insights
            </a>
          </nav>
          <div className="p-md border-t border-outline-variant space-y-1">
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>{" "}
              Settings
            </a>
            <div className="flex items-center justify-between px-md py-sm">
              <div className="flex items-center gap-3 text-on-surface-variant font-label-md text-label-md">
                <span className="material-symbols-outlined">contrast</span>{" "}
                Theme
              </div>
              <div className="w-8 h-4 bg-outline-variant rounded-full relative">
                <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </aside> */}
        {/* Main Content Area */}
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
                  placeholder="Search goals or metrics..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-lg">
              <button className="bg-primary text-on-primary px-lg py-2 rounded-lg font-label-md text-label-md font-bold hover:opacity-90 active:scale-95 transition-all">
                Quick Add
              </button>
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
            </div>
          </header>
          {/* Goals Content */}
          <div className="max-w-[1280px] mx-auto px-xl py-xl space-y-xl">
            {/* Hero Overview Section */}
            <section className="grid grid-cols-12 gap-lg items-center">
              <div className="col-span-12 md:col-span-8 space-y-md">
                <div className="space-y-base">
                  <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest">
                    Financial Milestones
                  </span>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface">
                    Saving Goals
                  </h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-prose">
                  Track your progress toward your most important financial
                  objectives. Your total savings across all goals have grown by
                  <span className="text-secondary font-bold">12.4%</span> this
                  month.
                </p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant space-y-md">
                  <div className="flex justify-between items-center">
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase font-bold">
                      Total Progress
                    </span>
                    <span className="font-mono-data text-mono-data text-primary font-bold">
                      64%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary progress-bar-glow rounded-full"
                      style={{ width: "64%" }}
                    />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-headline-md text-headline-md font-black">
                      $128,450.00
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      of $200,000 target
                    </span>
                  </div>
                </div>
              </div>
            </section>
            {/* Goals Grid (Asymmetric Bento-like Cards) */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {/* Goal Card: European Summer Trip */}
              <div className="group bg-surface-container-lowest border border-outline-variant rounded-xl p-lg space-y-lg hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      flight_takeoff
                    </span>
                  </div>
                  <span className="px-md py-1 rounded-full bg-secondary/10 text-secondary font-label-md text-label-md font-bold">
                    On Track
                  </span>
                </div>
                <div className="space-y-base">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    European Summer Trip
                  </h3>
                  <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      calendar_today
                    </span>
                    Deadline: June 15, 2024
                  </div>
                </div>
                <div className="space-y-sm">
                  <div className="flex justify-between items-end">
                    <div className="space-y-0">
                      <p className="font-label-md text-label-md text-outline uppercase">
                        Current Saved
                      </p>
                      <p className="font-headline-md text-headline-md font-bold">
                        $12,400
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-label-md text-label-md text-outline uppercase">
                        Target
                      </p>
                      <p className="font-body-md text-body-md font-bold text-on-surface-variant">
                        $15,000
                      </p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full">
                    <div
                      className="h-full bg-secondary rounded-full"
                      style={{ width: "82.6%" }}
                    />
                  </div>
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface-variant font-bold">
                      82.6% Complete
                    </span>
                    <span className="text-outline">Est. Done: May 12</span>
                  </div>
                </div>
                <div className="pt-md border-t border-outline-variant/30">
                  <button className="w-full flex items-center justify-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors py-1">
                    View Contribution History
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
              {/* Goal Card: New Car */}
              <div className="group bg-surface-container-lowest border border-outline-variant rounded-xl p-lg space-y-lg hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      directions_car
                    </span>
                  </div>
                  <span className="px-md py-1 rounded-full bg-surface-variant text-primary font-label-md text-label-md font-bold">
                    In Progress
                  </span>
                </div>
                <div className="space-y-base">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    New Car
                  </h3>
                  <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      calendar_today
                    </span>
                    Deadline: December 20, 2024
                  </div>
                </div>
                <div className="space-y-sm">
                  <div className="flex justify-between items-end">
                    <div className="space-y-0">
                      <p className="font-label-md text-label-md text-outline uppercase">
                        Current Saved
                      </p>
                      <p className="font-headline-md text-headline-md font-bold">
                        $38,250
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-label-md text-label-md text-outline uppercase">
                        Target
                      </p>
                      <p className="font-body-md text-body-md font-bold text-on-surface-variant">
                        $85,000
                      </p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "45%" }}
                    />
                  </div>
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface-variant font-bold">
                      45.0% Complete
                    </span>
                    <span className="text-outline">Est. Done: Jan 15, '25</span>
                  </div>
                </div>
                <div className="pt-md border-t border-outline-variant/30">
                  <button className="w-full bg-surface-container-low hover:bg-surface-variant text-on-surface font-label-md text-label-md font-bold py-2 rounded-lg transition-all">
                    Add $2,500 Bonus
                  </button>
                </div>
              </div>
              {/* Goal Card: Emergency Fund */}
              <div className="group bg-surface-container-lowest border border-outline-variant rounded-xl p-lg space-y-lg hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      security
                    </span>
                  </div>
                  <span className="px-md py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-md text-label-md font-bold">
                    High Priority
                  </span>
                </div>
                <div className="space-y-base">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Emergency Fund
                  </h3>
                  <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      calendar_today
                    </span>
                    Deadline: Continuous
                  </div>
                </div>
                <div className="space-y-sm">
                  <div className="flex justify-between items-end">
                    <div className="space-y-0">
                      <p className="font-label-md text-label-md text-outline uppercase">
                        Current Saved
                      </p>
                      <p className="font-headline-md text-headline-md font-bold">
                        $77,800
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-label-md text-label-md text-outline uppercase">
                        Target
                      </p>
                      <p className="font-body-md text-body-md font-bold text-on-surface-variant">
                        $100,000
                      </p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full">
                    <div
                      className="h-full bg-tertiary rounded-full"
                      style={{ width: "77.8%" }}
                    />
                  </div>
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface-variant font-bold">
                      77.8% Complete
                    </span>
                    <span className="text-outline">Est. Done: August 04</span>
                  </div>
                </div>
                <div className="pt-md border-t border-outline-variant/30 flex gap-2">
                  <button className="flex-1 border border-outline-variant hover:bg-surface-container-low text-on-surface font-label-md text-label-md font-bold py-2 rounded-lg transition-all">
                    Details
                  </button>
                  <button className="flex-1 bg-primary text-on-primary font-label-md text-label-md font-bold py-2 rounded-lg transition-all hover:opacity-90">
                    Transfer
                  </button>
                </div>
              </div>
            </section>
            {/* Dynamic Projection Chart */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg overflow-hidden relative">
              <div className="absolute top-0 right-0 p-lg opacity-10">
                <span className="material-symbols-outlined text-[120px]">
                  show_chart
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl relative z-10">
                <div className="lg:col-span-4 space-y-md">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Saving Velocity
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Based on your last 6 months of contributions, you are set to
                    hit all primary goals
                    <span className="text-secondary font-bold">
                      14 days ahead
                    </span>{" "}
                    of schedule.
                  </p>
                  <ul className="space-y-sm">
                    <li className="flex items-center gap-3 font-label-md text-label-md text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-primary" />{" "}
                      Monthly Avg: $4,200
                    </li>
                    <li className="flex items-center gap-3 font-label-md text-label-md text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      Compounding Interest: +$240/mo
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-8 flex items-end h-64 gap-2">
                  {/* Simplified bar chart representation */}
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div
                      className="w-full bg-primary/20 rounded-t group-hover:bg-primary/40 transition-all"
                      style={{ height: "40%" }}
                    />
                    <span className="font-label-md text-[10px] text-outline">
                      JAN
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div
                      className="w-full bg-primary/20 rounded-t group-hover:bg-primary/40 transition-all"
                      style={{ height: "55%" }}
                    />
                    <span className="font-label-md text-[10px] text-outline">
                      FEB
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div
                      className="w-full bg-primary/20 rounded-t group-hover:bg-primary/40 transition-all"
                      style={{ height: "48%" }}
                    />
                    <span className="font-label-md text-[10px] text-outline">
                      MAR
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div
                      className="w-full bg-primary/20 rounded-t group-hover:bg-primary/40 transition-all"
                      style={{ height: "70%" }}
                    />
                    <span className="font-label-md text-[10px] text-outline">
                      APR
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div
                      className="w-full bg-primary/20 rounded-t group-hover:bg-primary/40 transition-all"
                      style={{ height: "85%" }}
                    />
                    <span className="font-label-md text-[10px] text-outline">
                      MAY
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div
                      className="w-full bg-primary rounded-t shadow-lg shadow-primary/20"
                      style={{ height: "95%" }}
                    />
                    <span className="font-label-md text-[10px] text-primary font-bold">
                      JUN
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        {/* FAB for New Goal */}
        <button className="fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50">
          <span className="material-symbols-outlined text-[32px]">
            add_task
          </span>
        </button>
      </>
    </>
  );
}
