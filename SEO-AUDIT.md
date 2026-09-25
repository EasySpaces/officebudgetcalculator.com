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

The solution image alt is a keyword sentence, not a description of the graphic. The graphic itself reads "Work with tenant reps", "Furniture subscription", and "7-28 days". The tracking pixel has no `alt`.

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

## Flagged for owner, not changed

- The page says move-in in **7–28 days** (stats bar, final CTA, image, Twitter description, FAQ schema). Preferred language supplied for this audit is "fast move-in in 2–4 weeks". Left as written.
- Tenant-rep wording is inconsistent. Hero pill and the solution graphic say "Work with tenant reps". Other sentences say "As licensed tenant rep brokers we negotiate your lease" (solution section, calculator CTA, and the "What You Get Back" card). Terms say tenant representation is provided under a separate written agreement with the relevant licensed brokerage. Not rewritten.
- Jason Bowman is labeled **Founder** on the page. New copy in this project uses **President** only. The visible title was not changed.
- Footer lists San Diego as a location. The calculator lists San Diego as "Coming Soon".
- Las Vegas case study label says "Vacancy Duration: 18 Days". The paragraph says the suite was vacant for 7 months and then leased within 18 days.
- "1,833+" is used both as installations and as "Desks Installed".
- Brand orange `#E8621A` (white text about 3.39:1) and teal `#1B7A7A` fail WCAG AA in several small or bold treatments. Decorative step numbers (`01`–`04`) are intentionally faint (about 1.2:1). Those colors were not recolored, because changing them would change the brand.
- A source comment says to replace GA4 ID `G-3MG1RK27XV` before launch. The ID is the one in the live page. It was not changed. Confirm it is the production property.
- No street address or hours are published, so LocalBusiness rich-result fields that need them stay omitted.
- Enforce HTTPS and Search Console verification need the owner's GitHub Pages and Search Console access.

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

Not started. This file is the pre-change audit.

## Verification results

Baseline only. See the tables above. Before screenshots and Lighthouse reports:

- `/opt/cursor/artifacts/seo-before/home-320.png`
- `/opt/cursor/artifacts/seo-before/home-375.png`
- `/opt/cursor/artifacts/seo-before/home-390.png`
- `/opt/cursor/artifacts/seo-before/home-414.png`
- `/opt/cursor/artifacts/seo-before/home-768.png`
- `/opt/cursor/artifacts/seo-before/home-1280.png`
- `/opt/cursor/artifacts/seo-before/home-1440.png`
- `/opt/cursor/artifacts/seo-before/lighthouse-mobile.report.html`
- `/opt/cursor/artifacts/seo-before/lighthouse-mobile.report.json`
- `/opt/cursor/artifacts/seo-before/lighthouse-desktop.report.html`
- `/opt/cursor/artifacts/seo-before/lighthouse-desktop.report.json`
- `/opt/cursor/artifacts/seo-before/measure.json`

After-fix checks will be appended here once the code changes exist.
