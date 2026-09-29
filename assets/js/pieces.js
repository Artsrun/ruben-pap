/*
 * Pieces for the 3D configurator ("Make it yours").
 *
 * sizes   Small / Medium / Large as [height, diameter] in cm.
 *         ⚠ These are APPROXIMATE placeholders — replace them with the studio's real measurements.
 *         For pieces with `flat: true` the second number is the width instead of the diameter.
 * name    translation key in i18n.js (the caption used in "Selected works").
 * photos  image names in assets/img (the .webp versions are used).
 * glaze   glaze selected by default (closest to the photo).
 * model   the procedural 3D shape: `profile` is the outside silhouette as [radius, height] points
 *         from the centre of the foot up to the rim; `ruffle` waves the rim, `holes` pierce the wall,
 *         `rings` (0–1) sets how visible the throwing rings are.
 */
window.PIECES = {
  defaults: { size: 'm', flow: 50, tex: 40, luster: 60 },

  pieces: [
    {
      id: '01', name: 'work.1', photos: ['work-01'], glaze: 'graphite',
      sizes: { s: [19, 7], m: [26, 10], l: [34, 13] },
      model: {
        profile: [[0, 0], [3.0, 0], [3.4, 0.4], [4.2, 3], [4.6, 7], [4.3, 11], [3.3, 15], [2.6, 18], [2.6, 20], [3.3, 22.5], [4.4, 24.6], [5.2, 26]],
        thick: 0.45, ruffle: { start: 0.82, amp: 0.55, ampY: 0.5, k: 9, seed: 1.3 }
      }
    },
    {
      id: '02', name: 'work.2', photos: ['work-02', 'work-08', 'detail-1', 'hero'], glaze: 'graphite',
      sizes: { s: [7, 17], m: [10, 24], l: [13, 31] },
      model: {
        profile: [[0, 0], [3.6, 0], [4.0, 0.5], [6.0, 1.8], [8.4, 3.8], [10.2, 6.2], [11.3, 8.4], [11.8, 10]],
        thick: 0.5, ruffle: { start: 0.55, amp: 1.1, ampY: 1.3, k: 11, seed: 2.1 },
        // [angle (rad), height (0–1), half-width (rad), half-height (0–1)]
        holes: [[0.4, 0.42, 0.2, 0.13], [1.95, 0.36, 0.16, 0.11], [3.35, 0.46, 0.22, 0.14], [4.95, 0.4, 0.18, 0.12]]
      }
    },
    {
      id: '03', name: 'work.3', photos: ['work-03', 'work-07'], glaze: 'bronze',
      sizes: { s: [9, 10], m: [12, 14], l: [16, 18] },
      model: {
        profile: [[0, 0], [3.8, 0], [4.2, 0.5], [5.9, 2.5], [6.9, 5.5], [6.9, 8], [6.3, 9.8], [6.3, 10.8], [6.9, 12]],
        thick: 0.5, ruffle: { start: 0.8, amp: 0.5, ampY: 0.45, k: 8, seed: 0.7 }
      }
    },
    {
      id: '04', name: 'work.4', photos: ['work-04', 'detail-2', 'step-4'], glaze: 'bronze', flat: true,
      sizes: { s: [22, 7], m: [30, 9], l: [40, 12] },
      model: {
        profile: [[0, 0], [4.0, 0], [4.4, 0.5], [4.6, 5], [4.5, 15], [4.4, 24], [4.6, 30]],
        thick: 0.45, section: { aspect: 0.34, n: 5 }, bend: { y0: 9, amount: 3.2 }, twist: 0.25, rings: 0.15, // slab-built: barely any throwing rings
        ruffle: { start: 0.95, amp: 0.15, ampY: 0.6, k: 3, seed: 0.4 }
      }
    },
    {
      id: '05', name: 'work.5', photos: ['work-05', 'detail-3'], glaze: 'graphite',
      sizes: { s: [6, 20], m: [8, 28], l: [10, 36] },
      model: {
        profile: [[0, 0], [4.2, 0], [4.6, 0.4], [7.8, 1.6], [10.8, 3.4], [12.8, 5.6], [13.8, 8]],
        thick: 0.55, ruffle: { start: 0.4, amp: 1.5, ampY: 1.5, k: 13, seed: 3.3 }
      }
    },
    {
      id: '06', name: 'work.6', photos: ['work-06'], glaze: 'bronze',
      sizes: { s: [19, 12], m: [26, 17], l: [34, 22] },
      model: {
        profile: [[0, 0], [4.8, 0], [5.3, 0.5], [7.2, 4.5], [8.4, 10.5], [8.3, 15.5], [7.1, 20], [5.6, 23.6], [5.0, 25.2], [5.2, 26]],
        thick: 0.5
      }
    }
  ],

  /* glaze colours (a = base, b = variation, c = flow/drips, clay = bare edges, speck = iron spots);
     metal 0–1; rough = [matte, glossy] roughness; coat = clear-coat strength */
  glazes: [
    { id: 'bronze', a: '#3a2515', b: '#5f4127', c: '#94704a', clay: '#7b5236', speck: '#1c110a', metal: 0.85, rough: [0.55, 0.22], coat: 0 },
    { id: 'graphite', a: '#1c1916', b: '#3b322a', c: '#6b5540', clay: '#6f4a31', speck: '#0c0a08', metal: 0.6, rough: [0.7, 0.28], coat: 0 },
    { id: 'turquoise', a: '#0a434b', b: '#17858b', c: '#63c6c2', clay: '#7b5236', speck: '#052428', metal: 0, rough: [0.4, 0.05], coat: 1 },
    { id: 'clay', a: '#6e4329', b: '#94643f', c: '#ad7f58', clay: '#86573a', speck: '#2f1c10', metal: 0, rough: [0.95, 0.62], coat: 0 },
    { id: 'ivory', a: '#ddd3c1', b: '#efe8dc', c: '#c9b89b', clay: '#94643f', speck: '#4c3a28', metal: 0, rough: [0.62, 0.15], coat: 0.6 }
  ]
};
