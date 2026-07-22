CREATE TABLE `goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`target` real NOT NULL,
	`current` real DEFAULT 0 NOT NULL,
	`deadline` text,
	`icon` text NOT NULL,
	`color_idx` integer NOT NULL,
	`created_at` text
);
--> statement-breakpoint
DROP TABLE `budgets`;