# Security and HTTPS Deployment

This portfolio is a static site. HTTPS certificates are not stored inside the project because TLS certificates must be issued and renewed by the hosting provider or server.

## HTTPS Certificate Setup

Use one of these production paths:

- GitHub Pages: enable `Enforce HTTPS` in repository Pages settings after adding the custom domain.
- Netlify: add the domain, verify DNS, then enable the automatic Let's Encrypt certificate.
- Vercel: add the domain and let Vercel issue the certificate automatically.
- Cloudflare Pages: connect the domain and keep SSL/TLS mode on `Full` or `Full (strict)`.
- VPS/server: use Caddy automatic HTTPS, Certbot with Nginx/Apache, or another ACME client.

## Required HTTPS Behavior

- Redirect all HTTP requests to HTTPS.
- Enable HSTS only after confirming HTTPS works on the production domain.
- Keep certificates auto-renewing.
- Do not commit private keys, certificates, `.pem`, `.key`, or `.pfx` files into this project.

## Cookie and Session Policy

This template does not create server-side user sessions. It stores only:

- `portfolio-theme`: remembers light or dark theme preference.
- `portfolio-cookie-consent`: remembers that the visitor acknowledged the cookie notice.

If a future host adds login, analytics, or forms, update the visible policy section in `index.html` and configure cookies as:

- `Secure`
- `HttpOnly` for session identifiers
- `SameSite=Lax` or `SameSite=Strict`
- Short, documented expiry

## Security Headers

The `_headers` file is ready for hosts that support Netlify-style headers, including Netlify and Cloudflare Pages. For Nginx, Apache, or another host, copy the same policy values into that platform's header configuration.
