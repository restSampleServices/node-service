var exports = module.exports = {};

exports.apiRoot = '/';

/* endpoints for service employees */
exports.employees = {};
exports.employees.service = [exports.apiRoot + 'employees'];
exports.employees.get = '/';
exports.employees.getByUsername = '/{0}/';

exports = {
    apiRoot: '/',
    employees: {
        service: '/employees',
        get_create: '/',
        getByUserName_update: '/{0}/'
    }
}
