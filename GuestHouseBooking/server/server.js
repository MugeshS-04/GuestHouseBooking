const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const path = require("path")

const dotenv = require("dotenv");
const connectDB = require("./db")
const roomrouter = require("./Routes/RoomRoutes")
const userrouter = require("./Routes/UsersRouters")
const bookingrouter = require('./Routes/BookingsRoutes')
const FeedbackRoute = require('./Routes/FeedbackRoute')
const contactrouter = require('./Routes/ContactRouter')

dotenv.config();
const app = express()
connectDB();
app.use(express.json())
app.use(cors());

app.use("/api/rooms", roomrouter)
app.use("/api/users", userrouter)
app.use("/api/bookings", bookingrouter)
app.use("/api/feedback", FeedbackRoute)
app.use("/api/contact", contactrouter)


app.listen(process.env.PORT, function () {
  console.log("Server running at 5000")
})
