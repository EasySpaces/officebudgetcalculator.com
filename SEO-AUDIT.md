# SEO audit: officebudgetcalculator.com

Audit date: 2026-09-25. Live site measured before any code changes. Source of truth is this repo (`main`, GitHub Pages, last-modified `Wed, 02 Sep 2026 22:05:11 GMT`).

## How the site is built and deployed

- Plain static HTML. No framework, bundler, `package.json`, linter, or test script.
- GitHub Pages: legacy build, branch `main`, folder `/` (repo root). No GitHub Actions workflow.
- `CNAME` is `officebudgetcalculator.com`. Certificate covers the apex and `www` (state `approved`, expires 2026-11-28).
- Pages API: `https_enforced` is **false**. `html_url` is `http://officebudgetcalculator.com/`.
- Homepage CSS is inlined in `index.html`. `assets/site.css` is used by the privacy and terms pages only.
- Calculator math lives in a script at the bottom of `index.html`. Do not change it.

## Live URL status (curl, no redirect follow unless noted)

| URL | Status | Notes |
| --- | --- | --- |
| `https://officebudgetcalculator.com/` | 200 | Final host. `content-type: text/html; charset=utf-8`. No `x-robots-tag`. No HSTS. |
| `https://officebudgetcalculator.com` | 200 | Same document as the slash URL. No redirect. |
| `https://www.officebudgetcalculator.com/` and no-slash | 301 | `Location: https://officebudgetcalculator.com/` |
| `http://officebudgetcalculator.com/` and no-slash | 200 | HTML is served over HTTP. Not redirected to HTTPS. |
| `http://www.officebudgetcalculator.com/` and no-slash | 301 | `Location: http://officebudgetcalculator.com/` (HTTP, not HTTPS). |
| `https://officebudgetcalculator.com/index.html` | 200 | Duplicate of the homepage. |
| `https://officebudgetcalculator.com/privacy/` | 200 | |
| `https://officebudgetcalculator.com/privacy` | 301 | to `/privacy/` |
| `https://officebudgetcalculator.com/terms/` | 200 | |
| `https://officebudgetcalculator.com/terms` | 301 | to `/terms/` |
| `https://officebudgetcalculator.com/about/`, `/services/`, `/office-space/` | 200 | Intentional noindex HTML stubs that meta-refresh and `location.replace` to the homepage. |
| `https://officebudgetcalculator.com/robots.txt` | 200 | |
| `https://officebudgetcalculator.com/sitemap.xml` | 200 | `content-type: application/xml` |
| `https://officebudgetcalculator.com/obc-upload/` | 200 | Full duplicate of the homepage, publicly served. |
| `https://officebudgetcalculator.com/HOW_TO_APPLY.md` | 200 | Internal apply notes, publicly served. |
| `https://officebudgetcalculator.com/supplied-files.tar.gz` | 200 | Archive, publicly served. |
| `https://officebudgetcalculator.com/patches/HOW_TO_APPLY.md` | 200 | |
| `https://officebudgetcalculator.com/favicon.ico` | 404 | Linked SVG and PNG icons return 200. |
| `https://officebudgetcalculator.com/google-site-verification.html` | 404 | No verification meta tag in the HTML either. |

`robots.txt` today:

```
User-agent: *
Allow: /

Sitemap: https://officebudgetcalculator.com/sitemap.xml
```

It does not block CSS, JS, or images. Sitemap reference is correct.

`sitemap.xml` lists only:

- `https://officebudgetcalculator.com/`
- `https://officebudgetcalculator.com/privacy/`
- `https://officebudgetcalculator.com/terms/`

Those are the canonical indexable URLs. The noindex stubs are correctly omitted. `lastmod` is `2026-09-02`.

## Homepage findings

### Already in good shape

