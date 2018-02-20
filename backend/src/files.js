const fs              = require('fs');

const config          = require('./config');
const {addTypes}      = require('./filetypes');
const {allTermsMatch} = require('./matcher');

module.exports.search = search;

function search(searchTerms) {
  const rootPath = config.getPath();
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
  // TODO remove hardcoded value, put in config
  return `http://zogan.de/var/lulz/${subdir}/${filename}`;
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
