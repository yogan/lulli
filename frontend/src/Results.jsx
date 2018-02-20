import React from 'react';

import './Results.css';
import Image from './Image';
import Video from './Video';

export function Results({matches}) {
  if (!matches || matches.length === 0) {
    return null;
  }

  return (
    <div className="results">
      {matches.map((match, idx) => toMediaElem(match, idx))}
    </div>
  );
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
