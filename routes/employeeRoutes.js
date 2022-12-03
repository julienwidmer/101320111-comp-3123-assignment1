/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const express = require("express");
const routes = express.Router();
const EmployeeModel = require("../models/employeeModel");
const validator = require("validator");

function validateEmployeeModel(requestBody) {
    // Check for required values
    if (!requestBody.hasOwnProperty("first_name") ||
        requestBody.first_name.trim().length < 1 || requestBody.first_name.trim().length > 100) {
        // Client side error -> field empty or longer than 100 characters
        return "First name can't be empty or longer than 100 characters.";
    }

    if (!requestBody.hasOwnProperty("last_name") ||
        requestBody.last_name.trim().length < 1 || requestBody.last_name.trim().length > 50) {
        // Client side error -> field empty or longer than 50 characters
        return "Last name can't be empty or longer than 50 characters.";
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

    if (!requestBody.hasOwnProperty("gender") ||
        !["Male", "Female", "Other"].includes(requestBody.gender)) {
        // Client side error -> field empty or longer than 50 characters
        return "Gender can't be empty or different than 'Male', 'Female' or 'Other'.";
    }

    if (!requestBody.hasOwnProperty("salary") ||
        !(typeof requestBody.salary === "number") || requestBody.salary < 0) {
        // Client side error -> field empty or longer than 50 characters
        return "Salary can't be empty and should be a valid numerical value greater or equal to 0.";
    }

    return null
}

// http://localhost:8081/api/emp/employees
routes.get("/employees", async (req, res) => {
    // Retrieve all employees
    try {
        const employees = await EmployeeModel.find();

        if (employees != "") {
            res.status(200).send(employees);
        } else {
            // Client side error
            res.status(400).send({message: "No employees found."});
        }
    } catch (error) {
        // Server side error
        res.status(500).send({message: `Error while retrieving employees: ${error}`})
    }
})

// http://localhost:8081/api/emp/employees
routes.post("/employees", async (req, res) => {
    // Validate request
    if(JSON.stringify(req.body) == "{}") {
        // Client side error
        return res.status(400).send({message: "Employee content can't be empty"});
    }

    // Handle errors
    const errorMessage = validateEmployeeModel(req.body);
    if (errorMessage != null) { return res.status(400).send({message: errorMessage}); }

    // Create new Employee
    const newEmployee = new EmployeeModel(req.body);
    try {
        await newEmployee.save();
        res.status(201).send(newEmployee);
    } catch (error) {
        if (error.toString().includes("duplicate key error")) {
            // Client side error -> duplicate email address
            return res.status(400).send({message: "Email address must be unique."});
        } else {
            // Server side error
            return res.status(500).send({message: `Employee not created: ${error}`});
        }
    }
})

// http://localhost:8081/api/emp/employees/ObjectId
routes.get("/employees/:id", async (req, res) => {
    // Retrieve single Employee with ObjectId
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (employee) {
            res.status(200).send(employee);
        } else {
            // Client side error
            res.status(400).send({message: `No employee found with employeeId: ${req.params.id}`});
        }
    } catch (error) {
        // Server side error
        res.status(500).send(
            {message: `Error while retrieving employee with given employeeId "${req.params.id}": ${error}`}
        );
    }
})

// http://localhost:8081/api/emp/employees/ObjectId
routes.put("/employees/:eid", async (req, res) => {
    const employeeId = req.params.eid;

    // Validate request
    if(JSON.stringify(req.body) == "{}") {
        // Client side error
        return res.status(400).send({message: "Employee content can't be empty"});
    }

    // Handle errors
    const errorMessage = validateEmployeeModel(req.body);
    if (errorMessage != null) { return res.status(400).send({message: errorMessage}); }

    // Update Employee with employeeId
    try {
        await EmployeeModel.findByIdAndUpdate(employeeId, req.body);
        const updateEmployee = await EmployeeModel.findById(employeeId);

        if (updateEmployee) {
            res.status(200).send(updateEmployee);
        } else {
            // Client side error
            res.status(400).send({message: `No employee to update found with employeeId: ${req.params.noteId}`});
        }
    } catch (error) {
        if (error.toString().includes("duplicate key error")) {
            // Client side error -> duplicate email address
            return res.status(400).send({message: "Email address must be unique."});
        } else {
            // Server side error
            return res.status(500).send({message: `Employee not updated: ${error}`});
        }
    }
})

// http://localhost:8081/api/emp/employees?eid=ObjectId
routes.delete("/employees", async (req, res) => {
    const employeeId = req.query.eid;

    // Delete Employee with employeeId
    try {
        const employee = await EmployeeModel.findByIdAndRemove(employeeId);
        if (employee) {
            res.status(204).end();
        } else {
            // Client side error
            res.status(400).send({message: `No employee to remove with employeeId: ${employeeId}`});
        }
    } catch (error) {
        // Server side error
        res.status(500).send({message: `Error while removing note with given employeeId: ${error}`});
    }
})

module.exports = routes;