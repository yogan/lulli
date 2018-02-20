import React from 'react';

export default function Video({video}) {
  const {url} = video;
  return <video controls><source src={url} /></video>;
}
