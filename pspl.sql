-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 20, 2021 at 02:25 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pspl`
--

-- --------------------------------------------------------

--
-- Table structure for table `basics`
--

CREATE TABLE `basics` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `orgId` int(11) NOT NULL,
  `dept` int(255) NOT NULL,
  `step` int(11) NOT NULL,
  `head` int(11) NOT NULL,
  `name` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `basics`
--

INSERT INTO `basics` (`id`, `orgId`, `dept`, `step`, `head`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 0, 0, 0, 0, 'IT', 1, '2020-12-28 03:49:58', '2020-12-28 03:49:58'),
(2, 0, 0, 0, 0, 'Marketing', 1, '2020-12-28 12:36:07', '2020-12-28 12:36:07'),
(3, 1, 3, 0, 0, 'Cash & Bank Management', 1, '2021-01-07 00:59:05', '2021-01-07 00:59:05'),
(4, 1, 3, 1, 3, 'Cash Management Policy', 1, '2021-01-07 01:16:17', '2021-01-07 01:16:17'),
(5, 1, 3, 1, 3, 'Credit and Collection Policy', 1, '2021-01-07 01:16:26', '2021-01-07 01:16:26'),
(6, 1, 3, 2, 5, 'Bank account operations', 1, '2021-01-07 01:18:00', '2021-01-07 01:18:00'),
(7, 1, 3, 0, 0, 'HR', 1, '2021-01-07 01:50:50', '2021-01-07 01:50:50'),
(8, 1, 3, 0, 0, 'Marketing', 1, '2021-01-07 01:50:55', '2021-01-07 01:50:55'),
(9, 1, 0, 0, 0, 'Technology', 1, '2021-01-07 02:29:24', '2021-01-07 02:29:24'),
(10, 1, 3, 1, 3, 'Accounts Receivables', 1, '2021-01-07 02:34:13', '2021-01-07 02:34:13'),
(11, 1, 3, 1, 3, 'Accounts Payable', 1, '2021-01-07 02:35:37', '2021-01-07 02:35:37'),
(12, 1, 3, 2, 5, 'Receipts', 1, '2021-01-07 03:09:08', '2021-01-07 03:09:08'),
(13, 1, 3, 2, 5, 'Disbursement / Payment', 1, '2021-01-07 03:09:16', '2021-01-07 03:09:16'),
(14, 1, 3, 2, 5, 'Physical Controls', 1, '2021-01-07 03:09:24', '2021-01-07 03:09:24'),
(15, 1, 3, 2, 5, 'Reconciliation & Review', 1, '2021-01-07 03:09:31', '2021-01-07 03:09:31'),
(16, 1, 3, 3, 6, 'Opening of bank account / facility', 1, '2021-01-07 03:24:48', '2021-01-07 03:24:48'),
(17, 1, 3, 3, 6, 'Review of bank account', 1, '2021-01-07 03:24:57', '2021-01-07 03:24:57'),
(18, 1, 3, 3, 6, 'Closure of bank account', 1, '2021-01-07 03:25:06', '2021-01-07 03:25:06'),
(19, 1, 3, 4, 16, 'Process Overview', 1, '2021-01-07 03:32:15', '2021-01-07 03:32:15'),
(20, 1, 3, 4, 16, 'Key Objectives', 1, '2021-01-07 03:32:23', '2021-01-07 03:32:23'),
(21, 1, 3, 4, 16, 'Key Inputs & Outputs', 1, '2021-01-07 03:32:32', '2021-01-07 03:32:32'),
(22, 1, 3, 4, 16, 'Key Outputs', 1, '2021-01-07 03:32:40', '2021-01-07 03:32:40'),
(23, 1, 3, 4, 16, 'Policy & People Linkages', 1, '2021-01-07 03:32:48', '2021-01-07 03:32:48'),
(24, 1, 3, 4, 16, 'KPIs & MIS', 1, '2021-01-07 03:32:56', '2021-01-07 03:32:56'),
(25, 1, 3, 1, 7, 'Recruitment', 1, '2021-01-07 07:05:45', '2021-01-07 07:05:45'),
(26, 1, 3, 2, 25, 'Permanent', 1, '2021-01-07 07:06:59', '2021-01-07 07:06:59'),
(27, 1, 0, 0, 0, 'Digital', 1, '2021-01-07 07:08:36', '2021-01-07 07:08:36'),
(28, 1, 0, 1, 27, 'Online', 1, '2021-01-07 07:08:47', '2021-01-07 07:08:47'),
(29, 1, 0, 1, 27, 'Offline', 1, '2021-01-07 07:08:53', '2021-01-07 07:08:53'),
(30, 1, 0, 2, 28, 'Web', 1, '2021-01-07 07:08:58', '2021-01-07 07:08:58'),
(31, 1, 0, 2, 28, 'App', 1, '2021-01-07 07:09:04', '2021-01-07 07:09:04'),
(32, 1, 0, 3, 30, 'Website', 1, '2021-01-07 07:09:14', '2021-01-07 07:09:14'),
(33, 1, 0, 3, 30, 'Blog', 1, '2021-01-07 07:09:19', '2021-01-07 07:09:19'),
(34, 1, 0, 4, 32, 'Wordpress', 1, '2021-01-07 07:09:33', '2021-01-07 07:09:33');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2020_12_02_132142_create_basics_table', 1),
(6, '2020_12_02_142848_create_usermodels_table', 1),
(7, '2020_12_03_055054_create_sops_table', 1),
(8, '2020_12_25_134648_create_orgs_table', 1),
(9, '2021_01_07_093635_create_sop_lists_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `orgs`
--

CREATE TABLE `orgs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orgs`
--

INSERT INTO `orgs` (`id`, `name`, `email`, `status`, `created_at`, `updated_at`) VALUES
(1, 'AmitKK', 'amit@amitkk.com', 1, '2021-01-07 00:15:49', '2021-01-07 00:15:49');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(9, 'App\\Models\\User', 2, 'authToken', '59fcc1d1cb759914bf7d69bd36d99a2fea4b497d7dee3e32bc01641e724d496e', '[\"Org\"]', '2021-01-07 09:46:00', '2021-01-07 00:17:40', '2021-01-07 09:46:00'),
(10, 'App\\Models\\User', 2, 'authToken', 'f5007f6e35beb300847274277476dcd87963ff48008a97d5b091fa3b38c431e3', '[\"Org\"]', '2021-01-07 09:58:40', '2021-01-07 09:55:44', '2021-01-07 09:58:40'),
(11, 'App\\Models\\User', 2, 'authToken', 'abf57107d439a572a7bcdcc58fe75c99618299f9d0972ce5816e69f17f5472bd', '[\"Org\"]', NULL, '2021-01-08 03:23:14', '2021-01-08 03:23:14'),
(12, 'App\\Models\\User', 2, 'authToken', '6020ec09a00cc967705c3efdd18971a872e2d130191b44afbdc9d8afdc881ebd', '[\"Org\"]', '2021-01-20 01:32:25', '2021-01-20 01:03:51', '2021-01-20 01:32:25'),
(13, 'App\\Models\\User', 2, 'authToken', 'ef47a989eba844e4eee4b4eaed97b47ad669b45277d71450196676f13754c5e5', '[\"Org\"]', '2021-01-21 05:18:48', '2021-01-21 05:18:43', '2021-01-21 05:18:48');

-- --------------------------------------------------------

--
-- Table structure for table `sops`
--

CREATE TABLE `sops` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `orgId` int(11) NOT NULL,
  `sopfor` int(11) NOT NULL,
  `sop` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sop_lists`
