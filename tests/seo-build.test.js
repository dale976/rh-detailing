import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

// Run explicitly after building: node --test tests/seo-build.test.js
const built = existsSync('dist/contact.html');
test(
  'generated pages contain content, distinct metadata and canonical URLs',
  { skip: !process.env.CHECK_SEO_BUILD },
  () => {
    for (const [file, path, text] of [
      ['index.html', '/', 'DETAILING.'],
      ['services-pricing.html', '/services-pricing', 'Enhancement'],
      ['contact.html', '/contact', 'Tell us about your car'],
      ['privacy.html', '/privacy', 'Privacy'],
      ['t-c-s.html', '/t-c-s', 'Terms'],
    ]) {
      const html = readFileSync(`dist/${file}`, 'utf8');
      assert.ok(html.includes(text), `${file} has page content`);
      assert.ok(html.includes(`href="https://www.rhdetailing.co.uk${path}"`));
      assert.match(html, /property="og:image"/);
      assert.equal((html.match(/<title>/g) || []).length, 1);
      assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
      assert.equal((html.match(/name="description"/g) || []).length, 1);
      assert.ok(!html.includes('/src/assets/'));
      for (const [, asset] of html.matchAll(
        /(?:src|href)="(\/assets\/[^"?#]+)"/g,
      )) {
        assert.ok(existsSync(`dist${asset}`), `${file}: ${asset} exists`);
      }
      assert.equal(
        /name="robots" content="noindex/.test(html),
        process.env.CHECK_SEO_BUILD === 'review',
      );
    }
    assert.match(readFileSync('dist/404.html', 'utf8'), /noindex/);
    assert.ok(
      !readFileSync('dist/_redirects', 'utf8').includes('/* /index.html'),
    );
    assert.ok(built);
    const home = readFileSync('dist/index.html', 'utf8');
    const schema = JSON.parse(
      home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
    );
    assert.equal(schema.name, 'RH Detailing');
    assert.ok(!schema.aggregateRating);
    assert.ok(existsSync('dist/social-preview.jpg'));
    assert.ok(!existsSync('node_modules/.cache/rh-prerender'));
    if (process.env.CHECK_SEO_BUILD === 'review') {
      assert.match(
        readFileSync('dist/_headers', 'utf8'),
        /X-Robots-Tag: noindex/,
      );
      assert.match(readFileSync('dist/robots.txt', 'utf8'), /Disallow: \//);
    }
  },
);
