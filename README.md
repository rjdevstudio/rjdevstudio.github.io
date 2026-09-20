# RJ Dev Studio website

Official static website for **RJ Dev Studio** and its first public Android app, **Jaap Counter**:

https://rjdevstudio.github.io/

The site uses semantic HTML, modern CSS, and minimal vanilla JavaScript. It has no framework, build step, backend, analytics, ads, cookies, external fonts, CDN, or remote image dependency.

## Local preview

From the repository root, run a static HTTP server:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/`.

## Validation

The dependency-free validator requires only Node.js:

```bash
node scripts/validate-site.js
```

It checks local links and assets, canonical URLs, required metadata, duplicate IDs, JSON-LD, the web manifest, and sitemap routes.

## Canonical routes

- `/` — RJ Dev Studio homepage
- `/about/` — studio information and contact
- `/jaap-counter/` — Jaap Counter product page
- `/jaap-counter/privacy-policy/` — Privacy Policy
- `/jaap-counter/terms/` — Terms of Use
- `/jaap-counter/support/` — support and FAQs
- `/jaap-counter/data-management/` — local and Google Drive data-management instructions
- `/404.html` — GitHub Pages not-found page

Older top-level and `/apps/jaap-counter/` URLs remain as compatibility redirects. Do not use them as canonical links.

## Content and assets

Shared styles live in `assets/css/styles.css`, and the accessible mobile-navigation enhancement lives in `assets/js/main.js`. Branding, the Jaap Counter icon, optimized local app screenshots, manifest icons, and social-preview artwork live under `assets/img/`.

Keep product claims aligned with the current Jaap Counter implementation and Google Play listing. Do not add placeholder apps, fake screenshots, ratings, user counts, team members, testimonials, awards, hard-coded prices, or privacy claims that ignore optional Drive backup and Firebase diagnostics.

## Canonical URL and custom domains

The current canonical base URL is:

https://rjdevstudio.github.io/

If RJ Dev Studio adopts a custom domain, update canonical and Open Graph URLs in each canonical HTML page, plus JSON-LD, `robots.txt`, `sitemap.xml`, and redirect targets. Add `CNAME` only after the real domain is selected and verified.

## GitHub Pages deployment

`.github/workflows/pages.yml` publishes the repository root from `main` using GitHub's maintained Pages actions and no build step.

1. In **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Merge a reviewed pull request into `main`, or run **Deploy GitHub Pages** manually.
3. Confirm the `github-pages` environment deployment and public routes.

If the repository is still configured to publish from a legacy branch, switch it to GitHub Actions only after the replacement workflow is available on `main`.

## Google OAuth production checklist

- Homepage: `https://rjdevstudio.github.io/`
- Privacy Policy: `https://rjdevstudio.github.io/jaap-counter/privacy-policy/`
- Terms: `https://rjdevstudio.github.io/jaap-counter/terms/`
- Authorized domain: `rjdevstudio.github.io`
- Confirm Drive usage remains limited to `drive.appdata` with OpenID and basic account email/profile scopes.
- Confirm the Play listing links to the canonical Privacy Policy and support pages.

A `github.io` site may not satisfy every verified-domain or brand requirement. A custom domain owned and verified by RJ Dev Studio may still be required for Google OAuth production review.

## Legal review required

The Privacy Policy, Terms of Use, support guidance, and data-management instructions are implementation-aligned drafts for publication. **The owner should obtain qualified legal review before treating them as final production legal advice**, and should review them again whenever app behavior, providers, permissions, purchase terms, or retention practices change.