- One H1: "Office Furniture Phoenix & Las Vegas: Calculate Your True Cost And Find the Hidden Savings".
- Heading outline is h1, then h2, then h3 under those sections. No skipped levels. 22 headings total.
- `<html lang="en">`, charset, and viewport meta are present.
- Unique title and meta description. Canonical and `og:url` are `https://officebudgetcalculator.com/`.
- Open Graph and Twitter card tags exist. No duplicate or conflicting canonical or description tags.
- No `noindex` on the homepage (meta or header). That is correct.
- `robots.txt` allows the page and assets and points at the sitemap.
- Content image `assets/office-setup.jpg` has width, height, WebP via `<picture>`, and `loading="lazy"` (it is below the fold).
- Hero is a CSS background, not lazy-loaded. WebP file exists (`assets/office-setup-hero.webp`, 1737×906).
- Fonts already use `preconnect` and `display=swap`.
- Internal links `/`, `/privacy/`, and `/terms/` return 200. Favicon SVG/PNG and apple-touch icon return 200.
- Calculator still runs. At 375px, 5,000 sq ft and 36 months produced Buy `$100,000`, rent-to-own `$2,930.56`, subscription `$2,905.56`, space `$8,750.00/mo`. San Diego shows the coming-soon state. 19 Calendly CTAs and 2 `tel:` links are present.

### Crawl and indexing

- HTTP apex returns 200 with the full page. Enforce HTTPS is off in the Pages settings. This cannot be fixed in the repo. Owner must turn on Enforce HTTPS.
- `https://officebudgetcalculator.com` and `/index.html` both return 200. GitHub Pages cannot emit a server 301 for those. Canonical already points at the slash URL. Do not change the live homepage URL.
- `/obc-upload/` is a second copy of the homepage (same title and a canonical to the apex) and is crawlable. `/obc-upload/privacy/` and `/obc-upload/terms/` are copies of the legal pages. About, services, and office-space stubs under `obc-upload/` already have `noindex`.

### Metadata and social image

- `og:image` and `twitter:image` point at a CloudFront PNG that returns 200 but is 2,752×1,536 and 6,958,126 bytes. It is not 1200×630, it is not hosted on this site, and the tags omit width, height, and alt.
- No Google site-verification meta or file. Do not invent one.

### Broken logo (rendering)

- Nav and footer `<img>` use `https://d2xsxph8kpxj0f.cloudfront.net/manus-storage/LogoEasySpaces_ced81977.png`.
- That URL returns **403** (also with a browser user-agent and a referer). `naturalWidth` is 0. `onerror` sets `display:none`, so the logo space collapses.
- Lighthouse `link-name` fails on the nav logo link (`href="#"`) because the image never loads and the link has no text.
- Pixel sample of the 375px screenshot: left side of the nav is empty navy; only the phone number paints on the right.
- `href="#"` is not a real home link.

### Structured data

One JSON-LD array with three entities:

- `WebApplication` for the free calculator. Price `0` USD matches the free tool. Keep, with accurate fields only.
- `LocalBusiness` includes `priceRange: "$$"` (not stated on the page) and `sameAs` pointing at this same site. Description says "commercial real estate tenant representation", which is stronger than the brand rule for new copy. No street address or hours are on the page, so those must stay omitted. Scottsdale is only a testimonial city, not a listed location. Footer locations are Gilbert, Phoenix, Las Vegas, and San Diego.
- `FAQPage` questions are not visible anywhere on the page. One answer says Easy Spaces negotiates the lease. That schema should not stay.

### Accessibility and mobile (measured)

Playwright + system Chrome, full-page screenshots, `document.scrollWidth` vs `clientWidth`:

| Width | Horizontal overflow (scrollWidth − clientWidth) | Controls under 44px in one dimension |
| --- | --- | --- |
| 320 | 0 | 20 |
| 375 | 0 | 20 |
| 390 | 0 | 20 |
| 414 | 0 | 20 |
| 768 | 0 | 22 |
| 1280 | 0 | 22 |
| 1440 | 0 | 22 |

The decorative `$$$` in the calculator section extends past the viewport and is clipped by `overflow: hidden`. It does not create a horizontal scrollbar.

Examples under ~44px (320px unless noted):

- Nav phone link, about 124×26.
- Square-foot range input, about 129×16. Number input, about 96×37.
- City `<select>`, about 237×38, and it has no associated label (`select-name` fails).
- Term buttons, about 83×37.
- "Yes / No" space buttons, about 160×36 and 170×36 at 768px.
- In-card "Terms" link, about 33×14. Privacy link beside it, about 152×32.
- Footer service, phone, email, and website links, about 22px tall. Footer legal links, about 20px tall.

