const fs     = require('fs');
const config = require('./config');

const rootPath = config.getPath();

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

function getSubdirs(path) {
  return fs.readdirSync(path)
    .filter(filename => fs.statSync(`${path}/${filename}`).isDirectory());
}

function search(searchTerms) {
  const subdirs = getSubdirs(rootPath);

  const dirsWithImages = subdirs.map(dir => ({
    dir,
    images: getMatchingImages(`${rootPath}/${dir}`, searchTerms)
  }));

  return flattenImageResults(dirsWithImages);
}

function flattenImageResults(dirsWithImages) {
  return dirsWithImages.reduce((acc, cur) => {
    cur.images.forEach(image => acc.push(`${cur.dir}/${image}`));
    return acc;
  }, []);
}

function getMatchingImages(path, searchTerms) {
  const filenames = listImageFiles(path)
  return filenames.filter(filename => allTermsMatch(filename, searchTerms));
}

module.exports.search = search;
