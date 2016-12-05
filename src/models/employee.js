'use strict';
var company = require('./company');
var address = require('./address');

function Employee(json) {


    var _internalData = {
        firstName: '',
        lastName: '',
        userName: '',
        email: ''
    };
    if (json !== undefined) {
        _internalData.firstName = json.firstName || _internalData.firstName;
        _internalData.lastName = json.lastName || _internalData.lastName;
        _internalData.userName = json.userName || _internalData.userName;
        _internalData.email = json.email || _internalData.email;
    }



    //we encapsulate all properties so that we can add validations
    Object.defineProperty(this, 'firstName', {
        get: function () {
            return _internalData.firstName;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.firstName = value;
            } else {
                _internalData.firstName = '';
            }
        }
    });

    Object.defineProperty(this, 'lastName', {
        get: function () {
            return _internalData.lastName;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.lastName = value;
            } else {
                _internalData.lastName = '';
            }
        }
    });

    Object.defineProperty(this, 'fullName', {
        get: function () {
            return _internalData.firstName + ' ' + _internalData.lastName;
        }
    });
}

Employee.prototype.toJson = function () {
    return JSON.stringify(this._internalData, null, 2);
};

module.exports = Employee;