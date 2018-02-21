import React from 'react';

import {makeTitle} from './utils';

export default function Image({image}) {
  const {filename, url, year} = image;
  const title = makeTitle(filename, year);
  return (
    <figure>
      <img src={url} alt={title} title={title} />
      <figcaption>{title}</figcaption>
    </figure>
  );
}
