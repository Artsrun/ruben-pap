/* Ruben Pap Ceramics — 3D viewer (three.js r186, vendored in assets/vendor/three).
 * Loaded on demand by configurator.js. Units are centimetres.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const TAU = Math.PI * 2;
const clamp01 = x => Math.min(1, Math.max(0, x));
const smooth = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const MUG = { r: 4, h: 9.5, gap: 3, reach: 7.2 }; // reach = centre → tip of the handle

/* ================= geometry ================= */

// organic, petal-like rim: r = in/out wave, y = upward tips
function rimWave(theta, rf) {
  const p = rf.seed || 0, k = rf.k;
  const w = (Math.sin(k * theta + p) + 0.35 * Math.sin((2 * k + 1) * theta + p * 1.7) + 0.2 * Math.sin((k + 3) * theta + p * 0.3)) / 1.55;
  return { r: w, y: Math.pow(Math.max(0, w), 1.5) * 1.6 - 0.25 };
}

// unit superellipse (a circle when there is no section)
function unitSection(theta, sec) {
  const c = Math.cos(theta), s = Math.sin(theta);
  if (!sec) return [c, s];
  const e = 2 / sec.n;
  return [Math.sign(c) * Math.abs(c) ** e, Math.sign(s) * Math.abs(s) ** e];
}

