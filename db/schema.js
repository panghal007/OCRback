import mongoose, { Schema } from "mongoose";

// Define the structure of the Info schema
const infoSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    identificationNumber: {
        type: String,
        // required: true, 
    },
    firstName: {
        type: String,
        // required: true, 
    },
    lastName: {
        type: String,
        // required: true, 
    },
    

    dateOfBirth: {
        type: String,
        // required: true, 
    },
    dateOfExpiry: {
        // type: [String], 
    },
    dateOfIssue: {
        type: String,
        // required: true,
    },
});

// Create and export the Info model based on the schema
export default mongoose.model("Info", infoSchema);
