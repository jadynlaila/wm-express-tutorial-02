
const express = require('express');
const router = express.Router();

const {welcome} = require('../controllers/auth');
router.route('/').post(welcome);

module.exports = router;
