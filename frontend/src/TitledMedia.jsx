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

  const url = process.env.PUBLIC_URL + '/data/' + path;

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
