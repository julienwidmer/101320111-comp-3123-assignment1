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
        return res.status(400).send({message: "Employee content can not be empty"});
    }

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
        res.status(500).send(
            // Server side error
            {message: `Error while updating employee with given employeeId "${employeeId}": ${error}`}
        );
    }
})

// http://localhost:8081/api/emp/employees?eid=ObjectId
routes.delete("/employees", async (req, res) => {
    const employeeId = req.query.eid;

    // Delete Employee with employeeId
    try {
        const employee = await EmployeeModel.findByIdAndRemove(employeeId);
        if (employee) {
            res.status(204);
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