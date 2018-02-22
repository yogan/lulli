// @ts-check
module.exports.flatten = flatten;

function flatten(array) {
  return [].concat(...array);
}
