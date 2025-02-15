import app from "./app.js";
import { connectDB } from "./config/connectDB.js";

connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server is working at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})