/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const mongoose = require("mongoose");
const validator = require("validator");

// Define schema
const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        maxLength: 100,
        required: true
    },
    last_name: {
        type: String,
        maxLength: 50,
        required: true
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
    gender: {
        type: String,
        maxLength: 25,
        enum: ["Male", "Female", "Other"]
    },
    salary: {
        type: Number,
        required: true
    }
})

/* Employee JSON example:
{
    "first_name": "Max",
    "last_name": "LaMenace",
    "email": "m.lamenace@company.com",
    "gender": "Other",
    "salary": 125500.00
}
*/

// Create mongodb schema
const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;