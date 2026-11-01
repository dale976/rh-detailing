# Enquiries, message panel and Instagram gallery

## Agreed scope

Add a Contact form with first name, last name, email and message. Add a site-wide floating message panel that collects a name, email and message and sends it to the business; it is not a bot or live chat. Add a homepage Instagram gallery. Preserve the current design and use Web3Forms for submission as requested. Prepare a Cloudflare Pages review build for the client's separate account; do not deploy into the developer's account or change Wix/DNS.

## Approach

Keep the React/Vite frontend static. Contact and the message panel share validation and one Web3Forms submission module. Report success only when the provider confirms success. Preserve entered fields on failure and offer direct phone/email alternatives. A missing Web3Forms access key disables sending with an honest explanation. Use native browser form validation plus bounded input validation and provider spam filtering; include the documented optional botcheck field. No messages are stored in browser storage.

A custom backend was considered but would add hosting and email maintenance unnecessarily: Web3Forms supports browser-side submission. Reusing Wix Chat would retain a Wix dependency and would not match the selected delivery service, so the replacement uses an accessible custom message panel sharing the Contact submission path.

The Instagram recommendation is a Behold JSON feed, allowing a custom six-post gallery that fits the existing design without exposing Instagram account tokens. The client creates the connection and authorises the account. Only validated public feed/media links are rendered. With no feed configured, show a clear Instagram profile link rather than fake posts; feed failures retain that fallback. No account is created or subscription started by this implementation.

## Structure

- `src/lib/enquiries.js`: validation, payload mapping and Web3Forms response/error handling, tested offline with a controlled fetch.
- `src/components/EnquiryForm.jsx`: shared accessible form, Contact or compact name variant.
- `src/components/MessagePanel.jsx`: site-wide non-modal dialog with focus handling, Escape close, persistent in-memory draft while browsing, no bot behaviour.
- `src/lib/instagram.js` and `src/components/InstagramGallery.jsx`: feed normalization, allowlisted links, responsive imagery and profile fallback.
- `src/pages/PrivacyPage.jsx`: factual notice describing the actual data flow and contact route.
- `.env.example`: documented public configuration values, no real keys.
- `scripts/build-review.mjs`: creates a noindex review bundle for Cloudflare Pages without altering production crawl settings.

## External setup still required

The user will obtain the RH Detailing Web3Forms access key. The client needs a separate Cloudflare account and must authorise Instagram through the selected feed provider. Nothing should claim to have sent email, connected Instagram or deployed before those operations are verified. The domain stays with Wix until a later, deliberate DNS connection; domain transfer is not required just to use Cloudflare hosting.

## Verification

Test normalization/required fields, refusal to send without configuration, successful provider acceptance, provider failures/non-JSON responses/network failures and unsafe feed links. Build and review Contact, message panel, mobile keyboard/focus behaviour and no-config/error fallbacks. Do not send test mail to the client without explicit authorisation. Package only the built static assets, not environment files or source credentials.
