# A Plus Shoe Repair — Full SEO Audit Report

**Date:** 2026-05-01
**Audited URL:** `https://aplus-n0hhybnnm-steve-songs-projects.vercel.app` (latest production)
**Source files:** `/Users/stevesong/shoe/`
**Business type detected:** Local service business (shoe repair + alterations)
**Pages audited:** 1 (single-page site)

---

## Executive Summary

### Overall SEO Health Score: **63 / 100**

> ⚠️ **Real-world ranking score is effectively 0/100** because the production site is currently behind Vercel SSO authentication and explicitly marked `x-robots-tag: noindex`. Google cannot crawl, index, or rank a single page. **This must be fixed before any other SEO work matters.**

### Score Breakdown

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 25% | 5/25 | Site not indexable; no robots.txt/sitemap; no canonical |
| Content Quality | 25% | 23/25 | Excellent E-E-A-T, authentic, expert voice |
| On-Page SEO | 20% | 15/20 | Strong title/meta/H1; missing canonical; TODO leak |
| Schema | 10% | 10/10 | Best-in-class LocalBusiness + ShoeRepair markup |
| Performance | 10% | 5/10 | 7.5 MB total images, no WebP/AVIF, no srcset |
| Images | 5% | 3/5 | 100% alt text; oversized files |
| AI Search Readiness | 5% | 2/5 | Strong content but blocked from all AI crawlers |

### Top 5 Critical Issues

1. **🚨 Site returns HTTP 401 + `x-robots-tag: noindex`** — Vercel SSO/deployment protection is enabled. Google, Bing, ChatGPT, Perplexity, Claude — *none* of them can read the site.
2. **🚨 No custom domain** — Site lives at `aplus-XXX.vercel.app`. Schema markup references `aplusshoerepair.com`, which doesn't resolve. NAP consistency for Google Business Profile is broken.
3. **🚨 No `robots.txt`** — file doesn't exist (returns 401).
4. **🚨 No `sitemap.xml`** — file doesn't exist.
5. **🚨 No canonical URL tag** — the single most important on-page SEO tag is missing from `<head>`.

### Top 5 Quick Wins

1. **Disable Vercel deployment protection** (Project Settings → Deployment Protection → Off). 60 seconds.
2. **Buy + connect `aplusshoerepair.com`** at Vercel Domains. ~5 min, $12/yr.
3. **Add `<link rel="canonical">`** to `<head>`. 30 seconds.
4. **Create `robots.txt` and `sitemap.xml`**. 5 min.
5. **Compress hero images to WebP** — 7.5 MB → ~2 MB total. 15 min, big LCP win.

---

## Technical SEO

### 🚨 Critical: Site is not indexable

```http
HTTP/2 401
x-robots-tag: noindex
set-cookie: _vercel_sso_nonce=...
```

The production deployment is gated by Vercel's deployment protection (SSO). This is the default for new Vercel projects on team accounts. Effects:

- Google's crawler returns 401 on every URL → drops the site from the index
- Open Graph previews don't render in iMessage, WhatsApp, LinkedIn, etc.
- Schema validators (Google Rich Results, Schema.org) can't fetch
- AI crawlers (GPTBot, ClaudeBot, PerplexityBot) get blocked — site won't appear in AI search results
- The `x-robots-tag: noindex` header is respected even *after* you remove auth, until the page is re-crawled

**Fix path:**
1. Vercel dashboard → `aplus` project → Settings → Deployment Protection → set to "Disabled" (or "Only Preview Deployments")
2. After deploying with auth off, request re-indexing in Google Search Console
3. Re-test with: `curl -I https://yourdomain.com` → expect `HTTP 200`, no `x-robots-tag` header

### Missing files

| File | Status | Required for |
|---|---|---|
| `/robots.txt` | ❌ Missing | Telling crawlers what to index |
| `/sitemap.xml` | ❌ Missing | Helping Google discover all pages |
| `/llms.txt` | ❌ Missing | AI search optimization (emerging standard) |
| `/favicon.ico` | ⚠️ Has `/assets/favicon.svg` | Some browsers/crawlers expect `/favicon.ico` at root |

### Missing on-page tags

| Tag | Status | Impact |
|---|---|---|
| `<link rel="canonical">` | ❌ Missing | Causes duplicate content issues if multiple URLs serve same page |
| `<meta name="robots">` | ❌ Missing | Cannot control per-page indexing behavior |
| `<link rel="alternate" hreflang>` | ⚠️ Not needed | English-only, single market |

### Security headers (good)

