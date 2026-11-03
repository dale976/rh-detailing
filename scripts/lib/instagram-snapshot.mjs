import { createHash } from 'node:crypto';
import { loadInstagramPosts } from '../../src/lib/instagram.js';
const hash = (value) =>
  createHash('sha256').update(value).digest('hex').slice(0, 16);
export async function createInstagramSnapshot(
  feedId,
  { fetchImpl = fetch, now = () => new Date() } = {},
) {
  const posts = await loadInstagramPosts(feedId, {
    fetchImpl,
    signal: AbortSignal.timeout(15000),
  });
  if (!posts.length)
    throw Error('Feed contains no usable posts; existing snapshot kept.');
  const images = [];
  const saved = [];
  for (const post of posts) {
    const response = await fetchImpl(post.image, {
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok)
      throw Error('Thumbnail unavailable; existing snapshot kept.');
    const bytes = Buffer.from(await response.arrayBuffer());
    if (!bytes.length || bytes.length > 5 * 1024 * 1024)
      throw Error('Invalid thumbnail size.');
    const extension =
      bytes.subarray(0, 4).toString() === 'RIFF' &&
      bytes.subarray(8, 12).toString() === 'WEBP'
        ? 'webp'
        : bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
          ? 'jpg'
          : bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))
            ? 'png'
            : null;
    if (!extension)
      throw Error(
        'Thumbnail is not a supported image; existing snapshot kept.',
      );
    const filename = `${hash(post.id)}-${hash(bytes)}.${extension}`;
    images.push({ filename, bytes });
    saved.push({ ...post, image: `/instagram-fallback/${filename}` });
  }
  return {
    snapshot: { capturedAt: now().toISOString(), posts: saved },
    images,
  };
}
