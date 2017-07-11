employeeApp.controller('ListEmployeesController', ['$scope', '$rootScope', 'APIService', 'SelectedEmployeeService', function ($scope, $rootScope, APIService, SelectedEmployeeService) {
    /**
     * Initialize
     */
    $rootScope.addEmployeeFlag = false;
    $rootScope.editEmployeeFlag = false;
    
    /**
     * Event Listeners for events emitted by child controllers
     */
    $scope.$on('updateEmployeeList', function (event) {
        // handle event only if it was not defaultPrevented
        if(event.defaultPrevented) {
            return;
        }

        $scope.initializeDetailsPane();

        // stop the propagation of this event to further parent scopes
        event.stopPropagation();
    });
    
    /**
     * Get all Employees
     */
    $scope.initializeDetailsPane = function () {
        APIService.getEmployees().then(function (response) {
            $scope.allEmployees = response;
        }, function (error) {
            $scope.errorMessage = JSON.stringify(error);
        });
    };

    /**
     * Format employee DOB for the view
     */
    $scope.getFormattedDOB = function (dob) {
        return moment(dob).format('Do MMMM, YYYY');
    };

    /**
     * Set Add Employee Data
     */
    $scope.addEmployee = function () {
        $rootScope.addEmployeeFlag = true;
        $scope.$broadcast('addEmployeeEvent');
    };

    /**
     * Edit Employee Data
     */
    $scope.editEmployee = function (employee) {
        SelectedEmployeeService.setSelectedEmployee(employee);
        $rootScope.editEmployeeFlag = true;
        $scope.$broadcast('editEmployeeEvent');
    };

    /**
     * Delete Employee Data
     */
    $scope.deleteEmployee = function (employee) {
        SelectedEmployeeService.setSelectedEmployee(employee);
        $rootScope.deleteEmployeeFlag = true;
        $scope.$broadcast('deleteEmployeeEvent');
    };
}]);