module.exports.addTypes = addTypes;

function addTypes(matches) {
  return matches.map(match => ({
    ...match,
    type: getType(match.filename)
  }));
}

function getType(filename) {
  if (isImage(filename)) {
    return 'image';
  }

  return 'unknown';
}

function isImage(filename) {
  return filename.match(/\.(png|jpe?g|gif)$/i);
}
