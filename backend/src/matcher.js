// @ts-check
const escapeStringRegexp = require('escape-string-regexp');

module.exports.allTermsMatch = allTermsMatch;

function allTermsMatch(filename, searchTerms) {
  return searchTerms.reduce((doesMatch, term) => (
    doesMatch && matches(filename, term)
  ), true);
}

function matches(filename, term) {
  const escapedTerm = escapeStringRegexp(term);
  return !!filename.match(new RegExp(escapedTerm, "ig"));
}
