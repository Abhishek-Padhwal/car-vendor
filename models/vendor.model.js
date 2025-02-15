import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: {
            type: String,
            enum: ["super_vendor", "regional_vendor", "city_vendor", "sub_vendor"],
            required: true,
        },
        parentVendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            default: null,
        }, // Parent Vendor
        childrenVendors: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
        ], // Sub Vendors
        vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }], // Fleet
        drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Driver" }], // Assigned drivers
    },
    { timestamps: true }
);

export const Vendor = mongoose.model("Vendor", vendorSchema);
