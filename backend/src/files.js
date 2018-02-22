// @ts-check
const config = require('config');
const fs     = require('fs');
const path   = require('path');


module.exports.tryGetRootPath = tryGetRootPath;
module.exports.getSubdirs     = getSubdirs;
module.exports.getTimestamp   = getTimestamp;
module.exports.listFiles      = listFiles;

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

function listFiles(subdir) {
  return fs.readdirSync(path.join(rootPath, subdir));
}

function isDirectory(pathname) {
  return fs.statSync(pathname).isDirectory();
}
