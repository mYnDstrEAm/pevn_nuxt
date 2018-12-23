const { Router } = require('express');

const todos = require('./todos');
const auth = require('./auth');

const router = Router();

router.use('/todos', todos);
router.use('/auth', auth);

module.exports = router;
