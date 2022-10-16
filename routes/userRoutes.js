/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const express = require("express");
const routes = express.Router();

// http://localhost:8081/api/user/signup
routes.post("/signup", (req, res) => {
    res.send({message: "201 - Allow user to create new account"});
})

// http://localhost:8081/api/user/login
routes.post("/login", (req, res) => {
    res.send({message: "200 - Allow user to access the system"});
})

module.exports = routes;