```http
strict-transport-security: max-age=63072000; includeSubDomains; preload  ✅
x-frame-options: DENY  ✅
```

These are auto-added by Vercel. No action needed.

### Mobile optimization

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />  ✅
```

Responsive meta tag present. Mobile-friendly.

---

## Content Quality

### E-E-A-T Score: 9/10

**Strong signals:**
- ✅ **Experience** — "Forty years on the bench" stated in 8 places, specific
- ✅ **Expertise** — Names actual machines used (Landis stitchers, Sutton finishers, POWER press)
- ✅ **Authoritativeness** — Establishment year (1986), location heritage (Cherry Hill → Springfield)
- ✅ **Trustworthiness** — Real workshop photos, "If we can't fix it, we'll tell you honestly"
- ✅ **Specific service depth** — Christian Louboutin red-sole restoration named explicitly
- ✅ **Authentic voice** — Not generic AI copy; clear brand personality
- ✅ **Concrete claims** — "Most pairs in fifteen minutes," "tens of thousands of times"

**Minor gaps:**
- ⚠️ No customer testimonials/reviews on-page (Google rewards this)
- ⚠️ No author/owner name attached to "the house" voice
- ⚠️ No FAQ section (high E-E-A-T value for AI Overviews)

### Thin content check

Single page, ~1,200 words of substantive content across services + heritage + visit sections. **Not thin.** Would benefit from a few longer-form content sections (e.g., "Caring for your Louboutins between visits") for additional ranking surface area.

### AI citation readiness: Strong content, blocked access

Content is well-structured for AI quoting (clear claims, specific details). But all major AI crawlers are blocked by Vercel auth, so **zero AI citations are happening currently.**

---

## On-Page SEO

### Title tag: ✅ Excellent

```html
<title>A Plus Shoe Repair & Alterations — Springfield Mall, VA</title>
```
- Length: 56 chars (optimal)
- Brand + primary keyword + location ✓
- Pixel width fits Google SERP

### Meta description: ✅ Excellent

```html
<meta name="description" content="Shoe repair at Springfield Mall, VA. Women's high-heel specialists — top-lifts, heel tips, stiletto reheeling, Christian Louboutin red-sole restoration. Plus full resoling, leather repair, and alterations. Forty years on the bench." />
```
- Length: 247 chars (155-160 ideal; will be truncated)
- Keyword-rich, location-specific ✓
- **Recommendation:** Trim to 155 chars. Suggested:
  > Shoe repair & alterations at Springfield Mall, VA. Women's high-heel specialists — Louboutin red soles, stiletto tips, full resoling. 40 years on the bench.

### Open Graph: ✅ Present

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="/assets/images/hero-luxury.jpg" />  ⚠️ Relative URL
<meta name="twitter:card" content="summary_large_image" />
```
**Issue:** OG image uses a relative path. Should be absolute URL for Facebook/LinkedIn/iMessage previews to work.

### Heading hierarchy: ✅ Clean

```
H1 (1): "Shoe repair & alterations, by hand."
H2 (5): Section titles, descriptive
H3 (6): Service names
```
Single H1, logical descent. No skipped levels.

### TODO comment leaked into production

```html
<!-- TODO before launch: confirm hours Mon–Sat 10–9 · Sun 11–6, suite 13006 -->
```
Remove before relying on this site for business decisions. Hours and suite number need owner verification (already flagged in conversation).

---

## Schema & Structured Data

### Score: 10/10 — Best-in-class implementation

```json
"@type": ["LocalBusiness", "ShoeRepair"]
```

**Excellent coverage:**
- ✅ `LocalBusiness` + `ShoeRepair` dual type
- ✅ `address` (full PostalAddress)
- ✅ `geo` (lat/long)
- ✅ `telephone`
- ✅ `openingHoursSpecification` (split for weekday/Sunday)
- ✅ `areaServed` (5 cities)
- ✅ `knowsAbout` (10 service keywords)
- ✅ `hasOfferCatalog` (6 services with descriptions)
- ✅ `priceRange`

**Issues to fix:**
- ❌ `url` and `image` reference `https://aplusshoerepair.com` — domain doesn't exist
- ⚠️ Missing: `aggregateRating` and `review` (will be addable once Google reviews come in)
- ⚠️ Missing: `sameAs` (social media + Google Business Profile URL once verified)
- ⚠️ Missing: `paymentAccepted`, `currenciesAccepted`

### Schema validation note

