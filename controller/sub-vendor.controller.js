import { Driver } from "../models/driver.mode.js";
import  { Vehicle } from "../models/vehicle.model.js";
import { Vendor } from "../models/vendor.model.js";


// ✅ Request new vehicle (Sent to Regional Vendor)
export const requestVehicle = async (req, res) => {
    try {
        const { registrationNumber, model, seatingCapacity, fuelType } = req.body;
        const subVendorId = req.user.vendor;

        const subVendor = await Vendor.findById(subVendorId);
        if (!subVendor) {
            return res.status(404).json({ message: "Sub Vendor not found" });
        }

        // Create a new vehicle request (Pending approval)
        const vehicle = await Vehicle.create({
            registrationNumber,
            model,
            seatingCapacity,
            fuelType,
            vendor: subVendorId,
            status: "Pending Approval",
        });

        // Notify the Regional Vendor
        const regionalVendor = await Vendor.findById(subVendor.parentVendor);
        if (!regionalVendor) {
            return res.status(404).json({ message: "Regional Vendor not found" });
        }

        res.status(201).json({ success: true, message: "Vehicle request sent to Regional Vendor", vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Request new driver (Sent to Regional Vendor)
export const requestDriver = async (req, res) => {
    try {
        const { name, licenseNumber, contactNumber } = req.body;
        const subVendorId = req.user.vendor;

        // Validate Sub Vendor
        const subVendor = await Vendor.findById(subVendorId);
        if (!subVendor) {
            return res.status(404).json({ message: "Sub Vendor not found" });
        }

        // Create a new driver request (Pending approval)
        const driver = await Driver.create({
            name,
            licenseNumber,
            contactNumber,
            vendor: subVendorId,
            isVerified: false,
        });

        // Notify the Regional Vendor
        const regionalVendor = await Vendor.findById(subVendor.parentVendor);
        if (!regionalVendor) {
            return res.status(404).json({ message: "Regional Vendor not found" });
        }

        res.status(201).json({ success: true, message: "Driver request sent to Regional Vendor", driver });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get assigned vehicles & drivers
export const getAssignedInfo = async (req, res) => {
    try {
        const subVendorId = req.user.vendor;
        const vehicles = await Vehicle.find({ vendor: subVendorId, status: "Active" });
        const drivers = await Driver.find({ vendor: subVendorId, isVerified: true });

        res.status(200).json({ success: true, vehicles, drivers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
