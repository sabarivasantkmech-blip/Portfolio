# Engineering Graduate Portfolio

A production-ready static portfolio for an engineering graduate. It includes project cards, skills, hobbies, gallery placeholders, article placeholders, dark theme support, and a fluid canvas hero.

## Structure

- `index.html`: The single-page app shell, SEO metadata, navigation, and section layout.
- `assets/css/styles.css`: All visual styles, responsive layout, light theme, and dark theme variables.
- `assets/js/content.js`: Host-managed content for projects, hobbies, gallery slots, and articles.
- `assets/js/app.js`: Rendering, filtering, theme persistence, navigation behavior, reveal animation, and canvas background.
- `database/schema.sql`: PostgreSQL/Supabase-ready schema for future hosted content management.
- `database/seed.sql`: Optional starter database rows.
- `deployment/site.config.json`: Production URL and deployment placeholders.
- `site.webmanifest`: Basic install/share metadata.
- `_headers`: Security headers for static hosts that support Netlify-style header rules.
- `SECURITY.md`: HTTPS certificate, cookie, session, and deployment security guidance.
- `robots.txt` and `sitemap.xml`: Search engine defaults. Update the domain before publishing.

## Manage Content

Edit `assets/js/content.js` to update the portfolio without touching the application logic.

Each project can link to a gallery slot and an article using:

```js
galleryId: "dashboard-wireframes",
articleId: "dashboard-case-study",
```

Make sure those IDs exist in `galleryItems` and `articleItems`.

## Publish Checklist

1. Replace placeholder email and social links in `index.html`.
2. Replace placeholder projects, gallery slots, and articles in `assets/js/content.js`.
3. Update `sitemap.xml` with the final domain.
4. Add real preview images if you want richer social sharing.
5. Configure HTTPS certificates through the hosting provider or server. See `SECURITY.md`.
6. Replace `https://your-domain.example` in `.env.example`, `deployment/site.config.json`, `robots.txt`, and `sitemap.xml` after a real deployment URL is available.
7. Upload the folder to any static host such as GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a normal web server.

## Database Setup

The live page still uses static content from `assets/js/content.js`. For a database-backed production version, use `database/schema.sql` and `database/seed.sql`, then connect through a private backend API or serverless function. Do not expose `DATABASE_URL` in browser code.

## Local Preview

Open `index.html` directly in a browser. No build step is required.
