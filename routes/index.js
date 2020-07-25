//include express and create a router
const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");

//route for homepage
router.get("/", homeController.home);

//route for specific hotel
router.post("/create-habbit", homeController.create);

// //redirect all user related URLs to users.js
router.get("/deleteHabbit/", homeController.delete);

router.get("/trackHabbit/", homeController.track);

router.post("/save-task/", homeController.update);

//export router
module.exports = router;
