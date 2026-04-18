const pool = require('../config/db');

// POST /book
const createBooking = async (req, res, next) => {
    const { name, date, room, location } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO bookings (name, date, room, location) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, date, room, location]
        );
        res.status(201).json({ message: 'Booking successful!', booking: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// GET /bookings
const getAllBookings = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM bookings ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

// DELETE /bookings/:id
const deleteBooking = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Booking not found.' });
        res.json({ message: 'Booking deleted successfully.' });
    } catch (err) {
        next(err);
    }
};

module.exports = { createBooking, getAllBookings, deleteBooking };
