import React from 'react';

export default function Image({url, title}) {
  return <img src={url} alt={title} title={title} />;
}
