import { Driver } from "../models/driver.mode.js";
import { Vehicle } from "../models/vehicle.model.js";


// ✅ Assign driver to a vehicle
export const assignDriverToVehicle = async (req, res) => {
    try {
        const { vehicleId, driverId } = req.params;

        // Assign driver to vehicle
        const vehicle = await Vehicle.findByIdAndUpdate(
            vehicleId,
            { assignedDriver: driverId },
            { new: true }
        );

        // Assign vehicle to driver
        const driver = await Driver.findByIdAndUpdate(
            driverId,
            { assignedVehicle: vehicleId },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Driver assigned to vehicle", vehicle, driver });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Notify Sub Vendor
export const notifySubVendor = async (req, res) => {
    try {
        const { subVendorId, vehicleId, driverId } = req.body;

        const subVendor = await Vendor.findById(subVendorId);
        if (!subVendor) {
            return res.status(404).json({ message: "Sub Vendor not found" });
        }

        res.status(200).json({
            success: true,
            message: "Sub Vendor notified",
            subVendor,
            assignedVehicle: vehicleId,
            assignedDriver: driverId,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
