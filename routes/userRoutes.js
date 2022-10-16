/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const express = require("express");
const routes = express.Router();
const UserModel = require("../models/userModel");

// http://localhost:8081/api/user/signup
routes.post("/signup", async (req, res) => {
    // Validate request
    if(JSON.stringify(req.body) == "{}") {
        // Client side error
        return res.status(400).send({message: "User content can not be empty"});
    }

    // Create new User
    const newUser = new UserModel(req.body);
    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        // Server side error
        res.status(500).send({message: `Error while inserting new user: ${error}`});
    }
})

// http://localhost:8081/api/user/login
routes.post("/login", (req, res) => {
    res.send({message: "200 - Allow user to access the system"});
})

module.exports = routes;