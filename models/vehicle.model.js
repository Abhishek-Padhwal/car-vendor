import mongoose from "mongoose";
const vehicleSchema = new mongoose.Schema(
    {
        registrationNumber: { type: String, required: true, unique: true },
        model: { type: String, required: true },
        seatingCapacity: { type: Number, required: true },
        fuelType: {
            type: String,
            enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
            required: true,
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            required: true,
        }, // Owned by a vendor
        assignedDriver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
            default: null,
        }, // Assigned driver
        documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }], // Compliance docs
        status: {
            type: String,
            enum: ["Active", "Inactive", "Under Maintenance"],
            default: "Active",
        },
    },
    { timestamps: true }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
