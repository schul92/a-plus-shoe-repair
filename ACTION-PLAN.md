# A Plus Shoe Repair — SEO Action Plan

**Generated:** 2026-05-01
**Current health score:** 63/100 (effective real-world score: 0/100 due to auth wall)
**Target after Critical+High fixes:** 85/100

---

## 🚨 CRITICAL — Fix today (blocks all SEO)

### 1. Disable Vercel deployment protection

**Problem:** Site returns HTTP 401 with `x-robots-tag: noindex`. Google cannot index anything.

**Fix:**
1. Go to https://vercel.com/steve-songs-projects/aplus/settings/deployment-protection
2. Set "Vercel Authentication" to **Disabled**
3. Trigger a redeploy: `vercel --prod` from `/Users/stevesong/shoe/`
4. Verify: `curl -I https://aplus-n0hhybnnm-steve-songs-projects.vercel.app` → expect `HTTP 200`, no `x-robots-tag` header

**Time:** 2 minutes
**Impact:** Unblocks 100% of SEO efforts

---

### 2. Connect a real custom domain

**Problem:** Site is at `aplus-n0hhybnnm-steve-songs-projects.vercel.app`. Schema references `aplusshoerepairva.com` which doesn't exist. Google Business Profile needs a real domain to score the listing.

**Fix:**
1. Buy `aplusshoerepairva.com` (or `aplusshoes.com` / `aplusva.com`) — recommend Vercel Domains for one-click setup, ~$12/yr
2. Vercel dashboard → `aplus` project → Settings → Domains → Add → enter domain
3. If bought through Vercel: auto-configures DNS in 60 seconds
4. If bought elsewhere: copy the A/CNAME records Vercel provides into your registrar
5. Update schema URL in `index.html` line 28-29 to match actual domain

**Time:** 5-10 minutes
**Impact:** Unblocks Google Business Profile association, schema becomes valid, brand trust

---

### 3. Add canonical URL tag

**Problem:** No `<link rel="canonical">` in `<head>`. Causes duplicate content issues when Google sees the same page at multiple URLs (e.g., trailing slash, www vs non-www).

**Fix:** Add to `index.html` head section after line 8:
```html
<link rel="canonical" href="https://aplusshoerepairva.com/" />
```

**Time:** 30 seconds
**Impact:** Eliminates duplicate content risk; consolidates ranking signals

---

### 4. Create `robots.txt`

**Problem:** No robots.txt exists. Google has no instructions on what to crawl/avoid.

**Fix:** Create `/Users/stevesong/shoe/robots.txt`:
```
User-agent: *
Allow: /

# AI search crawlers — explicitly allow for AI Overviews / ChatGPT / Claude / Perplexity citations
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://aplusshoerepairva.com/sitemap.xml
```

**Time:** 1 minute
**Impact:** Required for Search Console, opens AI search visibility

---

### 5. Create `sitemap.xml`

**Problem:** No sitemap. Google has to discover URLs through links only.

**Fix:** Create `/Users/stevesong/shoe/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aplusshoerepairva.com/</loc>
    <lastmod>2026-05-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Time:** 1 minute
**Impact:** Faster indexing, complete URL discovery

---

## ⚠️ HIGH — Fix this week

### 6. Trim meta description to 155 chars

**Current** (247 chars, will be truncated in SERPs):
> Shoe repair at Springfield Mall, VA. Women's high-heel specialists — top-lifts, heel tips, stiletto reheeling, Christian Louboutin red-sole restoration. Plus full resoling, leather repair, and alterations. Forty years on the bench.

**Suggested** (157 chars):
> Shoe repair & alterations at Springfield Mall, VA. Women's high-heel specialists — Louboutin red soles, stiletto tips, full resoling. 40 years on the bench.

---

### 7. Fix Open Graph image to absolute URL

**Current** (line 13):
```html
<meta property="og:image" content="/assets/images/hero-luxury.jpg" />
```

**Fix:**
```html
<meta property="og:image" content="https://aplusshoerepairva.com/assets/images/hero-luxury.jpg" />
<meta property="og:image:width" content="2560" />
<meta property="og:image:height" content="1429" />
<meta property="og:url" content="https://aplusshoerepairva.com/" />
```

**Impact:** Link previews actually render in iMessage, WhatsApp, LinkedIn, Slack

---

### 8. Remove TODO comment from production HTML

**Current** (line 63):
```html
<!-- TODO before launch: confirm hours Mon–Sat 10–9 · Sun 11–6, suite 13006 -->
```

**Fix:** Delete after verifying with the owner that hours and suite number are correct.

---

### 9. Compress hero images to WebP

**Problem:** 7.5 MB total page weight. Hero alone is 2.2 MB.

**Fix:** Use `cwebp` or `sharp` to convert + downsize:
```bash
# Install if needed
brew install webp

