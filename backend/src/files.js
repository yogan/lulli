const config          = require('config');
const fs              = require('fs');
const path            = require('path');

const {addTypes}      = require('./filetypes');
const {allTermsMatch} = require('./matcher');

module.exports.search         = search;
module.exports.tryGetRootPath = tryGetRootPath;

let rootPath = null;

function tryGetRootPath() {
  try {
    rootPath = config.get('rootPath');
    const isDir = fs.statSync(rootPath).isDirectory();
    if (!isDir) {
      exitRootPathMissing(rootPath);
    }
  } catch(e) {
    exitRootPathMissing(rootPath);
  }
}

function exitRootPathMissing(rootPath) {
  console.log(`The 'rootPath' config value has to point to a directory (value in config was '${rootPath}')`);
  process.exit(1);
}

function search(searchTerms) {
  const subdirs = getSubdirs();

  if (!subdirs || subdirs.length === 0) {
    console.warn(`no subdirs found in rootPath '${rootPath}'`);
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

function getTimestamp(subdir, filename) {
  const stats = fs.statSync(path.join(rootPath, subdir, filename));
  return stats.mtime;
}

function getSubdirs() {
  return fs
    .readdirSync(rootPath)
    .filter(entry => fs.statSync(path.join(rootPath, entry)).isDirectory());
}

function getMatchesInDir(subdir, searchTerms) {
  return fs
    .readdirSync(path.join(rootPath, subdir))
    .filter(filename => allTermsMatch(filename, searchTerms));
}

function flatten(array) {
  return [].concat(...array);
}
