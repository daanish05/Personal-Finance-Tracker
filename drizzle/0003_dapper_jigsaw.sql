CREATE TABLE `budgets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`amount` real NOT NULL,
	`month` integer NOT NULL,
	`year` integer NOT NULL,
	`created_at` text
);
