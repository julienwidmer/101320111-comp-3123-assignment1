/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const mongoose = require("mongoose");
const validator = require("validator");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");

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
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: 100,
        unique: true
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

UserSchema.pre("save", function (next) {
    if (this.isModified("password") || this.isNew) {
        // Generate password salt
        bcrypt.genSalt(10, (error, salt) => {
            if (error) {
                return next(error);
            } else {
                // Hash password
                bcrypt.hash(this.password, salt, (error, hash) => {
                    if (error) { return error; }

                    // Save hash
                    this.password = hash
                    return next();
                });
            }
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (plainTextPassword, callback) {
    bcrypt.compare(plainTextPassword, this.password, (error, isMatch) => {
        if (error) {
            return callback(error);
        } else {
            callback(null, isMatch);
        }
    })
}

// Create mongodb schema
const user = mongoose.model("user", UserSchema);
module.exports = user;