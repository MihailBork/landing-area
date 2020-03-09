const router = require('express').Router();

// const authRouter = require('./auth');
const emailRouter = require('./email');

// router.use('/', authRouter);
router.use('/', emailRouter);

module.exports = router;