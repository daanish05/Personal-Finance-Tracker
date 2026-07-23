CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `accounts` ADD `user_id` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `goals` ADD `user_id` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` ADD `user_id` integer NOT NULL;