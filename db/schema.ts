
// ==============
// ---Transaction Table---
// ==============

import { sqliteTable, text, integer, real} from "drizzle-orm/sqlite-core";

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
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
    userId: integer("user_id").notNull(),
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


// ==============
// ---Goals Table---
// ==============

export const goals = sqliteTable("goals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  target: real("target").notNull(),
  current: real("current").notNull().default(0),
  deadline: text("deadline"),
  icon: text("icon").notNull(),  
  colorIdx: integer("color_idx").notNull(),
  createdAt: text("created_at")
  .$defaultFn(() => new Date().toISOString()),
});


// ==============
// ---User Table---
// ==============

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text("created_at")
  .$defaultFn(() => new Date().toISOString()),
});


// ==============
// ---User Table---
// ==============

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  userId: integer("user_id")
    .notNull()
    .unique(),

  phone: text("phone"),

  location: text("location"),

  bio: text("bio"),

  linkedin: text("linkedin"),

  website: text("website"),

  avatar: text("avatar"),

  language: text("language").default("English (US)"),

  timezone: text("timezone").default("(GMT+05:30) India Standard Time"),

  budgetAlertsEmail: integer("budget_alerts_email", {
    mode: "boolean",
  }).default(true),

  budgetAlertsPush: integer("budget_alerts_push", {
    mode: "boolean",
  }).default(true),

  billRemindersEmail: integer("bill_reminders_email", {
    mode: "boolean",
  }).default(true),

  billRemindersPush: integer("bill_reminders_push", {
    mode: "boolean",
  }).default(false),

  monthlyReportsEmail: integer("monthly_reports_email", {
    mode: "boolean",
  }).default(true),

  monthlyReportsPush: integer("monthly_reports_push", {
    mode: "boolean",
  }).default(false),

  createdAt: text("created_at")
    .$defaultFn(() => new Date().toISOString()),

  updatedAt: text("updated_at")
    .$defaultFn(() => new Date().toISOString()),
});
