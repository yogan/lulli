// @ts-check
const config = require('config');
const path   = require('path');

const {
  getMatchesInDir,
  getSubdirs,
  getTimestamp
}                  = require('./files');
const { addTypes } = require('./filetypes');
const { flatten }  = require('./utils');

module.exports.search = search;

function search(searchTerms) {
  const subdirs = getSubdirs();

  if (!subdirs || subdirs.length === 0) {
    console.warn('no subdirs found in rootPath');
    return [];
  }

  const subdirMatches = subdirs.map(subdir => {
    return getMatchesInDir(subdir, searchTerms)
      .map(filename => addMetaData(subdir, filename));
  });

  const matchesWithRelativePaths = flatten(subdirMatches);

  return addTypes(matchesWithRelativePaths);
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
  const baseUrl = config.get('baseUrl');
  return path.join(baseUrl, subdir, filename);
}
