# Starhela Agencies — Online Earning Platform

Africa's #1 trusted online earning platform. Chat with foreigners, complete tasks, and get paid via M-Pesa, MTN, or Airtel Money.

## Project Structure

```
starhelaagencies/
├── index.html              # Home page
├── bonus.html              # Agent referral bonus page
├── .htaccess               # Apache server config
├── robots.txt              # Search engine crawler rules
├── sitemap.xml             # XML sitemap for SEO
├── css/
│   ├── starhela.css        # Shared design system (unified CSS)
│   └── chatting.css        # Legacy (deprecated)
├── js/
│   ├── starhela.js         # Shared JavaScript framework
│   └── chatting.js         # Legacy (deprecated)
├── earn/                   # 6 earning activity pages
└── countries/              # 8 country-specific pages
```

## Design System

All pages share a unified design system via `css/starhela.css`:

- CSS Custom Properties for consistent tokens
- Dark/Light theme support via `data-theme` attribute
- Mobile-first responsive design
- Reusable components: nav, footer, hero, cards, modals, accordions

## JavaScript Framework

`js/starhela.js` provides: theme toggle, page transitions, mobile menu, FAQ accordion, geo-detection, registration flow, scroll reveal, ripple effects.

## Branding

- **Name**: Starhela Agencies
- **Colors**: Purple (#7c3aed), Green (#10b981), Gold (#f59e0b)
- **Typography**: Sora (headings), Plus Jakarta Sans (body), JetBrains Mono (code)

## Shared components (header, footer, topbar, loader, sprite)

Every page gets the same site chrome from `/partials`, so there is one place to edit each piece:

| Partial | What it is |
| --- | --- |
| `partials/head.html` | favicon, manifest, theme colour, shared fonts, `css/shared.css` |
| `partials/sprite.html` | the SVG icon sprite (add new icons here) |
| `partials/loader.html` | first-visit page loader |
| `partials/topbar.html` | dismissible announcement strip (text lives in `site.json`) |
| `partials/header.html` | navbar with the "Ways to earn" and "Countries" menus and mobile drawer |
| `partials/footer.html` | footer with contact details and links |
| `partials/site.json` | activities, countries, contact details, register/login URLs, announcement |

Pages stay plain static HTML (no build step on Vercel/Apache). Each partial is copied into the page
between marker comments such as `<!-- @shared:footer --> ... <!-- @end:footer -->`.

```bash
npm run build        # copy the partials into every page
npm run build:check  # fail if any page is out of date (use in CI)
```

Edit `partials/*` or `site.json`, then run `npm run build`. Do not edit the generated blocks inside
the markers by hand. Styles live in `css/shared.css` and behaviour in `js/shared.js`.
To add a new earning activity, add it to `activities` in `site.json` and rebuild.
The in-page tabs of the app-style pages (ads, training-ai, teaching-language, chatting) sit in a
`.sx-sub` sub-bar under the shared header.

## SEO, announcements and the bonus offer

- **SEO is generated.** Each page has `<!-- @shared:seo page="earn/chatting" -->` in its head. The title,
  description, canonical, Open Graph, Twitter cards and JSON-LD (WebPage + BreadcrumbList, plus
  Organization + WebSite on the home page) come from `pages` in `partials/site.json`, and the same data
  writes `sitemap.xml`. Edit the copy there, bump that page's `updated` date, then run `npm run build`.
  FAQPage JSON-LD stays hand-written in the page and must match the FAQ that is visible on it.
- **Rotating top bar.** The messages are `announcements` in `partials/site.json` (add or remove entries and
  rebuild). Behaviour lives in `js/shared.js` (5.5 s per message, pauses on hover/focus).
- **Welcome bonus** (`.sh-bonus`, home page, `js/starhela.js`). Offered only from :00 to :29 of each clock
  hour in the visitor's local time. Opening the page in that window starts a 10-minute countdown. After it
  ends, or when the visitor arrives at :30 or later, it stays hidden until the next hour. State is kept in
  `localStorage` (`sh_bonus_offer`).
- `404.html` is the shared not-found page (Vercel serves it automatically; `.htaccess` and `server.js` too).
