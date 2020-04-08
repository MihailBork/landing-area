const router = require(`express`).Router();
const kotelnikovoController = require(`../../controllers/kotelnikovo.controller`);

router.post(`/add`, kotelnikovoController.uploadWork);
router.get(`/getChildWorks`, kotelnikovoController.getChildWorks);
router.get(`/getArchitectWorks`, kotelnikovoController.getArchitectWorks);

module.exports = router;
