# Wanderobe — landing page

A marketplace for renting wedding-guest outfits: local stylists deliver complete looks to travellers' hotels and pick them up afterwards. Launching first in San Francisco.

This is a static landing page (plain HTML, CSS and JavaScript, with no build step). It has two sign-up forms:

- **Guest waitlist**: wedding guests (the demand side)
- **Stylist application**: local stylists who own the inventory (the supply side)

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page content and structure |
| `styles.css` | All styling, with colors and fonts at the top under `:root` |
| `script.js` | Dress code explorer and form handling |

## Run locally

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
```

## Collect sign-ups

Until you set `FORM_ENDPOINT` at the top of `script.js`, the forms run in **demo mode** and nothing is saved.

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy its endpoint URL (`https://formspree.io/f/xxxxxxx`) into `FORM_ENDPOINT`.
3. Every submission includes `form_type: "guest"` or `"stylist"`, so you can tell the two apart.

## Publish free with GitHub Pages

In the repo, go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.

## Edit before launch

- Prices in the `#pricing` section of `index.html`
- Domain + social handles for "Wanderobe"
- FAQ policies (refunds, damage protection, deposits)
