import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: [
                "pending_vendor",
                "super_vendor",
                "regional_vendor",
                "city_vendor",
                "sub_vendor",
                "driver",
            ],
            default: "pending_vendor", // Default to pending approval
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            default: null,
        }, // Only set if assigned
        isApproved: { type: Boolean, default: false }, // Ensures manual approval
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
