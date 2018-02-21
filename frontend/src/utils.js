export function makeTitle(filename, year) {
  const name = filename.replace(/\.[^.]*$/, '');
  const withSpaces = name.replace(/_/g, ' ');
  return `${withSpaces} (${year})`;
}
