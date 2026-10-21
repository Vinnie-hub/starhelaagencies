#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════
   STARHELA — shared partials sync
   ═══════════════════════════════════════════════════════
   Pages stay plain, fully static HTML (so Vercel / Apache / the dev server
   need no build step). The shared pieces live once in /partials and are
   copied into every page between marker comments:

       <!-- @shared:header fixed height="72" -->
       ...generated, do not edit by hand...
       <!-- @end:header -->

   Usage
     npm run build        write partials into every page
     npm run build:check  exit 1 if any page is out of date (for CI)

   Marker names:   head | seo | sprite | loader | gate | topbar | header | footer | scripts
   The seo marker takes page="earn/chatting" and is generated from site.json "pages"
   (title, description, canonical, Open Graph, Twitter, JSON-LD). The same data
   also writes sitemap.xml.
   Marker options: bare word = true (fixed), key="value" (height="72").
   Content data (links, contact details, activities, countries) lives in
   partials/site.json, so header and footer can never drift apart.
   ═══════════════════════════════════════════════════════ */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PARTIALS = path.join(ROOT, "partials");
const CHECK = process.argv.includes("--check");

const site = JSON.parse(fs.readFileSync(path.join(PARTIALS, "site.json"), "utf8"));
site.year = String(new Date().getFullYear());

/* ── tiny template engine ─────────────────────────────
   {{var}}                         value from the item, then page options, then site.json
   {{#if key}} … {{/if}}           render when key is truthy
   {{#each list}} … {{/each}}      loop over an array in site.json
   (blocks of the same kind are not nested)                          */
function render(tpl, ctx) {
  const get = (key, local) =>
    local && local[key] !== undefined ? local[key] : ctx[key] !== undefined ? ctx[key] : "";

  const ifs = (src, local) =>
    src.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, key, inner) =>
      get(key, local) ? inner : "",
    );
  const vars = (src, local) =>
    src.replace(/\{\{(\w+)\}\}/g, (_, key) => String(get(key, local)));

  const withEach = tpl.replace(/\{\{#each (\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (_, list, inner) =>
    (ctx[list] || []).map((item) => vars(ifs(inner, item), item)).join(""),
  );
  return vars(ifs(withEach, null), null);
}


/* ── SEO block (title, meta, social cards, JSON-LD) ── */
const esc = (v) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const urlFor = (key) => site.siteUrl + (key === "index" ? "/" : "/" + key);

function seoBlock(key) {
  const pg = site.pages[key];
  if (!pg) throw new Error(`site.json has no "pages" entry for "${key}"`);
  const out = [];
  out.push(`<title>${esc(pg.title)}</title>`);
  out.push(`<meta name="description" content="${esc(pg.description)}" />`);
  if (pg.noindex) {
    out.push('<meta name="robots" content="noindex, follow" />');
    return out.join("\n    ") + "\n";
  }
  const url = urlFor(key);
  const image = pg.image || site.defaultImage;
  out.push('<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />');
  out.push(`<link rel="canonical" href="${url}" />`);
  out.push(
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${esc(site.siteName)}" />`,
    `<meta property="og:locale" content="${pg.locale || "en_KE"}" />`,
    `<meta property="og:title" content="${esc(pg.title)}" />`,
    `<meta property="og:description" content="${esc(pg.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:alt" content="${esc(pg.title)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(pg.title)}" />`,
    `<meta name="twitter:description" content="${esc(pg.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<meta name="twitter:image:alt" content="${esc(pg.title)}" />`,
  );

  const orgId = site.siteUrl + "/#organization";
  const siteId = site.siteUrl + "/#website";
  const graph = [];
  if (key === "index") {
    graph.push({
      "@type": "Organization",
      "@id": orgId,
      name: site.siteName,
      url: site.siteUrl + "/",
      logo: { "@type": "ImageObject", url: site.logo },
      email: site.email,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phoneHref,
        email: site.email,
        contactType: "customer service",
        availableLanguage: ["English", "Swahili", "French"],
      },
      sameAs: [site.whatsapp, site.whatsappChannel],
    });
    graph.push({
      "@type": "WebSite",
      "@id": siteId,
      url: site.siteUrl + "/",
      name: site.siteName,
      inLanguage: "en",
      publisher: { "@id": orgId },
    });
  }
  const lang = pg.lang || "en";
  const webpage = {
    "@type": "WebPage",
    "@id": url + "#webpage",
    url,
    name: pg.title,
    description: pg.description,
    inLanguage: lang,
    isPartOf: { "@id": siteId },
    primaryImageOfPage: { "@type": "ImageObject", url: image },
  };
  if (key !== "index") {
    webpage.breadcrumb = { "@id": url + "#breadcrumb" };
    graph.push(webpage);
    graph.push({
      "@type": "BreadcrumbList",
      "@id": url + "#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl + "/" },
        { "@type": "ListItem", position: 2, name: pg.crumb || pg.title, item: url },
      ],
    });
    // the WebSite node lives on the home page; reference it by id
  } else graph.push(webpage);

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)
    .replace(/</g, "\\u003c");
  out.push(`<script type="application/ld+json">\n${json}\n</script>`);
  return out.join("\n    ") + "\n";
}

