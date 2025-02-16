import express from "express";
import { assignDriverToVehicle, notifySubVendor } from "../controller/city-vendor.controller.js";
import { authorize, protect } from "../middleware/auth.js";


const router = express.Router();

router.put("/assign-driver/:vehicleId/:driverId", protect, authorize("city_vendor"), assignDriverToVehicle);

router.post("/notify-subvendor", protect, authorize("city_vendor"), notifySubVendor);

export default router;