--

CREATE TABLE `sop_lists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `orgId` int(11) NOT NULL,
  `sopfor` int(11) NOT NULL,
  `sop` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sop_lists`
--

INSERT INTO `sop_lists` (`id`, `orgId`, `sopfor`, `sop`, `created_at`, `updated_at`) VALUES
(1, 1, 19, '1610018757.docx', '2021-01-07 04:12:54', '2021-01-07 05:55:57'),
(2, 1, 20, '1610014686.docx', '2021-01-07 04:48:06', '2021-01-07 04:48:06'),
(3, 1, 21, '1610014738.docx', '2021-01-07 04:48:58', '2021-01-07 04:48:58'),
(4, 1, 34, '1610023179.docx', '2021-01-07 07:09:39', '2021-01-07 07:09:39');

-- --------------------------------------------------------

--
-- Table structure for table `usermodels`
--

CREATE TABLE `usermodels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL,
  `dept` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `process` mediumtext COLLATE utf8mb4_unicode_ci,
  `subprocess` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `org` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `org`, `name`, `email`, `role`, `access_token`, `email_verified_at`, `password`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 0, 'Atul Gupta', 'atul.gupta@gmail.com', 'Admin', NULL, NULL, '$2y$10$ysEN0OxCJgRarf/eLGqlquy7UUK.qf1uWQwNOxfASSWWHbAoCAaXW', 1, NULL, '2020-12-26 12:36:07', '2020-12-26 12:36:07'),
(2, 1, 'Amit', 'amit.khare588@gmail.com', 'Org', NULL, NULL, '$2y$10$4nxh7pWIBx4eVJ4ioTGbJeYmniOw5HfdfQcY/cjWJh8/yi5hYBSLe', 1, NULL, '2021-01-07 00:16:34', '2021-01-07 00:16:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `basics`
--
ALTER TABLE `basics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orgs`
--
ALTER TABLE `orgs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sops`
--
ALTER TABLE `sops`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sop_lists`
--
ALTER TABLE `sop_lists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sopfor` (`sopfor`);

--
-- Indexes for table `usermodels`
--
ALTER TABLE `usermodels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basics`
--
ALTER TABLE `basics`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orgs`
--
ALTER TABLE `orgs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `sops`
--
ALTER TABLE `sops`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sop_lists`
--
ALTER TABLE `sop_lists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `usermodels`
--
ALTER TABLE `usermodels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
