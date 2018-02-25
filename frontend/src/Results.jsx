import React                     from 'react';

import TitledMedia               from './TitledMedia';
import { newestTimestampsFirst } from './utils';

import './Results.css';

const MAX_ENTRIES = 100;

export function Results({ matches }) {
  if (!matches) {
    return null;
  }

  const relevantMatches = matches.filter(match => match.type !== 'unknown');

  if (relevantMatches.length === 0) {
    return <p>Nothing found. Oh no.</p>;
  }

  relevantMatches.sort((left, right) => newestTimestampsFirst(left, right));

  const limitedMatches = relevantMatches.slice(0, MAX_ENTRIES);

  const resultsMissing = relevantMatches.length > MAX_ENTRIES
    ? <p className="results-missing">
        {`Results limited to the first ${MAX_ENTRIES} matches.`}
      </p>
    : null;

  const media = limitedMatches.map((match, idx) =>
    <TitledMedia match={match} key={idx} />);

  return (
    <div className="results">
      {media}
      {resultsMissing}
    </div>
  );
}
