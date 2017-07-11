employeeApp.config(['$mdDateLocaleProvider', function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {
        if(date) {
            return moment(date).format('Do MMMM, YYYY');
        } else {
            return;
        }
    };
}]);