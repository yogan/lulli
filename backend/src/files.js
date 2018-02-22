// @ts-check
const config = require('config');
const fs     = require('fs');
const path   = require('path');

const { allTermsMatch } = require('./matcher');

module.exports.tryGetRootPath  = tryGetRootPath;
module.exports.getMatchesInDir = getMatchesInDir;
module.exports.getSubdirs      = getSubdirs;
module.exports.getTimestamp    = getTimestamp;

let rootPath = null;

function tryGetRootPath() {
  try {
    rootPath = config.get('rootPath');
    if(!isDirectory(rootPath)) {
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

function getTimestamp(subdir, filename) {
  const stats = fs.statSync(path.join(rootPath, subdir, filename));
  return stats.mtime;
}

function getSubdirs() {
  return fs
    .readdirSync(rootPath)
    .filter(entry => isDirectory(path.join(rootPath, entry)));
}

// TODO split this, allTermsMatch should be used in search.js
function getMatchesInDir(subdir, searchTerms) {
  return fs
    .readdirSync(path.join(rootPath, subdir))
    .filter(filename => allTermsMatch(filename, searchTerms));
}

function isDirectory(pathname) {
  return fs.statSync(pathname).isDirectory();
}
