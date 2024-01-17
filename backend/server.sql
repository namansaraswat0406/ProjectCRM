-- Create the main database
CREATE DATABASE my_database;

-- Connect to the new database
\c my_database;

-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    gender VARCHAR(10),
    address JSONB,
    phone_number VARCHAR(20),
    is_verified BOOLEAN,
    registration_date TIMESTAMP,
    role VARCHAR(20)
);

-- Create the food tables (one for each user)
CREATE TABLE user_food_12345 (
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    ingredients JSONB NOT NULL,
    calories INT,
    allergens JSONB,
    price DECIMAL(8, 2),
    is_vegetarian BOOLEAN,
    is_gluten_free BOOLEAN,
    description TEXT,
    image_url VARCHAR(255)
);

-- Repeat the above for each user, replacing 12345 with the respective user_id

-- Example for user_id 67890
CREATE TABLE user_food_67890 (
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    ingredients JSONB NOT NULL,
    calories INT,
    allergens JSONB,
    price DECIMAL(8, 2),
    is_vegetarian BOOLEAN,
    is_gluten_free BOOLEAN,
    description TEXT,
    image_url VARCHAR(255)
);

-- Add foreign key constraint to link food tables to users
ALTER TABLE user_food_12345 ADD COLUMN user_id INT REFERENCES users(user_id);
ALTER TABLE user_food_67890 ADD COLUMN user_id INT REFERENCES users(user_id);

-- Repeat the above for each user, replacing 12345 and 67890 with the respective user_id
