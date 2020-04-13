const router = require(`express`).Router();
const kotelnikovoController = require(`../../controllers/kotelnikovo.controller`);
const crypto = require(`crypto`);
const path = require(`path`);

router.post(`/addChildWork`, kotelnikovoController.uploadChildWork);
router.post(`/addArchitectWork`, kotelnikovoController.uploadArchitectWork);
router.get(`/getChildWorks`, kotelnikovoController.getChildWorks);
router.get(`/getArchitectWorks`, kotelnikovoController.getArchitectWorks);

module.exports = router;
