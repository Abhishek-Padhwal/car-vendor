import express from "express";
import { authorize, protect } from "../middleware/auth.js";
import { getAssignedInfo, requestDriver, requestVehicle } from "../controller/sub-vendor.controller.js";

const router = express.Router();

// ✅ Sub Vendor requests a new vehicle
router.post("/request-vehicle", protect, authorize("sub_vendor"), requestVehicle);

// ✅ Sub Vendor requests a new driver
router.post("/request-driver", protect, authorize("sub_vendor"), requestDriver);

// ✅ Get assigned vehicles & drivers info
router.get("/assigned-info", protect, authorize("sub_vendor"), getAssignedInfo);

export default router;
