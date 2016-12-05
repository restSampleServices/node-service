'use strict';

function Artefact(filename, url, sha1, note) {
    this.filename = filename;
    this.url = url;
    this.sha1 = sha1;
    this.note = note;
}

module.exports = Artefact;
