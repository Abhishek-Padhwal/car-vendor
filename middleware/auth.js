import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// ✅ Protect Routes Middleware
export const protect = async (req, res, next) => {
    try {
        // Read token from cookies or Authorization header
        let token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user and attach to req.user
        req.user = await User.findById(decoded._id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found, invalid token" });
        }

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ message: "Not authorized, invalid token" });
    }
};

// ✅ Role-Based Authorization Middleware
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized, user not found" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied, insufficient permissions" });
        }
        next();
    };
};
