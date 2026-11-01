# SEO and performance implementation plan

Goal: Deliver crawlable page HTML, canonical URLs, sharing metadata and smaller media without changing the approved layout.

Architecture: Retain React/Vite. Build client assets, render each route through React DOM Server and StaticRouter, and write static HTML files for Cloudflare Pages. Keep review builds unindexed.

Constraints: Preserve current uncommitted reviews widget, client ownership, existing URL paths, forms and service query parameters. No DNS changes or external submissions.

- [x] Add output contract tests and confirm failure before implementation.
- [x] Generate page HTML and route-specific metadata; hydrate the client, including query-selected contact services. Generate 404 HTML and remove catch-all rewrite.
- [x] Generate responsive WebP assets and update image dimensions. Compress hero media if a suitable encoder is available.
- [x] Validate production and review HTML, local routes, assets and browser interactions. Update maintenance documentation.

Review focus: Client/server consistency for query parameters; missing routes; preview noindex on every HTML file; no build-time server files shipped; images resolve in rendered HTML.

Work in the current workspace to preserve the approved uncommitted widget and active preview. Do not commit or push unrelated changes automatically.

Validation: production and review builds pass their output contract checks; 13 unit/regression tests pass. Independent read-only review found no important regressions. Cloudflare HTTP behavior and field performance require deployment.
