# RJ Dev Studio website

Official static website for **RJ Dev Studio** and its Android app **Jaap Counter**. The repository is intended for the GitHub Pages organization site at:

https://rjdevstudio.github.io/

The site uses semantic HTML5, modern CSS, and minimal vanilla JavaScript only. There is no build step, backend, CMS, analytics, advertising script, external font, CDN, or remote image dependency.

## Local preview

From the repository root, run any simple static HTTP server, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Site structure

- `index.html` — RJ Dev Studio homepage
- `jaap-counter/index.html` — Jaap Counter product page
- `privacy/index.html` — Privacy Policy
- `terms/index.html` — Terms of Use
- `support/index.html` — support and FAQs
- `data-management/index.html` — deletion and data-management instructions
- `404.html` — GitHub Pages not-found page
- `assets/css/styles.css` — shared styling
- `assets/js/main.js` — small shared enhancement script
- `assets/img/` — local SVG branding assets
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `.nojekyll` — publishing metadata
- `.github/workflows/pages.yml` — GitHub Pages Actions deployment

## Editing content

Update page copy directly in the relevant `index.html` file. Shared visual styles belong in `assets/css/styles.css`; keep images local under `assets/img/`. Do not add third-party scripts, analytics, external fonts, remote images, or placeholder links.

Organization and contact details currently appear in page headers, footers, JSON-LD, the Privacy Policy, Terms, Support page, and this README. Search for `RJ Dev Studio`, `rjdevstudio@gmail.com`, and `com.jaapcounter.app` when making future updates.

## Canonical URLs and custom domains

The initial canonical base URL is:

https://rjdevstudio.github.io/

If a custom domain is added later, update canonical URLs and Open Graph URLs in each HTML page, plus `robots.txt`, `sitemap.xml`, and JSON-LD. Add a `CNAME` file only after the final custom domain has been selected.

## GitHub Pages deployment setup

The workflow in `.github/workflows/pages.yml` publishes the static repository root with no build step using maintained GitHub Actions:

- `actions/checkout`
- `actions/configure-pages`
- `actions/upload-pages-artifact`
- `actions/deploy-pages`

To enable Pages with GitHub Actions:

1. Open the repository on GitHub.
2. Go to Settings → Pages.
3. Set Source to GitHub Actions.
4. Merge changes into `main` or run the workflow manually.

## Google OAuth production checklist

- Homepage URL: `https://rjdevstudio.github.io/`
- Privacy Policy URL: `https://rjdevstudio.github.io/privacy/`
- Terms URL: `https://rjdevstudio.github.io/terms/`
- Authorized domain: `rjdevstudio.github.io`
- Verify app ownership in the relevant Google Console flows.
- Confirm the Play listing links to the public Privacy Policy and support pages.
- Review OAuth scopes and ensure Drive usage is limited to `drive.appdata` plus OpenID and basic account profile/email scopes.

A `github.io` site may not satisfy every Google OAuth verified-domain requirement. A custom domain owned by RJ Dev Studio may still be required for public OAuth verification.

## Legal review

The Privacy Policy and Terms are drafted for publication readiness, but the site owner should obtain legal review before production publication.
