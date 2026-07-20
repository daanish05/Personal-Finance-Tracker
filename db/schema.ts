import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  title: text("title").notNull(),

  amount: integer("amount").notNull(),

  type: text("type").notNull(),

  category: text("category").notNull(),

  account: text("account").notNull(),

  date: text("date").notNull(),

  note: text("note"),
});