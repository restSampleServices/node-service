'use strict';

function Address(json) {


    var _internalData = {
        country: '',
        city: '',
        state: '',
        zipcode: '',
        street: '',
        street2: '',
        geo: {
            lat: '',
            lng: ''
        }
    };

    if (json !== undefined) {
        _internalData.country = json.country || _internalData.country;
        _internalData.city = json.city || _internalData.city;
        _internalData.state = json.state || _internalData.state;
        _internalData.zipcode = json.zipcode || _internalData.zipcode;
        _internalData.street = json.street || _internalData.street;
        _internalData.street2 = json.street2 || _internalData.street2;
        _internalData.geo = json.geo || _internalData.geo;
    }



    //we encapsulate all properties so that we can add validations
    Object.defineProperty(this, 'country', {
        enumerable: true,
        get: function () {
            return _internalData.country;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.country = value;
            } else {
                _internalData.country = '';
            }
        }
    });

    Object.defineProperty(this, 'city', {
        enumerable: true,
        get: function () {
            return _internalData.city;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.city = value;
            } else {
                _internalData.city = '';
            }
        }
    });

    Object.defineProperty(this, 'zipcode', {
        enumerable: true,
        get: function () {
            return _internalData.zipcode;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.zipcode = value;
            } else {
                _internalData.zipcode = '';
            }
        }
    });


    Object.defineProperty(this, 'street', {
        enumerable: true,
        get: function () {
            return _internalData.street;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.street = value;
            } else {
                _internalData.street = '';
            }
        }
    });

    Object.defineProperty(this, 'street2', {
        enumerable: true,
        get: function () {
            return _internalData.street2;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.street2 = value;
            } else {
                _internalData.street2 = '';
            }
        }
    });

    Object.defineProperty(this, 'geo', {
        enumerable: true,
        get: function () {
            return _internalData.geo;
        },
        set: function (value) {
            if (value !== undefined) {
                _internalData.geo = value;
            } else {
                _internalData.geo = '';
            }
        }
    });

}

module.exports = Address;
