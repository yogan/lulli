const config          = require('config');
const fs              = require('fs');

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
    return rootPath;
  } catch(e) {
    exitRootPathMissing(rootPath);
  }
}

function exitRootPathMissing(rootPath) {
  console.log(`The 'rootPath' config value has to point to a directory (value in config was '${rootPath}')`);
  process.exit(1);
}

function search(searchTerms) {
  const subdirs = getSubdirs(rootPath);

  if (!subdirs || subdirs.length === 0) {
    console.warn(`no subdirs found in rootPath '${rootPath}'`);
    return [];
  }

  const subdirMatches = subdirs.map(subdir => {
    return getMatchesInDir(rootPath, subdir, searchTerms)
      .map(filename => ({
        filename,
        url: toUrl(subdir, filename),
        year: subdir
      }));
  });

  const matchesWithRelativePaths = flatten(subdirMatches);

  return addTypes(matchesWithRelativePaths);
}

function toUrl(subdir, filename) {
  const baseUrl = config.get('baseUrl');
  return `${baseUrl}/${subdir}/${filename}`;
}

function getSubdirs(path) {
  return fs
    .readdirSync(path)
    .filter(filename => fs.statSync(`${path}/${filename}`).isDirectory());
}

function getMatchesInDir(rootPath, subdir, searchTerms) {
  return fs
    .readdirSync(`${rootPath}/${subdir}`)
    .filter(filename => allTermsMatch(filename, searchTerms));
}

function flatten(array) {
  return [].concat(...array);
}
