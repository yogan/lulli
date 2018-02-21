import React from 'react';

import './Results.css';

import TitledMedia from './TitledMedia';
import { newestTimestampsFirst } from './utils';

export function Results({matches}) {
  if (!matches || matches.length === 0) {
    return <p>Nothing found. Oh no.</p>;
  }

  matches.sort((left, right) => newestTimestampsFirst(left, right));

  const media = matches.map((match, idx) =>
    <TitledMedia match={match} key={idx} />);

  return (
    <div className="results">
      {media}
    </div>
  );
}
