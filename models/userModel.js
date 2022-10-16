/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const mongoose = require("mongoose");

// Define schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: 100
    },
    email: {
        type: String,
        maxLength: 50,
        unique: true
    },
    password: {
        type: String,
        maxLength: 50
    }
})

// Create mongodb schema
const user = mongoose.model("user", userSchema);
module.exports = user;