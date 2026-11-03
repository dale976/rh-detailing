import test from 'node:test';
import assert from 'node:assert/strict';
import { createInstagramSnapshot } from '../scripts/lib/instagram-snapshot.mjs';
const item = {
  id: '123',
  permalink: 'https://www.instagram.com/p/real-post/',
  mediaType: 'VIDEO',
  sizes: { medium: { mediaUrl: 'https://cdn.behold.pictures/post.webp' } },
  caption: 'Client post',
};
const bytes = Buffer.from('524946460400000057454250', 'hex');
test('snapshot keeps real post links and metadata but uses local thumbnail files', async () => {
  const result = await createInstagramSnapshot('feed-id', {
    now: () => new Date('2026-11-03T12:00:00Z'),
    fetchImpl: async (url) =>
      url.includes('feeds.behold.so')
        ? Response.json({ posts: [item] })
        : new Response(bytes, { headers: { 'Content-Type': 'image/webp' } }),
  });
  assert.equal(result.snapshot.posts[0].href, item.permalink);
  assert.equal(result.snapshot.posts[0].type, 'VIDEO');
  assert.equal(result.snapshot.posts[0].caption, item.caption);
  assert.match(
    result.snapshot.posts[0].image,
    /^\/instagram-fallback\/[a-f0-9-]+\.webp$/,
  );
  assert.equal(result.snapshot.capturedAt, '2026-11-03T12:00:00.000Z');
  assert.deepEqual(result.images[0].bytes, bytes);
  assert.ok(!JSON.stringify(result.snapshot).includes('behold.pictures'));
});
test('empty, unavailable or non-image responses cannot replace a saved snapshot', async () => {
  await assert.rejects(() =>
    createInstagramSnapshot('feed-id', {
      fetchImpl: async () => Response.json({ posts: [] }),
    }),
  );
  await assert.rejects(() =>
    createInstagramSnapshot('feed-id', {
      fetchImpl: async () => new Response('', { status: 503 }),
    }),
  );
  await assert.rejects(() =>
    createInstagramSnapshot('feed-id', {
      fetchImpl: async (url) =>
        url.includes('feeds.behold.so')
          ? Response.json({ posts: [item] })
          : new Response('<html>error</html>', {
              headers: { 'Content-Type': 'text/html' },
            }),
    }),
  );
});

test('committed fallback data has a local image and individual Instagram link for every post', async () => {
  const { readFileSync, existsSync } = await import('node:fs');
  const snapshot = JSON.parse(
    readFileSync('src/content/instagram-fallback.json', 'utf8'),
  );
  assert.ok(snapshot.posts.length > 0 && snapshot.posts.length <= 6);
  for (const post of snapshot.posts) {
    assert.match(post.href, /^https:\/\/(www\.)?instagram\.com\/(p|reel|tv)\//);
    assert.match(
      post.image,
      /^\/instagram-fallback\/[a-f0-9-]+\.(webp|jpg|png)$/,
    );
    assert.ok(existsSync(`public${post.image}`));
  }
});