Lighthouse label audit: the range and number inputs are not tied to their visible labels with `for` / `id`.

The solution image alt is a keyword sentence, not a description of the graphic. The graphic itself had a move-in timing line that was later rewritten. The tracking pixel has no `alt`.

### Performance (Lighthouse 12, live URL, 2026-09-25)

Mobile:

- Performance 0.84, accessibility 0.74, best practices 1.00, SEO 1.00
- FCP 1.8 s, LCP 3.3 s, TBT 350 ms, CLS 0.046, Speed Index 1.8 s, TTI 5.7 s
- LCP element is the hero background div (`assets/office-setup-hero.webp`)
- Render-blocking Google Fonts stylesheet, estimated savings 610 ms
- Unused JavaScript, estimated 144 KiB (GA4 and Meta Pixel)
- Third-party code blocked the main thread for 470 ms

Desktop (`--preset=desktop`):

- Performance 0.85, accessibility 0.74, best practices 0.78, SEO 1.00
- FCP 0.5 s, LCP 0.9 s, TBT 10 ms, CLS **0.281**, Speed Index 0.5 s, TTI 0.9 s
- Best-practices deductions are third-party cookies and DevTools issues from GA4 and the Meta Pixel. Those tags stay.

Hero background has no JPEG fallback if WebP is unsupported (`assets/office-setup-hero.jpg` exists and is unused). Logo has no width or height, so the failed image can collapse layout.

### External link check

| URL | Result |
| --- | --- |
| `https://calendly.com/interioravenue/website-inquiry` | 200 |
| `https://easyspaces.info` | 200 (final slash URL) |
| `https://calendly.com/privacy` (privacy page) | 200 after redirect to `https://calendly.com/legal/privacy-notice` |
| Google Fonts CSS URL used by the page | 200 |
| `https://www.googletagmanager.com/gtag/js?id=G-3MG1RK27XV` | 200 |
| `https://connect.facebook.net/en_US/fbevents.js` | 200 |
| Facebook noscript pixel | 200 |
| CloudFront logo PNG | **403** |
| CloudFront OG PNG | 200, but 6.9 MB and the wrong aspect ratio |

No external anchor returned a 4xx or 5xx. The broken resource is the logo image.

## Linked pages

### Privacy and terms

- Unique titles, descriptions, one H1 each, canonical HTTPS slash URLs, viewport, and lang.
- In the sitemap. No noindex. That is intentional.
- No Open Graph or Twitter tags.
- Phone number is text, not a `tel:` link.
- Footer and back links are small tap targets (same pattern as the homepage footer).
- No broken internal links. Calendly privacy link resolves.

### About, services, office-space

- Intentional `noindex` plus immediate redirect to the homepage. Leave the noindex in place. Keep them out of the sitemap.

## Approved wording, applied

Jason approved the wording items below. Applied on `index.html`, `terms/index.html`, the matching `obc-upload` copies, JSON-LD, Twitter text, image alt, and the solution graphic captions. Privacy has none of this text. Calculator math, prices, CTAs, and layout were not changed. GA4 ID `G-3MG1RK27XV` was left as written.

- Tenant representation is partner language. The landlord-paid fee is hedged: "typically at no cost to you", "typically costs you nothing", and "Their fee is typically paid by the landlord, so you usually pay nothing." Terms say those services are provided by partner tenant rep brokers under a separate written agreement, and the site creates no brokerage or agency relationship.
- Jason Bowman is labeled President, Easy Spaces. Don Brewer's testimonial still uses his own role title. That line does not label Jason.
- Move-in timing is scoped to after the space is set. The stats bar reads "2–4" / "Weeks to furnished & move-in ready". The solution graphic says "One Partner: One call covers space, furniture, and install. Furnished and move-in ready in 2–4 weeks once your space is set." The final line reads "Subscriptions from $349/month. Furnished and move-in ready in as little as 2–4 weeks. Zero upfront cost." The page title is "Phoenix & Las Vegas Office Furniture Costs | Easy Spaces" (56 characters), matched once each on `og:title` and `twitter:title`. The meta description, `og:description`, and `twitter:description` are the same 149-character line. JSON-LD `name` values stay "Office Budget Calculator" and "Easy Spaces" because they do not mirror that title. JSON-LD descriptions do not copy the old meta description, so they were left as written. Privacy title is 28 characters and its description is 149. Terms title is 32 and its description is 144. Both are unique and already inside the length limits.
- Owner confirmed on 2026-09-24 that subscription customers pay nothing at signing (no deposit, delivery, or install fee). Existing zero-upfront and $0 upfront claims stay as written.
- San Diego is only the calculator option "San Diego — Coming Soon". It is off the footer location lines. JSON-LD `areaServed` is Phoenix, AZ and Las Vegas, NV only. Gilbert stays as a showroom location in the footer, not as a served market in schema. Scottsdale stays only as a testimonial city.
- Las Vegas case study: the paragraph says the suite sat vacant for 7 months, then had a signed tenant within 18 days after a furnished-lease offer. The stat still says 18 Days. The caption is now "Time to signed tenant". Neither number changed.

