import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import addUniqueKeyToHotel from './migrations/addUniqueKeyToHotel.js';
import removeImgFromUser from './migrations/removeImgFromUser.js';
import addFkToRooms from './migrations/addFkToRooms.js';
import addIsActiveToUsers from "./migrations/addIsActiveToUsers.js";
import addRestrictionToRating from "./migrations/addRestrictionToRating.js";
//import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
        addUniqueKeyToHotel();
        removeImgFromUser();
        addFkToRooms()
        addIsActiveToUsers();
        addRestrictionToRating();
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});


//app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
});