# Convert hero images
for f in assets/images/hero-slide-*.jpg assets/images/hero-luxury.jpg; do
  cwebp -q 82 "$f" -o "${f%.jpg}.webp"
done

# Convert workshop + before/after
for f in assets/images/shop-real-*.jpg assets/images/shop-alteration.jpg assets/images/ba-*.jpg assets/images/storefront.jpg; do
  cwebp -q 82 "$f" -o "${f%.jpg}.webp"
done
```

Then update `<img>` tags to use `<picture>`:
```html
<picture>
  <source srcset="/assets/images/hero-slide-3.webp" type="image/webp" />
  <img src="/assets/images/hero-slide-3.jpg"
       alt="A craftsman's hands polishing a red sole..."
       width="2560" height="1429" decoding="async" fetchpriority="high" />
</picture>
```

**Expected savings:** 7.5 MB → ~2.5 MB (66% smaller)
**LCP improvement:** ~1.5-2 seconds on 4G mobile

---

### 10. Fix preload to point to displayed hero

**Current** (line 19):
```html
<link rel="preload" as="image" href="/assets/images/hero-luxury.jpg" fetchpriority="high" />
```

But the actually-visible hero (line 96) is:
```html
<img src="/assets/images/hero-slide-3.jpg" ... fetchpriority="high" />
```

**Fix:** Change preload to:
```html
<link rel="preload" as="image" href="/assets/images/hero-slide-3.webp" type="image/webp" fetchpriority="high" />
```

**Impact:** LCP element loads first; eliminates 600KB wasted preload

---

### 11. Confirm and update phone number across the site

**Problem:** Site shows `(703) 217-1162` in 8 places. Memory says `(703) 213-8910`. Need owner confirmation.

**Files containing phone:**
- `index.html` lines 30, 84, 86, 133, 381, 408, 413, 415

Once verified, do a single find/replace and verify schema (line 30) matches.

---

## 🟡 MEDIUM — Fix this month

### 12. Add FAQ section for AI Overviews

AI Overviews and ChatGPT citations heavily favor FAQ content. Add a section like:

```html
<section class="faq" id="faq" aria-labelledby="faqHeading">
  <h2 id="faqHeading">Frequently asked questions</h2>
  <details>
    <summary>How long does shoe repair take at A Plus?</summary>
    <p>Most heel tips and top-lifts are done in fifteen minutes while you shop the mall. Full resoling, alterations, and complex restoration take 3-5 business days.</p>
  </details>
  <details>
    <summary>Do you restore Christian Louboutin red soles?</summary>
    <p>Yes. We use factory-matched red lacquer, hand-buffed and sealed. We've been doing Louboutin restoration since the brand became popular in the late 90s.</p>
  </details>
  <!-- Add 5-8 more questions covering: pricing, walk-in vs appointment, alterations turnaround, what brands you work with, payment methods, etc. -->
</section>
```

Then add `FAQPage` schema:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does shoe repair take at A Plus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most heel tips and top-lifts..."
      }
    }
  ]
}
```

---

### 13. Add `sameAs` links to schema

Once Google Business Profile is verified, add to LocalBusiness schema:
```json
"sameAs": [
  "https://www.google.com/maps/place/?cid=YOUR_CID",
  "https://www.facebook.com/aplusshoerepair",
  "https://www.yelp.com/biz/a-plus-shoe-repair-springfield"
]
```

