# Ruben Pap Ceramics

Website for **Ruben Pap Ceramics**, a ceramic studio in Yerevan, Armenia.
It's a static site with no build step, in four languages: English, Armenian, Russian and German.

**Live:** https://artsrun.github.io/ruben-pap/

## What's inside

```
index.html              the page (English text lives here)
404.html                "page not found" page (self-contained)
assets/css/style.css    all styles (light + dark theme)
assets/css/fonts.css    @font-face rules for the self-hosted fonts
assets/fonts/           woff2 fonts (latin, cyrillic, armenian subsets), no Google requests
assets/js/config.js     ← contact details: WhatsApp, Telegram, Viber, Instagram…
assets/js/i18n.js       ← translations (EN · HY · RU · DE side by side)
assets/js/main.js       behaviour: language + theme switch, menu, lightbox, contact buttons
assets/js/pieces.js     ← 3D configurator data: pieces, S/M/L sizes, glazes
assets/js/configurator.js  "Make it yours": options, message composer, share links
assets/js/viewer3d.js   the WebGL viewer (3D shapes, glaze shader, dimensions, mug for scale)
assets/vendor/three/    three.js r186 (MIT), loaded only when the configurator is near the screen
assets/img/             photos (.jpg originals + responsive .webp) and og-image.jpg
tools/make-images.py    regenerates the .webp versions and og-image.jpg
tools/fetch-fonts.py    re-downloads the fonts into assets/fonts + writes fonts.css
favicon.svg, apple-touch-icon.png, sitemap.xml, .nojekyll
```

## Common edits

### Contact buttons (WhatsApp, Telegram, Viber, …)
Open `assets/js/config.js` and fill in the values. A channel's buttons appear as soon as you fill it in, and stay hidden while it's `""`. They show up in:

- the floating **Contact** button (bottom right)
- **Book via** in the *Studio visit* section (the message is pre-filled)
- **Ask about this piece** in the image viewer (the message includes the piece name and number)
- the social icons in the footer and in the mobile menu
- **Send via** in the 3D configurator (with the composed order message)

WhatsApp and email open with the message already filled in. Telegram, Viber and Instagram can't reliably pre-fill a chat, so the site copies the message to the clipboard and shows "paste it into the chat".
Telegram currently uses the studio phone number. A Telegram **username** (e.g. `"rubenpap"`) is more reliable: phone links only work if the account allows being found by number.

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

### 3D configurator ("Make it yours")
Visitors pick a piece, choose **S / M / L**, try five glazes and adjust glaze flow, texture and sheen. The live 3D preview shows dimension lines and can add a mug (9.5 cm) for scale. Their choices become a ready-to-send message.

- **Sizes:** edit `sizes` in `assets/js/pieces.js`, as `[height, diameter]` in cm. ⚠ The current numbers are approximate placeholders, so replace them with real measurements. The 3D model rescales itself to match.
- **Glazes:** edit `glazes` in `pieces.js`: colours, metalness, roughness. Name each new glaze in `i18n.js` as `cfg.g.<id>`.
- **Shapes:** each piece's `model.profile` is its silhouette as `[radius, height]` points from the foot to the rim. `ruffle` waves the rim, `holes` pierce the wall, and `section`, `bend` and `twist` make flattened forms like the folded vase.
- **Shared designs:** the message includes a link like `?p=02&s=l&g=turquoise&f=60&t=30&l=80#customize` that reopens the exact design.
- Picking a piece or size scrolls the 3D view back on screen if it isn't fully visible (phones especially).
- On touch screens: swipe sideways to rotate, vertical swipes scroll the page, pinch to zoom. Photos (viewer + lightbox) zoom with a tap; drag to look around, tap again to zoom out.
- Photos in the viewer come from each piece's `photos` list. Every work in *Selected works* has a **3D** button that jumps to its piece.

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
3D: [three.js](https://threejs.org) r186 (MIT, minified copy in `assets/vendor/three`).
Fonts: Cormorant Garamond, Inter, Noto Serif/Sans Armenian (OFL), self-hosted from Google Fonts via `tools/fetch-fonts.py`.
