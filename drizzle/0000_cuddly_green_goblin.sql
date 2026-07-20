CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`amount` integer NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`account` text NOT NULL,
	`date` text NOT NULL,
	`note` text
);
