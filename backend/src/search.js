// @ts-check
const config         = require('config');
const path           = require('path');
const { URL, parse } = require('url');

const {
  getFilenamesOfSubdirs,
  getTimestamp
}                       = require('./files');
const { addTypes }      = require('./filetypes');
const { allTermsMatch } = require('./matcher');
const { flatten }       = require('./utils');

module.exports.search = search;

function search(searchTerms) {
  const filenamesOfSubdirs = getFilenamesOfSubdirs();

  const subdirMatches = Object.keys(filenamesOfSubdirs)
    .map(subdir => {
      return filenamesOfSubdirs[subdir]
        .filter(filename => allTermsMatch(filename, searchTerms))
        .map(filename => addMetaData(subdir, filename));
    });

  return addTypes(flatten(subdirMatches));
}

function addMetaData(subdir, filename) {
  return {
    filename,
    url:       toUrl(subdir, filename),
    timestamp: getTimestamp(subdir, filename),
    year:      subdir
  };
}

function toUrl(subdir, filename) {
  const { origin, pathname } = new URL(config.get('baseUrl'));
  const appendedPath = path.join(pathname, subdir, filename);
  return new URL(appendedPath, origin);
}
