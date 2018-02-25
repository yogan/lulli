import React from 'react';

import './Suggestions.css';

export function Suggestions({suggestions}) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  const entries = suggestions.map((sugg, idx) =>
    <li key={idx}>{sugg.filename}</li>);

  return (
    <ul className="suggestions">
      {entries}
    </ul>
  );
}
