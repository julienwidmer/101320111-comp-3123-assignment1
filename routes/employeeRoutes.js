/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const express = require("express");
const routes = express.Router();
const EmployeeModel = require("../models/employeeModel");

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
        return res.status(400).send({message: "Employee content can not be empty"});
    }

    // Create new Employee
    const newEmployee = new EmployeeModel(req.body);
    try {
        await newEmployee.save();
        res.status(201).send(newEmployee);
    } catch (error) {
        // Server side error
        res.status(500).send({message: `Error while inserting new employee: ${error}`});
    }
})

// http://localhost:8081/api/emp/employees/1
routes.get("/employees/:id", (req, res) => {
    res.send({message: "200 - User can get employee details by employee id"})
})

// http://localhost:8081/api/emp/employees/1
routes.put("/employees/:eid", (req, res) => {
    const employeeId = req.params.eid;
    res.send({message: "200 - User can update employee details"})
})

// http://localhost:8081/api/emp/employees?eid=1
routes.delete("/employees", (req, res) => {
    const employeeId = req.query.eid;
    res.send({message: "204 - User can delete employee by employee id"})
})

module.exports = routes;