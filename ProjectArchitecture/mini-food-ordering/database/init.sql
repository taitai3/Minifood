-- Run this script in MariaDB to create all databases
CREATE DATABASE IF NOT EXISTS user_service_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS food_service_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS order_service_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS payment_service_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Grant permissions (adjust user/password as needed)
-- GRANT ALL PRIVILEGES ON user_service_db.* TO 'root'@'localhost';
-- GRANT ALL PRIVILEGES ON food_service_db.* TO 'root'@'localhost';
-- GRANT ALL PRIVILEGES ON order_service_db.* TO 'root'@'localhost';
-- GRANT ALL PRIVILEGES ON payment_service_db.* TO 'root'@'localhost';
-- FLUSH PRIVILEGES;

SELECT 'Databases created successfully!' AS message;
