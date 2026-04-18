# A Plus Shoe Repair & Alterations

Static one-page website for the Springfield Mall, VA location of A Plus Shoe Repair & Alterations.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (Vercel)

No build step. Framework preset: **Other**. Output directory: `.`

```bash
vercel          # preview
vercel --prod   # production
```

## TODO before launch

- Replace `TODO-PHONE` / `TODO-HOURS` placeholders in `index.html` with real values
- Confirm suite number `13006` is accurate
- Purchase `aplusshoerepair.com` and add as custom domain in Vercel
- Validate the LocalBusiness JSON-LD at https://search.google.com/test/rich-results
