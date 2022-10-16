/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const mongoose = require("mongoose");

// Define schema
const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        maxLength: 100,
        required: true
    },
    last_name: {
        type: String,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        maxLength: 50,
        unique: true
    },
    gender: {
        type: String,
        maxLength: 25,
        enum: ["Male", "Female", "Other"]
    },
    salary: {
        type: Number,
        required: true
    }
})

// Create mongodb schema
const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;