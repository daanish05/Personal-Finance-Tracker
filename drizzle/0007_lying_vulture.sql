DROP INDEX "profiles_user_id_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `profiles` ALTER COLUMN "avatar" TO "avatar" blob;--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_user_id_unique` ON `profiles` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
UPDATE "profiles" SET "avatar" = NULL WHERE "avatar" IS NOT NULL;