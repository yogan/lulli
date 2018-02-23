// @ts-check
import test from 'ava';

import { addTypes } from './filetypes';

test('addTypes() detects some images', t => {
  const matches = [
    { filename: 'a.png' },
    { filename: 'b.jpeg' },
    { filename: 'B.JPEG' },
    { filename: 'c.jpg' },
    { filename: 'd.gif' },
    { filename: 'e.GIF' }
  ];

  const result = addTypes(matches);

  t.deepEqual(result, [
    { type: 'image', filename: 'a.png' },
    { type: 'image', filename: 'b.jpeg' },
    { type: 'image', filename: 'B.JPEG' },
    { type: 'image', filename: 'c.jpg' },
    { type: 'image', filename: 'd.gif' },
    { type: 'image', filename: 'e.GIF' }
  ]);
});

test('addTypes() detects an image among some unknown files', t => {
  const matches = [
    { filename: 'lol-business.xls' },
    { filename: 'b.jpeg' },
    { filename: 'mail.dat' }
  ];

  const result = addTypes(matches);

  t.deepEqual(result, [
    { type: 'unknown', filename: 'lol-business.xls' },
    { type: 'image',   filename: 'b.jpeg' },
    { type: 'unknown', filename: 'mail.dat' }
  ]);
});

test('addTypes() keeps additional properties', t => {
  const matches = [
    { filename: 'foo.gif', year: 2018 },
    { filename: 'non_image.bin', size: 1024, meta: { data: ['xxx'] } }
  ];

  const result = addTypes(matches);

  t.deepEqual(result, [
    { type: 'image',   filename: 'foo.gif', year: 2018 },
    { type: 'unknown', filename: 'non_image.bin', size: 1024, meta: { data: ['xxx'] } }
  ]);
});

test('addTypes() detects some videos', t => {
  const matches = [
    { filename: 'cool flick.mp4' },
    { filename: 'LOUD!.MP4' },
    { filename: 'lolinternet.webm' }
  ];

  const result = addTypes(matches);

  t.deepEqual(result, [
    { type: 'video', filename: 'cool flick.mp4' },
    { type: 'video', filename: 'LOUD!.MP4' },
    { type: 'video', filename: 'lolinternet.webm' }
  ]);
});
