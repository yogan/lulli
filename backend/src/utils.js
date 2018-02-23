// @ts-check
module.exports = {
  flatten
};

function flatten(array) {
  return [].concat(...array);
}