## Still flagged, not changed

- "1,833+" is used both as installations and as "Desks Installed".
- Brand orange `#E8621A` (white text about 3.39:1) and teal `#1B7A7A` fail WCAG AA in several small or bold treatments. Decorative step numbers (`01`–`04`) are intentionally faint (about 1.2:1). Those colors were not recolored, because changing them would change the brand.
- A source comment says to confirm GA4 ID `G-3MG1RK27XV` before launch. The ID is the one in the live page. It was not changed.
- No street address or hours are published, so LocalBusiness rich-result fields that need them stay omitted.
- Enforce HTTPS and Search Console verification need the owner's GitHub Pages and Search Console access.
- `obc-upload` LocalBusiness still has `priceRange` and a self `sameAs`. That copy is `noindex`. It was not part of this wording pass beyond the claims above.

## Files expected to change

- `index.html` — local logo, home link, OG image tags, JSON-LD, image alt, form labels, tap-target CSS, hero WebP/JPEG fallback and preload, defer analytics until load, pixel `alt=""`.
- `assets/logo.svg` — new wordmark from the existing mark colors (`#12192C`, `#E8621A`) and the name already on the page, so the nav no longer depends on the 403 URL.
- `assets/og-image.jpg` — new 1200×630 image from the existing hero photo and on-page facts. No new claims.
- `privacy/index.html` and `terms/index.html` — OG and Twitter tags, `tel:` link, larger tap targets.
- `robots.txt` — keep the homepage and assets allowed; disallow the public archive, apply notes, and `patches/`; keep the sitemap line.
- `sitemap.xml` — same three canonical URLs; refresh `lastmod` only.
- `obc-upload/index.html`, `obc-upload/privacy/index.html`, `obc-upload/terms/index.html` — `noindex` so the duplicate copies are not indexable. Existing noindex stubs under `obc-upload/` stay as they are.

No URL slugs will change, so no redirect fallback is required. GitHub Pages still cannot 301 `/index.html` or HTTP to HTTPS from the repo.

## What changed

- `index.html`: local logo (`/assets/logo.svg`) and home link; 1200×630 `og:image` on this host with type, width, height, and alt; one Schema.org `@graph` (WebSite, WebApplication, Organization) with no FAQ, price range, self `sameAs`, address, hours, or ratings; calculator labels and 44px controls; readable helper text on light backgrounds; hero photo uses WebP with a JPEG fallback and is preloaded, not lazy-loaded; GA4 and the Meta Pixel wait until `window.load`. Measurement IDs are unchanged. Calculator constants are unchanged.
- `assets/logo.svg` and `assets/og-image.jpg` added. The social image is 1200×630 JPEG, 102,704 bytes, made from `assets/office-setup-hero.jpg` and facts already on the page (Phoenix and Las Vegas, compare buy / rent-to-own / subscription, from $349/month, $0 upfront).
- `privacy/index.html` and `terms/index.html`: Open Graph and Twitter tags, `tel:` links, 44px link targets.
- `robots.txt`: still allows `/` and assets, still points at the sitemap, and disallows `/patches/`, `/supplied-files.tar.gz`, and `/HOW_TO_APPLY.md`. `/obc-upload/` is allowed so crawlers can see `noindex`.
- `sitemap.xml`: same three canonical HTTPS URLs. `lastmod` set to 2026-09-25.
- `obc-upload/index.html`, `obc-upload/privacy/index.html`, `obc-upload/terms/index.html`: `noindex, nofollow`. The about, services, and office-space stubs were already `noindex` and were left that way.
- `.nojekyll` added so GitHub Pages serves the files as static HTML.

