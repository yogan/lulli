// @ts-check
import test from 'ava';

import {allTermsMatch} from './matcher';

test('allTermsMatch() matches a full filename as search', t => {
    const filename    = 'foo.png';
    const searchTerms = ['foo.png'];

    const result = allTermsMatch(filename, searchTerms);

    t.true(result);
});

test('allTermsMatch() matches a partial filename as search', t => {
    const filename    = 'foo.png';
    const searchTerms = ['foo'];

    const result = allTermsMatch(filename, searchTerms);

    t.true(result);
});

test('allTermsMatch() matches a filename with two substrings as search', t => {
    const filename    = 'foo.png';
    const searchTerms = ['foo', 'png'];

    const result = allTermsMatch(filename, searchTerms);

    t.true(result);
});

test('allTermsMatch() matches a long filename with a lot of substrings in mixed order and casing', t => {
    const filename    = 'fooBARbaz_quz_xxx[ABC] spaces is fine! (too).jpg';
    const searchTerms = ['quz', 'xX', '(tOO)', 'abc', ']', 'FiNe', 'r'];

    const result = allTermsMatch(filename, searchTerms);

    t.true(result);
});

test('allTermsMatch() does not match a slightly wrong name ', t => {
    const filename    = 'fooo';
    const searchTerms = ['foo.png'];

    const result = allTermsMatch(filename, searchTerms);

    t.false(result);
});

test('allTermsMatch() does not match when only one of two terms match ', t => {
    const filename    = 'foo.png';
    const searchTerms = ['foo', 'bar'];

    const result = allTermsMatch(filename, searchTerms);

    t.false(result);
});
