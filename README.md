# Ruben Pap Ceramics

Website for **Ruben Pap Ceramics**, a ceramic studio in Yerevan, Armenia.
It's a static site with no build step, in four languages: English, Armenian, Russian and German.

**Live:** https://artsrun.github.io/ruben-pap/

## What's inside

```
index.html              the page (English text lives here)
404.html                "page not found" page (self-contained)
assets/css/style.css    all styles (light + dark theme)
assets/js/config.js     ← contact details: WhatsApp, Telegram, Viber, Instagram…
assets/js/i18n.js       ← translations (EN · HY · RU · DE side by side)
assets/js/main.js       behaviour: language + theme switch, menu, lightbox, contact buttons
assets/img/             photos (.jpg originals + responsive .webp) and og-image.jpg
tools/make-images.py    regenerates the .webp versions and og-image.jpg
favicon.svg, apple-touch-icon.png, sitemap.xml, .nojekyll
```

## Common edits

### Contact buttons (WhatsApp, Telegram, Viber, …)
Open `assets/js/config.js` and fill in the values. A channel's buttons appear as soon as you fill it in, and stay hidden while it's `""`. They show up in:

- the floating **Contact** button (bottom right)
- **Book via** in the *Studio visit* section (the message is pre-filled)
- **Ask about this piece** in the image viewer (the message includes the piece name and number)
- the social icons in the footer and in the mobile menu

```js
whatsapp: "+374 95 688 684",
telegram: "rubenpap",          // or a phone number
viber:    "+374 95 688 684",
```

### Texts and translations
- **English:** edit `index.html`, and also update the `en` line of the same key in `assets/js/i18n.js`.
- **Armenian / Russian / German:** edit `assets/js/i18n.js`. Every text has a key (for example `about.p1`) with all four languages next to each other.
- To link to a specific language, add `?lang=hy`, `?lang=ru` or `?lang=de` to the URL. Without it, the site uses the visitor's last choice, then their browser language, then English.

### Photos
1. Put a `.jpg` in `assets/img/`. Keep the size around 1000×1250 px (4:5).
2. Run `python tools/make-images.py`. You need Pillow for this: `python -m pip install Pillow`.
3. Copy one of the `<figure class="work …">` blocks in `index.html` and change the file names, then add caption keys to `i18n.js`.

## Preview locally

```sh
python -m http.server 8000
```
Then open http://localhost:8000.

## Deploy (GitHub Pages)
Go to **Settings → Pages → Build and deployment**, set **Source: Deploy from a branch**, then choose **Branch: `prod` / root**.
Every push to `prod` then goes live within a minute or two.

## Credits
Brand icons: [Simple Icons](https://simpleicons.org) (CC0). UI icons: [Lucide](https://lucide.dev) (ISC).
Fonts: Cormorant Garamond, Inter, Noto Serif/Sans Armenian (Google Fonts, OFL).
