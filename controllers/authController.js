const pool = require('../config/db');

// POST /register
const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const exists = await pool.query(
            'SELECT id FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );
        if (exists.rows.length > 0)
            return res.status(409).json({ error: 'Username or email already exists.' });

        const result = await pool.query(
            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
            [username, email, password, 'user']
        );
        res.status(201).json({ message: 'Account created successfully!', user: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// POST /login
const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT id, username, email, role FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );
        if (result.rows.length === 0)
            return res.status(401).json({ error: 'Invalid username or password.' });

        res.json({ message: 'Login successful!', user: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// GET /api/auth/users — fetch all users (admin only)
const getUsers = async (req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT id, username, email, role, created_at FROM users ORDER BY id ASC'
        );
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login, getUsers };
