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
