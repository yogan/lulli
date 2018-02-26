import React from 'react';

export default function Image({url, title}) {
  return <img className="result-image" src={url} alt={title} title={title} />;
}
