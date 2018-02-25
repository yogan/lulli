import React from 'react';

import './Suggestions.css';

const MAX_SUGGESTIONS = 10;

export function Suggestions({suggestions}) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  const entries = suggestions
    .slice(0, MAX_SUGGESTIONS)
    .map((sugg, idx) => <li key={idx}>{sugg.filename}</li>);

  const moreMatches = suggestions.length - MAX_SUGGESTIONS;
  const moreMatchesNote = moreMatches > 0
    ? <i>({moreMatches} more matches)</i>
    : null;

  return (
    <ul className="suggestions">
      {entries}
      {moreMatchesNote}
    </ul>
  );
}
