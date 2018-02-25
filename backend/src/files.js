// @ts-check
const config = require('config');
const fs     = require('fs');
const path   = require('path');

const { arraysAreEqual } = require('./utils');

module.exports = {
  initializeCache,
  getFilenamesOfSubdirs,
  getTimestamp
};

let rootPath       = undefined;
let subdirs        = undefined;
let subdirWatchers = [];
let filenameCache  = {};

function initializeCache() {
  findRootPath();
  watchRootdirForChanges();
  findAndWatchSubdirs();
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

function findAndWatchSubdirs() {
  const newSubdirs = findSubdirs();

  if (arraysAreEqual(subdirs, newSubdirs)) {
    return;
  }

  subdirs = newSubdirs;
  console.log('Considering files in: ', subdirs);

  stopAndDeleteSubdirWatchers();
  resetAndPopulateFilenameCache();
  watchSubdirsForChanges();
}

function findSubdirs() {
  const subdirs = fs
    .readdirSync(rootPath)
    .filter(entry => isDirectory(path.join(rootPath, entry)));

  if (!subdirs || subdirs.length === 0) {
    console.log('WARNING - no subdirs found in rootPath, searching will never yield any results!');
    return [];
  }

  return subdirs;
}

function getSubdirs() {
  return subdirs;
}

function resetAndPopulateFilenameCache() {
  console.log('Starting with a fresh filename cache.');
  filenameCache = {};
  subdirs.forEach(subdir => updateSubdirInCache(subdir));
}

function updateSubdirInCache(subdir) {
  filenameCache[subdir] = listFiles(subdir);
  const fileCount = filenameCache[subdir].length;
  console.log(`Updated filename cache for subdir '${subdir}' (${fileCount} entries).`);
}

function getFilenamesOfSubdirs() {
  return filenameCache;
}

function watchRootdirForChanges() {
  fs.watch(rootPath, {}, () => findAndWatchSubdirs());
}

function watchSubdirsForChanges() {
  subdirWatchers = subdirs.map(subdir => (
    fs.watch(path.join(rootPath, subdir), {}, () => updateSubdirInCache(subdir))
  ));
}

function stopAndDeleteSubdirWatchers() {
  subdirWatchers.forEach(watcher => watcher.close());
  subdirWatchers = [];
}

function listFiles(subdir) {
  try {
    return fs.readdirSync(path.join(rootPath, subdir));
  } catch (e) {
    // This catch block addresses a race condition:
    // Between detection of a change in a directory, and calling this function,
    // the directory might have been deleted. It's fine to treat it as empty
    // in that case.
    console.log(`WARN: directory '${subdir}' could not be read`);
    return [];
  }
}

function isDirectory(pathname) {
  try {
    return fs.statSync(pathname).isDirectory();
  } catch (e) {
    // This catch block addresses a race condition:
    // Between reading the rootPath for subdirs, and passing the entries
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
