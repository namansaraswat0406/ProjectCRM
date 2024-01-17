const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

// Use CORS middleware
app.use(cors());

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '7055',
    port: 5432,
});

app.use(express.json());

// Create users table
app.post('/create_users_table', async (req, res) => {
    try {
        const result = await pool.query(`
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
          registration_date TIMESTAMP,
          role VARCHAR(20)
        );
      `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error creating users table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create food table for a user
app.post('/create_food_table/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pool.query(`
      CREATE TABLE user_food_${user_id} (
        food_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        calories INT,
        image_url VARCHAR(255),
        user_id INT REFERENCES users(user_id)
      );
    `);
        res.json(result.rows);
    } catch (error) {
        console.error(`Error creating food table for user ${user_id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get user data by user_id
app.get('/get_user_data/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(`Error getting user data for user ${user_id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
