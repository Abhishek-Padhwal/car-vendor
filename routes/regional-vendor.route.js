import express from "express";
import { authorize, protect } from "../middleware/auth.js";
import { approveDriver, approveVehicle } from "../controller/regional-vendor.controller.js";

const router = express.Router();

// ✅ Approve vehicle request from sub vendor
router.put("/approve-vehicle/:vehicleId", protect, authorize("regional_vendor"), approveVehicle);

// ✅ Approve driver request from sub vendor
router.put("/approve-driver/:driverId", protect, authorize("regional_vendor"), approveDriver);


export default router;
