"use client";
import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  useTransactions,
  formatCurrency,
} from "../../contexts/TransactionContext";

const GOAL_ICONS = [
  "flight_takeoff",
  "directions_car",
  "security",
  "home",
  "school",
  "favorite",
  "celebration",
  "travel_explore",
  "pets",
  "shopping_cart",
  "health_and_safety",
  "account_balance",
  "credit_card",
  "savings",
  "wallet",
];

const GOAL_COLORS = [
  {
    name: "secondary",
    bg: "bg-secondary/10",
    text: "text-secondary",
    bar: "bg-secondary",
  },
  {
    name: "primary",
    bg: "bg-primary/10",
    text: "text-primary",
    bar: "bg-primary",
  },
  {
    name: "tertiary",
    bg: "bg-tertiary/10",
    text: "text-tertiary",
    bar: "bg-tertiary",
  },
  { name: "error", bg: "bg-error/10", text: "text-error", bar: "bg-error" },
];

export default function Goals() {
  const { transactions, balance, defaultCurrency } = useTransactions();

  const [goals, setGoals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    target: "",
    deadline: "",
    icon: "savings",
    colorIdx: 0,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("goals");
      if (saved) setGoals(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const totalTarget = goals.reduce((s, g) => s + (g.target || 0), 0);
  const totalAllocated = goals.reduce((s, g) => s + (g.current || 0), 0);
  const progressPct =
    totalTarget > 0
      ? Math.min(Math.round((totalAllocated / totalTarget) * 100), 100)
      : 0;

  const filteredGoals = searchQuery.trim()
    ? goals.filter((g) =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : goals;

  const monthlySavings = useMemo(() => {
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
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
      data.push({
        label: d.toLocaleDateString("en-US", { month: "short" }),
        saved: inc - exp,
      });
    }
    return data;
  }, [transactions]);

  const maxSavings = Math.max(...monthlySavings.map((m) => m.saved), 1);
  const avgMonthly =
    monthlySavings.reduce((s, m) => s + m.saved, 0) / monthlySavings.length;

  const addGoal = () => {
    if (!form.name.trim() || !form.target) return;
    const goal = {
      id: Date.now().toString(),
      name: form.name.trim(),
      target: parseFloat(form.target),
      current: 0,
      deadline: form.deadline || null,
      icon: form.icon,
      colorIdx: form.colorIdx,
      createdAt: new Date().toISOString(),
    };
    setGoals((prev) => [...prev, goal]);
    setForm({
      name: "",
      target: "",
      deadline: "",
      icon: "savings",
      colorIdx: 0,
    });
    setShowForm(false);
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const updateCurrent = (id, amount) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, current: Math.max(0, parseFloat(amount) || 0) }
          : g,
      ),
    );
  };

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
            </div> */}
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
                  <span className="text-secondary font-bold">
                    {transactions.length} transactions
                  </span>{" "}
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
                      {formatCurrency(balance, defaultCurrency)}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      of {formatCurrency(totalTarget, defaultCurrency)} total
                      target
                    </span>
                  </div>
                </div>
              </div>
            </section>
            {/* Goals Grid (Dynamic) */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {filteredGoals.length === 0 && (
                <div className="col-span-full text-center py-xl text-on-surface-variant">
                  <span className="material-symbols-outlined text-[48px] text-outline mb-md">
                    flag
                  </span>
                  <p className="font-body-md text-body-md">
                    {goals.length === 0
                      ? "No goals yet. Click the + button to create your first goal."
                      : "No goals match your search."}
                  </p>
                </div>
              )}
              {filteredGoals.map((goal) => {
                const ci = GOAL_COLORS[goal.colorIdx] || GOAL_COLORS[0];
                const pct =
                  goal.target > 0
                    ? Math.min((goal.current / goal.target) * 100, 100)
                    : 0;
                const remaining = Math.max(goal.target - goal.current, 0);
                const deadlineStr = goal.deadline
                  ? new Date(goal.deadline).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : null;
                const daysLeft = goal.deadline
                  ? Math.ceil(
                      (new Date(goal.deadline) - new Date()) /
                        (1000 * 60 * 60 * 24),
                    )
                  : null;
                return (
                  <div
                    key={goal.id}
                    className="group bg-surface-container-lowest border border-outline-variant rounded-xl p-lg space-y-lg hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative"
                  >
                    <button
                      className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-outline hover:text-error hover:bg-error/10 transition-all opacity-0 group-hover:opacity-100"
                      onClick={() => deleteGoal(goal.id)}
                      title="Delete goal"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        close
                      </span>
                    </button>
                    <div className="flex justify-between items-start">
                      <div
                        className={`w-12 h-12 rounded-xl ${ci.bg} flex items-center justify-center ${ci.text}`}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          {goal.icon}
                        </span>
                      </div>
                      {remaining <= 0 ? (
                        <span className="px-md py-1 rounded-full bg-secondary/10 text-secondary font-label-md text-label-md font-bold">
                          Completed
                        </span>
                      ) : daysLeft !== null && daysLeft <= 30 ? (
                        <span className="px-md py-1 rounded-full bg-error/10 text-error font-label-md text-label-md font-bold">
                          {daysLeft}d left
                        </span>
                      ) : (
                        <span className="px-md py-1 rounded-full bg-primary/10 text-primary font-label-md text-label-md font-bold">
                          {pct.toFixed(0)}%
                        </span>
                      )}
                    </div>
                    <div className="space-y-base">
                      <h3 className="font-headline-md text-headline-md text-on-surface">
                        {goal.name}
                      </h3>
                      {deadlineStr && (
                        <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                          <span className="material-symbols-outlined text-[18px]">
                            calendar_today
                          </span>
                          Deadline: {deadlineStr}
                        </div>
                      )}
                    </div>
                    <div className="space-y-sm">
                      <div className="flex justify-between items-end">
                        <div className="space-y-0">
                          <p className="font-label-md text-label-md text-outline uppercase">
                            Current Saved
                          </p>
                          <div className="flex items-center gap-1">
                            <input
                              className="w-24 bg-transparent border-b border-outline-variant/30 font-headline-md text-headline-md font-bold text-on-surface focus:border-primary focus:outline-none"
                              type="number"
                              value={goal.current}
                              onChange={(e) =>
                                updateCurrent(goal.id, e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-label-md text-label-md text-outline uppercase">
                            Target
                          </p>
                          <p className="font-body-md text-body-md font-bold text-on-surface-variant">
                            {formatCurrency(goal.target, defaultCurrency)}
                          </p>
                        </div>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container rounded-full">
                        <div
                          className={`h-full ${ci.bar} rounded-full transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between font-label-md text-label-md">
                        <span className="text-on-surface-variant font-bold">
                          {pct.toFixed(1)}% Complete
                        </span>
                        {remaining > 0 && (
                          <span className="text-outline">
                            {formatCurrency(remaining, defaultCurrency)} to go
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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
                      {formatCurrency(avgMonthly, defaultCurrency)}
                    </span>
                    .
                  </p>
                  <ul className="space-y-sm">
                    <li className="flex items-center gap-3 font-label-md text-label-md text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-primary" />{" "}
                      Monthly Avg: {formatCurrency(avgMonthly, defaultCurrency)}
                    </li>
                    <li className="flex items-center gap-3 font-label-md text-label-md text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      Balance: {formatCurrency(balance, defaultCurrency)}
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-8 flex items-end h-64 gap-2">
                  {monthlySavings.map((m, i) => {
                    const pct =
                      maxSavings > 0
                        ? Math.max((m.saved / maxSavings) * 95, 2)
                        : 2;
                    const isCurrent = i === monthlySavings.length - 1;
                    return (
                      <div
                        key={m.label}
                        className="flex-1 flex flex-col items-center gap-2 group"
                      >
                        <div
                          className={`w-full rounded-t transition-all group-hover:opacity-80 ${isCurrent ? "bg-primary shadow-lg shadow-primary/20" : "bg-primary/20 group-hover:bg-primary/40"}`}
                          style={{ height: `${pct}%` }}
                        />
                        <span
                          className={`font-label-md text-[10px] ${isCurrent ? "text-primary font-bold" : "text-outline"}`}
                        >
                          {m.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </main>
        {/* FAB for New Goal */}
        <button
          className="fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50"
          onClick={() => setShowForm(true)}
        >
          <span className="material-symbols-outlined text-[32px]">
            add_task
          </span>
        </button>

        {/* New Goal Modal */}
        {showForm &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              className="max-w-md"
              className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-black/40 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            >
              <div
                className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xl w-full max-w-md mx-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-xl border-b border-outline-variant/30">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    New Goal
                  </h3>
                  <button
                    className="text-outline hover:text-on-surface"
                    onClick={() => setShowForm(false)}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="p-xl space-y-md">
                  <div>
                    <label className="block font-label-md text-label-md text-outline mb-sm">
                      Goal Name
                    </label>
                    <input
                      className="w-full px-md py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface focused-input"
                      placeholder="e.g., European Summer Trip"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-md">
                    <div>
                      <label className="block font-label-md text-label-md text-outline mb-sm">
                        Target Amount
                      </label>
                      <input
                        className="w-full px-md py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface focused-input"
                        type="number"
                        placeholder="15000"
                        value={form.target}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, target: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-outline mb-sm">
                        Deadline (optional)
                      </label>
                      <input
                        className="w-full px-md py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface focused-input"
                        type="date"
                        value={form.deadline}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, deadline: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-outline mb-sm">
                      Icon
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {GOAL_ICONS.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-[20px] transition-all ${form.icon === icon ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container text-outline hover:bg-surface-variant"}`}
                          onClick={() => setForm((p) => ({ ...p, icon }))}
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            {icon}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-outline mb-sm">
                      Color
                    </label>
                    <div className="flex gap-2">
                      {GOAL_COLORS.map((c, i) => (
                        <button
                          key={c.name}
                          type="button"
                          className={`w-8 h-8 rounded-full transition-all ${form.colorIdx === i ? "ring-2 ring-primary ring-offset-2" : ""} ${c.bar.replace("bg-", "bg-")}`}
                          style={{
                            backgroundColor: c.bar.includes("bg-secondary")
                              ? "#6cf8bb"
                              : c.bar.includes("bg-primary")
                                ? "#0050cb"
                                : c.bar.includes("bg-tertiary")
                                  ? "#cc4204"
                                  : "#ba1a1a",
                          }}
                          onClick={() =>
                            setForm((p) => ({ ...p, colorIdx: i }))
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-md p-xl pt-0 border-t border-outline-variant/30">
                  <button
                    className="flex-1 px-xl py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 transition-all"
                    onClick={addGoal}
                  >
                    Create Goal
                  </button>
                  <button
                    className="px-xl py-3 bg-surface border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-all"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </>
    </>
  );
}
