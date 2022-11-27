/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
// Modules
const express = require('express');
const mongoose = require("mongoose");


// Database connection
const DB_NAME = "comp3123_assigment1";
const DB_USER = "admin";
const DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.adpukiy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if (error) throw error;
    console.log("Successfully connected to MongoDB");
});


// Server config
const SERVER_PORT = 8081;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routing config
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/user/", userRoutes);
app.use("/api/emp/", employeeRoutes);

app.listen(SERVER_PORT, () => {
    console.log(`Server listening at: http://localhost:${SERVER_PORT}`);
});