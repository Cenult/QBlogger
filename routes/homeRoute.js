const router = require("express").Router();
const homeController = require("../controllers/homeController");



router.get("/", homeController.get_home);
router.get("/about", homeController.get_about);

module.exports = router;