---

### 14. Add llms.txt for AI search optimization

Create `/Users/stevesong/shoe/llms.txt`:
```markdown
# A Plus Shoe Repair & Alterations

Family-owned shoe repair and alterations shop at Springfield Mall in Springfield, Virginia.
Forty years of hand-craft experience — first at Cherry Hill Mall in New Jersey, now serving Northern Virginia.

## Services
- Women's high-heel repair (top-lifts, heel tips, stiletto reheeling)
- Christian Louboutin red-sole restoration
- Full resoling and reheeling for all shoe types
- Leather repair, recoloring, conditioning, and stretching
- Handbag, luggage, and leather jacket repair
- Clothing alterations (hems, suit fittings, tuxedos, dresses, zippers)
- Key cutting, hand shoe shines, shoelace replacement

## Location
6660 Springfield Mall, Suite 13006
Springfield, Virginia 22150
Phone: (703) 217-1162

## Hours
Monday–Saturday: 10:00 AM – 9:00 PM
Sunday: 11:00 AM – 6:00 PM

## Founded
1986 in Cherry Hill, New Jersey. Relocated to Springfield Mall, Virginia.
```

---

### 15. Add JSON-LD `BreadcrumbList` (after expanding to multi-page)

Not needed yet for one-pager but plan for it when adding service detail pages.

---

### 16. Set up Google Search Console

After domain is connected:
1. Go to https://search.google.com/search-console
2. Add property → enter domain → verify via DNS TXT record (Vercel handles)
3. Submit sitemap.xml
4. Monitor "Coverage" and "Core Web Vitals" reports weekly

---

### 17. Set up Bing Webmaster Tools

Same as above for Bing → https://www.bing.com/webmasters

(Bing also feeds DuckDuckGo, ChatGPT web search, and Apple Spotlight Suggestions.)

---

## 🟢 LOW — Backlog

### 18. Add testimonials/reviews section
Once first 5-10 Google reviews come in, embed top 3 on-site with `Review` schema.

### 19. Add "Recent work" gallery with monthly updates
Fresh content signals to Google. Even 2-3 photos/month helps.

### 20. Build out long-form content
- "How to make Louboutins last longer"
- "Why shoe repair is more sustainable than buying new"
- "What to look for in a quality cobbler"
Each = new ranking surface, internal links, AI citation potential.

### 21. Local citations (NAP consistency)
List the business on:
- Yelp
- Apple Maps
- Bing Places
- Facebook Business
- Yellow Pages
- BBB
- Local Chamber of Commerce

Use IDENTICAL Name/Address/Phone everywhere. Inconsistencies hurt local ranking.

### 22. Schema additions when ready
- `aggregateRating` + `review` (after reviews exist)
- `paymentAccepted` ("Cash, Credit Card, Apple Pay, Google Pay")
- `currenciesAccepted` ("USD")
- `image` array with multiple photos

### 23. Consider adding a blog
For ongoing content updates that signal freshness to Google. WordPress, Ghost, or Astro all work — though for a 1-page shop site, this may be overkill.

---

## Summary: Order of operations

**This weekend (3-4 hours total):**
1. Disable Vercel auth (2 min)
2. Buy + connect domain (10 min)
3. Add canonical, robots.txt, sitemap.xml (5 min)
4. Confirm phone + hours with owner (call them)
5. Update schema URLs and meta description (10 min)
6. Compress hero images to WebP (30 min)
7. Submit to Google Search Console + Bing Webmaster (15 min)
8. Verify Google Business Profile (the video step you're on now)

**Next week:**
9. Add FAQ section + FAQ schema (1 hour)
10. Create llms.txt (15 min)
11. List on Yelp, Apple Maps, Facebook (1 hour)

**Ongoing:**
12. Encourage every happy customer to leave a Google review
13. Post fresh photos to Google Business Profile weekly
14. Monitor Search Console for indexing issues
