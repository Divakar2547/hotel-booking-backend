// Validate booking request
const validateBooking = (req, res, next) => {
    const { name, date, room, location } = req.body;
    if (!name || !date || !room || !location)
        return res.status(400).json({ error: 'All fields are required.' });
    if (isNaN(room) || room < 1 || room > 500)
        return res.status(400).json({ error: 'Room number must be between 1 and 500.' });
    next();
};

// Validate register request
const validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return res.status(400).json({ error: 'All fields are required.' });
    if (password.length < 6)
        return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    next();
};

// Validate login request
const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: 'All fields are required.' });
    next();
};

module.exports = { validateBooking, validateRegister, validateLogin };
