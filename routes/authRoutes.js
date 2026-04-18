const express                          = require('express');
const router                           = express.Router();
const { register, login, getUsers }    = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validate');

router.post('/register', validateRegister, register);
router.post('/login',    validateLogin,    login);
router.get('/users',                       getUsers);

module.exports = router;
