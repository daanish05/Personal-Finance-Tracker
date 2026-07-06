"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTransactions, CURRENCIES, PREDEFINED_TAGS } from "../../contexts/TransactionContext";

export default function Quickadd() {
  const router = useRouter();
  const { addTransaction, defaultCurrency, setDefaultCurrency } = useTransactions();
  const [type, setType] = useState("expense");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [currency, setCurrency] = useState(defaultCurrency);
  const [selectedTags, setSelectedTags] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!amount || parseFloat(amount) <= 0) e.amount = "Valid amount required";
    if (!category) e.category = "Select a category";
    if (!account) e.account = "Select an account";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <>
      <>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n      .material-symbols-outlined {\n        font-variation-settings:\n          "FILL" 0,\n          "wght" 400,\n          "GRAD" 0,\n          "opsz" 24;\n        display: inline-block;\n        vertical-align: middle;\n        line-height: 1;\n      }\n      .glass-panel {\n        background: rgba(255, 255, 255, 0.85);\n        backdrop-filter: blur(12px);\n        -webkit-backdrop-filter: blur(12px);\n      }\n      .focused-input {\n        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      .focused-input:focus {\n        outline: none;\n        border-color: #0066ff;\n        box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.1);\n      }\n      body {\n        background-color: #f8f9ff;\n        background-image:\n          radial-gradient(\n            at 0% 0%,\n            rgba(211, 228, 254, 0.3) 0,\n            transparent 50%\n          ),\n          radial-gradient(\n            at 100% 100%,\n            rgba(239, 244, 255, 0.3) 0,\n            transparent 50%\n          );\n        min-height: 100vh;\n      }\n    ',
          }}
        />
        {/* Shell: TopNavBar (Predicted from JSON) */}
        <header className="flex justify-between items-center w-full px-lg py-md sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant max-w-full">
          <div className="flex items-center gap-md">
            <span className="font-headline-md text-headline-md font-black text-primary">
              WealthFlow
            </span>
            <div className="hidden md:flex items-center gap-lg ml-xl">
              <nav className="flex gap-md">
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all"
                  href="#"
                >
                  Dashboard
                </a>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all"
                  href="#"
                >
                  Transactions
                </a>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all"
                  href="#"
                >
                  Accounts
                </a>
              </nav>
            </div>
          </div>
          <div className="flex items-center gap-md">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
                search
              </span>
              <input
                className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-body-sm focused-input w-64"
                placeholder="Search data..."
                type="text"
              />
            </div>
            <button className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
              <img
                className="w-full h-full object-cover"
                data-alt="A professional corporate headshot of a business executive in a high-key studio setting. The lighting is soft and flattering, emphasizing a clean and minimalist aesthetic. The individual has a friendly yet focused expression, wearing professional attire that fits a premium financial software environment. The background is a soft, out-of-focus grey-blue tint."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKq3Y1rb0ouqk6qhUgbL3QiNji_BmoiiLJ8XjuE8i9v2zY29fIt5YY_FGzrSTq9Uc78UyZFzapWONxL1uxH9wcbjeqwcQpWg2pn5zV2TCA7G5vlzL3D0BgoxqxLxEkwNSC_BWpjQzU5VHxmsJwwqeVg246ZhiL03cCnKkZbj1Bg0kii8rt6D07anwLKGi9ISzkPzgnjm_sxjwvgSJ9ayM0Ndo4w9M2bQhCsShI3aYfvzuhBqw5BbEW"
              />
            </div>
          </div>
        </header>
        {/* Main Content Canvas */}
        <main className="container mx-auto max-w-[800px] px-md py-xl">
          {/* Page Header */}
          <div className="mb-lg flex flex-col gap-base">
            <div className="flex items-center gap-sm text-primary mb-xs">
              <button
                className="p-1 hover:bg-primary-fixed rounded-lg transition-colors flex items-center"
                onClick={() => window.history.back()}
              >
                <span className="material-symbols-outlined text-[20px]">
                  arrow_back
                </span>
              </button>
              <span className="font-label-md text-label-md uppercase tracking-widest font-bold">
                New {type === "expense" ? "Entry" : "Income"}
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              Quick Add {type === "expense" ? "Expense" : "Income"}
            </h1>
            <p className="font-body-md text-on-surface-variant">
              {type === "expense"
                ? "Log your latest spending with mechanical precision."
                : "Record your latest earnings with mechanical precision."}
            </p>
          </div>
          {/* Form Container */}
          {submitted ? (
            <div className="glass-panel border border-outline-variant rounded-xl p-lg shadow-sm text-center space-y-lg">
              <span className="material-symbols-outlined text-[64px] text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
                check_circle
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                Transaction Added!
              </h2>
              <p className="text-on-surface-variant">
                Your {type === "expense" ? "expense" : "income"} has been saved successfully.
              </p>
              <div className="flex gap-md justify-center">
                <button
                  className="px-xl py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 transition-all"
                  onClick={() => router.push("/")}
                >
                  Go to Dashboard
                </button>
                <button
                  className="px-xl py-3 bg-surface border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-all"
                  onClick={() => { setSubmitted(false); setTitle(""); setAmount(""); setCategory(""); setAccount(""); setNotes(""); setSelectedTags([]); setCurrency(defaultCurrency); setErrors({}); }}
                >
                  Add Another
                </button>
              </div>
            </div>
          ) : (
          <div className="glass-panel border border-outline-variant rounded-xl p-lg shadow-sm">
            <form className="space-y-lg" id="transactionForm" onSubmit={(e) => {
              e.preventDefault();
              if (!validate()) return;
              setDefaultCurrency(currency);
              addTransaction({
                type,
                title,
                amount: parseFloat(amount),
                category,
                account,
                date,
                paymentMethod,
                notes,
                currency,
                tags: selectedTags,
              });
              setSubmitted(true);
            }}>
              {/* Title & Amount Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                <div className="md:col-span-2">
                  <label
                    className="block font-label-md text-label-md text-outline mb-sm"
                    htmlFor="title"
                  >
                    {type === "expense" ? "Transaction Title" : "Income Source"}
                  </label>
                  <input
                    className={`w-full px-md py-3 bg-surface-container-lowest border rounded-lg font-body-md text-on-surface focused-input ${errors.title ? 'border-error' : 'border-outline-variant'}`}
                    id="title"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: '' })); }}
                    placeholder={
                      type === "expense"
                        ? "e.g., Monthly SaaS Subscription"
                        : "e.g., Freelance Project Payment"
                    }
                    type="text"
                  />
                  {errors.title && <p className="text-error text-[11px] font-label-md mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label
                    className="block font-label-md text-label-md text-outline mb-sm"
                    htmlFor="amount"
                  >
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-md top-1/2 -translate-y-1/2 font-mono-data text-outline">
                      $
                    </span>
                    <input
                      className={`w-full pl-8 pr-md py-3 bg-surface-container-lowest border rounded-lg font-mono-data text-on-surface focused-input ${errors.amount ? 'border-error' : 'border-outline-variant'}`}
                      id="amount"
                      value={amount}
                      onChange={(e) => { setAmount(e.target.value); setErrors((prev) => ({ ...prev, amount: '' })); }}
                      placeholder="0.00"
                      step="0.01"
                      type="number"
                    />
                    {errors.amount && <p className="text-error text-[11px] font-label-md mt-1">{errors.amount}</p>}
                  </div>
                </div>
              </div>
              {/* Type Toggle */}
              <div className="flex flex-col gap-sm">
                <label className="block font-label-md text-label-md text-outline">
                  Transaction Type
                </label>
                <div className="inline-flex p-1 bg-surface-container-low border border-outline-variant rounded-lg w-fit">
                  <button
                    className={`px-lg py-2 rounded-md font-label-md text-label-md transition-all ${type === "expense" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-variant"}`}
                    onClick={() => setType("expense")}
                    type="button"
                  >
                    Expense
                  </button>
                  <button
                    className={`px-lg py-2 rounded-md font-label-md text-label-md transition-all ${type === "income" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-variant"}`}
                    onClick={() => setType("income")}
                    type="button"
                  >
                    Income
                  </button>
                </div>
              </div>
              {/* Category & Account Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div>
                  <label className="block font-label-md text-label-md text-outline mb-sm">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      className={`w-full px-md py-3 bg-surface-container-lowest border rounded-lg font-body-md text-on-surface focused-input appearance-none ${errors.category ? 'border-error' : 'border-outline-variant'}`}
                      value={category}
                      onChange={(e) => { setCategory(e.target.value); setErrors((prev) => ({ ...prev, category: '' })); }}
                      key={type}
                    >
                      <option disabled="" value="">
                        Select category...
                      </option>
                      {type === "expense" ? (
                        <>
                          <option value="food">🍱 Food &amp; Dining</option>
                          <option value="shopping">🛍️ Shopping</option>
                          <option value="bills">
                            📜 Bills &amp; Utilities
                          </option>
                          <option value="transport">🚗 Transportation</option>
                          <option value="health">
                            🏥 Health &amp; Fitness
                          </option>
                        </>
                      ) : (
                        <>
                          <option value="salary">💰 Salary</option>
                          <option value="freelance">💻 Freelance</option>
                          <option value="investment">📈 Investment</option>
                          <option value="business">🏢 Business</option>
                          <option value="rental">🏠 Rental Income</option>
                          <option value="other">🎁 Other Income</option>
                        </>
                      )}
                    </select>
                    <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>
                  {errors.category && <p className="text-error text-[11px] font-label-md mt-1">{errors.category}</p>}
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-outline mb-sm">
                    Account
                  </label>
                  <div className="relative">
                    <select className={`w-full px-md py-3 bg-surface-container-lowest border rounded-lg font-body-md text-on-surface focused-input appearance-none ${errors.account ? 'border-error' : 'border-outline-variant'}`} value={account} onChange={(e) => { setAccount(e.target.value); setErrors((prev) => ({ ...prev, account: '' })); }}>
                      <option disabled="" value="">
                        Select account...
                      </option>
                      <option value="chase">Chase Sapphire (**** 1234)</option>
                      <option value="amex">Amex Platinum (**** 5678)</option>
                      <option value="cash">Petty Cash</option>
                      <option value="savings">
                        WealthFlow High-Yield Savings
                      </option>
                    </select>
                    <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>
                  {errors.account && <p className="text-error text-[11px] font-label-md mt-1">{errors.account}</p>}
                </div>
              </div>
              {/* Date & Payment Method */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div>
                  <label className="block font-label-md text-label-md text-outline mb-sm">
                    Transaction Date
                  </label>
                  <input
                    className="w-full px-md py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface focused-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-outline mb-sm">
                    Payment Method
                  </label>
                  <div className="flex gap-sm">
                    <button
                      className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg transition-all ${paymentMethod === "card" ? "border border-primary bg-primary-container/10 text-primary" : "border border-outline-variant text-outline-variant hover:border-outline hover:text-on-surface"}`}
                      onClick={() => setPaymentMethod("card")}
                      type="button"
                    >
                      <span className="material-symbols-outlined mb-1">
                        credit_card
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-tighter">
                        Card
                      </span>
                    </button>
                    <button
                      className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg transition-all ${paymentMethod === "cash" ? "border border-primary bg-primary-container/10 text-primary" : "border border-outline-variant text-outline-variant hover:border-outline hover:text-on-surface"}`}
                      onClick={() => setPaymentMethod("cash")}
                      type="button"
                    >
                      <span className="material-symbols-outlined mb-1">
                        payments
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-tighter">
                        Cash
                      </span>
                    </button>
                    <button
                      className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg transition-all ${paymentMethod === "transfer" ? "border border-primary bg-primary-container/10 text-primary" : "border border-outline-variant text-outline-variant hover:border-outline hover:text-on-surface"}`}
                      onClick={() => setPaymentMethod("transfer")}
                      type="button"
                    >
                      <span className="material-symbols-outlined mb-1">
                        account_balance
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-tighter">
                        Transfer
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Tags & Multi-select */}
              <div className="space-y-sm">
                <label className="block font-label-md text-label-md text-outline">
                  Tags
                </label>
                <div className="flex flex-wrap gap-sm">
                  {PREDEFINED_TAGS.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedTags((prev) =>
                          prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                        )}
                        className={`px-3 py-1 rounded-full text-label-md flex items-center gap-xs cursor-pointer transition-all ${
                          active
                            ? "bg-secondary-container/20 text-secondary border border-secondary/20"
                            : "bg-surface-container border border-outline-variant text-outline-variant hover:border-primary hover:text-primary"
                        }`}
                      >
                        #{tag}
                        {active && (
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Currency */}
              <div>
                <label className="block font-label-md text-label-md text-outline mb-sm">
                  Currency
                </label>
                <div className="relative">
                  <select
                    className="w-full px-md py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface focused-input appearance-none"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
              {/* Notes */}
              <div>
                <label
                  className="block font-label-md text-label-md text-outline mb-sm"
                  htmlFor="notes"
                >
                  Notes
                </label>
                <textarea
                  className="w-full px-md py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface focused-input resize-none"
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional details about this transaction..."
                  rows={3}
                />
              </div>
              {/* Receipt Attachment (Drag & Drop) */}
              <div>
                <label className="block font-label-md text-label-md text-outline mb-sm">
                  Receipt / Attachment
                </label>
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center gap-md hover:border-primary hover:bg-primary-container/5 transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-outline group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[28px]">
                      cloud_upload
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-body-md text-on-surface">
                      Click to upload or drag and drop
                    </p>
                    <p className="font-label-md text-outline">
                      PDF, JPG or PNG (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="pt-lg flex flex-col md:flex-row-reverse gap-md">
                <button
                  className="w-full md:w-auto px-xl py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-sm"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    add_task
                  </span>
                  {type === "expense" ? "Add Expense" : "Add Income"}
                </button>
                <button
                  className="w-full md:w-auto px-xl py-3 bg-surface border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-all"
                  type="button"
                  onClick={() => { setTitle(""); setAmount(""); setCategory(""); setAccount(""); setNotes(""); setSelectedTags([]); setCurrency(defaultCurrency); setDate(new Date().toISOString().split("T")[0]); setErrors({}); }}
                >
                  Clear All
                </button>
                <div className="flex-grow" />
                <button
                  className="w-full md:w-auto px-xl py-3 text-error font-label-md text-label-md hover:bg-error-container/10 rounded-lg transition-all"
                  type="button"
                  onClick={() => router.push("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          )}
          {/* Footnote Information */}
          <div className="mt-lg flex items-center justify-center gap-md text-outline">
            <div className="flex items-center gap-xs">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                security
              </span>
              <span className="font-label-md text-label-md">
                Bank-grade Encryption
              </span>
            </div>
            <div className="w-px h-3 bg-outline-variant" />
            <div className="flex items-center gap-xs">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                bolt
              </span>
              <span className="font-label-md text-label-md">
                Real-time Sync
              </span>
            </div>
          </div>
        </main>
      </>
    </>
  );
}