No live URL was renamed. No price, CTA, or calculator formula was edited.

### Wording pass

- Partner language replaced every sentence that presented Easy Spaces as the party negotiating the lease. Jason's card now says President. San Diego remains only as Coming Soon. The Las Vegas 18 Days caption is "Time to signed tenant".
- A later wording pass hedged the tenant-rep fee, scoped the 2–4 week line to after the space is set, and set the title to "Phoenix & Las Vegas Office Furniture Costs | Easy Spaces" (56 characters). The shared description is 149 characters.
- `assets/office-setup.jpg`, its WebP, and the `obc-upload/assets` copies had the caption cards redrawn on the same photo. The furniture-subscription card still says zero upfront cost. Owner confirmed that claim on 2026-09-24.

## Verification results

The repo has no build, lint, or test script.

### HTML and structured data

- W3C Nu validator (`https://validator.w3.org/nu/?out=json`) on `index.html`, `privacy/index.html`, and `terms/index.html`: **0 errors**. The only note is the existing trailing slash on void elements.
- `html-validate` recommended rules, with the pre-existing inline-style and void-slash rules turned off: **0 problems** on those three pages. The default preset reports 514 issues, almost all `no-inline-style` and `void-style` on markup that was already inline. Those were not rewritten, because doing so would be a restyle of the page.
- Homepage JSON-LD parses as one `@graph`. Types: `WebSite`, `WebApplication`, `Organization`. Properties used are on schema.org (`url`, `name`, `description`, `inLanguage`, `publisher`, `applicationCategory`, `operatingSystem`, `browserRequirements`, `offers` / `Offer.price` / `priceCurrency`, `provider`, `isPartOf`, `telephone`, `email`, `areaServed`, `logo` as `ImageObject` with `url`, `width`, `height`). No review, rating, `priceRange`, address, or hours. `sitemap.xml` parses as a urlset of the three canonical HTTPS URLs.

### Local server (this branch, `python3 -m http.server`, port 8765)

Python does not send an `x-robots-tag`. The live GitHub Pages responses also had none.

| Check | Result |
| --- | --- |
| Title | Office Furniture Phoenix & Las Vegas Cost Calculator \| Easy Spaces |
| Meta description | Office furniture Phoenix & Las Vegas cost calculator. Compare buying vs. rent-to-own vs. subscription. 1,833+ installs. From $349/mo. |
| Canonical and `og:url` | `https://officebudgetcalculator.com/` |
| `og:image` | `https://officebudgetcalculator.com/assets/og-image.jpg` (local file 200, `image/jpeg`, 1200×630) |
| Robots meta | none on `/`, `/privacy/`, `/terms/` |
| H1 | 1 on home, privacy, and terms |
| Heading outline | h1, then h2, then h3. 22 headings. No skipped level. |
| Images missing `alt` | none. Hero and the nav logo use `alt=""`. The solution graphic and footer logo have text. |
| Internal links | `/`, `/privacy/`, `/terms/` return 200. 19 Calendly links, 2 `tel:` links, 1 mailto, 1 easyspaces.info link remain. |
| `/about/`, `/services/`, `/office-space/` source | `noindex` plus redirect to the apex. Not in the sitemap. |
| `/obc-upload/` source | `noindex, nofollow` |
| `robots.txt` | Allow `/`, disallow the archive, apply notes, and `patches/`, sitemap line present |
| Calculator at 375px, 5,000 sq ft, 36 months | Buy `$100,000`, rent-to-own `$2,930.56`, subscription `$2,905.56`, space `$8,750.00/mo`. Same as the live baseline. San Diego still shows coming soon. |

Playwright horizontal overflow (`scrollWidth` minus `clientWidth`) after the fix was **0** at 320, 375, 390, 414, 768, 1280, and 1440. Controls under 44px in either dimension: **0** at each of those widths (was 20–22). Privacy at 320 and 375, and terms at 390 and 1280, also had overflow 0, one H1, and no undersized links.

