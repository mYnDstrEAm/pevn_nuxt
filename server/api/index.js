const express = require('express');
const routes = require('./routes');

const router = express.Router();

// Set up routes
router.use('/api', routes);

module.exports = router;
