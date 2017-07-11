employeeApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/list-employees.Partial.html'
    })
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
}]);