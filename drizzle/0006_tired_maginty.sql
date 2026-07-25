CREATE TABLE `profiles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`phone` text,
	`location` text,
	`bio` text,
	`linkedin` text,
	`website` text,
	`avatar` text,
	`language` text DEFAULT 'English (US)',
	`timezone` text DEFAULT '(GMT+05:30) India Standard Time',
	`budget_alerts_email` integer DEFAULT true,
	`budget_alerts_push` integer DEFAULT true,
	`bill_reminders_email` integer DEFAULT true,
	`bill_reminders_push` integer DEFAULT false,
	`monthly_reports_email` integer DEFAULT true,
	`monthly_reports_push` integer DEFAULT false,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_user_id_unique` ON `profiles` (`user_id`);