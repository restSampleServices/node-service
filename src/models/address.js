'use strict';

var Artefact = require('./artefact');

//the build model
function Build(nummer, comment, scmId, timestamp, artefacts) {
    this.nummer = nummer;
    this.comment = comment;
    this.timestamp = timestamp || Date.now().toString();
    this.scmId = scmId;
}

Build.prototype.addArtefact = function (artefact) {
    if (!(artefact instanceof Artefact)) throw new Error('paramater artefact is not an instance of Artefact');
    if (!this.artefacts) this.artefacts = [];
    this.artefacts.push(artefact);
};
module.exports = Build;
