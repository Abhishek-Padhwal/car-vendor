import express from "express";

import { approveVendor, createSubVendor, deleteVendor, getAllVendors, getVendorById, updateVendor } from "../controller/super-vendor.controller.js";
import { authorize, protect } from "../middleware/auth.js";

const router = express.Router();


router.post("/sub-vendor", protect, authorize("super_vendor"), createSubVendor);
router.put(
    "/approve-vendor",
    protect,
    authorize("super_vendor"),
    approveVendor
);
router.get("/vendors", protect, authorize("super_vendor"), getAllVendors);
router.get(
    "/vendors/:vendorId",
    protect,
    authorize("super_vendor"),
    getVendorById
);
router.put(
    "/vendors/:vendorId",
    protect,
    authorize("super_vendor"),
    updateVendor
);
router.delete(
    "/vendors/:vendorId",
    protect,
    authorize("super_vendor"),
    deleteVendor
);

export default router;
