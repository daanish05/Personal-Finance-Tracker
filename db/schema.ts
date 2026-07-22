
// ==============
// ---Transaction Table---
// ==============

import { sqliteTable, text, integer, real} from "drizzle-orm/sqlite-core";

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  amount: integer("amount").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  account: text("account").notNull(),
  date: text("date").notNull(),
  note: text("note"),
  createdAt: text("created_at")
    .$defaultFn(() => new Date().toISOString()),
});


// ==============
// ---Accouns Table---
// ==============

export const accounts = sqliteTable("accounts", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  name: text("name").notNull(),

  desc: text("desc").notNull(),

  balance: real("balance").notNull(),

  color: text("color").notNull(),

  icon: text("icon").notNull(),

  badge: text("badge"),

  trend: text("trend").notNull(),

  wide: integer("wide", { mode: "boolean" }).default(false),

  createdAt: text("created_at").$defaultFn(() =>
    new Date().toISOString()
  ),
});