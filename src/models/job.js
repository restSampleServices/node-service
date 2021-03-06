'use strict';

var Address = require('./address');

function Job(json) {


    var _internalData = {
        id: '',
        companyName: '',
        department: '',
        jobTitle: '',
        dateStart: '',
        dateEnd: '',
        address: undefined
    };

    this.merge = function (json) {
        if (json !== undefined) {
            _internalData.id = json.id || _internalData.id;

            _internalData.companyName = json.companyName || _internalData.companyName;
            _internalData.department = json.department || _internalData.department;
            _internalData.jobTitle = json.jobTitle || _internalData.jobTitle;
            _internalData.dateStart = json.dateStart || _internalData.dateStart;
            _internalData.dateEnd = json.dateEnd || _internalData.dateEnd;

            //check for an updated address or a new one
            if (json.address !== undefined) {
                if (json.address instanceof Address) {
                    _internalData.address = json.address;
                } else if (_internalData.address instanceof Address) {
                    _internalData.address.merge(json.address);
                } else {
                    _internalData.address = new Address(json.address);
                }
            }
        }
    };

    this.merge(json);


    //we encapsulate all properties so that we can add validations
    Object.defineProperty(this, 'id', {
        enumerable: true,
        get: function () {
            return _internalData.id;
        }
    });

    Object.defineProperty(this, 'companyName', {
        enumerable: true,
        get: function () {
            return _internalData.companyName;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.companyName = value;
            } else {
                _internalData.companyName = '';
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

    Object.defineProperty(this, 'dateStart', {
        enumerable: true,
        get: function () {
            return _internalData.dateStart;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.dateStart = value;
            } else {
                _internalData.dateStart = '';
            }
        }
    });

    Object.defineProperty(this, 'dateEnd', {
        enumerable: true,
        get: function () {
            return _internalData.dateEnd;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.dateEnd = value;
            } else {
                _internalData.dateEnd = '';
            }
        }
    });

    Object.defineProperty(this, 'address', {
        enumerable: true,
        get: function () {
            return _internalData.address;
        },
        set: function (value) {
            if (value instanceof Address) {
                _internalData.address = value;
            } else {
                throw new Error('invalid data type for address');
            }
        }
    });
}

//creates a list on job objects based on a job json
Job.createList = function (json) {
    if (Array.isArray(json) === false) {
        throw new Error('create list needs an array as input');
    }
    var jh = [];
    json.forEach(function (jobJson) {
        jh.push(new Job(jobJson));
    });
    return jh;
};

module.exports = Job;
