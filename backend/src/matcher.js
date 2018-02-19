module.exports.allTermsMatch = allTermsMatch;

function allTermsMatch(filename, searchTerms) {
  return searchTerms.reduce((doesMatch, term) => (
    doesMatch && matches(filename, term)
  ), true);
}

function matches(filename, term) {
  return !!filename.match(new RegExp(term, "ig"));
}