/* Lathes the outer profile into a thick-walled vessel: outside wall → rounded lip → inside wall. */
export function buildVessel(m) {
  const rows = m.rows || 110, segs = m.segs || 176, t = m.thick || 0.5;
  const curve = new THREE.SplineCurve(m.profile.map(([r, y]) => new THREE.Vector2(r, y)));
  const outer = curve.getSpacedPoints(rows);
  const inner = outer.map((p, i) => {
    const tg = curve.getTangentAt(i / rows);
    return new THREE.Vector2(Math.max(0, p.x - tg.y * t), Math.max(t, p.y + tg.x * t));
  });
  const O = outer[rows], I = inner[rows], C = O.clone().add(I).multiplyScalar(0.5);
  const half = O.clone().sub(C), up = curve.getTangentAt(1).multiplyScalar(half.length());
  const lip = [];
  for (let k = 1; k < 8; k++) {
    const a = Math.PI * k / 8;
    lip.push([C.x + half.x * Math.cos(a) + up.x * Math.sin(a), C.y + half.y * Math.cos(a) + up.y * Math.sin(a), k / 8]);
  }
  // [radius, height, 0 = outside … 1 = inside]
  const prof = [...outer.map(p => [p.x, Math.max(0, p.y), 0]), ...lip, ...inner.reverse().map(p => [p.x, p.y, 1])];
  const H = Math.max(...prof.map(p => p[1]));

  const P = prof.length, S = segs, rf = m.ruffle, sec = m.section, bend = m.bend, twist = m.twist || 0;
  const aspect = sec ? sec.aspect : 1;
  const pos = new Float32Array(P * S * 3);
  let v = 0;
  for (const [r0, y0, inn] of prof) {
    const hn = y0 / H, tr = rf ? smooth(rf.start, 1, hn) : 0;
    for (let j = 0; j < S; j++) {
      const th = j / S * TAU;
      let r = r0, y = y0;
      if (tr > 0) { const w = rimWave(th, rf); r += rf.amp * tr * w.r; y += rf.ampY * tr * tr * w.y; }
      const [ux, uz] = unitSection(th + twist * hn, sec);
      const x = r * ux;
      // flattened sections keep the wall thickness on the short axis too
      let z = (r * aspect - inn * t * (1 - aspect)) * uz;
      if (bend && y < bend.y0) { const k = 1 - y / bend.y0; z += bend.amount * k * k; }
      pos[v++] = x; pos[v++] = y; pos[v++] = z;
    }
  }
  const idx = new (P * S > 65535 ? Uint32Array : Uint16Array)((P - 1) * S * 6);
  let q = 0;
  for (let i = 0; i < P - 1; i++) {
    for (let j = 0; j < S; j++) {
      const a = i * S + j, b = i * S + (j + 1) % S, c = a + S, d = b + S;
      idx[q++] = a; idx[q++] = c; idx[q++] = b;
      idx[q++] = b; idx[q++] = c; idx[q++] = d;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setIndex(new THREE.BufferAttribute(idx, 1));
  if (bend) { g.computeBoundingBox(); g.translate(0, 0, -(g.boundingBox.max.z + g.boundingBox.min.z) / 2); }
  g.computeVertexNormals();
  g.computeBoundingBox();
  const b = g.boundingBox;
  g.userData.dims = { h: b.max.y - b.min.y, w: b.max.x - b.min.x, d: b.max.z - b.min.z, H };
  return g;
}

/* ================= glaze shader ================= */

const GLAZE_GLSL = /* glsl */`
uniform float uHeight, uFlow, uTex, uSeed, uMetal, uLuster, uRings;
uniform vec3 uA, uB, uC, uClay, uSpeck;
uniform vec2 uRough;
uniform vec4 uHoles[6];
uniform int uHoleCount;
varying vec3 vObjPos;
varying vec3 vObjNormal;
float gRough, gMetal;

float hash3(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float vnoise(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash3(i), hash3(i + vec3(1, 0, 0)), f.x), mix(hash3(i + vec3(0, 1, 0)), hash3(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(hash3(i + vec3(0, 0, 1)), hash3(i + vec3(1, 0, 1)), f.x), mix(hash3(i + vec3(0, 1, 1)), hash3(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
float fbm(vec3 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return s;
}
// organic piercings: [angle, height, half-width, half-height]
float holeMask(vec3 p) {
  float ang = atan(p.z, p.x), hn = p.y / uHeight;
  for (int i = 0; i < 6; i++) {
    if (i >= uHoleCount) break;
    vec4 h = uHoles[i];
    vec2 d = vec2(atan(sin(ang - h.x), cos(ang - h.x)) / h.z, (hn - h.y) / h.w);
    d.y *= d.y > 0.0 ? 1.3 : 0.8;
    if (length(d) < 1.0 + (vnoise(p * 1.3 + float(i) * 5.1) - 0.5) * 0.4) return 1.0;
  }
  return 0.0;
}
void glaze(inout vec3 col) {
  vec3 P = vObjPos + uSeed;
  float hn = clamp(vObjPos.y / uHeight, 0.0, 1.0);
  float v = fbm(P * 0.22);                                            // variegation
  float streak = fbm(vec3(P.x * 1.1, P.y * 0.12, P.z * 1.1));         // vertical runs
  float drip = smoothstep(0.45, 0.8, streak + (hn - 0.55) * 0.9) * uFlow;
  float rim = smoothstep(0.93, 1.0, hn) * (0.12 + 0.5 * uFlow);      // glaze thins on the rim
  float foot = (1.0 - smoothstep(0.012, 0.035, hn)) * step(vObjNormal.y, 0.3); // unglazed foot
  float sp = smoothstep(0.87 - 0.06 * uTex, 0.9 - 0.06 * uTex, vnoise(P * 6.5)) * uTex;  // fine iron speckles
  vec3 g = mix(uA, uB, smoothstep(0.3, 0.75, v));
  g = mix(g, uC, drip);
  g = mix(g, uSpeck, sp * 0.85);
  float bare = max(rim * 0.7, foot);
  col = mix(g, uClay * (0.8 + 0.4 * vnoise(P * 2.0)), bare);
  gRough = clamp(mix(uRough.x, uRough.y, uLuster) + (v - 0.5) * 0.15, 0.04, 1.0);
  gRough = mix(gRough, 0.92, bare);
  gRough = mix(gRough, 0.85, sp);
  gMetal = uMetal * (0.75 + 0.5 * v) * (1.0 - bare) * (1.0 - drip * 0.5) * (1.0 - sp);
}
// throwing rings + grain + pits, applied as a bump
float bumpHeight() {
  vec3 P = vObjPos + uSeed;
  float rings = sin(vObjPos.y * 5.0 + fbm(P * 0.6) * 3.0) * uRings;
  float grain = fbm(P * 2.6) - 0.5;
  float pits = smoothstep(0.87, 0.9, vnoise(P * 6.5));
  return (rings * 0.25 + grain * 0.8 - pits * 0.3) * (0.25 + uTex);
}
vec3 bumpNormal(vec3 n, float face) {
  vec3 sx = normalize(dFdx(-vViewPosition)), sy = normalize(dFdy(-vViewPosition));
  float h = bumpHeight();
  vec2 dh = vec2(dFdx(h), dFdy(h)) * 0.9;
  vec3 r1 = cross(sy, n), r2 = cross(n, sx);
  float det = dot(sx, r1) * face;
  vec3 grad = sign(det) * (dh.x * r1 + dh.y * r2);
  return normalize(abs(det) * n - grad);
}
`;

function makeGlazeMaterial() {
  const uniforms = {
    uHeight: { value: 10 }, uFlow: { value: 0.5 }, uTex: { value: 0.4 }, uSeed: { value: 0 },
    uMetal: { value: 0 }, uLuster: { value: 0.6 }, uRings: { value: 1 }, uRough: { value: new THREE.Vector2(0.6, 0.2) },
    uA: { value: new THREE.Color() }, uB: { value: new THREE.Color() }, uC: { value: new THREE.Color() },
    uClay: { value: new THREE.Color() }, uSpeck: { value: new THREE.Color() },
    uHoles: { value: Array.from({ length: 6 }, () => new THREE.Vector4()) }, uHoleCount: { value: 0 }
  };
  const mat = new THREE.MeshPhysicalMaterial({ roughness: 0.5, metalness: 0, clearcoat: 0.001, clearcoatRoughness: 0.08 });
  mat.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vObjPos;\nvarying vec3 vObjNormal;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\n\tvObjPos = position;\n\tvObjNormal = normal;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\n' + GLAZE_GLSL)
      .replace('#include <clipping_planes_fragment>', '#include <clipping_planes_fragment>\n\tif (uHoleCount > 0 && holeMask(vObjPos) > 0.5) discard;')
      .replace('#include <color_fragment>', '#include <color_fragment>\n\tglaze(diffuseColor.rgb);')
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n\troughnessFactor = gRough;')
      .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\n\tmetalnessFactor = gMetal;')
      .replace('#include <normal_fragment_maps>', '#include <normal_fragment_maps>\n\tnormal = bumpNormal(normal, faceDirection);');
  };
  mat.userData.uniforms = uniforms;
  return mat;
}

/* ================= scene helpers ================= */

function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(0,0,0,0.5)');
  gr.addColorStop(0.5, 'rgba(0,0,0,0.22)');
  gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function contactShadow(tex) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.02;
  m.renderOrder = -1;
  return m;
}

