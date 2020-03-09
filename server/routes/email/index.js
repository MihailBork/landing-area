const router = require('express').Router();
const emailController = require('../../controllers/email.controller');

router.post('/register', emailController.register);

module.exports = router;
