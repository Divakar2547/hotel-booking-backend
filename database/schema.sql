-- Create database (run this separately in psql)
-- CREATE DATABASE hotel_db;

-- Connect to hotel_db then run:

CREATE TABLE IF NOT EXISTS bookings (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE         NOT NULL,
    room INT          NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id         SERIAL PRIMARY KEY,
    username   VARCHAR(100) UNIQUE NOT NULL,
    email      VARCHAR(150) UNIQUE NOT NULL,
    password   VARCHAR(255) NOT NULL,
    role       VARCHAR(20)  DEFAULT 'user',
    created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- Add location column if not exists
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS location VARCHAR(100);

-- Insert default admin account (password: admin123)
INSERT INTO users (username, email, password, role)
VALUES ('admin', 'admin@grandazure.com', 'admin123', 'admin')
ON CONFLICT (username) DO NOTHING;
