import React from 'react';

import './ResultPreview.css';

const MAX_ENTRIES = 10;

export function ResultPreview({ matches }) {
  if (!matches) {
    return null;
  }

  const relevantMatches = matches.filter(match => match.type !== 'unknown');

  if (relevantMatches.length === 0) {
    return null;
  }

  const entries = relevantMatches
    .slice(0, MAX_ENTRIES)
    .map((match, idx) => <li key={idx}>{match.filename}</li>);

  const moreMatches = relevantMatches.length - MAX_ENTRIES;
  const moreMatchesNote = moreMatches > 0
    ? <i>({moreMatches} more matches)</i>
    : null;

  return (
    <ul className="result-preview">
      {entries}
      {moreMatchesNote}
    </ul>
  );
}
