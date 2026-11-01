# RH Detailing — next steps and client checklist

Updated: 1 November 2026

## Project location and current status

The primary project is now `/Users/daleal/Projects/rh-detailing`. Open this folder in Codex and your editor for future work. The former `Documents/ChatGPT/RH Detailing` folder has been moved. The Desktop copy is an older duplicate: do not continue editing both copies or syncing changes back to it.

The contact form and chat-style message panel are implemented using Web3Forms, but sending remains disabled until a key is added. The Instagram gallery integration is prepared for Behold; it currently falls back to a profile link until connected. Individual Google reviews have not been implemented. The design is approved at this stage.

A Cloudflare review upload is available at `release/rh-detailing-review.zip`. Nothing has been published to the client's Cloudflare account and no Wix or domain settings have changed.

## What to request from the client

| Service            | Client action                                                                                           | What Dale needs                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Web3Forms          | Create an account using an email they control; configure and verify the receiving inbox                 | Website form access key and confirmation of the destination email                                                              |
| Cloudflare         | Create their own account and verify their email; invite Dale as a member                                | Membership invitation to Dale's existing Cloudflare email, plus account name; account ID is useful for command-line deployment |
| Instagram / Behold | Create a client-owned Behold account; authorise the RH Detailing Instagram account; create a JSON feed  | Public JSON feed URL or feed ID; confirmation Instagram is a Business or Creator account                                       |
| Google reviews     | Share the correct Google Maps business listing and identify the existing Wix reviews provider, if known | Maps share link, current widget provider/embed code if available, and agreement on any widget budget                           |
| Domain / Wix       | Confirm who owns the domain and whether any email or other services use it                              | Confirmation they can manage domain/DNS settings; existing DNS records before launch                                           |

The client keeps ownership and account recovery details. Use invitations or provider authorisation flows instead of requesting passwords, recovery codes or private Instagram tokens.

## 1. Web3Forms: enquiries from both forms

Client steps:

