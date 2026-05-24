# Database Setup

This project currently runs as a static site using `assets/js/content.js`. The files in this folder prepare a production database path for hosts that want editable content later.

## Recommended Database

Use PostgreSQL or Supabase.

## Setup

1. Create a PostgreSQL database.
2. Run `database/schema.sql`.
3. Optionally run `database/seed.sql`.
4. Add the connection values to `.env.example`, then create a private `.env` on the hosting platform.

## Tables

- `projects`: engineering and software portfolio projects.
- `journal_items`: hobby, reading, and learning cards.
- `gallery_items`: gallery placeholders and future media URLs.
- `articles`: article metadata and optional article body.
- `contact_messages`: optional storage for future contact form submissions.

## Production Note

Do not expose `DATABASE_URL` in browser JavaScript. Use a serverless function, backend API, or Supabase Row Level Security policies before connecting the public website to the database.
