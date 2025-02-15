import { User } from "../models/user.model.js";
import { Vendor } from "../models/vendor.model.js";
import bcrypt from "bcryptjs";
import { sendCookie } from "../utils/feature.js";

// ✅ Create a Sub Vendor (Super Vendor Only)
export const createSubVendor = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Allowed roles for vendors
        const allowedRoles = ["super_vendor", "regional_vendor", "city_vendor", "sub_vendor"];
        if (!allowedRoles.includes(role)) {
            return next(new ErrorHandler("Invalid vendor role provided", 400));
        }

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return next(new ErrorHandler("User already exists", 404));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with the given role
        user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            isApproved: true, // Assuming auto-approval
        });

        // Create the vendor with the specified role and set parentVendor as the user ID
        const vendor = await Vendor.create({
            name,
            type: role, // Use the role dynamically
            parentVendor: user._id, // Set the parent vendor as the user ID
        });

        // Link the vendor to the user
        user.vendor = vendor._id;
        await user.save();

        sendCookie(user, res, "Vendor created successfully", 201);
    } catch (error) {
        next(error);
    }
};


// ✅ Approve a Pending Vendor (Super Vendor Only)
export const approveVendor = async (req, res) => {
    try {
        const { userId } = req.body;

        if (req.user.role !== "super_vendor") {
            return res.status(403).json({ message: "Unauthorized action." });
        }

        const user = await User.findById(userId);
        if (!user || user.role !== "pending_vendor") {
            return res.status(400).json({ message: "User is not a pending vendor." });
        }

        // Create a Vendor entry for the user
        const vendor = await Vendor.create({
            name: user.name,
            type: "sub_vendor",
            parentVendor: req.user._id, // Assign parent vendor as the approving super_vendor
        });

        // Approve User as Sub Vendor and link to Vendor entry
        user.role = "sub_vendor";
        user.isApproved = true;
        user.vendor = vendor._id; // Associate user with vendor
        await user.save();

        res.status(200).json({ message: "User approved as Sub Vendor and Vendor created successfully.", user, vendor });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

// ✅ Get All Vendors
export const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate("parentVendor childrenVendors");
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

// ✅ Get Vendor by ID
export const getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.vendorId)
            .populate("parentVendor childrenVendors vehicles drivers");
        
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }

        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

// ✅ Update Vendor
export const updateVendor = async (req, res) => {
    try {
        const { name, role } = req.body; // Accepts new name & role
        const { vendorId } = req.params;

        // Find the vendor
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }

        // Find the user associated with this vendor
        const user = await User.findOne({ vendor: vendorId });
        if (!user) {
            return res.status(404).json({ message: "User associated with this vendor not found." });
        }

        // Validate role transition
        const allowedRoles = ["super_vendor", "sub_vendor", "driver", "regional"];
        if (role && !allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role specified." });
        }

        // Update Vendor details
        vendor.name = name || vendor.name;
        if (role) {
            vendor.type = role;
        }
        await vendor.save();

        // Update User details
        if (role) {
            user.role = role;
            await user.save();
        }

        res.status(200).json({ 
            message: "Vendor updated successfully.", 
            vendor, 
            user 
        });

    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

// ✅ Delete Vendor
export const deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.vendorId);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }

        await Vendor.deleteOne({ _id: req.params.vendorId });
        res.status(200).json({ message: "Vendor deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};
