/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const mongoose = require("mongoose");
const validator = require("validator");

// Define schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: 100
    },
    email: {
        type: String,
        maxLength: 50,
        unique: true,
        validate: {
            validator: (email) => validator.isEmail(email),
            message: (props) => `'${props.value}' is not a valid email address!`
        }
    },
    password: {
        type: String,
        maxLength: 50
    }
})

/* User JSON example:
{
    "username": "jacobie",
    "email": "j.ieschin@gmail.com",
    "password": "1324"
}
*/

// Create mongodb schema
const user = mongoose.model("user", userSchema);
module.exports = user;