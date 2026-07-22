"use client";
import { useMemo, useState, useEffect } from "react";
import {
  useTransactions,
  formatCurrency,
} from "../../contexts/TransactionContext";
import Header from "../../components/Dashboard/Header";
import { NextResponse } from "next/server";

const COLORS = ["primary", "secondary", "tertiary", "on-surface"];
const ICONS = [
  "account_balance",
  "credit_card",
  "savings",
  "monitoring",
  "payments",
  "wallet",
  "currency_exchange",
  "account_balance_wallet",
  "receipt_long",
  "trending_up",
];

const defaultAccounts = [
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
];

export default function Accounts() {
  const { transactions, defaultCurrency } = useTransactions();
  const [searchQuery, setSearchQuery] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    desc: "",
    balance: "",
    color: "primary",
    icon: "account_balance",
    badge: "",
  });

  // useEffect(() => {
  //   try {
  //     const saved = localStorage.getItem("bankAccounts");
  //     if (saved) setAccounts(JSON.parse(saved));
  //   } catch (e) {}
  // }, []);
  useEffect(() => {
    async function loadAccounts() {
      try {
        const res = await fetch("/api/accounts");

        if (!res.ok) {
          throw new Error("Failed to load accounts");
        }

        const data = await res.json();

        setAccounts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAccounts();
  }, []);

  // useEffect(() => {
  //   try {
  //     localStorage.setItem("bankAccounts", JSON.stringify(accounts));
  //   } catch (e) {}
  // }, [accounts]);

  const filteredAccounts = searchQuery.trim()
    ? accounts.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.desc.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : accounts;

  const recentActivity = useMemo(
    () => transactions.slice(0, 5),
    [transactions],
  );

  const totalPortfolio = useMemo(
    () => accounts.reduce((s, a) => s + a.balance, 0),
    [accounts],
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({
      name: "",
      desc: "",
      balance: "",
      color: "primary",
      icon: "account_balance",
      badge: "",
    });
    setShowModal(true);
  };

  const openEdit = (acct) => {
    setEditingId(acct.id);
    setForm({
      name: acct.name,
      desc: acct.desc,
      balance: String(acct.balance),
      color: acct.color,
      icon: acct.icon,
      badge: acct.badge || "",
    });
    setShowModal(true);
    setMenuOpenId(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const balance = parseFloat(form.balance) || 0;
    const badge = form.badge.trim() || null;
    const trend = balance > 0 ? "up" : balance < 0 ? "down" : "flat";

    const account = {
      ...form,
      balance,
      badge,
      trend,
      wide: false,
    };

    try {
      if (editingId) {
        const res = await fetch("/api/accounts", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingId,
            ...account,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to update account");
        }

        const updated = await res.json();

        setAccounts((prev) =>
          prev.map((a) => (a.id === editingId ? updated : a)),
        );
      } else {
        const res = await fetch("/api/accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(account),
        });

        if (!res.ok) {
          throw new Error("Failed to create account");
        }

        const created = await res.json();

        setAccounts((prev) => [...prev, created]);
      }

      setShowModal(false);
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
      success: false,
      message: "Failed to create account",
    },
    {statue: 500}
      )
    }
  };

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   const balance = parseFloat(form.balance) || 0;
  //   const badge = form.badge.trim() || null;
  //   const trend = balance > 0 ? "up" : balance < 0 ? "down" : "flat";
  //   if (editingId) {
  //     setAccounts((prev) =>
  //       prev.map((a) =>
  //         a.id === editingId ? { ...a, ...form, balance, badge, trend } : a,
  //       ),
  //     );
  //   } else {
  //     setAccounts((prev) => [
  //       ...prev,
  //       {
  //         ...form,
  //         id: Date.now().toString(),
  //         balance,
  //         badge,
  //         trend,
  //         wide: false,
  //       },
  //     ]);
  //   }
  //   setShowModal(false);
  // };

  const handleDelete = (id) => {
    if (window.confirm("Delete this account?")) {
      setAccounts((prev) => prev.filter((a) => a.id !== id));
      setMenuOpenId(null);
    }
  };

  const iconBg = {
    primary: "bg-primary/10",
    tertiary: "bg-tertiary/10",
    secondary: "bg-secondary/10",
    "on-surface": "bg-surface-variant/40",
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
    "on-surface": "hover:shadow-surface/30",
  };

  return (
    <>
      <main className="ml-0 md:ml-60 min-h-screen flex flex-col">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          transactions={transactions}
          formatCurrency={formatCurrency}
          defaultCurrency={defaultCurrency}
          placeholder="Search accounts..."
        />

        <div className="p-xl max-w-container-max w-full mx-auto space-y-xl">
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

          <div className="flex justify-between items-center mb-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Your Accounts
            </h2>
            <button
              onClick={openAdd}
              className="flex items-center gap-sm bg-primary text-on-primary px-lg py-2 rounded-lg font-label-md hover:opacity-90 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Account
            </button>
          </div>
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
                        <div
                          className={`p-sm ${iconBg[color] || "bg-primary/10"} rounded-lg`}
                        >
                          <span
                            className={`material-symbols-outlined ${iconColor[color] || "text-primary"}`}
                          >
                            {acct.icon}
                          </span>
                        </div>
                        <div className="flex items-center gap-xs relative">
                          {acct.badge && (
                            <span className="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                              {acct.badge}
                            </span>
                          )}
                          <button
                            className="material-symbols-outlined text-on-surface-variant text-[18px] hover:text-primary"
                            onClick={() =>
                              setMenuOpenId(
                                menuOpenId === acct.id ? null : acct.id,
                              )
                            }
                          >
                            more_vert
                          </button>
                          {menuOpenId === acct.id && (
                            <div className="absolute top-full right-0 mt-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl z-50 py-1 min-w-[140px]">
                              <button
                                className="w-full text-left px-4 py-2 font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2"
                                onClick={() => openEdit(acct)}
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  edit
                                </span>{" "}
                                Edit
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 font-label-md text-label-md text-error hover:bg-error-container/10 transition-colors flex items-center gap-2"
                                onClick={() => handleDelete(acct.id)}
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  delete
                                </span>{" "}
                                Delete
                              </button>
                            </div>
                          )}
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

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
            <div
              className="w-full max-w-5xl bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-outline-variant">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  {editingId ? "Edit Account" : "Add Account"}
                </h3>

                <button
                  className="text-on-surface-variant hover:text-on-surface"
                  onClick={() => setShowModal(false)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Body */}
              <form className="space-y-6 p-8" onSubmit={handleSave}>
                <div className="space-y-base">
                  <label className="font-label-md text-label-md text-on-surface-variant block">
                    Account Name
                  </label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Chase Bank"
                  />
                </div>

                <div className="space-y-base">
                  <label className="font-label-md text-label-md text-on-surface-variant block">
                    Description
                  </label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    type="text"
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    placeholder="e.g. Checking Account •••• 4821"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-base">
                    <label className="font-label-md text-label-md text-on-surface-variant block">
                      Balance
                    </label>
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                      type="number"
                      step="0.01"
                      required
                      value={form.balance}
                      onChange={(e) =>
                        setForm({ ...form, balance: e.target.value })
                      }
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-base">
                    <label className="font-label-md text-label-md text-on-surface-variant block">
                      Badge (optional)
                    </label>
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                      type="text"
                      value={form.badge}
                      onChange={(e) =>
                        setForm({ ...form, badge: e.target.value })
                      }
                      placeholder="e.g. Primary"
                    />
                  </div>
                </div>

                <div className="space-y-base">
                  <label className="font-label-md text-label-md text-on-surface-variant block">
                    Color
                  </label>

                  <div className="flex gap-3">
                    {COLORS.map((c) => {
                      const hex =
                        c === "primary"
                          ? "var(--primary)"
                          : c === "secondary"
                            ? "var(--secondary)"
                            : c === "tertiary"
                              ? "var(--tertiary)"
                              : "var(--text)";
                      return (
                        <button
                          key={c}
                          type="button"
                          className={`w-10 h-10 rounded-full transition-all ${form.color === c ? "scale-110" : ""}`}
                          style={{
                            background: hex,
                            border:
                              form.color === c
                                ? "3px solid var(--text)"
                                : "3px solid transparent",
                          }}
                          onClick={() => setForm({ ...form, color: c })}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-base">
                  <label className="font-label-md text-label-md text-on-surface-variant block">
                    Icon
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {ICONS.map((ic) => (
                      <button
                        key={ic}
                        type="button"
                        className={`p-2 rounded-lg border transition-all ${
                          form.icon === ic
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-outline-variant text-on-surface-variant hover:border-primary/40"
                        }`}
                        onClick={() => setForm({ ...form, icon: ic })}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {ic}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-4 pt-6 border-t border-outline-variant">
                  <button
                    type="button"
                    className="px-6 py-3 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-variant"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-on-primary rounded-lg hover:opacity-90"
                  >
                    {editingId ? "Save Changes" : "Add Account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-60 -z-10 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
      {/* <button
        onClick={openAdd}
        className="md:hidden fixed bottom-6 right-6 z-50 flex items-center gap-0 bg-primary text-on-primary px-3 py-3 rounded-full shadow-xl hover:opacity-90 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
        <span className="font-medium"></span>
      </button> */}
    </>
  );
}
