// @ts-check
const path = require('path');

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
    path:      path.join(subdir, filename),
    timestamp: getTimestamp(subdir, filename),
    year:      subdir
  };
}
