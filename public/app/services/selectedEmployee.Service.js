employeeApp.service('SelectedEmployeeService', [function () {
    var selectedEmployee = null;

    this.setSelectedEmployee = function (employee) {
        selectedEmployee = employee;
    };

    this.getSelectedEmployee = function () {
        return selectedEmployee;
    };
}]);