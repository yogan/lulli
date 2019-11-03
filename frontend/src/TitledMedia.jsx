import React from 'react';

import Image         from './Image';
import Video         from './Video';
import { makeTitle } from './utils';

export default function TitledMedia({match, idx}) {
  const { type } = match;
  if (type !== 'image' && type !== 'video') {
    return null;
  }

  const { filename, year, path } = match;

  const url = resolveUrl(path) ;

  const title = makeTitle(filename, year);

  const media = type === 'image'
    ? <Image url={url} title={title} />
    : <Video url={url} />;

  return (
    <figure>
      <a href={url}>
        {media}
      </a>
      <figcaption>{title}</figcaption>
    </figure>
  );
}

function resolveUrl(path) {
  if (process && process.env && process.env.PUBLIC_URL) {
    // PUBLIC_URL is magically replaced by webpack dev server
    // note that `process` is not defined when running without webpack
    return `${process.env.PUBLIC_URL}/data/${path}`
  }

  // no webpack dev server means Docker, so use static URLs
  // FIXME: Docker image not self-contained :-(
  return `https://zogan.de/var/lulz/${path}`;
}
