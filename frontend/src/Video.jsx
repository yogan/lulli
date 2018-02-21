import React from 'react';

import {makeTitle} from './utils';

export default function Video({video}) {
  const {filename, url, year} = video;
  const title = makeTitle(filename, year);
  return (
    <figure>
      <video controls><source src={url} /></video>;
      <figcaption>{title}</figcaption>
    </figure>
  );
}
