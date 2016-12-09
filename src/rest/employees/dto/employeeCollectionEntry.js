'use strict';

//this object is used when a collection of employees is returned, to reduce the transported data
function EmployeeCollectionEntry(employee) {
    //TODO check that employee is based on Employee Class
    var _employee = employee;
    Object.defineProperty(this, 'firstName', {
        enumerable: true,
        value: _employee.firstName
    });

    Object.defineProperty(this, 'lastName', {
        enumerable: true,
        value: _employee.lastName
    });

    Object.defineProperty(this, 'userName', {
        enumerable: true,
        value: _employee.userName
    });
}

module.exports = EmployeeCollectionEntry;
