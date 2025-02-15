import express from "express";
import { assignDriverToVehicle, notifySubVendor } from "../controller/city-vendor.controller.js";
import { authorize, protect } from "../middleware/auth.js";


const router = express.Router();

// ✅ Assign a driver to a vehicle
router.put("/assign-driver/:vehicleId/:driverId", protect, authorize("city_vendor"), assignDriverToVehicle);

// ✅ Notify sub vendor after assigning vehicles & drivers
router.post("/notify-subvendor", protect, authorize("city_vendor"), notifySubVendor);

export default router;
