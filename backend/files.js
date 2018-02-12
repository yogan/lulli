const fs     = require('fs');
const config = require('./config');

const path = config.getPath();
let images = [];

function getFileListing(path) {
  // TODO actually get listing via fs and path
  return [
    {filename: 'foo_bar.jpg'},
    {filename: 'shit.png'},
    {filename: 'saldfkjalsdjkf.jpeg'}
  ];
}

function cacheFiles() {
  images = getFileListing(path);
}

function search(searchTerms) {
  return images.filter(file => allTermsMatch(file.filename, searchTerms));
}

function allTermsMatch(filename, searchTerms) {
  return searchTerms.reduce((matches, term) => {
    return matches && filename.match(new RegExp(term))
  }, true);
}

module.exports.cacheFiles = cacheFiles;
module.exports.search     = search;
