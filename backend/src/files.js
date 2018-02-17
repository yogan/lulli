const fs     = require('fs');
const config = require('./config');

const path = config.getPath();

function listImageFiles(path) {
  return fs
    .readdirSync(path)
    .filter(filename => isImage(filename));
}

function isImage(filename) {
  return filename.match(/\.(png|jpe?g|gif)$/);
}

function allTermsMatch(filename, searchTerms) {
  return searchTerms.reduce((matches, term) => {
    return matches && filename.match(new RegExp(term, "ig"))
  }, true);
}


function search(searchTerms) {
  const images = listImageFiles(path);
  return images.filter(filename => allTermsMatch(filename, searchTerms));
}

module.exports.search = search;
