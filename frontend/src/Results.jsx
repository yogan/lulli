import React from 'react';

import './Results.css';

export function Results({images}) {
  if (!images || images.length === 0) {
    return null;
  }

  return images.map(filename => <EvilHardcodedImage filename={filename}/>);
}

function EvilHardcodedImage({filename}) {
  const url = `http://zogan.de/var/lulz/2018/${filename}`;
  return <img src={url} title={filename} />;
}
