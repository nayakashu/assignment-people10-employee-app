/**
 * employee.js -> Mongoose schema for "employees" collection
 */

/**
 * Setup Mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Age: Number,
    Gender: String,
    DOB: String
});

module.exports = mongoose.model('employee', EmployeeSchema, 'employees');