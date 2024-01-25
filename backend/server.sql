-- Create the database
CREATE DATABASE mydatabase;
 
-- Connect to the database
\c mydatabase;
 
-- Create the user table
CREATE TABLE user_table (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    role VARCHAR(50) NOT NULL
);
 
-- Create the project table
CREATE TABLE project_table (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    food_name VARCHAR(100) NOT NULL,
    food_type VARCHAR(50) NOT NULL,
    calories INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES user_table(user_id) ON DELETE CASCADE
);
 
-- Create the person table
CREATE TABLE person_table (
    person_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    project_id INTEGER REFERENCES project_table(project_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES user_table(user_id) ON DELETE CASCADE
);