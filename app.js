import express from "express";
import  { config }  from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import { errorMiddleWare } from "./middleware/error.js";
import userRouter from "./routes/user.route.js"
import superVendor from "./routes/super-vendor.route.js"
import regionalVendor from "./routes/regional-vendor.route.js"
import cityVendor from "./routes/city-vendor.route.js"
import subVendor from "./routes/sub-vendor.route.js"

const app = express();

config({
    path: "./.env"
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/super-vendor", superVendor)
app.use("/api/v1/regional-vendor", regionalVendor)
app.use("/api/v1/city-vendor", cityVendor)
app.use("/api/v1/sub-vendor", subVendor)


// app.use("/api/v1/task", taskRouter)

app.use(errorMiddleWare)

export default app