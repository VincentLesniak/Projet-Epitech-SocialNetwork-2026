CREATE TABLE `cache` (
  `key` varchar(255) PRIMARY KEY NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
);

CREATE TABLE `cache_locks` (
  `key` varchar(255) PRIMARY KEY NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
);

CREATE TABLE `comments` (
  `id` bigint(20) PRIMARY KEY NOT NULL,
  `message` varchar(255) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `created_at` timestamp DEFAULT null,
  `updated_at` timestamp DEFAULT null
);

CREATE TABLE `failed_jobs` (
  `id` bigint(20) PRIMARY KEY NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT (current_timestamp())
);

CREATE TABLE `groups` (
  `group_name` varchar(50) PRIMARY KEY NOT NULL,
  `banner` blob DEFAULT null,
  `description` varchar(500) DEFAULT null,
  `created_at` timestamp DEFAULT null,
  `updated_at` timestamp DEFAULT null
);

CREATE TABLE `jobs` (
  `id` bigint(20) PRIMARY KEY NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) NOT NULL,
  `reserved_at` int(10) DEFAULT null,
  `available_at` int(10) NOT NULL,
  `created_at` int(10) NOT NULL
);

CREATE TABLE `job_batches` (
  `id` varchar(255) PRIMARY KEY NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT null,
  `cancelled_at` int(11) DEFAULT null,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT null
);

CREATE TABLE `liked` (
  `user_id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT (current_timestamp()),
  PRIMARY KEY (`user_id`, `post_id`)
);

CREATE TABLE `migrations` (
  `id` int(10) PRIMARY KEY NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
);

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) PRIMARY KEY NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT null
);

CREATE TABLE `posts` (
  `id` bigint(20) PRIMARY KEY NOT NULL,
  `message` varchar(255) NOT NULL,
  `post_picture` blob DEFAULT null,
  `user_id` bigint(20) NOT NULL,
  `group_id` varchar(50) DEFAULT null,
  `created_at` timestamp DEFAULT null,
  `updated_at` timestamp DEFAULT null
);

CREATE TABLE `sessions` (
  `id` varchar(255) PRIMARY KEY NOT NULL,
  `user_id` bigint(20) DEFAULT null,
  `ip_address` varchar(45) DEFAULT null,
  `user_agent` text DEFAULT null,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
);

CREATE TABLE `users` (
  `id` bigint(20) PRIMARY KEY NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp DEFAULT null,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT null,
  `created_at` timestamp DEFAULT null,
  `updated_at` timestamp DEFAULT null
);

CREATE TABLE `user_groups` (
  `user_id` bigint(20) NOT NULL,
  `group_id` varchar(50) NOT NULL,
  `created_at` timestamp DEFAULT null,
  `updated_at` timestamp DEFAULT null,
  PRIMARY KEY (`user_id`, `group_id`)
);

ALTER TABLE `comments` ADD CONSTRAINT `comments_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `liked` ADD CONSTRAINT `liked_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

ALTER TABLE `liked` ADD CONSTRAINT `liked_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `posts` ADD CONSTRAINT `posts_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_name`) ON DELETE SET NULL;

ALTER TABLE `posts` ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `user_groups` ADD CONSTRAINT `user_groups_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_name`) ON DELETE CASCADE;

ALTER TABLE `user_groups` ADD CONSTRAINT `user_groups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
