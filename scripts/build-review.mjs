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

// Always rebuild so an earlier production bundle cannot slip into a review upload.
execFileSync(
  process.execPath,
  ['node_modules/vite/bin/vite.js', 'build', '--mode', 'review'],
  { stdio: 'inherit' },
);
const dist = resolve('dist');
const html = join(dist, 'index.html');
writeFileSync(
  html,
  readFileSync(html, 'utf8').replace(
    '</head>',
    '<meta name="robots" content="noindex, nofollow" />\n</head>',
  ),
);
writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
writeFileSync(
  join(dist, '_headers'),
  readFileSync(join(dist, '_headers'), 'utf8') +
    '\n/*\n  X-Robots-Tag: noindex, nofollow\n',
);
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
