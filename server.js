require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const authRoutes   = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorHandler');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',')
        : ['http://localhost:3001', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));
app.use(express.json());

// ── Routes ──
app.use('/api/auth',     authRoutes);
app.use('/api/bookings', bookingRoutes);

// Keep old routes working (backward compatible)
app.use('/', authRoutes);
app.post('/book', require('./middleware/validate').validateBooking, require('./controllers/bookingController').createBooking);
app.get('/bookings',  require('./controllers/bookingController').getAllBookings);
app.delete('/bookings/:id', require('./controllers/bookingController').deleteBooking);

// ── Health Check ──
app.get('/', (req, res) => {
    res.json({ message: '🏨 Grand Azure Hotel API is running!', status: 'OK' });
});

// ── Global Error Handler ──
app.use(errorHandler);

const pool = require('./config/db');

app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📌 API Base URL: http://localhost:${PORT}/api`);

    // Auto-create admin user if not exists
    try {
        await pool.query(`
            INSERT INTO users (username, email, password, role)
            VALUES ('admin', 'admin@grandazure.com', 'admin123', 'admin')
            ON CONFLICT (username) DO NOTHING
        `);
        console.log('✅ Admin user ready.');
    } catch (err) {
        console.error('❌ Admin seed failed:', err.message);
    }
});
