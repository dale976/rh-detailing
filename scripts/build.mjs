import { build } from 'vite';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const mode = process.argv.includes('--review') ? 'review' : 'production';
await build({ mode });
const serverDir = resolve('node_modules/.cache/rh-prerender');
try {
  await build({
    mode,
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: serverDir,
      emptyOutDir: true,
    },
    publicDir: false,
  });
  const { render } = await import(
    pathToFileURL(`${serverDir}/entry-server.js`)
  );
  const template = readFileSync('dist/index.html', 'utf8')
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/<meta\s+name="description"[\s\S]*?\/>/g, '');
  for (const [path, file] of [
    ['/', 'index'],
    ['/services-pricing', 'services-pricing'],
    ['/contact', 'contact'],
    ['/privacy', 'privacy'],
    ['/t-c-s', 't-c-s'],
    ['/404', '404'],
  ]) {
    const rendered = render(path);
    const head = [];
    const body = rendered.replace(
      /<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>/g,
      (tag) => {
        head.push(tag);
        return '';
      },
    );
    let html = template
      .replace('</head>', `${head.join('')}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    if (mode === 'review')
      html = html
        .replace(/<meta name="robots"[^>]*>/g, '')
        .replace(
          '</head>',
          '<meta name="robots" content="noindex, nofollow" />\n</head>',
        );
    writeFileSync(`dist/${file}.html`, html);
  }
} finally {
  rmSync(serverDir, { recursive: true, force: true });
}
if (mode === 'review') {
  writeFileSync('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
  writeFileSync(
    'dist/_headers',
    readFileSync('dist/_headers', 'utf8') +
      '\n/*\n  X-Robots-Tag: noindex, nofollow\n',
  );
}
