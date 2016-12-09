//Endpoints for the Employee Service
var exports = module.exports = {};

exports.apiRoot = '/';

exports.getAll = exports.apiRoot;
exports.byUserName = {};
exports.byUserName.root = exports.apiRoot + ':userName';
exports.byUserName.avatar = exports.byUserName.root + '/avatar';

exports.byUserName.jobHistory = {};
exports.byUserName.jobHistory.all = exports.byUserName.root + '/jobs';
exports.byUserName.jobHistory.byId = exports.byUserName.jobHistory.all + '/:jobId';
