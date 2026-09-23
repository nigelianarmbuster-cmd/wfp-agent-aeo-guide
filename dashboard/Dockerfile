# AEO Dashboard - fully static site served by nginx.
# Railway injects PORT at runtime; the ENV below is the fallback default so the
# envsubst step below always has a value to substitute.
FROM nginx:alpine

ENV PORT=80

# ---------------------------------------------------------------------------
# REPLACE THIS TOKEN. The site is served under an unguessable subdirectory
# (SITE_PATH) rather than at the domain root, so the URL cannot be found by
# guessing. Generate your own random token (for example a 32-character hex
# string) and put it here. Use the SAME token in your README so you can find
# the deployed URL again.
# ---------------------------------------------------------------------------
ENV SITE_PATH=REPLACE_WITH_YOUR_OWN_RANDOM_TOKEN

# Runtime files only - keep build clutter (.git, tools/, etc.) out of the image.
COPY index.html data.js /usr/share/nginx/html/${SITE_PATH}/
COPY assets/ /usr/share/nginx/html/${SITE_PATH}/assets/
COPY fonts/ /usr/share/nginx/html/${SITE_PATH}/fonts/
COPY robots.txt /usr/share/nginx/html/robots.txt

# nginx config template. The official nginx image's entrypoint
# (/docker-entrypoint.d/20-envsubst-on-templates.sh) automatically runs
# envsubst over every /etc/nginx/templates/*.template at container start and
# writes the result to /etc/nginx/conf.d/default.conf, so ${PORT} and
# ${SITE_PATH} become the real values. The quoted heredoc delimiter keeps the
# placeholders literal here.
RUN mkdir -p /etc/nginx/templates && cat > /etc/nginx/templates/default.conf.template <<'EOF'
server {
    listen       ${PORT};
    listen  [::]:${PORT};
    server_name  _;

    root   /usr/share/nginx/html;
    index  index.html;

    server_tokens off;

    # Layer 1 of 3: tell every crawler not to index, follow, archive or
    # snippet any response from this server, regardless of status code.
    add_header X-Robots-Tag "noindex, nofollow, noarchive, nosnippet" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    # Health probes: explicit 200 for platform checks
    location = /healthz {
        access_log off;
        default_type text/plain;
        return 200 'ok';
    }

    # Layer 2 of 3: crawler directives. Must stay reachable at the true root,
    # so this exact-match rule is declared before the root 404 below.
    location = /robots.txt {
        access_log off;
        try_files $uri =404;
    }

    # The site lives under /${SITE_PATH}/; the domain root returns 404 so the
    # site cannot be found by basename guessing. Declared before the general
    # 'location /' so it wins for the exact root request.
    location = / {
        return 404;
    }

    # Long-lived cache for static assets and fonts. Listed BEFORE the
    # .js/.html rule so assets/*.min.js is not caught by it (nginx uses the
    # first matching regex location).
    location ~* ^/${SITE_PATH}/(assets|fonts)/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header X-Robots-Tag "noindex, nofollow, noarchive, nosnippet" always;
        try_files $uri =404;
    }

    # HTML & JS: revalidate on every request so new deploys show immediately
    location ~* \.(html|js)$ {
        add_header Cache-Control "no-cache";
        add_header X-Robots-Tag "noindex, nofollow, noarchive, nosnippet" always;
        try_files $uri =404;
    }

    location / {
        add_header Cache-Control "no-cache";
        add_header X-Robots-Tag "noindex, nofollow, noarchive, nosnippet" always;
        try_files $uri $uri/ =404;
    }
}
EOF

EXPOSE 80
