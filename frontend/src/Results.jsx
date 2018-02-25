import React from 'react';

import './Results.css';

import TitledMedia from './TitledMedia';
import { newestTimestampsFirst } from './utils';

const MAX_RESULTS = 100;

export function Results({matches}) {
  if (!matches) {
    return null;
  }

  const relevantMatches = matches.filter(match => match.type !== 'unknown');

  if (relevantMatches.length === 0) {
    return <p>Nothing found. Oh no.</p>;
  }

  relevantMatches.sort((left, right) => newestTimestampsFirst(left, right));

  const limitedMatches = relevantMatches.slice(0, MAX_RESULTS);

  const resultsMissing = relevantMatches.length > MAX_RESULTS
    ? <p className="results-missing">
        {`Results limited to the first ${MAX_RESULTS} matches.`}
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
