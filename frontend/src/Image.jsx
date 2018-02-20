import React from 'react';

export default function Image({image}) {
  const {filename, url} = image;
  return <img src={url} alt={filename} title={filename} />;
}
