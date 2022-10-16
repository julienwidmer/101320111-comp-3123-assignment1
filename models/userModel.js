/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const mongoose = require("mongoose");
const validator = require("validator");
const passwordValidator = require("password-validator");

// Password validation schema
const validatePassword = new passwordValidator();
validatePassword
    .has().lowercase(2)
    .has().uppercase(2)
    .has().symbols(2)
    .has().digits(2)
    .has().not().spaces()
    .is().min(12)

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
        maxLength: 50,
        validate: {
            validator: (password) => validatePassword.validate(password),
            message: (props) => {
                let message = `'${props.value}' is not meeting the requirements! `;
                message += "At least 2 lowercase and 2 uppercase letters, ";
                message += "2 symbols, 2 digits, no spaces and at least 12 characters.";
                return message;
            }
        }
    }
})

/* User JSON example:
{
    "username": "jacobie",
    "email": "j.ieschin@example.com",
    "password": "p4$5WOrd!*12"
}
*/

// Create mongodb schema
const user = mongoose.model("user", userSchema);
module.exports = user;