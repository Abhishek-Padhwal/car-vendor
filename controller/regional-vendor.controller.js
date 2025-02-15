import { Driver } from "../models/driver.mode.js";
import { Vehicle } from "../models/vehicle.model.js";


// ✅ Approve vehicle request (Assign to City Vendor)
export const approveVehicle = async (req, res) => {
    try {
        const { vehicleId, cityVendorId } = req.params;

        const vehicle = await Vehicle.findByIdAndUpdate(
            vehicleId,
            { status: "Approved", vendor: cityVendorId },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Vehicle approved and assigned to City Vendor", vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Approve driver request (Assign to City Vendor)
export const approveDriver = async (req, res) => {
    try {
        const { driverId, cityVendorId } = req.params;

        const driver = await Driver.findByIdAndUpdate(
            driverId,
            { isVerified: true, vendor: cityVendorId },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Driver approved and assigned to City Vendor", driver });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
