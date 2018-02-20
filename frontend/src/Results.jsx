import React from 'react';

import './Results.css';

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

function Image({image}) {
  const {filename, url} = image;
  return <img src={url} alt={filename} title={filename} />;
}

function Video({video}) {
  const {url} = video;
  return <video controls><source src={url} /></video>;
}
