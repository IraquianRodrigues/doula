CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`city` text NOT NULL,
	`whatsapp` text NOT NULL,
	`pregnancy_weeks` integer NOT NULL,
	`package_interest` text,
	`consent_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "leads_pregnancy_weeks_range" CHECK("leads"."pregnancy_weeks" BETWEEN 1 AND 42)
);
