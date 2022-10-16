/*
Course Code:    COMP3123
Assignment:     1
Student Name:   Julien Widmer
Student ID:     101320111
*/
const express = require("express");
const routes = express.Router();

// http://localhost:8081/api/emp/employees
routes.get("/employees", (req, res) => {
    res.send({message: "200 - User can get all employee list"})
})

// http://localhost:8081/api/emp/employees
routes.post("/employees", (req, res) => {
    res.send({message: "201 - User can create new employee"})
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

// http://localhost:8081/api/emp/employees?eid=5
routes.delete("/employees", (req, res) => {
    const employeeId = req.query.eid;
    res.send({message: "204 - User can delete employee by employee id"})
})

module.exports = routes;