# people10-employee-app

***********************************************************************************************************
# Employee Management app for People10 Assignment
***********************************************************************************************************

# For testing the back-end APIs (developed in ExpressJS), the following instructions can be followed.

** Need a API testing client like Postman or DHC **

There are five APIs.

1. For adding a new employee
 
Request: POST
Request URL: https://people10-employee-management.herokuapp.com/api/addEmployee
Request Body: 

{
	"FirstName": "X",
	"LastName": "Y",
	"Email": "x.y@people10.com",
	"Age": 999,
	"Gender": "Female",
	"DOB": "14/02/1901"
}

2. For getting the details of all employees

Request: GET
Request URL: https://people10-employee-management.herokuapp.com/api/getEmployees

3. For getting the employee details by searching with employee ID

Request: GET
Request URL: https://people10-employee-management.herokuapp.com/api/searchEmployee/595e823e236bd8314817f8af

4. For updating the selected employee details

Request: PUT
Request URL: https://people10-employee-management.herokuapp.com/api/updateEmployee/595e81e5236bd8314817f8ae

5. For deleting the selected employee details

Request: DELETE
Request URL: https://people10-employee-management.herokuapp.com/api/deleteEmployee/595e8a3cd7113f00049ebafa

***********************************************************************************************************

# Front-End has been created with HTML, CSS, Bootstrap (3.3.7) and Angular JS (1.6.5)

The front-end resources are located inside public folder which is configured as static middleware for express.

The front-end consists of the following.

1. A horizontal banner with the name of the app.
2. A horizontal searchbox to list and filter the names of the employees and to select the desired employee for edit / delete.
3. Pending - Add / Edit / Delete employee feature.
4. Pending - Buttons - Add, Del or Edit a player.
5. Pending - The Add, Del and Edit operations will happen through a modal dialog.
6. Pending - Form Validation with respective error messages has been implemented for Add / Edit forms.
7. Pending - Success and Error messages are dynamically shown in the modal dialog based on the user's operation.

***********************************************************************************************************

# Deployment

1. HerokuApps server has been used to deploy this app.
2. The app URL: https://people10-employee-management.herokuapp.com/
2. The HerokuApps server takes care of installing the dependent node and bower components.
3. npm is used as the package manager for the back-end - node, express, mongodb and mongoose.
4. bower is used as the package manager for the front-end - jQuery, bootstrap and angular.