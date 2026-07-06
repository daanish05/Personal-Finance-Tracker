'use client';
import { useMemo } from 'react';
import { useTransactions } from '../../contexts/TransactionContext';

export default function Goals() {
  const { transactions, balance, totalIncome, totalExpenses } = useTransactions();

  const savingsGoal = 200000;
  const progressPct = Math.min(((balance / savingsGoal) * 100).toFixed(0), 100);

  const monthlySavings = useMemo(() => {
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const m = d.getMonth();
      const y = d.getFullYear();
      const inc = transactions.filter((t) => t.type === "income" && new Date(t.date).getMonth() === m && new Date(t.date).getFullYear() === y).reduce((s, t) => s + Number(t.amount), 0);
      const exp = transactions.filter((t) => t.type === "expense" && new Date(t.date).getMonth() === m && new Date(t.date).getFullYear() === y).reduce((s, t) => s + Number(t.amount), 0);
      data.push({ label: d.toLocaleDateString("en-US", { month: "short" }), saved: inc - exp });
    }
    return data;
  }, [transactions]);

  const maxSavings = Math.max(...monthlySavings.map((m) => m.saved), 1);
  const avgMonthly = monthlySavings.reduce((s, m) => s + m.saved, 0) / monthlySavings.length;

  return (
    <>
      <>
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
              <a
                href="/Quickadd"
                className="bg-primary text-on-primary px-md py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all flex items-center gap-sm active:scale-95"
              >
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
                  objectives. You have{" "}
                  <span className="text-secondary font-bold">{transactions.length} transactions</span>{" "}
                  tracked across income and expenses.
                </p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant space-y-md">
                  <div className="flex justify-between items-center">
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase font-bold">
                      Total Progress
                    </span>
                    <span className="font-mono-data text-mono-data text-primary font-bold">
                      {progressPct}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary progress-bar-glow rounded-full"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-headline-md text-headline-md font-black">
                      ${balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      of ${savingsGoal.toLocaleString()} target
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
                    Based on your last 6 months of savings, your average monthly
                    saving is{" "}
                    <span className="text-secondary font-bold">
                      ${avgMonthly.toFixed(0)}
                    </span>.
                  </p>
                  <ul className="space-y-sm">
                    <li className="flex items-center gap-3 font-label-md text-label-md text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-primary" />{" "}
                      Monthly Avg: ${avgMonthly.toFixed(0)}
                    </li>
                    <li className="flex items-center gap-3 font-label-md text-label-md text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      Balance: ${balance.toFixed(0)}
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-8 flex items-end h-64 gap-2">
                  {monthlySavings.map((m, i) => {
                    const pct = maxSavings > 0 ? Math.max((m.saved / maxSavings) * 95, 2) : 2;
                    const isCurrent = i === monthlySavings.length - 1;
                    return (
                      <div key={m.label} className="flex-1 flex flex-col items-center gap-2 group">
                        <div
                          className={`w-full rounded-t transition-all group-hover:opacity-80 ${isCurrent ? "bg-primary shadow-lg shadow-primary/20" : "bg-primary/20 group-hover:bg-primary/40"}`}
                          style={{ height: `${pct}%` }}
                        />
                        <span className={`font-label-md text-[10px] ${isCurrent ? "text-primary font-bold" : "text-outline"}`}>{m.label}</span>
                      </div>
                    );
                  })}
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
