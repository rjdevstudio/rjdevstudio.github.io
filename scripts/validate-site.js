const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const canonicalHost = 'https://rjdevstudio.github.io';
const ignoredDirectories = new Set(['.git', '.github', '.playwright-mcp', 'node_modules']);
const canonicalPages = new Set([
  'index.html',
  'about/index.html',
  'jaap-counter/index.html',
  'jaap-counter/privacy-policy/index.html',
  'jaap-counter/terms/index.html',
  'jaap-counter/support/index.html',
  'jaap-counter/data-management/index.html',
]);
const errors = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignoredDirectories.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function relative(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}

function report(file, message) {
  errors.push(`${relative(file)}: ${message}`);
}

function resolveLocalReference(file, reference) {
  const cleanReference = reference.split('#')[0].split('?')[0];
  if (!cleanReference) return null;

  const target = cleanReference.startsWith('/')
    ? path.join(root, cleanReference.slice(1))
    : path.resolve(path.dirname(file), cleanReference);

  if (path.extname(target)) return target;
  return path.join(target, 'index.html');
}

const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const fileName = relative(file);
  const isCanonical = canonicalPages.has(fileName);

  const ids = [...content.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) report(file, `duplicate id(s): ${[...new Set(duplicates)].join(', ')}`);

  for (const match of content.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(reference)) continue;
    const target = resolveLocalReference(file, reference);
    if (target && !fs.existsSync(target)) report(file, `missing local target: ${reference}`);
  }

  if (isCanonical) {
    for (const required of [
      '<meta name="description"',
      '<link rel="canonical"',
      '<meta property="og:title"',
      '<meta property="og:description"',
      '<meta property="og:url"',
      '<meta property="og:image"',
      '<meta name="twitter:card"',
      '<meta name="viewport"',
    ]) {
      if (!content.includes(required)) report(file, `missing required metadata: ${required}`);
    }

    const canonical = content.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (!canonical?.startsWith(`${canonicalHost}/`)) report(file, 'canonical URL is not on the public host');

    for (const match of content.matchAll(/<meta (?:property|name)="(?:og:image|twitter:image)" content="([^"]+)"/g)) {
      const imageUrl = new URL(match[1]);
      if (imageUrl.origin !== canonicalHost) continue;
      const target = path.join(root, imageUrl.pathname.slice(1));
      if (!fs.existsSync(target)) report(file, `missing social image: ${match[1]}`);
    }
  }

  for (const match of content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      report(file, `invalid JSON-LD: ${error.message}`);
    }
  }
}

try {
  const manifestFile = path.join(root, 'site.webmanifest');
  const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  for (const icon of manifest.icons ?? []) {
    const target = resolveLocalReference(manifestFile, icon.src);
    if (!target || !fs.existsSync(target)) errors.push(`site.webmanifest: missing icon ${icon.src}`);
  }
} catch (error) {
  errors.push(`site.webmanifest: invalid JSON: ${error.message}`);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const page of canonicalPages) {
  const route = page === 'index.html' ? '/' : `/${page.replace(/index\.html$/, '')}`;
  if (!sitemap.includes(`<loc>${canonicalHost}${route}</loc>`)) {
    errors.push(`sitemap.xml: missing canonical route ${route}`);
  }
}

if (errors.length) {
  console.error(`Site validation failed with ${errors.length} error(s):\n`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Site validation passed for ${htmlFiles.length} HTML files.`);
}
