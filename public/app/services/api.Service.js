employeeApp.service('APIService', ['$http', '$location', '$q', function ($http, $location, $q) {
    var apiBaseURL = $location.$$absUrl + 'api/';

    this.getEmployees = function () {
        var deferred = $q.defer();
        var getEmployeesURL = apiBaseURL + 'getEmployees/';
        $http.get(getEmployeesURL).then(function (response) {
            if(response.status == 200) {
                deferred.resolve(response.data);
            } else {
                console.log('Get Employees API response status: ' + JSON.stringify(status) + ' and message: ' + JSON.stringify(response.data));
                deferred.reject('Error: Request returned status: ' + status);
            }
        }, function (response, status, headers, config) {
            deferred.reject('Error: Request returned status: ' + status);
        });

        return deferred.promise;
    };

    this.addEmployee = function (employeeData) {
        var deferred = $q.defer();
        var addEmployeeURL = apiBaseURL + 'addEmployee/';
        $http.post(addEmployeeURL, employeeData).then(function (response, status) {
            if(response.status == 200) {
                deferred.resolve(response.data);
            } else {
                console.log('Add Employee API response status: ' + JSON.stringify(status) + ' and message: ' + JSON.stringify(response.data));
                deferred.reject('Error: Request returned status: ' + status);
            }
        }, function (response, status, headers, config) {
            deferred.reject('Error: Request returned status: ' + status);
        });

        return deferred.promise;
    };

    this.updateEmployee = function (employeeData, employeeID) {
        var deferred = $q.defer();
        var updateEmployeeURL = apiBaseURL + 'updateEmployee/';
        $http.put(updateEmployeeURL + employeeID, employeeData).then(function (response, status) {
            if(response.status == 200) {
                deferred.resolve(response.data);
            } else {
                console.log('Update Employee API response status: ' + JSON.stringify(status) + ' and message: ' + JSON.stringify(response.data));
                deferred.reject('Error: Request returned status: ' + status);
            }        
        }, function (response, status, headers, config) {
            deferred.reject('Error: Request returned status: ' + status);
        });

        return deferred.promise;
    };

    this.deleteEmployee = function (employeeID) {
        var deferred = $q.defer();
        var deleteEmployeeURL = apiBaseURL + 'deleteEmployee/';
        $http.delete(deleteEmployeeURL + employeeID).then(function (response, status) {
            if(response.status == 200) {
                deferred.resolve(response.data);
            } else {
                console.log('Delete Employee API response status: ' + JSON.stringify(status) + ' and message: ' + JSON.stringify(response.data));
                deferred.reject('Error: Request returned status: ' + status);
            }        
        }, function (response, status, headers, config) {
            deferred.reject('Error: Request returned status: ' + status);
        });

        return deferred.promise;
    };
}]);