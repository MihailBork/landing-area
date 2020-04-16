const router = require(`express`).Router();
const kotelnikovoController = require(`../../controllers/kotelnikovo.controller`);

router.post(`/addChildWork`, kotelnikovoController.uploadChildWork);
router.post(`/addArchitectWork`, kotelnikovoController.uploadArchitectWork);
router.get(`/getWorksCount`, kotelnikovoController.getWorksCount);
router.get(`/getWorksPage`, kotelnikovoController.getWorksPage);

module.exports = router;
