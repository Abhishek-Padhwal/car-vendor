import express from "express";
import { authorize, protect } from "../middleware/auth.js";
import { getAssignedInfo, requestDriver, requestVehicle } from "../controller/sub-vendor.controller.js";

const router = express.Router();

router.post("/request-vehicle", protect, authorize("sub_vendor"), requestVehicle);

router.post("/request-driver", protect, authorize("sub_vendor"), requestDriver);

router.get("/assigned-info", protect, authorize("sub_vendor"), getAssignedInfo);

export default router;
