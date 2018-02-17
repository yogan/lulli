const fs = require('fs');

function getPath() {
  let configFile;
  try {
    configFile = fs.readFileSync('config.json');
  } catch (e) {
    throw new Error('could not open or read config.json');
  }

  const contents = JSON.parse(configFile);
  return contents.path;
}

module.exports.getPath = getPath;
