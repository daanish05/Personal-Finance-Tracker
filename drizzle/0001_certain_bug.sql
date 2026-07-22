CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`balance` integer NOT NULL,
	`color` text,
	`created_at` text
);
--> statement-breakpoint
ALTER TABLE `transactions` ADD `created_at` text;