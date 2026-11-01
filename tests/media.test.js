import test from 'node:test';
import assert from 'node:assert/strict';
import { isPlaybackFailure } from '../src/lib/media.js';

test('a skipped video source does not disable a working fallback', () => {
  const video = { error: null };
  assert.equal(isPlaybackFailure({ target: {}, currentTarget: video }), false);
  video.error = { code: 3 };
  assert.equal(
    isPlaybackFailure({ target: video, currentTarget: video }),
    true,
  );
});
