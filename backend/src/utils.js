// @ts-check
module.exports = {
  arraysAreEqual,
  flatten
};

function arraysAreEqual(leftArray = [], rightArray = []) {
  const leftIsInRight = leftArray.reduce((acc, cur) => (
    acc && rightArray.includes(cur)
  ), true);

  const rightIsInLeft = rightArray.reduce((acc, cur) => (
    acc && leftArray.includes(cur)
  ), true);

  return leftIsInRight && rightIsInLeft;
}

function flatten(array) {
  return [].concat(...array);
}
