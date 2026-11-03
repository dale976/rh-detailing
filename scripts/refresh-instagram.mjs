import {
  existsSync,
  readFileSync,
  mkdirSync,
  writeFileSync,
  renameSync,
} from 'node:fs';
import { parseEnv } from 'node:util';
import { createInstagramSnapshot } from './lib/instagram-snapshot.mjs';

const local = existsSync('.env.local')
  ? parseEnv(readFileSync('.env.local', 'utf8'))
  : {};
const feedId = (
  process.env.VITE_BEHOLD_FEED_ID ||
  local.VITE_BEHOLD_FEED_ID ||
  ''
).trim();
try {
  const { snapshot, images } = await createInstagramSnapshot(feedId);
  // Finish all network operations before writing any part of the new snapshot.
  mkdirSync('public/instagram-fallback', { recursive: true });
  for (const image of images)
    writeFileSync(`public/instagram-fallback/${image.filename}`, image.bytes);
  const destination = 'src/content/instagram-fallback.json';
  writeFileSync(`${destination}.tmp`, JSON.stringify(snapshot, null, 2) + '\n');
  renameSync(`${destination}.tmp`, destination);
  console.log(
    `Saved ${snapshot.posts.length} Instagram posts with local thumbnails. Review and commit the snapshot and images together.`,
  );
} catch (error) {
  console.error(`Instagram snapshot not updated: ${error.message}`);
  process.exitCode = 1;
}
