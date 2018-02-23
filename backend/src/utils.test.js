// @ts-check
import test from 'ava';

import {
  arraysAreEqual,
  flatten
} from './utils';

test('arraysAreEqual() returns true for two empty arrays', t => {
  const array1 = [];
  const array2 = [];

  const result = arraysAreEqual(array1, array2);

  t.true(result);
});

test('arraysAreEqual() returns true for two arrays with same elements in same order', t => {
  const array1 = [1, 'a', 'bar'];
  const array2 = [1, 'a', 'bar'];

  const result = arraysAreEqual(array1, array2);

  t.true(result);
});

test('arraysAreEqual() returns true for two arrays with same elements in different order', t => {
  const array1 = [1, 'a', 'bar'];
  const array2 = ['a', 1, 'bar'];

  const result = arraysAreEqual(array1, array2);

  t.true(result);
});

test('arraysAreEqual() returns false for an empty and an non empty array', t => {
  const array2 = [];
  const array1 = [1];

  const result = arraysAreEqual(array1, array2);

  t.false(result);
});

test('arraysAreEqual() returns false for a non empty and an empty array', t => {
  const array1 = [1];
  const array2 = [];

  const result = arraysAreEqual(array1, array2);

  t.false(result);
});

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
