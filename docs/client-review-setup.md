# Client review and connections

## Cloudflare account

Create a separate Cloudflare account owned by the client. Do not deploy this project to Dale’s existing account. The domain can stay with Wix during review.

In the client's Cloudflare dashboard, open Workers & Pages, create a Pages project using Direct Upload, and upload `release/rh-detailing-review.zip`. Cloudflare provides a `pages.dev` address to share with the client. No domain changes are needed for this review. Direct Upload projects cannot later switch to Git integration; a new project would be needed for that workflow.

Run `npm run build:review` to rebuild the ZIP after changes. It contains the static website only. Review builds request no indexing in HTML, robots.txt and response headers. This is not password protection: anyone with the link can view the site. Run `npm run build` for the normal production build when ready to launch.

## Web3Forms

Copy `.env.example` to `.env.local`. Add the client's Web3Forms access key as `VITE_WEB3FORMS_ACCESS_KEY`. Obtain the key for the inbox that should receive enquiries. Rebuild and upload again; Vite configuration is included at build time. For local development, restart the development server after changing environment values.

Both forms use the same key. The key is designed to be public in the browser; do not put private API tokens in these VITE variables. Enable appropriate spam protection in the Web3Forms dashboard. The provider's built-in checks apply; CAPTCHA can be added if needed, with the matching dashboard setting. Domain restrictions, if used, must include the review hostname as well as the final domain.

After connecting, send one clearly labelled test enquiry with permission, confirm it arrives in the client's inbox and verify the reply address. Check both forms, including an enquiry selected from a service page. Automated tests use stubbed responses and do not verify real delivery.

## Instagram: Behold JSON feed

Create a Behold account owned by the client. Connect `@rh.detail` using Behold's Instagram authorisation flow (Business or Creator account required). A connection authorisation link lets the client approve access without sharing their password. Create a JSON feed for up to six posts and put its public feed ID in `VITE_BEHOLD_FEED_ID`. Rebuild and upload.

The free plan currently supports six posts with daily refresh and 1,200 monthly views. Review current limits before launch: https://behold.so/pricing/. No paid plan has been started. Keep account credentials and Instagram access tokens out of this project.

The gallery loads near the viewport, displays only actual posts and links to Instagram. Without a configured or available feed, the section links to the Instagram profile. Video posts use thumbnails, not embedded autoplay videos.

## Before launch

Confirm both email delivery and the authorised Instagram feed, review the privacy wording with the client, then connect the domain in the client’s Cloudflare account. Check Wix email/DNS records before changing anything. No DNS records or registrar settings have been changed by this work.
