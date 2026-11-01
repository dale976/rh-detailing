import { execFileSync } from 'node:child_process';
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
} from 'node:fs';
import { resolve, join } from 'node:path';

// Build all static routes with review indexing protection.
execFileSync(process.execPath, ['scripts/build.mjs', '--review'], {
  stdio: 'inherit',
});
const dist = resolve('dist');
function checkFiles(directory) {
  for (const entry of readdirSync(directory)) {
    const file = join(directory, entry);
    const info = statSync(file);
    if (info.isDirectory()) checkFiles(file);
    else if (info.size > 25 * 1024 * 1024)
      throw new Error(`Cloudflare Pages file limit exceeded: ${file}`);
  }
}
checkFiles(dist);
mkdirSync('release', { recursive: true });
const archive = resolve('release/rh-detailing-review.zip');
if (existsSync(archive)) unlinkSync(archive);
execFileSync('zip', ['-q', '-r', archive, '.'], {
  cwd: dist,
  stdio: 'inherit',
});
console.log(`Review upload ready: ${archive}`);
