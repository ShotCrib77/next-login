THIS REPO HAS TWO VERSIONS
Current main branch uses JWT tokens for fast auth
Previous comit uses a custom Sessions DB for handling tokens which would be slower at scale but allows for instant session removal

Need these enviroment variables:
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=users_schema

MYSQL
CREATE SCHEMA users_schema;

USE users_schema;

CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(32) NOT NULL UNIQUE,
    password_hash CHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
