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
 *         from the centre of the foot up to the rim; `ruffle` waves the rim (`sharp` 0–1: soft waves → pointed petals), `holes` pierce the wall,
 *         `rings` (0–1) sets how visible the throwing rings are; `fold` builds the folded vase instead of a lathe.
 */
window.PIECES = {
  defaults: { size: 'm', flow: 50, tex: 40, luster: 60 },

  pieces: [
    {
      id: '01', name: 'work.1', photos: ['work-01'], glaze: 'graphite',
      sizes: { s: [19, 7], m: [26, 10], l: [34, 13] },
      model: { // slender body, narrow waist, flared mouth with fine soft ruffles
        profile: [[0, 0], [3.1, 0], [3.4, 0.4], [3.9, 3], [4.15, 7], [3.9, 12], [3.35, 16], [3.05, 18.5], [3.3, 21], [4.1, 23.8], [5.1, 26]],
        thick: 0.45, ruffle: { start: 0.86, amp: 0.35, ampY: 0.3, k: 15, seed: 1.3, sharp: 0.25, irregular: 0.4 }
      }
    },
    {
      id: '02', name: 'work.2', photos: ['work-02', 'work-08', 'detail-1', 'hero'], glaze: 'graphite',
      sizes: { s: [7, 17], m: [10, 24], l: [13, 31] },
      model: { // deep bowl on a small foot, deeply folded rim, teardrop piercings
        profile: [[0, 0], [3.4, 0], [3.7, 0.5], [4.3, 0.9], [6.5, 2.2], [8.8, 4.2], [10.4, 6.4], [11.4, 8.5], [11.9, 10]],
        thick: 0.5, ruffle: { start: 0.55, amp: 1.0, ampY: 0.55, k: 16, seed: 2.1, sharp: 0.2, irregular: 0.5 },
        // [angle (rad), height (0–1), half-width (rad), half-height (0–1)]
        holes: [[0.4, 0.42, 0.2, 0.13], [1.95, 0.36, 0.16, 0.11], [3.35, 0.46, 0.22, 0.14], [4.95, 0.4, 0.18, 0.12]]
      }
    },
    {
      id: '03', name: 'work.3', photos: ['work-03', 'work-07'], glaze: 'bronze',
      sizes: { s: [9, 10], m: [12, 14], l: [16, 18] },
      model: { // squat, nearly straight belly with an upright, finely torn rim
        profile: [[0, 0], [4.2, 0], [4.6, 0.5], [6.0, 1.8], [6.8, 3.6], [7.0, 5.5], [6.9, 7.5], [6.6, 9.2], [6.5, 10.6], [6.8, 12]],
        thick: 0.5, ruffle: { start: 0.8, amp: 0.35, ampY: 0.45, k: 14, seed: 0.7, sharp: 0.3, irregular: 0.55 }
      }
    },
    {
      id: '04', name: 'work.4', photos: ['work-04', 'detail-2', 'step-4'], glaze: 'bronze', flat: true,
      sizes: { s: [22, 10], m: [30, 14], l: [40, 18] }, // height × overall width (column + folded foot)
      model: { // slab tube standing upright, folded over at the base into a crumpled foot
        height: 30, thick: 0.45, rings: 0.15, // slab-built: barely any throwing rings
        fold: {
          col: [3.6, 1.7],   // upright part: half-width, half-depth
          foot: [1.4, 3.2],  // flattened foot lying on the table
          end: [2.2, 3.0],   // open mouth at the end of the foot
          rb: 1.8, length: 7, curl: 2.2, fillet: 0.6, topWave: 0.25, n: 5, nFoot: 3.5, yaw: 0.5,
          crease: [3.2, 1.1, 0.9, 0.35] // position along the foot, slant, depth, softness
        }
      }
    },
    {
      id: '05', name: 'work.5', photos: ['work-05', 'detail-3'], glaze: 'graphite',
      sizes: { s: [7.5, 21], m: [10, 28], l: [12.5, 35] },
      model: { // wide bowl on a small foot, rolling folds all around the rim
        profile: [[0, 0], [3.6, 0], [4.0, 0.5], [5.2, 1.0], [8, 2.6], [10.8, 4.8], [12.8, 7.2], [14, 10]],
        thick: 0.55, ruffle: { start: 0.45, amp: 1.3, ampY: 0.8, k: 14, seed: 3.3, sharp: 0.15, irregular: 0.5 }
      }
    },
    {
      id: '06', name: 'work.6', photos: ['work-06'], glaze: 'bronze',
      sizes: { s: [19, 12], m: [26, 17], l: [34, 22] },
      model: { // ovoid, widest high up, broad shoulder into a wide mouth
        profile: [[0, 0], [5.3, 0], [5.7, 0.5], [6.6, 3.5], [7.7, 8.5], [8.4, 13.5], [8.5, 17], [8.2, 20], [7.5, 22.8], [6.6, 24.8], [5.9, 25.7], [5.6, 26]],
        thick: 0.5
      }
    }
  ],

  /* glaze colours (a = base, b = variation, c = flow/drips, clay = bare edges, speck = iron spots);
     metal 0–1; rough = [matte, glossy] roughness; coat = clear-coat strength */
  glazes: [
    { id: 'bronze', a: '#3a2a1e', b: '#5a4630', c: '#8a7355', clay: '#7b5236', speck: '#1c140d', metal: 0.85, rough: [0.55, 0.24], coat: 0 },
    { id: 'graphite', a: '#1c1916', b: '#3b322a', c: '#6b5540', clay: '#6f4a31', speck: '#0c0a08', metal: 0.6, rough: [0.7, 0.28], coat: 0 },
    { id: 'turquoise', a: '#0a434b', b: '#17858b', c: '#63c6c2', clay: '#7b5236', speck: '#052428', metal: 0, rough: [0.4, 0.05], coat: 1 },
    { id: 'clay', a: '#6e4329', b: '#94643f', c: '#ad7f58', clay: '#86573a', speck: '#2f1c10', metal: 0, rough: [0.95, 0.62], coat: 0 },
    { id: 'ivory', a: '#ddd3c1', b: '#efe8dc', c: '#c9b89b', clay: '#94643f', speck: '#4c3a28', metal: 0, rough: [0.62, 0.15], coat: 0.6 }
  ]
};
