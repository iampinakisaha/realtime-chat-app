import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"
import authRouter from "./routes/index.js";

connectDB();
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter)


connectDB().then(() => {
  // if server is connected to database then run the server
  app.listen(port,()=>{
    console.log("Connected to DB...")
    console.log(`Server is running at http://localhost:${port}`)
  })
})

