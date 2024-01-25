// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001; // Choose the desired port

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydatabase',
    password: '7055',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// GET all users
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM user_table');
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// GET user details by ID
app.get('/api/user-details/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userResult = await pool.query('SELECT * FROM user_table WHERE user_id = $1', [userId]);
        const projectsResult = await pool.query('SELECT * FROM project_table WHERE user_id = $1', [userId]);
        const personsResult = await pool.query('SELECT * FROM person_table WHERE user_id = $1', [userId]);

        const userDetails = {
            user: userResult.rows[0],
            projects: projectsResult.rows,
            persons: personsResult.rows,
        };

        res.json(userDetails);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// GET projects by user ID
app.get('/api/projects/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await pool.query('SELECT * FROM project_table WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET persons by user ID
app.get('/api/persons/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await pool.query('SELECT * FROM person_table WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// POST a new user
app.post('/api/users', async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone_number, role } = req.body;
        const result = await pool.query(
            'INSERT INTO user_table (first_name, last_name, email, password, phone_number, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [first_name, last_name, email, password, phone_number, role]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET all projects
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM project_table');
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST a new project
app.post('/api/projects', async (req, res) => {
    try {
        const { project_name, food_name, food_type, calories, image_url, user_id } = req.body;
        const result = await pool.query(
            'INSERT INTO project_table (project_name, food_name, food_type, calories, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [project_name, food_name, food_type, calories, image_url, user_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET all persons
app.get('/api/persons', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM person_table');
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST a new person
app.post('/api/persons', async (req, res) => {
    try {
        const { first_name, last_name, address, phone_number, image_url, project_id, user_id } = req.body;
        const result = await pool.query(
            'INSERT INTO person_table (first_name, last_name, address, phone_number, image_url, project_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [first_name, last_name, address, phone_number, image_url, project_id, user_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/api/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fetch user from the database based on the provided email
        const result = await pool.query('SELECT * FROM user_table WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            // User not found
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the stored password hash
        const storedPassword = result.rows[0].password;

        if (password !== storedPassword) {
            // Incorrect password
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Authentication successful, return user data (or a token)
        const userData = {
            id: result.rows[0].user_id,
            email: result.rows[0].email,
            role: result.rows[0].role,
        };

        res.json(userData);
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