The decorative `$$$` still extends past the calculator box and is clipped. It does not create a scrollbar.

### Lighthouse

Before: live `https://officebudgetcalculator.com/`. After: `http://127.0.0.1:8765/` on this branch. Same Lighthouse version and Chrome. Local TTFB is not the GitHub CDN, so small FCP moves are not a production prediction. CLS and accessibility moved with the code changes.

| | Mobile before | Mobile after | Desktop before | Desktop after |
| --- | --- | --- | --- | --- |
| Performance | 0.84 | 0.89 | 0.85 | 0.98 |
| Accessibility | 0.74 | 0.96 | 0.74 | 0.96 |
| Best practices | 1.00 | 0.79 | 0.78 | 1.00 |
| SEO | 1.00 | 1.00 | 1.00 | 1.00 |
| FCP | 1.8 s | 2.0 s | 0.5 s | 0.8 s |
| LCP | 3.3 s | 2.7 s | 0.9 s | 0.8 s |
| TBT | 350 ms | 270 ms | 10 ms | 0 ms |
| CLS | 0.046 | 0.024 | 0.281 | 0.056 |
| Speed Index | 1.8 s | 2.0 s | 0.5 s | 0.8 s |
| TTI | 5.7 s | 5.9 s | 0.9 s | 1.0 s |

After the fix, label, link-name, and select-name audits pass. The only accessibility failure left is color contrast on brand orange `#E8621A`, brand teal `#1B7A7A`, the faint step numbers, and the muted footer. Those were not recolored. Best-practices drops on mobile are third-party cookies from GA4 and the Meta Pixel, which are still on the page.

### External links (live curl, 2026-09-25)

No external anchor returned 4xx or 5xx. Calendly inquiry, easyspaces.info, the Google Fonts CSS file, GA4, and the Meta Pixel returned 200. `https://calendly.com/privacy` redirects to `https://calendly.com/legal/privacy-notice` (200). The CloudFront logo PNG returns **403**. The old CloudFront social PNG returns 200 but is 6.9 MB and 2752×1536; the page no longer references it.

### Artifacts

Before:

- `/opt/cursor/artifacts/seo-before/home-320.png`
- `/opt/cursor/artifacts/seo-before/home-375.png`
- `/opt/cursor/artifacts/seo-before/home-390.png`
- `/opt/cursor/artifacts/seo-before/home-414.png`
- `/opt/cursor/artifacts/seo-before/home-768.png`
- `/opt/cursor/artifacts/seo-before/home-1280.png`
- `/opt/cursor/artifacts/seo-before/home-1440.png`
- `/opt/cursor/artifacts/seo-before/lighthouse-mobile.report.html`
- `/opt/cursor/artifacts/seo-before/lighthouse-desktop.report.html`
- `/opt/cursor/artifacts/seo-before/measure.json`

After:

- `/opt/cursor/artifacts/seo-after/home-320.png`
- `/opt/cursor/artifacts/seo-after/home-375.png`
- `/opt/cursor/artifacts/seo-after/home-390.png`
- `/opt/cursor/artifacts/seo-after/home-414.png`
- `/opt/cursor/artifacts/seo-after/home-768.png`
- `/opt/cursor/artifacts/seo-after/home-1280.png`
- `/opt/cursor/artifacts/seo-after/home-1440.png`
- `/opt/cursor/artifacts/seo-after/privacy-375.png`
- `/opt/cursor/artifacts/seo-after/terms-1280.png`
- `/opt/cursor/artifacts/seo-after/lighthouse-mobile.report.html`
- `/opt/cursor/artifacts/seo-after/lighthouse-desktop.report.html`
- `/opt/cursor/artifacts/seo-after/measure.json`

A second render pass on 2026-09-25, after the fixes were committed, confirmed the same homepage result: one H1, the title and description above, canonical and `og:image` on the apex, no robots meta, no image missing `alt`, overflow 0 and no controls under 44px at 320, 375, 390, 414, 768, 1280, and 1440. Calculator at 5,000 sq ft and 36 months still returned Buy `$100,000`, rent-to-own `$2,930.56`, subscription `$2,905.56`. Live production was still the pre-fix page (`og:image` still on CloudFront, HTTP still 200).

