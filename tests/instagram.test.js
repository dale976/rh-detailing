import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizePosts, loadInstagramPosts } from '../src/lib/instagram.js';
const photo = {
  id: '1',
  permalink: 'https://www.instagram.com/p/example/',
  mediaType: 'IMAGE',
  sizes: {
    medium: { mediaUrl: 'https://cdn.behold.pictures/test/photo.webp' },
  },
  caption: 'Real caption supplied by the feed',
};

test('normalizes photos and video thumbnails into gallery items, capped at six', () => {
  const posts = normalizePosts({
    posts: [
      ...Array.from({ length: 7 }, (_, i) => ({ ...photo, id: String(i) })),
      { ...photo, mediaType: 'VIDEO' },
    ],
  });
  assert.equal(posts.length, 6);
  assert.equal(posts[0].image, 'https://cdn.behold.pictures/test/photo.webp');
  assert.equal(posts[0].href, 'https://www.instagram.com/p/example/');
  assert.equal(
    normalizePosts({ posts: [{ ...photo, mediaType: 'VIDEO' }] })[0].type,
    'VIDEO',
  );
});

test('rejects unsafe post destinations and media, and ignores unrenderable videos', () => {
  assert.deepEqual(
    normalizePosts({
      posts: [
        { ...photo, permalink: 'javascript:alert(1)' },
        {
          ...photo,
          permalink: 'https://instagram.com.attacker.example/p/test',
        },
        {
          ...photo,
          sizes: {
            medium: { mediaUrl: 'https://unrelated.example/image.jpg' },
          },
        },
        {
          ...photo,
          mediaType: 'VIDEO',
          sizes: undefined,
          mediaUrl: 'https://cdn.behold.pictures/test/movie.mp4',
        },
      ],
    }),
    [],
  );
  assert.deepEqual(normalizePosts({ error: 'feed unavailable' }), []);
});

test('loads only a configured Behold feed and handles provider failure', async () => {
  let url;
  const posts = await loadInstagramPosts('test-feed', {
    fetchImpl: async (value) => {
      url = value;
      return new Response(JSON.stringify({ posts: [photo] }));
    },
  });
  assert.equal(url, 'https://feeds.behold.so/test-feed');
  assert.equal(posts.length, 1);
  await assert.rejects(() => loadInstagramPosts('../not-a-feed'));
  await assert.rejects(() =>
    loadInstagramPosts('test-feed', {
      fetchImpl: async () => new Response('{}', { status: 503 }),
    }),
  );
});
