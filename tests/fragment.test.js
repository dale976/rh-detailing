import assert from 'node:assert/strict';
import test from 'node:test';
import { decodeFragment } from '../src/utils/fragment.js';

test('valid URL fragments resolve to their decoded section IDs', () => {
  assert.equal(decodeFragment('#about'), 'about');
  assert.equal(decodeFragment('#paint%20care'), 'paint care');
  assert.equal(decodeFragment(''), null);
  assert.equal(decodeFragment('#'), null);
});

test('malformed fragment escapes do not crash page navigation', () => {
  assert.equal(decodeFragment('#%'), null);
  assert.equal(decodeFragment('#%E0%A4'), null);
});
