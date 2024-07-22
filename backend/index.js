import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"
import authRouter from "./routes/AuthRoutes.js";
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from "body-parser";
import contactsRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";
connectDB();
const app = express();
const port = process.env.PORT || 3001;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);
app.use(bodyParser.json());

connectDB().then(() => {
  console.log("Connecting to Database...")
  // if server is connected to database then run the server
  const server = app.listen(port,()=>{
    console.log("Connected to Database")
    console.log(`Server is running at http://localhost:${port}`)
  })

  //call setupSocket function and pass the server
  setupSocket(server)
})


