// @ts-check
const config = require('config');
const fs     = require('fs');
const path   = require('path');

module.exports = {
  initializeCache,
  getFilenamesOfSubdirs,
  getTimestamp
};

let rootPath = null;
let subdirs  = null;
let filenameCache = {};

function initializeCache() {
  findRootPath();
  findSubdirs();

  populateFilenameCache();

  watchRootdirForChanges();
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
    console.log('WARNING - no subdirs found in rootPath, searching will never yield any results!');
    subdirs = [];
  }

  console.log('updated subdirs to: ', subdirs);
}

function getSubdirs() {
  return subdirs;
}

function populateFilenameCache() {
  subdirs.forEach(subdir => {
    filenameCache[subdir] = listFiles(subdir);
  });
}

function getFilenamesOfSubdirs() {
  return filenameCache;
}

function watchRootdirForChanges() {
  fs.watch(rootPath, {}, () => findSubdirs());
}

function listFiles(subdir) {
  return fs.readdirSync(path.join(rootPath, subdir));
}

function isDirectory(pathname) {
  try {
    return fs.statSync(pathname).isDirectory();
  } catch (e) {
    // This catch block addresses a race condition:
    // between reading the rootPath for subdirs, and passing the entries
    // to this function, the entry might vanish. In this case, 'false' is
    // actually the right result.
    return false;
  }
}

function getTimestamp(subdir, filename) {
  const stats = fs.statSync(path.join(rootPath, subdir, filename));
  return stats.mtime;
}

function exitRootPathMissing(rootPath) {
  console.log(`The 'rootPath' config value has to point to a directory (value in config was '${rootPath}')`);
  process.exit(1);
}
