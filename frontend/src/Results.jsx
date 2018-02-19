import React from 'react';

import './Results.css';

export function Results({matches}) {
  if (!matches || matches.length === 0) {
    return null;
  }

  // TODO handle non-image results (read: videos)

  const images = matches.filter(match => match.type === 'image');

  return images
    .map((image, idx) => <EvilHardcodedImage key={idx} image={image} />
  );
}

function EvilHardcodedImage({image}) {
  const {subdir, filename} = image;
  const url = `http://zogan.de/var/lulz/${subdir}/${filename}`;
  return <img src={url} alt={filename} title={filename} />;
}
