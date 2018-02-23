// @ts-check
const config = require('config');
const fs     = require('fs');
const path   = require('path');

module.exports.initializeCache = initializeCache;
module.exports.getSubdirs      = getSubdirs;
module.exports.getTimestamp    = getTimestamp;
module.exports.listFiles       = listFiles;

let rootPath = null;
let subdirs  = null;

function initializeCache() {
  findRootPath();
  findSubdirs();
}

function findRootPath() {
  try {
    rootPath = config.get('rootPath');
    if (!isDirectory(rootPath)) {
      exitRootPathMissing(rootPath);
    }
  } catch (e) {
    exitRootPathMissing(rootPath);
  }
}

function findSubdirs() {
  subdirs = fs
    .readdirSync(rootPath)
    .filter(entry => isDirectory(path.join(rootPath, entry)));

  if (!subdirs || subdirs.length === 0) {
    exitNoSubdirs();
  }
}

function getSubdirs() {
  return subdirs;
}

function listFiles(subdir) {
  // TODO: this could be cached
  return fs.readdirSync(path.join(rootPath, subdir));
}

function isDirectory(pathname) {
  return fs.statSync(pathname).isDirectory();
}

function getTimestamp(subdir, filename) {
  const stats = fs.statSync(path.join(rootPath, subdir, filename));
  return stats.mtime;
}

function exitRootPathMissing(rootPath) {
  console.log(`The 'rootPath' config value has to point to a directory (value in config was '${rootPath}')`);
  process.exit(1);
}

function exitNoSubdirs() {
  console.log('No subdirs below rootPath found.');
  process.exit(1);
}
