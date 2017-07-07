employeeApp.controller('ListEmployeesController', ['$scope', 'APIService', function ($scope, APIService) {
    $scope.appName = 'People10 Employee Management App';
    
    /**
     * Get all Employees
     */
    APIService.getEmployees().then(function (response) {
        $scope.allEmployees = response;
    }, function (error) {
        $scope.errorMessage = JSON.stringify(error);
    });
}]);