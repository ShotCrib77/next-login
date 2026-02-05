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
    username VARCHAR(32 ) NOT NULL UNIQUE,
    password_hash CHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
    token CHAR(64) PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);