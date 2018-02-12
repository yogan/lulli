import React from 'react';

export function Results(props) {
  console.log('got: ', props);
  if (!props.images || props.images.length === 0) {
    return null;
  }

  const images = props.images.map((image, idx) => {
    return <ul key={idx}>{image.filename}</ul>
  });

  return <ul>{images}</ul>;
}
