CREATE TABLE `quote_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`travel_date` text NOT NULL,
	`pickup` text NOT NULL,
	`destination` text NOT NULL,
	`city` text NOT NULL,
	`guests` text NOT NULL,
	`package` text NOT NULL,
	`notes` text NOT NULL
);