function sitemapXml() {
  const rows = Object.keys(site.pages)
    .filter((k) => !site.pages[k].noindex)
    .map((k) => `  <url>\n    <loc>${urlFor(k)}</loc>\n    <lastmod>${site.pages[k].updated}</lastmod>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join("\n")}\n</urlset>\n`;
}

/* ── find pages ───────────────────────────────────── */
function listPages() {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (["node_modules", ".git", "partials", "scripts"].includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) out.push(full);
    }
  };
  walk(ROOT);
  return out.sort();
}

function parseOptions(raw) {
  const opts = {};
  raw.replace(/(\w+)(?:="([^"]*)")?/g, (_, key, value) => {
    opts[key] = value === undefined ? true : value;
    return "";
  });
  return opts;
}

const MARKER = /<!-- @shared:(\w+)([^>]*?)-->([\s\S]*?)<!-- @end:\1 -->/g;
const cache = {};
const partial = (name) =>
  (cache[name] ||= fs.readFileSync(path.join(PARTIALS, `${name}.html`), "utf8").replace(/\r\n/g, "\n"));

let changed = 0;
let stale = 0;
let total = 0;

for (const file of listPages()) {
  const original = fs.readFileSync(file, "utf8");
  const crlf = original.includes("\r\n");
  const text = original.replace(/\r\n/g, "\n");
  if (!MARKER.test(text)) continue;
  MARKER.lastIndex = 0;
  total++;

  let next = text.replace(MARKER, (_, name, rawOpts) => {
    const opts = parseOptions(rawOpts);
    const body = name === "seo" ? seoBlock(opts.page) : render(partial(name), { ...site, ...opts });
    const attrs = rawOpts.trim() ? ` ${rawOpts.trim()}` : "";
    return `<!-- @shared:${name}${attrs} -->\n${body}<!-- @end:${name} -->`;
  });

  if (crlf) next = next.replace(/\n/g, "\r\n");
  if (next !== original) {
    stale++;
    const rel = path.relative(ROOT, file);
    if (CHECK) console.log(`  out of date: ${rel}`);
    else {
      fs.writeFileSync(file, next);
      changed++;
      console.log(`  updated: ${rel}`);
    }
  }
}

const SITEMAP = path.join(ROOT, "sitemap.xml");
const wantSitemap = sitemapXml();
const haveSitemap = fs.existsSync(SITEMAP) ? fs.readFileSync(SITEMAP, "utf8").replace(/\r\n/g, "\n") : "";
if (haveSitemap !== wantSitemap) {
  stale++;
  if (CHECK) console.log("  out of date: sitemap.xml");
  else {
    fs.writeFileSync(SITEMAP, wantSitemap);
    changed++;
    console.log("  updated: sitemap.xml");
  }
}

if (CHECK) {
  if (stale) {
    console.error(`\n${stale} page(s) out of date. Run: npm run build`);
    process.exit(1);
  }
  console.log(`All ${total} pages are in sync with /partials.`);
} else {
  console.log(`\n${total} pages checked, ${changed} updated.`);
}
