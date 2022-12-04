/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const express = require("express");
const routes = express.Router();
const UserModel = require("../models/userModel");
const validator = require("validator");

function validateUserModel(requestBody) {
    // Check for required values
    if (!requestBody.hasOwnProperty("username") ||
        requestBody.username.trim().length < 1 || requestBody.username.trim().length > 100) {
        // Client side error -> field empty or longer than 100 characters
        return "Username can't be empty or longer than 100 characters.";
    }

    if (!requestBody.hasOwnProperty("email") ||
        requestBody.email.trim().length < 1 || requestBody.email.trim().length > 50) {
        // Client side error -> field empty or longer than 50 characters
        return "Email address can't be empty or longer than 50 characters.";
    }

    if (!validator.isEmail(requestBody.email)) {
        // Client side error -> invalid email address format
        return "Email address must be valid.";
    }

    return null
}

// http://localhost:8081/api/user/signup
routes.post("/signup", async (req, res) => {
    // Validate request
    if(JSON.stringify(req.body) == "{}") {
        // Client side error
        return res.status(400).send({message: "User content can not be empty"});
    }

    // Handle errors
    const errorMessage = validateUserModel(req.body);
    if (errorMessage != null) { return res.status(400).send({message: errorMessage}); }

    // Create new User
    const newUser = new UserModel(req.body);
    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        if (error.toString().includes("duplicate key error")) {
            // Client side error -> username must be unique
            return res.status(400).send({message: "Username or email is already in use."});
        } else {
            // Server side error
            return res.status(500).send({message: `User not created: ${error}`});
        }
    }
})

// http://localhost:8081/api/user/login
routes.post("/login", (req, res) => {
    // Validate request
    if(JSON.stringify(req.body) == "{}") {
        // Client side error
        return res.status(400).send({message: "Login can not be empty"});
    }

    // Authenticate user
    const login = req.body;
    UserModel.findOne({"username": login.username}, (error, user) => {
        if (error) {
            // Server side error
            res.status(500).send({message: `Error while authenticating user: ${error}`});
        }


        const wrongCredentialsMessage = {
            "status": false,
            "message": "Invalid username and password."
        };

        if (user == null) {
            // Client side error - wrong username
            res.status(400).send(wrongCredentialsMessage);
        } else {
            user.comparePassword(login.password, (error, isMatch) => {
                if (error) {
                    // Server side error
                    res.status(500).send({message: `Error while authenticating user: ${error}`});
                }

                if (isMatch) {
                    const successMessage = {
                        "status": true,
                        "username": login.username,
                        "message": "User logged in successfully"
                    };

                    res.status(200).send(successMessage);
                } else {
                    // Client side error - wrong password
                    res.status(400).send(wrongCredentialsMessage);
                }
            })
        }
    });
})

module.exports = routes;