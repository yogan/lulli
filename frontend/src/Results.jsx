import React       from 'react';

import TitledMedia from './TitledMedia';

import './Results.css';

const MAX_ENTRIES = 100;

export function Results({ matches }) {
  if (!matches) {
    return null;
  }

  if (matches.length === 0) {
    return <NothingFound />
  }

  const limitedMatches = matches.slice(0, MAX_ENTRIES);

  const resultsMissing = matches.length > MAX_ENTRIES
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

function NothingFound() {
  return (
    <div>
      <p>Nothing found. Oh no.</p>
      <img src="oh_no.png" />
    </div>
  );
}
