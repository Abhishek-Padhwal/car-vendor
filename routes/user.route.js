import express from "express"
import { login, logout, register } from "../controller/user.controller.js";
// import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/register",register)

router.post("/login",login)

router.get("/logout",logout)

// router.get("/me",isAuthenticated, getMyprofile)

export default router