1. Create an account at [Web3Forms](https://web3forms.com/) using an email they control.
2. Create the website form/access key and complete the provider's email verification for the intended receiving inbox.
3. Give Dale the Web3Forms **access key** and confirm the receiving email address. Confirm whether this should remain `rhdetailing@outlook.com`.

Dale's steps:

- Copy `.env.example` to `.env.local` and set `VITE_WEB3FORMS_ACCESS_KEY`.
- Restart local development, or rebuild the hosted site after adding the key. Both the contact form and message panel use it.
- Check spam settings; if hostname restrictions are enabled, allow the review hostname and final domain as appropriate.
- Send clearly labelled test enquiries through both forms, confirm receipt with the client and check that Reply uses the visitor's address. Also test a service-specific enquiry.

This access key is designed for browser use and will be visible in the built site. It is different from private account credentials. Keep the local environment file out of Git; `.gitignore` already excludes it.

## 2. Cloudflare: client-owned hosting

Client steps:

1. Create a new [Cloudflare account](https://dash.cloudflare.com/sign-up) using their own email, verify it and enable two-factor authentication.
2. In that account, open **Manage account → Members → Invite members**. Dashboard labels may vary slightly.
3. Invite the email address Dale already uses for Cloudflare. Dale must supply that address; it is not recorded here.
4. For Pages deployment, use **Workers Platform Admin** in the client's account. This is broader than Pages alone, so review the permissions with the client. Do not request Super Administrator access. Domain/DNS permissions can be addressed separately before launch.
5. Tell Dale the account name. The account ID is useful if we deploy through command-line tooling, but it is not a password or a substitute for access.

Dale can belong to the client's account using his existing login. The website and resources will live in the client's account; this does not move Dale's other projects into it. Always check the selected account before deploying.

No Global API Key or client password is needed. If automation later needs a token, create a narrowly scoped token for this account and store it as a secret, never in a `VITE_` variable or repository.

### Choose the publishing route

- **Fast review:** create a Pages project using Direct Upload and upload `release/rh-detailing-review.zip`. Share the resulting `pages.dev` link. The client can review without changing the domain.
- **Ongoing development:** once the new GitHub repository is ready, consider Pages Git integration so future pushes deploy automatically. Grant Cloudflare access only to the selected repository. Configure `npm run build:review` and output directory `dist` while the whole deployment is for review; use `npm run build` for production when ready.

Direct Upload projects cannot be switched to Git integration in place. If we publish by upload now and want Git deployment later, create a new Pages project then. Git integration is worth choosing first if the empty repo will be ready shortly.

Review builds include no-index instructions. They remain publicly accessible to anyone with the link; no-index is not password protection.

Sources: [member invitations](https://developers.cloudflare.com/fundamentals/manage-members/manage/), [roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/), [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

## 3. Instagram: Behold JSON feed

The website is already prepared for **Behold**, using a custom gallery that matches RH Detailing's design.

Client steps:

1. Confirm `@rh.detail` is the correct account and that it is an Instagram **Business or Creator** account. Personal accounts cannot connect through Behold's current integration.
2. Create a client-owned account at [Behold](https://behold.so/).
3. Add an Instagram source and complete Instagram's authorisation flow themselves. Alternatively, Dale can prepare the connection and send Behold's unique authorisation link for the client to approve. No password needs to be shared.
4. Create a user feed for RH Detailing, choose **JSON feed**, and provide the public feed URL or feed ID.

Dale adds the feed ID as `VITE_BEHOLD_FEED_ID`, rebuilds and checks actual posts on desktop and mobile. No private Instagram access token belongs in the project. If the client changes their Instagram password or revokes access, the connection may need reauthorising.

The current free plan supports six posts, daily refresh and 1,200 monthly views; the feed pauses when its free limit is reached. Review limits and any branding before launch. No subscription has been purchased.

Sources: [Behold connection instructions](https://behold.so/docs/getting-started/), [current plans](https://behold.so/pricing/).

## 4. Google reviews: show individual reviews

Yes, we can display individual reviews as well as a rating badge. Suggested presentation: three review cards, reviewer names and ratings, a clear Google attribution and a link to read more on Google. Use real, sourced reviews and avoid another floating badge that overlaps page controls.

### Recommended first route: a reviews widget

First ask whether the existing Wix badge comes from a separate provider and whether the client already pays for it. Its subscription or embed may be reusable outside Wix; a Wix-specific app may not be portable. Do not assume the badge itself provides access to individual reviews.

If a new service is needed, evaluate [Elfsight Google Reviews](https://elfsight.com/google-reviews-widget/) as a candidate before buying a plan. Its documented connection accepts a business listing/Place ID and does not require the client to create a Google API key. Confirm the exact RH Detailing listing works in its preview, then check current view limits, refresh frequency, branding, styling and subscription price. This is a proposed provider, not an installed or purchased integration.

Ask the client for:

- The **Google Maps share link** for the correct RH Detailing business listing. A Place ID also works if they already know it.
- The name of the existing badge provider and its embed code/account invitation, if available.
- Whether they accept provider branding and whether there is a small ongoing budget if a free plan is insufficient.
- Approval of the provider and plan before a subscription is started. For a new widget, the client should own the service account and provide its widget/embed ID or code.

A public-listing widget generally does not need their Google password or Business Profile manager access. Only approve a Google account connection if the chosen provider actually requires it and its permissions have been reviewed. Update the site's privacy notice for whichever provider is selected.

### Custom alternatives

| Route                       | What it needs                                                                                                                | Trade-off                                                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Google Places API           | Google Cloud project with billing, Places API enabled, correct Place ID, restricted API credentials and implementation work  | Custom styling, but returns at most five reviews selected by Google. Google's attribution and content-storage rules apply. |
| Google Business Profile API | A verified business location, approved API access and owner/manager OAuth authorisation, plus secure server-side integration | Paginated reviews are possible, but setup and ongoing credential handling make this a larger project.                      |

Do not put private Google credentials into the static frontend. We should settle the provider before asking the client to create a Google Cloud project or enable billing. The quickest review launch can proceed without this enhancement.

Sources: [Elfsight connection requirements](https://elfsight.com/google-reviews-widget/), [Places review limit](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places), [Places attribution policies](https://developers.google.com/maps/documentation/places/web-service/policies), [Business Profile reviews API](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list).

## 5. Domain and launch: later, after review

Keep the Wix website running while the client reviews the new site. Ask who manages `rhdetailing.co.uk`, whether its registration is with Wix, and whether email or other services depend on the domain. Export or record the current DNS entries before changes.

Domain registration and website hosting are separate: moving the website does not necessarily mean transferring the registration. Confirm Wix's available DNS controls before choosing the final connection method. Cloudflare Pages requires the apex domain to be a zone in the same Cloudflare account; connecting it normally involves nameserver changes. Preserve email and verification records.

Do not cancel Wix services until the domain, HTTPS, redirects, email and new website are confirmed working. Check which Wix subscription covers hosting versus domain registration before cancelling anything.

Source: [Cloudflare Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Implementation checklist for the next session

- [ ] Open `/Users/daleal/Projects/rh-detailing` as the working project; stop old preview servers and restart from this folder.
- [ ] Receive the empty GitHub repository URL and connect this project's existing Git repository.
- [ ] Review the first commit: include source and documentation; exclude `.env.local`, dependencies and generated build/release folders. Do not overwrite the existing repository metadata.
- [ ] Choose Cloudflare Git integration or Direct Upload, accept the client's membership invitation and publish a review URL in their account.
- [ ] Add Web3Forms configuration and confirm delivery through both forms.
- [ ] Connect Behold and check the six-post gallery with real content.
- [ ] Assess the existing Google badge/provider, then select and implement individual reviews if approved.
- [ ] Review privacy wording, mobile layout, keyboard navigation and provider failure states.
- [ ] Get final client approval of content, prices, contact details and integrations.
- [ ] Build for production, connect the domain and check redirects, HTTPS and email.
- [ ] After verification, retire duplicate local copies and decide what Wix services can be cancelled.

Further technical setup is in [client-review-setup.md](client-review-setup.md). This checklist is the main handover for continuing work.
