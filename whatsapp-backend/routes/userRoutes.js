const express = require('express');
const router = express.Router();
const protect = require('../utils/authMiddleware');
const { getContacts } = require('../controllers/userController');

router.get('/contacts', protect, getContacts);

module.exports = router;
