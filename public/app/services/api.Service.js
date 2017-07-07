employeeApp.service('APIService', ['$http', '$location', '$q', function ($http, $location, $q) {
    var deferred = $q.defer();

    var apiBaseURL = $location.$$absUrl + 'api/';

    this.getEmployees = function () {
        var getEmployeesURL = apiBaseURL + 'getEmployees/';
        $http.get(getEmployeesURL).then(function (response) {
            deferred.resolve(response.data);
        }, function (response, status, headers, config) {
            deferred.reject('Error: Request returned status: ' + status);
        });

        return deferred.promise;
    };
}]);