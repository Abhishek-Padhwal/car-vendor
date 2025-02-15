import express from "express";
import { authorize, protect } from "../middleware/auth.js";
import { approveDriver, approveVehicle } from "../controller/regional-vendor.controller.js";

const router = express.Router();

router.put("/approve-vehicle/:vehicleId", protect, authorize("regional_vendor"), approveVehicle);

router.put("/approve-driver/:driverId", protect, authorize("regional_vendor"), approveDriver);


export default router;
