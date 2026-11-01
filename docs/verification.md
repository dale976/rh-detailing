# Verification record

Latest design verification: [23 October audit fixes](design-polish-2026-10-23.md). The record below describes the initial implementation.

21 October 2026.

- `npm --userconfig=/dev/null run check`: passed formatting, all four tests and production build. The user-config override avoids warnings from the computer's unrelated global npm configuration; no global settings were changed.
- Content tests check published package prices, coating inclusion, maintenance eligibility and contact destinations. The initial content run failed before content modules were implemented, then passed.
- Regression test for invalid URL fragments reproduced a URIError with `#%` and incomplete UTF-8 escapes, then passed after decoding was guarded. Valid fragments remain supported.
- Browser checks at desktop (1280 px) and mobile (390 px) widths: responsive layouts, package navigation, selected-service email subject, mobile menu open/close, Escape and focus return. No horizontal overflow observed.
- The local 720p Wix video plays muted and inline, loops, and supports pause/resume in the browser. Duration reported by the browser: 52.35 seconds. Desktop and narrow-screen compositions inspected.
- Reduced-motion and data-saving fallback logic reviewed in source; operating-system preference switching and real constrained-network tests were not performed. The video is not mounted when either preference is present.
- Production output contains the local video and compressed photographs. No Wix-hosted media requests are needed at runtime.
- Source scan found no touring-company content or analytics identifiers in the application.
- Read-only independent review found no video defects and identified the invalid-fragment issue fixed above.

## Deployment limits

This is a local build and preview. The existing Wix website, domain and hosting remain unchanged. The production bundle was built successfully; production-host redirects, headers, HTTP status handling and domain configuration still need verification on the eventual host. Web3Forms integration is implemented but remains inactive until the client’s access key is added. Phone and email links remain available.

## Enquiries and gallery update — 1 November 2026

- All 12 automated tests pass, including validation, request mapping, provider/network failures and safe Instagram feed handling. Tests do not send live email.
- Contact form and asynchronous message panel inspected in the browser at desktop and 390 px widths. Missing-key notices and disabled submission verified. Mobile hero controls remain clear of the launcher.
- Behold gallery code is prepared; real Instagram media cannot be verified until the client authorises a feed.
- Cloudflare review ZIP inspected for indexing directives, asset size limits and absence of source/environment files. No deployment, account changes or DNS changes performed.

## SEO and performance — 1 November 2026

- React/Vite now renders each public route at build time, including unique titles/descriptions, canonical URLs and social metadata. A verified Organization JSON-LD record adds business contact/service-area/profile details without an address, invented hours or self-serving review ratings.
- Generated `404.html` and removed the catch-all homepage rewrite. Cloudflare should supply extensionless HTML routes and real missing-page status codes; verify these on the deployed host.
- Responsive 640/1280px WebP images replace runtime JPEGs. Corrected dimensions; contact imagery is lazy-loaded. Larger WebPs are 64–73% smaller than original JPEGs.
- Hero film retains its 52.34-second duration. Desktop H.264 is 5,231,528 bytes versus 15,650,595 originally; mobile H.264 is 1,756,998 bytes. Audio removed, fast-start enabled. Inspected an extracted mobile frame. Original film backed up outside the repository at `/private/tmp/rh-detailing-original-hero.mp4` (temporary storage).
- `npm run check`: formatting, 13 unit/regression tests, production build and the explicit output SEO contract test pass. SEO contract test is intentionally skipped in the pre-build unit run and runs after the build. Review build and separate review-mode SEO output checks pass too.
- Browser checks on generated static output: service-specific contact selection, single canonical/title, image loading and message panel interaction. No browser console warnings/errors observed in these checks. No live enquiries sent.
- Independent read-only code review found no P1/P2 regressions. Mobile-device/network field measurements and Cloudflare response headers/statuses remain deployment checks; no Lighthouse score is claimed.
- Review protection is emitted into all six HTML files, robots.txt and response headers. Updated review ZIP is available under release/. Nothing deployed and DNS/Wix unchanged.

- Final playback regression: individual source errors bubbled to the video handler and disabled valid fallback playback. Added a failing regression test, guarded fatal video errors, then reran the suite. Generated-build browser playback confirmed 1280×720, 52.343958 seconds, playing successfully.
