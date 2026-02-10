# SHRESTHA DIAMONDS

Static marketing website for SHRESTHA DIAMONDS (OMKAR EXPORTS & IMPORTS). Multi-page site with hero, gallery, diamond selection form, and contact.

## Project structure

```
SHRESTHA_DIAMONDS/
├── index.html              # Homepage
├── our-story.html          # Our Story
├── our-products.html       # Our Products
├── contact.html            # Contact Us
├── README.md
│
├── assets/
│   ├── css/
│   │   └── main.css        # All styles (variables, base, layout, components, responsive)
│   ├── js/
│   │   ├── config.js       # Constants (WhatsApp numbers, breakpoints, scroll options)
│   │   └── main.js         # App logic (navbar, hero, mobile menu, forms, scroll reveal)
│   ├── images/
│   │   └── logo.png        # Navbar logo
│   └── videos/
│       ├── Luxury_Diamond_Animation_Website_Background.mp4
│       └── Diamond_Video_Customization_Request.mp4
│
├── styles.css              # (legacy – use assets/css/main.css)
├── script.js               # (legacy – use assets/js/main.js + config.js)
├── logo.png                # (legacy – use assets/images/logo.png)
└── *.mp4                   # (legacy – use assets/videos/)
```

## Coding standards

- **HTML**: Semantic markup, `viewport-fit=cover` and consistent meta; one nav pattern (logo + mobile toggle) across pages; styles/scripts from `assets/`.
- **CSS**: Single main file with clear section comments; BEM-like naming where useful; custom properties in `:root`; mobile-first responsive with `max-width` media queries.
- **JS**: IIFE, `"use strict"`; config in `config.js`; `main.js` split into init functions (navbar, hero, mobile menu, forms, smooth scroll, scroll reveal); constants for breakpoints and WhatsApp numbers; no global pollution beyond `CONFIG`.

## Run locally

Open `index.html` in a browser, or use a local server:

```bash
# Python 3
python3 -m http.server 8000

# Node (npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Assets

- **Fonts**: Google Fonts (DM Sans, Playfair Display, Inter) loaded via `<link>`.
- **Images**: Logo in `assets/images/`; gallery images from Unsplash (external).
- **Videos**: Hero background in `assets/videos/`.

## Contact / WhatsApp

WhatsApp numbers and scroll thresholds are in `assets/js/config.js`. Update `CONFIG.whatsapp` to change India/Nepal numbers.
