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
  } else if (isVideo(filename)) {
    return 'video';
  }

  return 'unknown';
}

function isImage(filename) {
  return filename.match(/\.(png|jpe?g|gif)$/i);
}

function isVideo(filename) {
  return filename.match(/\.(mp4|webm)$/i);
}
