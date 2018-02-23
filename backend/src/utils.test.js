// @ts-check
import test from 'ava';

import {flatten} from './utils';

test('flatten() flattens an array of arrays', t => {
  const arrayOfArrays = [
    [1, 2, 3],
    ['a', 'b']
  ];

  const result = flatten(arrayOfArrays);

  t.deepEqual(result, [
    1, 2, 3, 'a', 'b'
  ])
});

test('flatten() flattens an array of empty arrays', t => {
  const arrayOfArrays = [
    [],
    []
  ];

  const result = flatten(arrayOfArrays);

  t.deepEqual(result, []);
});

test('flatten() flattens an array of arrays with empty arrays in between', t => {
  const arrayOfArrays = [
    [1, 2, 3],
    [],
    ['a', 'b']
  ];

  const result = flatten(arrayOfArrays);

  t.deepEqual(result, [
    1, 2, 3, 'a', 'b'
  ])
});
