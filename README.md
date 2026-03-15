# Envoya Website

Marketing website for [Envoya](https://envoya.tech) — Lead Machine product.

## Structure

```
/
├── index.html        # English landing page (envoya.tech)
├── nl/
│   └── index.html    # Dutch landing page (envoya.tech/nl)
└── README.md
```

## Tech Stack

Plain HTML + CSS + JS. No build step needed. Self-contained.

---

## Cloudflare Pages Deployment

### Step 1 — Connect the repo

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
2. Click **Create a project** → **Connect to Git**
3. Connect your GitHub account and select `lennarthanoo123/envoya-website`

### Step 2 — Build settings

| Setting | Value |
|---------|-------|
| Build command | *(leave empty)* |
| Build output directory | `/` |
| Root directory | *(leave empty)* |

### Step 3 — Deploy

Click **Save and Deploy**. Cloudflare Pages will detect static files and serve them directly.

### Step 4 — Custom domain

1. In the Pages project, go to **Custom domains**
2. Add `envoya.tech` and `www.envoya.tech`
3. Cloudflare will auto-configure DNS since the domain is already on Cloudflare

### Step 5 — Dutch route `/nl`

The `nl/index.html` file is automatically served at `envoya.tech/nl/index.html`.

To make `envoya.tech/nl` (without trailing slash) work cleanly, add a `_redirects` file:

```
/nl   /nl/index.html   200
```

Or use Cloudflare Pages' built-in directory serving — `nl/index.html` is already served at `/nl/`.

---

## Local Preview

Just open `index.html` in a browser — no server needed.

Or use any static file server:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

---

## Contact

hello@envoya.tech
