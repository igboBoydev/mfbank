const expresss = require("express");
const router = expresss.Router();
require("dotenv").config();

const PubCtrl = require("../controllers/PublicCtrl");

// Authentication
router.post("/create-drone", PubCtrl.addDrone);
router.post("/load-drone", PubCtrl.loadDroneWithMedications);
router.get("/all-medications-in-drone", PubCtrl.checkMedicationsInDrone);
router.get("/all-drones", PubCtrl.getAvailableDrones);
router.get("/get-drone-battery-level", PubCtrl.getDroneBatteryLevel);

module.exports = router;
