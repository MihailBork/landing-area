const router = require('express').Router();
const emailController = require('../../controllers/email.controller');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single(`work`), emailController.register);

module.exports = router;
