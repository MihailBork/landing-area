const router = require('express').Router();

// const authRouter = require('./auth');
const emailRouter = require('./email');
const kotelnikovoRouter = require('./kotelnikovo');

// router.use('/', authRouter);
router.use('/', emailRouter);
router.use('/kotelnikovo', kotelnikovoRouter);

module.exports = router;