ALTER TABLE `accounts` ALTER COLUMN "balance" TO "balance" real NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "color" TO "color" text NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ADD `desc` text NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ADD `icon` text NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ADD `badge` text;--> statement-breakpoint
ALTER TABLE `accounts` ADD `trend` text NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ADD `wide` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `accounts` DROP COLUMN `type`;