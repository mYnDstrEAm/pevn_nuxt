const { Router } = require('express');
const authController = require('../../controllers').auth;

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.patch('/', authController.changePassword);

module.exports = router;