Cannot validate live with Google Rich Results Test because the page returns 401. After fixing auth, run:
- https://search.google.com/test/rich-results?url=https://aplusshoerepair.com
- https://validator.schema.org/

---

## Performance

### Cannot run live Core Web Vitals (site auth-gated)

Estimated based on source files:

| Metric | Estimate | Target | Status |
|---|---|---|---|
| **LCP** | ~3.5s mobile | <2.5s | ❌ Fail (large hero) |
| **INP** | <100ms | <200ms | ✅ Likely pass (minimal JS) |
| **CLS** | <0.05 | <0.1 | ✅ Pass (explicit image dimensions) |

### Asset weight breakdown

| Asset | Size | Notes |
|---|---|---|
| `hero-slide-3.jpg` | 737 KB | Above-fold, blocking LCP |
| `hero-slide-4.jpg` | 878 KB | Hero slide 2 |
| `hero-luxury.jpg` | 613 KB | Preloaded as hero |
| `shop-real-bench.jpg` | 675 KB | Below fold |
| `shop-real-press.jpg` | 715 KB | Below fold |
| `shop-real-wide.jpg` | 653 KB | Below fold |
| 6× before/after images | ~2.5 MB combined | Below fold |
| **Total page weight** | **~7.5 MB** | Way over the ~2 MB mobile budget |

### Recommendations

1. **Convert all images to WebP or AVIF** — typically 30-50% smaller at same quality. Modern browsers all support both.
2. **Serve responsive variants with `<picture>` + `srcset`** — mobile users don't need 2560px-wide hero images.
3. **Compress hero JPGs to ~150-200 KB at 85% quality** — current 800 KB is overkill.
4. **Move `link rel="preload"` to the actually-displayed slide** — currently preloads `hero-luxury.jpg` but the visible hero is `hero-slide-3.jpg`.

---

## Images

### Alt text: ✅ 100% coverage

All 15 `<img>` tags have descriptive, content-specific alt text. This is rare and excellent.

Examples of what's done right:
- ✅ `"A craftsman's hands polishing a red sole with a cream cloth on a dark walnut workbench."`
- ✅ `"Worn black stiletto with scuffed red sole before restoration."`
- ✅ `"A vintage POWER finishing press with HEEL WHEEL fixture, lit by a warm tungsten lamp."`

### Issues

- ❌ No `<picture>` with WebP/AVIF sources
- ❌ No `srcset` for responsive variants
- ⚠️ Lazy-loading attribute is correctly applied to non-hero images
- ⚠️ Images dimensions specified (good for CLS), but oversized for the slot they fill

---

## AI Search Readiness

### Cannot access (auth-blocked)

`x-robots-tag: noindex` and 401 status mean:

| Crawler | Can access? | Impact |
|---|---|---|
| Googlebot | ❌ No | No Google AI Overviews |
| GPTBot (OpenAI) | ❌ No | No ChatGPT citations |
| ClaudeBot (Anthropic) | ❌ No | No Claude citations |
| PerplexityBot | ❌ No | No Perplexity citations |
| Bingbot | ❌ No | No Bing Copilot |

### Once unblocked, the content scores well

- ✅ Specific factual claims (good for AI citation)
- ✅ Named establishments (Cherry Hill Mall, Springfield Mall)
- ✅ Specific brands referenced (Christian Louboutin, Landis, Sutton)
- ✅ Quantified claims ("forty years," "fifteen minutes," "tens of thousands")
- ⚠️ No FAQ section (highest-citation format for AI Overviews)
- ⚠️ No `llms.txt` file at root
- ⚠️ Schema present but URL points to wrong domain

---

## Internal Linking

Single-page site with hash-based anchors:

- `#services`, `#craft`, `#gallery`, `#workshop`, `#visit` — all navigation links work
- Footer doesn't repeat nav (acceptable for one-pager)
- No external outbound links other than Google Maps embed and Apple Maps deep link

**For a one-pager, internal linking is appropriate.** No action needed unless expanding to multi-page architecture.

---

## What's Working (Don't Break These)

1. ✅ Schema markup — comprehensive and accurate
2. ✅ Title tag and meta description — well-crafted
3. ✅ E-E-A-T content quality — authentic, specific, expert
4. ✅ Image alt text — 100% coverage with descriptive text
5. ✅ Heading structure — single H1, clean hierarchy
6. ✅ Mobile viewport — responsive
7. ✅ HTTPS + security headers — Vercel handles automatically
8. ✅ Dimensions on images — prevents CLS
9. ✅ Lazy loading on below-fold images
10. ✅ `defer` on script tag — non-blocking JS
