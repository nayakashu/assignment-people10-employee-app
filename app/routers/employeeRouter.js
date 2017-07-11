/**
 * employeeRouter.js -> API Router for adding and searching a employee's details
 */

var express = require('express');

var routes = function(EmployeeModel) {
    var employeeRouter = express.Router();

    /**
     * Add a new Employee
     */
    employeeRouter.route('/addEmployee')

    .post(function(req, res) {
        var employee = new EmployeeModel({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Age: req.body.Age,
            Gender: req.body.Gender,
            DOB: req.body.DOB
        });
        
        employee.save(function(err) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.json({ msg: "Employee added successfully"});
            }
        });
    })

    .get(function(req, res) {
        res.json({ msg: "GET -> addEmployee"});
    });

    /**
     * Get all Employees
     */
    employeeRouter.route('/getEmployees')

    .get(function(req, res) {
        EmployeeModel.find(req.query, function(err, employees) {
            if(err) {
                res.status(500).send(err);
            } else {
                if(employees.length === 0) {
                    res.json({ msg: "No employees found!" });
                } else {
                    res.json(employees);
                }
            }
        });
    });

    /**
     * Search an employee by EmployeeID
     */
    employeeRouter.route('/searchEmployee/:EmployeeID')

    .get(function(req, res) {
        EmployeeModel.findById(req.params.EmployeeID, function(err, employee) {
            if(err) {
                res.status(500).send(err);
            } else {
                if(employee === null) {
                    res.json({ msg: "No employee found for this ID!" });
                } else {
                    res.json(employee);
                }
            }
        });
    });

    /**
     * Update an employee
     */
    employeeRouter.route('/updateEmployee/:EmployeeID')

    .put(function(req, res) {
        EmployeeModel.findById(req.params.EmployeeID, function(err, employee) {
            if(err) {
                res.status(500).send(err);
            } else {
                if(employee == null) {
                    res.json({ msg: "No employee found for this ID!" });
                    return;
                } else {
                    employee.FirstName = req.body.FirstName;
                    employee.LastName = req.body.LastName;
                    employee.Email = req.body.Email;
                    employee.Age = req.body.Age;
                    employee.Gender = req.body.Gender;
                    employee.DOB = req.body.DOB;

                    employee.save(function(err) {
                        if(err) {
                            res.status(500).send(err);
                        } else {
                            res.json({ msg: "Employee details updated successfully"});
                        }
                    });
                }
            }
        });
    });

    /**
     * Delete an employee
     */
    employeeRouter.route('/deleteEmployee/:EmployeeID')

    .delete(function(req, res) {
        EmployeeModel.findById(req.params.EmployeeID, function(err, employee) {
            if(err) {
                res.status(500).send(err);
            } else {
                if(employee == null) {
                    res.json({ msg: "No employee found for this ID!" });
                    return;
                } else {
                   EmployeeModel.remove({
                       _id: req.params.EmployeeID
                   }, function(err, employee) {
                        if(err) {
                            res.status(500).send(err);
                            return;
                        } else {
                            res.json({ msg: "Employee deleted successfully"});
                        }
                   });
                }
            }
        });
    });

    return employeeRouter;
};

module.exports = routes;