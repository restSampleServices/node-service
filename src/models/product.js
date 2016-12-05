'use strict';
var Build = require('./build');

function Product(name, builds) {
    this.name = name;
    if (Array.isArray(builds)) {
        this.builds = builds;
    } else {
        this.builds = [];
    }
}

module.exports = Product;
