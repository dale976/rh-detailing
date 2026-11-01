# RH Detailing website design

## Purpose

Replace the dated Wix presentation with a fast, mobile-friendly website that helps local vehicle owners understand the services and enquire. Preserve RH Detailing's identity and existing factual service information. Use The Drive Production's visual composition as the reference, adapted to RH Detailing rather than copying its business content or configuration.

## Brand and visual direction

Keep the original geometric crown and RH Detailing wordmark, black backgrounds, warm gold accents and white text. Extract the existing logo asset rather than redraw it if a usable original is available. Use large automotive photographs, strong headings, generous spacing and clear calls to action. Use RH Detailing's own photographs; do not imply touring-company photographs show its work. Support reduced motion, keyboard navigation, visible focus and readable contrast.

## Pages

- Home: photographic hero, paint correction and ceramic coating positioning, service previews, a concise owner story, selected real work, service area and enquiry links. Combine the existing About page into this page.
- Services & Pricing: enhancement detail from £450, deep clean from £175, mini valet from £90 and maintenance from £75. Preserve package inclusions, three-year ceramic coating and returning-customer restrictions from the source. Explain bespoke quotes for other detailing and end-of-lease/pre-sale work. Starting prices remain indicative and subject to vehicle assessment.
- Contact: telephone, email, Lightwater location and Surrey/Hampshire/Berkshire coverage. Initially use working phone and email links. Do not display a form that claims to submit without a delivery service. A form integration can be added when a recipient and provider are configured.
- Terms: carry over the current owner's terms once retrieved; preserve the existing terms link until the text can be verified. Do not invent contractual provisions.

No booking engine, payments, customer accounts, analytics or fabricated testimonials. Do not repeat an unverified live review count.

## Human-maintainable implementation

Use React and Vite, consistent with the source template, with semantic CSS and a small dependency set. Keep pages separate from shared components. Avoid copying tour components, analytics identifiers, secrets, hosting identity or unused dependencies.

Suggested layout:

    src/
      components/    # SiteHeader, SiteFooter, ServiceCard, SectionHeading
      pages/         # HomePage, ServicesPage, ContactPage, NotFoundPage
      content/       # business details and package data
      assets/        # locally stored brand images and photographs
      styles/        # design tokens, global styles and component styles
      App.jsx
      main.jsx
    public/          # favicon, crawl metadata and hosting headers
    docs/            # design and content provenance
    README.md        # setup, scripts, content editing and deployment notes

Keep business details, service inclusions and prices in ordinary named content objects. Keep gold/black colour tokens and typography in CSS variables. Use descriptive component names and avoid generic component frameworks or abstractions for one-off sections.

## Routing and migration

Retain /services-pricing and /contact. Link old /about-us to the new homepage story section through deployment redirects. Preserve /t-c-s for the owner's terms. Include route-specific titles and descriptions, a sitemap and meaningful image alternative text. Deployment-specific redirects and canonical URLs must match the eventual host and domain.

## Verification

Run a production build and appropriate component/content checks. Verify desktop and narrow-screen layouts, navigation, direct route loading, keyboard menu behaviour, image loading and phone/email links. Check there are no remaining Drive company names, tour content or analytics identifiers. Document any integration and content gaps explicitly.

## Delivery

All source belongs in /Users/daleal/Desktop/RH-Detailing. The Drive source and CarScope remain unchanged. Deliver a local working project and preview first. Hosting and replacement of the existing Wix domain are subsequent deployment decisions.

## Content sources reviewed

- https://www.rhdetailing.co.uk/
- https://www.rhdetailing.co.uk/about-us
- https://www.rhdetailing.co.uk/services-pricing
- https://www.rhdetailing.co.uk/contact
- https://www.rhdetailing.co.uk/t-c-s (automated retrieval failed; needs verification)
- /Users/daleal/Desktop/the drive/the-drive-production (local design reference)
