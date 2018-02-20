import React from 'react';

import './Results.css';

export function Results({matches}) {
  if (!matches || matches.length === 0) {
    return null;
  }

  // TODO handle non-image results (read: videos)

  const images = matches.filter(match => match.type === 'image');

  return images.map((image, idx) => <Image key={idx} image={image} />
  );
}

function Image({image}) {
  const {filename, url} = image;
  return <img src={url} alt={filename} title={filename} />;
}
