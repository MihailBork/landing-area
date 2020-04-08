const router = require(`express`).Router();
const kotelnikovoController = require(`../../controllers/kotelnikovo.controller`);
const crypto = require(`crypto`);
const path = require(`path`);

router.post(`/add`, kotelnikovoController.uploadWork);
router.get(`/getWorks`, kotelnikovoController.getWorks);

module.exports = router;
