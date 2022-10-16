/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const express = require('express');
const app = express();
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/api/user/", userRoutes);
app.use("/api/emp/", employeeRoutes);

app.listen(8081, () => {
    console.log("Server is listening on port 8081: http://localhost:8081");
});