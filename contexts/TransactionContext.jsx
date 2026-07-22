"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "US Dollar ($)" },
  { code: "EUR", symbol: "€", label: "Euro (€)" },
  { code: "GBP", symbol: "£", label: "British Pound (£)" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen (¥)" },
  { code: "INR", symbol: "₹", label: "Indian Rupee (₹)" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar (C$)" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar (A$)" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real (R$)" },
  { code: "CHF", symbol: "Fr", label: "Swiss Franc (Fr)" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar (S$)" },
];

export const PREDEFINED_TAGS = [
  "Business",
  "Personal",
  "Travel",
  "Food",
  "Health",
  "Shopping",
  "Bills",
  "Entertainment",
  "Education",
  "Other",
];

const currencySymbols = {};
CURRENCIES.forEach((c) => {
  currencySymbols[c.code] = c.symbol;
});

export function formatCurrency(amount, currency = "USD") {
  if (amount == null) return "$0.00";
  const sym = currencySymbols[currency] || "$";
  return (
    sym +
    Number(amount)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
}

const TransactionContext = createContext({
  transactions: [],
  loading: true,
  addTransaction: () => {},
  deleteTransactions: () => {},
  totalIncome: 0,
  totalExpenses: 0,
  balance: 0,
  recentTransactions: [],
  defaultCurrency: "USD",
  setDefaultCurrency: () => {},
});

export function useTransactions() {
  return useContext(TransactionContext);
}

export default function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  // useEffect(() => {
  //   try {
  //     const saved = localStorage.getItem("transactions");
  //     if (saved) {
  //       const parsed = JSON.parse(saved);
  //       if (Array.isArray(parsed)) setTransactions(parsed.filter(t => t && typeof t === "object"));
  //     }
  //   } catch (e) {}
  //   try {
  //     const saved = localStorage.getItem("defaultCurrency");
  //     if (saved) setDefaultCurrency(saved);
  //   } catch (e) {}
  // }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("defaultCurrency");

      if (saved) {
        setDefaultCurrency(saved);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const res = await fetch("/api/transactions", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch transactions (${res.status})`);
        }

        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error loading transactions:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, []);

  // useEffect(() => {
  //   async function loadTransactions() {
  //     try {
  //       const res = await fetch("/api/transactions");

  //       if (!res.ok) throw new Error("Failed");

  //       const data = await res.json();

  //       setTransactions(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //     // const res = await fetch("/api/transactions");

  //     // if (!res.ok) return;

  //     // const data = await res.json();

  //     // setTransactions(data);
  //   }

  //   loadTransactions();
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("transactions", JSON.stringify(transactions));
  // }, [transactions]);

  useEffect(() => {
    localStorage.setItem("defaultCurrency", defaultCurrency);
  }, [defaultCurrency]);

  const addTransaction = useCallback(async (transaction) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (!res.ok) {
      throw new Error("Failed to save transaction");
    }

    const saved = await res.json();
    setTransactions((prev) => [saved, ...prev]);
    // const saved = await res.json();
    // setTransactions((prev) => [saved, ...prev]);
  }, []);

  // const addTransaction = useCallback((t) => {
  //   setTransactions((prev) => [
  //     { ...t, id: Date.now().toString() + Math.random().toString(36).slice(2) },
  //     ...prev,
  //   ]);
  // }, []);

  const deleteTransactions = useCallback(async (ids) => {
    await fetch("/api/transactions", {
      method: "DELETE",
      body: JSON.stringify(ids),
    });

    setTransactions((prev) => prev.filter((t) => !ids.includes(t.id)));
  }, []);

  // const deleteTransactions = useCallback((ids) => {
  //   setTransactions((prev) => prev.filter((t) => !ids.includes(t.id)));
  // }, []);

  const totalIncome = transactions
    .filter((t) => t?.type === "income")
    .reduce((sum, t) => sum + Number(t?.amount ?? 0), 0);

  const totalExpenses = transactions
    .filter((t) => t?.type === "expense")
    .reduce((sum, t) => sum + Number(t?.amount ?? 0), 0);

  const balance = totalIncome - totalExpenses;

  const recentTransactions = transactions.slice(0, 5);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        addTransaction,
        deleteTransactions,
        totalIncome,
        totalExpenses,
        balance,
        recentTransactions,
        defaultCurrency,
        setDefaultCurrency,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
