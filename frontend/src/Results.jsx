import React from 'react';

import './Results.css';
import Image from './Image';
import Video from './Video';

export function Results({matches}) {
  if (!matches || matches.length === 0) {
    return <p>Nothing found. Oh no.</p>;
  }

  const media = matches
    .sort((left, right) => newestTimestampsFirst(left, right))
    .map((match, idx) => toMediaElem(match, idx));

  return (
    <div className="results">
      {media}
    </div>
  );
}

function newestTimestampsFirst(left, right) {
  return left.timestamp < right.timestamp;
}

function toMediaElem(match, idx) {
  switch (match.type) {
    case 'image':
      return <Image key={idx} image={match} />;
    case 'video':
      return <Video key={idx} video={match} />;
    default:
      return null;
  }
}
