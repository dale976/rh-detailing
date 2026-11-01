# RH Detailing

A responsive replacement for RH Detailing's Wix website, inspired by The Drive's visual layout and retaining RH Detailing's original black-and-gold brand and photographs.

## Run locally

Requires Node.js 22.12 or later and npm. Dependencies are pinned in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Vite. The dev server is bound to this computer's loopback interface.

```sh
npm test            # Content contract checks
npm run build      # Production output in dist/
npm run preview    # Serve the production build; build first
npm run format     # Format source and documentation
npm run check      # Formatting check, tests and production build
```

## Project structure

```text
src/
  assets/       Original brand assets and local website photographs
  components/   Shared header, footer, cards and section building blocks
  content/      Business details, service packages and terms
  pages/        Home, services, contact, terms and not-found pages
  styles/       Design tokens, global rules and component styles
  App.jsx       Page routes and route-change scrolling/focus
  main.jsx      React entry point and shared stylesheet imports
public/         Favicon, sitemap and static-host routing/header rules
tests/          Automated checks
docs/           Approved design, plan, provenance and verification record
```

## Common edits

- **Phone, email or coverage:** edit `src/content/business.js`. Link destinations are explicit; update both displayed values and the corresponding `tel:`/`mailto:` values.
- **Packages and prices:** edit `src/content/services.js`. The same package objects supply both homepage previews and the full services page. `eligibility` holds restrictions; `inclusions` is a plain list.
- **Terms:** edit `src/content/terms.js` only with the owner's approved wording.
- **Brand colours and spacing:** edit `src/styles/tokens.css`. Global typography and common controls live in `global.css`; named component rules live in `components.css`.
- **Photography:** replace the imports in the relevant page component. Update the descriptive `alt` text and image dimensions to match the replacement. Keep images local and use compressed web-sized versions.
- **Hero video:** replace `public/detailing-hero.mp4`. `src/components/HeroMedia.jsx` handles muted inline looping, pause/play and the photo fallback. Reduced-motion and data-saving preferences disable video loading. The existing 720p film is about 15 MB; keep replacements web-sized and test their readability behind the heading.
- **Page copy:** edit the corresponding component in `src/pages/`. Small, page-specific text stays next to its markup; shared business facts live in `content/`.

Source is formatted with Prettier. Components use plain React and semantic HTML; there is no UI framework or backend to learn. The crown/wordmark is an image from the original brand asset, not a recreated logo.

## Pages and migration

| Path                | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `/`                 | Services overview, owner story and photographs  |
| `/services-pricing` | Full packages, prices and enquiry links         |
| `/contact`          | Telephone/email enquiries and service area      |
| `/t-c-s`            | Existing terms and conditions                   |
| `/about-us`         | Redirects to the homepage's owner-story section |

Unknown paths show a helpful not-found page. This client-rendered version returns the host's SPA fallback HTTP status; a host requiring true HTTP 404 responses needs matching server-side routing.

## Enquiries

Phone links open the visitor's phone app. Email links open the visitor's configured email app; they do not send email automatically. Selecting a service carries that service into the Contact page and email subject. There is no hosted enquiry form or visitor data storage. Adding a form later requires a delivery provider, server-side handling and appropriate privacy information.

## Production hosting

Run `npm run build` and host `dist/` on a static host. `public/_redirects` contains Netlify-style rules for the old About URL and SPA fallback. Configure equivalent rules on other hosts, so direct visits and refreshes at `/contact`, `/services-pricing` and `/t-c-s` work. `public/_headers` supplies optional static-host response headers.

The sitemap and robots file target the intended existing domain, `https://www.rhdetailing.co.uk`. Change them if the final domain differs. Keep previews private or prevent indexing through the preview host. Route-specific titles and descriptions are set client-side; social crawlers that don't run JavaScript will see the default homepage metadata. Consider prerendering if distinct social cards are needed.

This project has not changed the Wix website, domain, DNS or hosting. Before launch, have the owner check prices, photography and terms, then configure the chosen host and test redirects on the actual production domain.

See [content provenance](docs/content-sources.md) and [verification](docs/verification.md).

### Enquiries, Instagram and client review

See [client review setup](docs/client-review-setup.md) for Web3Forms configuration, the Behold Instagram connection and uploading to the client's separate Cloudflare account. Copy `.env.example` to `.env.local` to configure the public integration keys. Both connections remain inactive until configured.

`npm run build:review` creates `release/rh-detailing-review.zip`, ready for Cloudflare Pages Direct Upload with indexing disabled. Normal `npm run build` creates the production bundle.