## Wording verification (Brand Guardian pass, 2026-09-25)

- W3C Nu validator on `index.html`, `privacy/index.html`, and `terms/index.html`: 0 errors.
- `html-validate` with the same inline-style exceptions: 0 problems on those three pages. The noindex upload homepage still has its older head-pixel and unlabeled-input errors.
- Homepage JSON-LD parses. Organization `areaServed` is Phoenix, AZ and Las Vegas, NV. One H1. Title, `og:title`, and `twitter:title` are "Phoenix & Las Vegas Office Furniture Costs | Easy Spaces" (56 characters). The three description tags are identical and 149 characters.
- Local render: horizontal overflow 0 at 320, 375, and 1440. Calculator at 5,000 sq ft and 36 months still returns Buy `$100,000`, rent-to-own `$2,930.56`, subscription `$2,905.56`, space `$8,750.00/mo`.
- Owner confirmed on 2026-09-24 that subscription customers pay $0 at signing. Those claims stay as written. The final CTA is "Subscriptions from $349/month. Furnished and move-in ready in as little as 2–4 weeks. Zero upfront cost."

## Wording verification (2026-09-25)

- W3C Nu validator on `index.html`, `privacy/index.html`, and `terms/index.html`: 0 errors.
- `html-validate` with the same inline-style exceptions as the earlier pass: 0 problems on those three pages. The noindex `obc-upload/index.html` still has its pre-existing head-pixel and unlabeled-input errors. Those were not introduced by this pass.
- Homepage JSON-LD parses. Organization `areaServed` is Phoenix, AZ and Las Vegas, NV. The upload copy's LocalBusiness `areaServed` matches. One H1 on the homepage.
- Local render: horizontal overflow 0 at 320, 375, and 1440. Solution image natural width 1179. Calculator at 5,000 sq ft and 36 months still returns Buy `$100,000`, rent-to-own `$2,930.56`, subscription `$2,905.56`, space `$8,750.00/mo`. San Diego still shows the coming-soon state.
- Repo search excluding `patches/` and archives: the only remaining match for the title word is Don Brewer's testimonial line in `index.html` and `obc-upload/index.html`. It names his role at his company. It does not label Jason. GA4 ID `G-3MG1RK27XV` is unchanged.

## Search Console

No Search Console property is connected to this repo. `https://officebudgetcalculator.com/google-site-verification.html` returns 404, and there is no `google-site-verification` meta tag. Nothing was invented. Submitting a sitemap does not guarantee indexing or rankings. Google decides both.

Do this after the pull request is merged to `main`, and after Enforce HTTPS is turned on in the GitHub Pages settings for this repo (Settings, Pages, Enforce HTTPS). The certificate is already approved.

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add a property. Prefer a **Domain** property for `officebudgetcalculator.com` so both `www` and the apex are covered. If DNS access is not available, add a **URL prefix** property for `https://officebudgetcalculator.com/` (the canonical host, not `www`).
3. Verify it with the method Google shows:
   - Domain property: add the TXT record Google gives you at the DNS host for `officebudgetcalculator.com`, then click Verify.
   - URL prefix property: use the HTML tag or HTML file Google gives you. For the tag, add the exact `google-site-verification` meta tag to `index.html`, `privacy/index.html`, and `terms/index.html`, commit it to `main`, wait for Pages to publish, then click Verify. For the file, commit the file Google downloads to the repo root and wait for Pages to publish it at `https://officebudgetcalculator.com/<filename>`.
4. Open **Sitemaps**. Submit `sitemap.xml` (the full URL is `https://officebudgetcalculator.com/sitemap.xml`).
5. Open **URL inspection**. Enter `https://officebudgetcalculator.com/`. If the page is not indexed, choose **Request indexing**. Repeat for `https://officebudgetcalculator.com/privacy/` and `https://officebudgetcalculator.com/terms/` if you want those inspected too.
6. Check the inspection result later. "URL is on Google" means it was indexed. A crawl or sitemap submission only asks Google to look. It does not promise a ranking.
