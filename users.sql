-- Database: `liquidless`

-- Table structure for table `users`
CREATE TABLE "users" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "telegram_user_id" INTEGER NOT NULL,
  "platform" TEXT NOT NULL,
  "blockchain" TEXT NOT NULL,
  "eth_wallet_address" TEXT NOT NULL,
  "health_factor" REAL NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Dumping data for table `users`
INSERT INTO "users" ("id", "telegram_user_id", "platform", "blockchain", "eth_wallet_address", "health_factor", "created_at", "updated_at") VALUES
(1, 1383335333, 'Aave', 'Optimism', '0xdaf7bbe20724d2dd7717e0e09a06b572c3a112de', 1.3, '2023-09-22 03:12:13', '2023-09-22 03:12:13'),
(2, 1383335333, 'Aave', 'Arbitrum', '0xdaf7bbe20724d2dd7717e0e09a06b572c3a112de', 1.2, '2023-09-22 03:46:10', '2023-09-22 03:46:10'),
(3, 1383335333, 'Aave', 'Polygon', '0xdaf7bbe20724d2dd7717e0e09a06b572c3a112de', 1.2, '2023-09-22 03:46:10', '2023-09-22 03:46:10'),
(4, 1383335333, 'Aave', 'Mainnet', '0xdaf7bbe20724d2dd7717e0e09a06b572c3a112de', 1.2, '2023-09-22 03:46:10', '2023-09-22 03:46:10'),
(5, 1383335333, 'Aave', 'Base', '0xdaf7bbe20724d2dd7717e0e09a06b572c3a112de', 1.2, '2023-09-22 03:46:10', '2023-09-22 03:46:10');
