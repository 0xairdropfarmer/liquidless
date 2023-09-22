-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 22, 2023 at 03:49 AM
-- Server version: 5.7.11
-- PHP Version: 5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `liquidless`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `telegram_user_id` int(11) NOT NULL,
  `platform` varchar(50) NOT NULL,
  `blockchain` varchar(50) NOT NULL,
  `eth_wallet_address` varchar(42) NOT NULL,
  `health_factor` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `telegram_user_id`, `platform`, `blockchain`, `eth_wallet_address`, `health_factor`, `created_at`, `updated_at`) VALUES
(1, 1383335333, 'Aave', 'Optimism', '0xdaf7bbe20724d2dd7717e0e09a06b572c3a112de', 1.3, '2023-09-22 03:12:13', '2023-09-22 03:12:13'),
(2, 1383335333, 'Aave', 'Arbitrum', '0xdaf7bbe20724d2dd7717e0e09a06b572c3a112de', 1.2, '2023-09-22 03:46:10', '2023-09-22 03:46:10'),
(3, 1383335333, 'Aave', 'Polygon', '0xdaf7bbe20724d2dd7717e0e09a06b572c3a112de', 1.2, '2023-09-22 03:46:10', '2023-09-22 03:46:10'),
(4, 1383335333, 'Aave', 'Mainnet', '0xdaf7bbe20724d2dd7717e0e09a06b572c3a112de', 1.2, '2023-09-22 03:46:10', '2023-09-22 03:46:10'),
(5, 1383335333, 'Aave', 'Base', '0xdaf7bbe20724d2dd7717e0e09a06b572c3a112de', 1.2, '2023-09-22 03:46:10', '2023-09-22 03:46:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
