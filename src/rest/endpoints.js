var exports = module.exports = {};

exports.apiRoot = '/';

exports.employees = {};
exports.employees.root = exports.apiRoot + 'employees/';
exports.employees.byId = exports.employees.root + '{0}/';