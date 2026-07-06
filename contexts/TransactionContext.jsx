"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const TransactionContext = createContext({
  transactions: [],
  addTransaction: () => {},
  deleteTransactions: () => {},
  totalIncome: 0,
  totalExpenses: 0,
  balance: 0,
  recentTransactions: [],
});

export function useTransactions() {
  return useContext(TransactionContext);
}

export default function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("transactions");
      if (saved) setTransactions(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = useCallback((t) => {
    setTransactions((prev) => [
      { ...t, id: Date.now().toString() + Math.random().toString(36).slice(2) },
      ...prev,
    ]);
  }, []);

  const deleteTransactions = useCallback((ids) => {
    setTransactions((prev) => prev.filter((t) => !ids.includes(t.id)));
  }, []);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const recentTransactions = transactions.slice(0, 5);

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransactions, totalIncome, totalExpenses, balance, recentTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