// a plain white mug (H 9.5 cm, Ø 8 cm) for scale
function buildMug(shadowTex) {
  const mat = new THREE.MeshPhysicalMaterial({ color: 0xf3efe6, roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.15 });
  const group = new THREE.Group();
  const body = new THREE.Mesh(buildVessel({ profile: [[0, 0], [3.5, 0], [3.9, 0.4], [4, 2.5], [4, 9.5]], thick: 0.35, rows: 40, segs: 72 }), mat);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.45, 14, 36, Math.PI * 1.2), mat);
  handle.rotation.z = -Math.PI * 0.6;
  handle.position.set(4.55, 5, 0);
  const shadow = contactShadow(shadowTex);
  shadow.scale.set(13, 11, 1);
  shadow.position.x = 1;
  group.add(body, handle, shadow);
  return group;
}

/* ================= viewer ================= */

export function createViewer(host, { onReady } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = 'cfg-canvas';
  host.prepend(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  scene.environmentIntensity = 0.85;
  const key = new THREE.DirectionalLight(0xfff1e0, 1.5);
  key.position.set(40, 80, 60);
  scene.add(key);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 3000);
  const HOME = new THREE.Vector3(0.18, 0.42, 1).normalize();
  camera.position.copy(HOME).multiplyScalar(100);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.1;
  controls.minPolarAngle = 0.12;
  controls.maxPolarAngle = 1.48;
  controls.addEventListener('start', () => { controls.autoRotate = false; host.classList.add('cfg-touched'); });

  const material = makeGlazeMaterial();
  const U = material.userData.uniforms;
  const piece = new THREE.Mesh(new THREE.BufferGeometry(), material);
  const shadowTex = shadowTexture();
  const pieceShadow = contactShadow(shadowTex);
  const mug = buildMug(shadowTex);
  mug.visible = false;
  scene.add(piece, pieceShadow, mug);

  const cache = new Map();
  let dims = { h: 1, w: 1, d: 1, H: 1 };        // model size before scaling
  let size = [10, 10];                           // wanted [height, width] in cm
  let showDims = true;
  let labels = { h: '', w: '', mug: '' };
  const scaleGoal = new THREE.Vector3(1, 1, 1);
  const goal = { target: new THREE.Vector3(0, 10, 0), dist: 100, until: 0 };
  const glazeGoal = { cols: {}, flow: 0.5, tex: 0.4, luster: 0.6 };

  /* dimension lines (SVG over the canvas) */
  const svg = host.querySelector('.cfg-dims');
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, cls, parent = svg) => { const e = document.createElementNS(NS, tag); e.setAttribute('class', cls); parent.append(e); return e; };
  const dimH = { line: el('line', 'dim-line'), a: el('line', 'dim-tick'), b: el('line', 'dim-tick'), text: el('text', 'dim-label') };
  const dimW = { line: el('line', 'dim-line'), a: el('line', 'dim-tick'), b: el('line', 'dim-tick'), text: el('text', 'dim-label') };
  const mugText = el('text', 'dim-label dim-mug');
  dimW.text.setAttribute('text-anchor', 'middle');
  mugText.setAttribute('text-anchor', 'middle');
  let vw = 1, vh = 1;
  const v3 = new THREE.Vector3(), right = new THREE.Vector3(), fwd = new THREE.Vector3();
  const toScreen = p => { v3.copy(p).project(camera); return [(v3.x + 1) / 2 * vw, (1 - v3.y) / 2 * vh]; };
  const setLine = (l, [x1, y1], [x2, y2]) => { l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2); };

  function drawDims() {
    svg.style.display = showDims ? '' : 'none';
    if (!showDims) return;
    right.setFromMatrixColumn(camera.matrixWorld, 0).setY(0).normalize();
    const s = piece.scale, R = dims.w / 2 * s.x, H = dims.h * s.y, Rz = dims.d / 2 * s.z;
    const pad = Math.max(1.2, 0.07 * Math.max(H, 2 * R));
    const side = right.clone().multiplyScalar(Math.max(R, Rz) + pad);
    const h0 = toScreen(side), h1 = toScreen(side.clone().setY(H));
    setLine(dimH.line, h0, h1);
    setLine(dimH.a, [h0[0] - 6, h0[1]], [h0[0] + 6, h0[1]]);
    setLine(dimH.b, [h1[0] - 6, h1[1]], [h1[0] + 6, h1[1]]);
    dimH.text.setAttribute('x', (h0[0] + h1[0]) / 2 + 12);
    dimH.text.setAttribute('y', (h0[1] + h1[1]) / 2 + 4);
    dimH.text.textContent = labels.h;
    fwd.copy(controls.target).sub(camera.position).setY(0).normalize();
    const top = new THREE.Vector3(0, H + pad, 0).addScaledVector(fwd, Rz);
    const w0 = toScreen(top.clone().addScaledVector(right, -R)), w1 = toScreen(top.clone().addScaledVector(right, R));
    setLine(dimW.line, w0, w1);
    setLine(dimW.a, [w0[0], w0[1] - 6], [w0[0], w0[1] + 6]);
    setLine(dimW.b, [w1[0], w1[1] - 6], [w1[0], w1[1] + 6]);
    dimW.text.setAttribute('x', (w0[0] + w1[0]) / 2);
    dimW.text.setAttribute('y', Math.min(w0[1], w1[1]) - 10);
    dimW.text.textContent = labels.w;
    mugText.style.display = mug.visible ? '' : 'none';
    if (mug.visible) {
      const m = toScreen(mug.position.clone().setY(MUG.h + 1.6));
      mugText.setAttribute('x', m[0]);
      mugText.setAttribute('y', m[1]);
      mugText.textContent = labels.mug;
    }
  }

  /* framing: keep piece (+ mug + labels) in view */
  function frame(immediate) {
    const [h, w] = size, R = w / 2, depth = dims.d * scaleGoal.z;
    const rightEdge = mug.visible ? R + MUG.gap + MUG.r + MUG.reach : R;
    const labelRoom = showDims ? Math.max(3, 0.12 * Math.max(h, w)) + 5 : 0;
    const top = Math.max(h, mug.visible ? MUG.h : 0) + (showDims ? 0.12 * Math.max(h, w) + 2.5 : 0);
    const halfW = (rightEdge + labelRoom + R) / 2 + depth * 0.12, halfH = top / 2 + 1;
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    goal.dist = Math.max(halfH / tan, halfW / (tan * camera.aspect)) * 1.18 + depth / 2;
    goal.target.set((rightEdge + labelRoom - R) / 2, top * 0.46, 0);
    controls.minDistance = goal.dist * 0.35;
    controls.maxDistance = goal.dist * 2.6;
    if (immediate) {
      controls.target.copy(goal.target);
      camera.position.copy(goal.target).addScaledVector(HOME, goal.dist);
      goal.until = 0;
    } else {
      goal.until = performance.now() + 1100;
    }
  }

  function applyScale(snap) {
    scaleGoal.set(size[1] / dims.w, size[0] / dims.h, size[1] / dims.w);
    if (snap) piece.scale.copy(scaleGoal);
  }

  /* render loop (only while visible) */
  let raf = 0, last = 0, firstFrame = true;
  const tmpDir = new THREE.Vector3();
  function tick(now) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    const k = 1 - Math.exp(-dt * 9);
    piece.scale.lerp(scaleGoal, k);
    // glaze cross-fade
    for (const [name, col] of Object.entries(glazeGoal.cols)) U[name].value.lerp(col, k);
    U.uFlow.value += (glazeGoal.flow - U.uFlow.value) * k;
    U.uTex.value += (glazeGoal.tex - U.uTex.value) * k;
    U.uLuster.value += (glazeGoal.luster - U.uLuster.value) * k;
    // follow the piece's current size
    const s = piece.scale;
    pieceShadow.scale.set(dims.w * s.x * 1.45, dims.d * s.z * 1.45, 1);
    mug.position.x = dims.w / 2 * s.x + MUG.gap + MUG.r;
    if (now < goal.until) {
      const kf = 1 - Math.exp(-dt * 6);
      controls.target.lerp(goal.target, kf);
      tmpDir.copy(camera.position).sub(controls.target);
      const dist = tmpDir.length();
      camera.position.copy(controls.target).addScaledVector(tmpDir.normalize(), dist + (goal.dist - dist) * kf);
    }
    controls.update(dt);
    renderer.render(scene, camera);
    drawDims();
    if (firstFrame) { firstFrame = false; if (onReady) onReady(); }
  }

  function resize() {
    const r = host.getBoundingClientRect();
    vw = Math.max(1, r.width); vh = Math.max(1, r.height);
    renderer.setSize(vw, vh, false);
    camera.aspect = vw / vh;
    camera.updateProjectionMatrix();
    svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
    frame(false);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  // keyboard: ← → rotate, + − zoom (when the viewer has focus)
  host.addEventListener('keydown', e => {
    const rot = { ArrowLeft: -0.26, ArrowRight: 0.26 }[e.key];
    const zoom = { '+': 0.88, '=': 0.88, '-': 1.14, '_': 1.14 }[e.key];
    if (!rot && !zoom) return;
    e.preventDefault();
    controls.autoRotate = false;
    host.classList.add('cfg-touched');
    const off = camera.position.clone().sub(controls.target);
    if (rot) off.applyAxisAngle(THREE.Object3D.DEFAULT_UP, rot);
    if (zoom) off.multiplyScalar(zoom);
    off.clampLength(controls.minDistance, controls.maxDistance);
    camera.position.copy(controls.target).add(off);
    goal.until = 0;
  });

  return {
    setPiece(id, model, seed, wanted) {
      let geo = cache.get(id);
      if (!geo) { geo = buildVessel(model); cache.set(id, geo); }
      piece.geometry = geo;
      dims = geo.userData.dims;
      U.uHeight.value = dims.H;
      U.uSeed.value = seed || 0;
      U.uRings.value = model.rings != null ? model.rings : 1;
      const holes = model.holes || [];
      U.uHoleCount.value = holes.length;
      holes.forEach((h, i) => U.uHoles.value[i].set(h[0], h[1], h[2], h[3]));
      size = wanted;
      applyScale(true);
      frame(firstFrame);
    },
    setSize(wanted) { size = wanted; applyScale(false); frame(false); },
    setGlaze(g, fx) {
      for (const [u, key] of [['uA', 'a'], ['uB', 'b'], ['uC', 'c'], ['uClay', 'clay'], ['uSpeck', 'speck']]) {
        glazeGoal.cols[u] = new THREE.Color(g[key]);
        if (firstFrame) U[u].value.copy(glazeGoal.cols[u]);
      }
      U.uMetal.value = g.metal;
      U.uRough.value.set(g.rough[0], g.rough[1]);
      material.clearcoat = Math.max(0.001, g.coat * fx.luster);
      Object.assign(glazeGoal, { flow: fx.flow, tex: fx.tex, luster: fx.luster });
      if (firstFrame) { U.uFlow.value = fx.flow; U.uTex.value = fx.tex; U.uLuster.value = fx.luster; }
    },
    setLabels(l) { labels = l; },
    setDims(on) { showDims = on; frame(false); },
    setMug(on) { mug.visible = on; frame(false); },
    reset() {
      controls.autoRotate = true;
      host.classList.remove('cfg-touched');
      camera.position.copy(controls.target).addScaledVector(HOME, camera.position.distanceTo(controls.target));
      frame(false);
    },
    setActive(on) {
      if (on && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
      else if (!on && raf) { cancelAnimationFrame(raf); raf = 0; }
    },
    dispose() {
      this.setActive(false);
      ro.disconnect();
      controls.dispose();
      cache.forEach(g => g.dispose());
      renderer.dispose();
      canvas.remove();
    }
  };
}
