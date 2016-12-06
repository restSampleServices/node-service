'use strict';
var Job = require('./job');
var Address = require('./address');

function Employee(json) {


    var _internalData = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        jobTitle: '',
        department: '',
        imageUrl: undefined,
        phone: '',
        dateOfBirth: undefined,
        address: undefined,
        jobHistory: []
    };

    if (json !== undefined) {
        _internalData.firstName = json.firstName || _internalData.firstName;
        _internalData.lastName = json.lastName || _internalData.lastName;
        _internalData.userName = _internalData.firstName.substring(0, 1) + _internalData.lastName;
        _internalData.email = _internalData.firstName + '.' + _internalData.lastName + '@samplecompany.com';
        _internalData.jobTitle = json.jobTitle || _internalData.jobTitle;
        _internalData.department = json.department || _internalData.department;
        _internalData.imageUrl = json.imageUrl || _internalData.imageUrl;
        _internalData.phone = json.phone || _internalData.phone;
        _internalData.dateOfBirth = json.dateOfBirth || _internalData.dateOfBirth;
        if (json.address !== undefined) {
            _internalData.address = new Address(json.address);
        }

        if (json.jobHistory !== undefined) {
            _internalData.jobHistory = Job.createList(json.jobHistory);
        }
    }



    //we encapsulate all properties so that we can add validations
    Object.defineProperty(this, 'firstName', {
        enumerable: true,
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
        enumerable: true,
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
        enumerable: true,
        get: function () {
            return _internalData.firstName + ' ' + _internalData.lastName;
        }
    });

    Object.defineProperty(this, 'dateOfBirth', {
        enumerable: true,
        get: function () {
            return _internalData.dateOfBirth;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.dateOfBirth = value;
            } else {
                _internalData.dateOfBirth = '';
            }
        }
    });

    Object.defineProperty(this, 'email', {
        enumerable: true,
        get: function () {
            return _internalData.email;
        },
        set: function (value) {
            if (value !== undefined) {
                //TODO validate at sign etc
                _internalData.email = value;
            } else {
                _internalData.email = '';
            }
        }
    });

    Object.defineProperty(this, 'phone', {
        enumerable: true,
        get: function () {
            return _internalData.phone;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.phone = value;
            } else {
                _internalData.phone = '';
            }
        }
    });

    Object.defineProperty(this, 'userName', {
        enumerable: true,
        get: function () {
            return _internalData.userName;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.userName = value;
            } else {
                _internalData.userName = '';
            }
        }
    });

    Object.defineProperty(this, 'address', {
        enumerable: true,
        get: function () {
            return _internalData.address;
        },
        set: function (value) {
            if (true) {
                //TODO check for typeof Address
                _internalData.address = value;
            } else {
                throw new Error('invalid data type for address');
            }
        }
    });

    Object.defineProperty(this, 'imageUrl', {
        enumerable: true,
        get: function () {
            return _internalData.imageUrl;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.imageUrl = value;
            } else {
                _internalData.imageUrl = '';
            }
        }
    });


    Object.defineProperty(this, 'department', {
        enumerable: true,
        get: function () {
            return _internalData.department;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.department = value;
            } else {
                _internalData.department = '';
            }
        }
    });

    Object.defineProperty(this, 'jobTitle', {
        enumerable: true,
        get: function () {
            return _internalData.jobTitle;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.jobTitle = value;
            } else {
                _internalData.jobTitle = '';
            }
        }
    });

    Object.defineProperty(this, 'jobHistory', {
        enumerable: true,
        get: function () {
            return _internalData.jobHistory;
        }
    });

}

module.exports = Employee;
