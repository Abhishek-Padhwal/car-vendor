import mongoose from "mongoose";
const driverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        licenseNumber: { type: String, required: true, unique: true },
        contactNumber: { type: String, required: true },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            required: true,
        }, // Linked to a vendor
        assignedVehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            default: null,
        }, // Assigned vehicle
        documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }], // Driver compliance
        isVerified: { type: Boolean, default: false }, // Verified status
    },
    { timestamps: true }
);

export const Driver = mongoose.model("Driver", driverSchema);
