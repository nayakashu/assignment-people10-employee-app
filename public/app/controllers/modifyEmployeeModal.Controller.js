employeeApp.controller('ModifyEmployeeModalController', ['$scope', '$location', '$rootScope', 'APIService', 'SelectedEmployeeService', function ($scope, $location, $rootScope, APIService, SelectedEmployeeService) {
    /**
    * For setting the Modal values based on Add / Edit
    */
    var setModalValues = function () {
        var now;
        if($rootScope.addEmployeeFlag == true) {
            $scope.addOrEdit = 'Add ';
            $scope.firstName = '';
            $scope.lastName = '';
            $scope.emailAddress = '';
            now = new Date();
            $scope.maxDate = new Date(
                now.getFullYear() - 1,
                now.getMonth(),
                now.getDate()
            );
            $scope.dob = $scope.maxDate;
            $scope.setAge();
            $scope.gender = 'Male';
        }

        if($rootScope.editEmployeeFlag == true) {
            $scope.addOrEdit = 'Edit ';
            var employee = SelectedEmployeeService.getSelectedEmployee();
            $scope.employeeID = employee._id;
            $scope.firstName = employee.FirstName;
            $scope.lastName = employee.LastName;
            $scope.emailAddress = employee.Email;
            now = new Date();
            $scope.maxDate = new Date(
                now.getFullYear() - 1,
                now.getMonth(),
                now.getDate()
            );
            $scope.dob = new Date(employee.DOB);
            $scope.setAge();
            $scope.gender = employee.Gender;
        }

        if($rootScope.deleteEmployeeFlag == true) {
            $scope.employeeToBeDeleted = SelectedEmployeeService.getSelectedEmployee();
        }
    };

    /**
     * Event listeners for events broadcasted by parent controllers
     */

    /**
     * For AddEmployee Event
     */
    $scope.$on('addEmployeeEvent', function(event) {
        // handle event only if it was not defaultPrevented
        if(event.defaultPrevented) {
            return;
        }

        setModalValues();

        // Set 'defaultPrevented' to true so that further child scopes need not handle this event
        event.preventDefault();
    });

    /**
     * For Edit Employee Event
     */
    $scope.$on('editEmployeeEvent', function(event) {
        // handle event only if it was not defaultPrevented
        if(event.defaultPrevented) {
            return;
        }

        setModalValues();

        // Set 'defaultPrevented' to true so that further child scopes need not handle this event
        event.preventDefault();
    });

    /**
     * For Delete Employee Event
     */
    $scope.$on('deleteEmployeeEvent', function(event) {
        // handle event only if it was not defaultPrevented
        if(event.defaultPrevented) {
            return;
        }

        setModalValues();

        // Set 'defaultPrevented' to true so that further child scopes need not handle this event
        event.preventDefault();
    });

    /**
     * Get age according to the DOB selection
     */
    $scope.setAge = function () {
        var now = moment().valueOf();
        $scope.age = moment(now).diff(moment($scope.dob), 'years');
    };

    /**
     * Add / Edit Employee details
     */
    $scope.saveEmployeeData = function () {
        /**
         * Reset notification messages
         */
        $scope.successMessage = '';
        $scope.errorMessage = '';
        
        /**
         * Form Validation
         */
        if ($scope.firstName.length == 0) {
            $scope.errorMessage = 'Please provide first name.';
            return;
        }

        if ($scope.lastName.length == 0) {
            $scope.errorMessage = 'Please provide last name.';
            return;
        }

        if (typeof $scope.emailAddress == typeof undefined) {
            $scope.errorMessage = 'Email address is invalid.';
            return;
        }

        if (!(moment(moment($scope.dob).format('MM/DD/YYYY')).isValid())) {
            $scope.errorMessage = 'DOB is invalid.';
            return;
        }

        if (!$scope.age || !Number.isInteger($scope.age) || $scope.age <= 0) {
            $scope.errorMessage = 'Age is invalid.';
            return;
        }

        if($scope.age > 0 && $scope.age < 18) {
            $scope.errorMessage = 'Employee must be at least 18 years old.';
            return;
        }

        /**
         * Get data for the employee to be added / edited
         */
        var employeeData = {
            FirstName: $scope.firstName,
            LastName: $scope.lastName,
            Email: $scope.emailAddress,
            Age: $scope.age,
            Gender: $scope.gender,
            DOB: moment($scope.dob).format('MM/DD/YYYY')
        };

        if ($rootScope.addEmployeeFlag == true) {
            APIService.addEmployee(employeeData).then(function (response) {
                $scope.successMessage = "New Employee Added!";
                $scope.employeeSaved = true;
            }, function (error) {
                $scope.errorMessage = JSON.stringify(error);
            });
        }

        if ($rootScope.editEmployeeFlag == true) {
            APIService.updateEmployee(employeeData, $scope.employeeID).then(function (response) {
                $scope.successMessage = "Employee details updated!";
            }, function (error) {
                $scope.errorMessage = JSON.stringify(error);
            });
        }
    };

    /**
     * Delete Employee
     */
    $scope.deleteEmployeeData = function () {
        /**
         * Reset notification messages
         */
        $scope.successMessage = '';
        $scope.errorMessage = '';

        APIService.deleteEmployee($scope.employeeToBeDeleted._id).then(function (response) {
            $scope.successMessage = "Employee deleted!";
            $scope.employeeDeleted = true;
        }, function (error) {
            $scope.errorMessage = JSON.stringify(error);
        });
    };

    /**
     * Handle closeModal event
     */
    $scope.closeModal = function () {
        $scope.successMessage = '';
        $scope.errorMessage = '';
        $scope.employeeSaved = false;
        $rootScope.addEmployeeFlag = false;
        $rootScope.editEmployeeFlag = false;
        $rootScope.deleteEmployeeFlag = false;
        $scope.employeeDeleted = false;
        $scope.$emit('updateEmployeeList');
    };
}]);