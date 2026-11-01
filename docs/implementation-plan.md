# RH Detailing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Deliver a polished, responsive local website that preserves RH Detailing's brand and makes its services easy to understand and enquire about.

**Architecture:** A small React/Vite application with React Router for page navigation, plain CSS design tokens, shared site components and separate business content modules. Use local brand images and photographs, without copying The Drive's business content or deployment configuration.

**Tech Stack:** React, React DOM, React Router, Vite; Node's built-in test runner for content checks. Use the existing local Node runtime; record exact installed dependencies and a lockfile.

**Spec:** [design.md](./design.md)

## Global Constraints

- All project source belongs in /Users/daleal/Desktop/RH-Detailing; leave CarScope and The Drive unchanged.
- Preserve the geometric crown/wordmark, black and warm gold branding.
- Keep business details, packages and terms outside presentation components.
- No booking, payments, accounts, analytics or nonfunctional submission forms.
- Existing prices are starting prices; maintenance is for returning customers after an initial clean.
- Deliver locally first; changing the Wix domain is outside this build.

## Review Focus

- Narrow screens: no horizontal overflow; menu works with keyboard and Escape.
- Direct URLs: services, contact, terms and unknown paths render the intended page.
- Enquiries: phone and email links point to the existing business; no false submission success.
- Content integrity: all four packages, inclusions and restrictions survive the redesign.
- Brand assets: original local logo and real photographs load without relying on Wix at runtime.

## Task 1: Content and brand assets

**Files:** src/content/business.js, src/content/services.js, src/content/terms.js, src/assets/, tests/content.test.js, package.json, package-lock.json, .gitignore, docs/content-sources.md.
**Interfaces:** business exports name, phone, phoneHref, email, emailHref, location and serviceAreas; services exports package objects with id, name, price, summary, inclusions and eligibility; terms exports titled paragraphs copied from the owner's existing page.

- [ ] Write content tests checking four package starting prices (£450, £175, £90, £75), returning-customer eligibility and contact destinations; run and confirm missing content fails.
- [ ] Add minimal package scripts for dev, build, preview and test; install the small dependency set and create the content modules.
- [ ] Retrieve the original logo and relevant RH photographs from their existing Wix asset URLs. Inspect files before choosing hero/crops; avoid using touring imagery as detailing work.
- [ ] Save source URLs and retrieval date. Preserve complete package inclusions and terms, modernising descriptive prose only.
- [ ] Run content tests; confirm pass and inspect logo against original.

## Task 2: Site shell and pages

**Files:** index.html, vite.config.js, src/main.jsx, src/App.jsx, src/components/SiteHeader.jsx, src/components/SiteFooter.jsx, src/components/ServiceCard.jsx, src/components/PageMeta.jsx, src/pages/HomePage.jsx, src/pages/ServicesPage.jsx, src/pages/ContactPage.jsx, src/pages/TermsPage.jsx, src/pages/NotFoundPage.jsx, src/styles/tokens.css, src/styles/global.css, src/styles/components.css.
**Interfaces:** App supplies routes /, /services-pricing, /contact and /t-c-s; /about-us redirects to /#about. Shared components consume Task 1 content. PageMeta sets page title and description.

- [ ] Build the semantic shell: skip link, responsive header, accessible disclosure menu, footer, route-change scroll and metadata.
- [ ] Implement Home with photographic hero, service previews, concise owner story, selected available real work, coverage and enquiry links. Do not invent reviews or gallery images.
- [ ] Implement Services with all package details and a clear explanation of bespoke quotes; Contact with phone/email links and coverage; Terms with retrieved owner text; useful not-found page.
- [ ] Apply black/gold design tokens, strong typography and photographic composition inspired by The Drive. Include reduced-motion support, visible focus and appropriate image dimensions/loading.
- [ ] Run production build; fix imports, missing assets and build failures before browser QA.

## Task 3: Verification and handover

**Files:** public/robots.txt, public/sitemap.xml, public/\_redirects, README.md, docs/verification.md.
**Interfaces:** Built dist/ is a static application; hosting must provide SPA fallback and the old About route redirect. Canonical domain is the existing RH domain only for eventual production use, not a claim of deployment.

- [ ] Document installation, local commands, content edits, asset replacement and static-host routing requirements. Document that mail links open the visitor's email application.
- [ ] Add crawl metadata and hosting routing guidance; ensure sitemap includes only real pages.
- [ ] Run the full test command and production build and record actual results.
- [ ] Serve the local production build and check desktop and narrow layouts, every route, direct route refresh, unknown URLs, menu open/close/Escape/focus, phone/email targets and image loading.
- [ ] Inspect source and output for accidental Drive branding, analytics, tour content and copied secrets. Record any remaining content or verification limitations.
- [ ] Deliver the local preview URL, source directory and editing instructions. Do not publish or replace Wix in this phase.

## Retrieved content note

The existing terms were successfully recovered from https://www.rhdetailing.co.uk/t-c-s on 21 October 2026. They cover immediate payment (24 hours by arrangement), 24-hour cancellation notice and full booking charge within that window, weather rescheduling at the business's discretion, 50% deposits above £100, commercial loading-area exclusions, access to water/electricity, and clearing personal belongings/litter. Preserve the owner's wording rather than drafting new terms.
