export function filterAndSortMatches(matches) {
  if (matches === null) {
    return matches;
  }

  return matches
    .filter(match => match.type !== 'unknown')
    .sort((left, right) => newestTimestampsFirst(left, right));
}

function newestTimestampsFirst(left, right) {
  if (left.timestamp < right.timestamp) {
    return 1;
  } else if (left.timestamp > right.timestamp) {
    return -1;
  }
  return 0;
}

export function makeTitle(filename, year) {
  const name = filename.replace(/\.[^.]*$/, '');
  const withSpaces = name.replace(/_/g, ' ');
  return `${withSpaces} (${year})`;
}
