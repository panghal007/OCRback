// Import required packages and modules
import express from "express";
const app = express();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import usersRoute from "./route/Users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import Info from "./db/schema.js";
import { ocrData } from "./ocr.js";

// Set up environment variables
dotenv.config();

// Configure Express app
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'))

// Use the users route for handling user-related requests
app.use("/api/users", usersRoute);

// MongoDB connection parameters
const connectionParams = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
};

// Connect to MongoDB database
const db = "mongodb+srv://panghalunique:0fNohS9eJwnBIKgH@cluster0.qq0vmbe.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db, connectionParams)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// Handle MongoDB disconnection
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from the database");
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({
  storage,
});

// Handle file uploads and OCR data extraction
app.post("/upload", upload.single("file"), async (req, res) => {
  const path = req.file.destination + "/" + req.file.filename;
  console.log(path);
  const data = await ocrData(path);
  Info.create({
    image: req.file.filename,
    identificationNumber: data.identificationNumber,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    dateOfExpiry: data.dateOfExpiry,
    dateOfIssue: data.dateOfIssue
  })
    .then(result => res.json(result))
    .catch(err => { console.log(err) });
});

// Default route handler
app.use("/", (req, res) => {
  return res.send("OCR-App backend");
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
