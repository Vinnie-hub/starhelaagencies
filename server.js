/* ═══════════════════════════════════════════════════════
   STARHELA AGENCIES — Local Development Server
   ═══════════════════════════════════════════════════════
   Mimics the production .htaccess rewrite rules locally:
     - Clean URLs  → serve .html files (e.g. /earn/surveys → earn/surveys.html)
     - .html URLs  → 301 redirect to clean URL (e.g. /earn/surveys.html → /earn/surveys)
     - Directory traversal protection
     - Serves static assets (CSS, JS, images) normally

   Usage:  npm run dev    (or:  node server.js)
   ═══════════════════════════════════════════════════════ */

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5500;
const ROOT = __dirname;

/* ── Helpers ────────────────────────────────────── */
const HTML_EXT = ".html";

/** Check if a file exists */
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/** Normalise path, strip trailing slash (except root) */
function cleanPath(p) {
  let normalised = path.normalize(p).replace(/\\/g, "/");
  // Remove trailing slash unless it's the root
  if (normalised.length > 1 && normalised.endsWith("/")) {
    normalised = normalised.slice(0, -1);
  }
  return normalised;
}

/* ── Middleware: Security headers (match .htaccess) ── */
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});

/* ── Middleware: 301 redirect .html URLs to clean URLs ── */
app.use((req, res, next) => {
  const url = req.path;

  // Only process requests ending in .html
  if (!url.toLowerCase().endsWith(HTML_EXT)) {
    return next();
  }

  // Build clean URL: strip .html
  const cleanUrl = url.slice(0, -HTML_EXT.length) || "/";

  // Preserve query string
  const qs = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
  const redirectUrl = cleanUrl + qs;

  // 301 Permanent Redirect
  return res.redirect(301, redirectUrl);
});

/* ── Middleware: Clean URL → .html file resolution ── */
app.use((req, res, next) => {
  const url = cleanPath(req.path);

  // Skip root (handled by Express static) and non-HTML requests
  if (url === "/" || url.includes(".")) {
    return next();
  }

  // Try: /earn/surveys → earn/surveys.html
  // Strip leading slash so path.join works correctly on Windows
  const relativePath = url.startsWith("/") ? url.slice(1) : url;
  const htmlPath = path.join(ROOT, relativePath + HTML_EXT);

  if (fileExists(htmlPath)) {
    // Serve the .html file at the clean URL
    return res.sendFile(htmlPath);
  }

  // Not found — let Express static try, then 404
  next();
});

/* ── Serve static files (CSS, JS, images, fonts, etc.) ── */
app.use(
  express.static(ROOT, {
    index: "index.html",
    setHeaders(res, filePath) {
      // Set correct MIME types for common extensions
      const ext = path.extname(filePath).toLowerCase();
      const mimeMap = {
        ".css": "text/css",
        ".js": "application/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".webp": "image/webp",
        ".ico": "image/x-icon",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".ttf": "font/ttf",
        ".xml": "application/xml",
        ".txt": "text/plain",
        ".pdf": "application/pdf",
      };
      if (mimeMap[ext]) {
        res.setHeader("Content-Type", mimeMap[ext]);
      }
    },
  }),
);

/* ── 404 fallback ────────────────────────────────── */
app.use((_req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="utf-8"><title>404 — Starhela</title>
    <style>
      body{font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#fafaf8;color:#1a1a18;text-align:center;padding:24px}
      h1{font-size:4rem;margin:0;color:#1d52cc} p{font-size:1.1rem;color:#4b4b47}
      a{color:#1d52cc;text-decoration:underline}
    </style>
    </head>
    <body>
      <h1>404</h1>
      <p>Page not found</p>
      <p><a href="/">← Back to Starhela</a></p>
    </body>
    </html>
  `);
});

/* ── Start ───────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║   STARHELA AGENCIES — Dev Server         ║
  ║   Listening on: http://localhost:${PORT}  ║
  ║   Clean URLs:      ✅ enabled            ║
  ║   .html → clean:    ✅ 301 redirect      ║
  ╚══════════════════════════════════════════╝
  `);
});
