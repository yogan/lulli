import React from 'react';

export default function Video({url}) {
  return (
    <video className="result-video" controls>
      <source src={url} />
    </video>
  );
}
