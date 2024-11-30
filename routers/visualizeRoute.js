const express = require("express");
const router = express.Router();
const dataController = require("../controller/visualizeController");

router.post("/data", dataController.saveData);

module.exports = router;
