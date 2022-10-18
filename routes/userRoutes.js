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
routes.post("/login",(req, res) => {
    // Validate request
    if(JSON.stringify(req.body) == "{}") {
        // Client side error
        return res.status(400).send({message: "Login can not be empty"});
    }

    // Authenticate user
    const userCredentials = {
        "username": req.body.username,
        "password": req.body.password
    };

    UserModel.find(userCredentials, (error, user) => {
        if (error) {
            // Server side error
            res.status(500).send({message: `Error while authenticating user: ${error}`});
        }

        if (user != "") {
            const successMessage = {
                "status": true,
                "username": userCredentials.username,
                "password": userCredentials.password
            };

            res.status(200).send(successMessage);
        } else {
            // Client side error
            const wrongCredentialsMessage = {
                "status": false,
                "message": "Invalid username and password."
            };

            res.status(400).send(wrongCredentialsMessage);
        }
    });
})

module.exports = routes;