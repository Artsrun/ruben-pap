/* Ruben Pap Ceramics — "Make it yours": piece, size and glaze picker with a 3D preview
 * and a ready-to-send message. Pieces and glazes live in pieces.js; the WebGL part
 * (viewer3d.js + three.js) is loaded only when the section comes near the screen.
 */
(() => {
  'use strict';

  const RP = window.RP;
  const DATA = window.PIECES;
  const sec = document.getElementById('customize');
  if (!RP || !DATA || !sec) return;

  const $ = (sel, root = sec) => root.querySelector(sel);
  const $$ = (sel, root = sec) => [...root.querySelectorAll(sel)];
  const { t, esc, icon } = RP;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { pieces, glazes, defaults } = DATA;
  const find = (list, id) => list.find(x => x.id === id);
  const SIZES = ['s', 'm', 'l'];
  const SEND = ['whatsapp', 'telegram', 'viber', 'instagram', 'email'];
  const NO_PREFILL = new Set(['telegram', 'viber', 'instagram']); // these get the message on the clipboard

  const state = {
    piece: pieces[0].id, size: defaults.size, glaze: pieces[0].glaze, glazePicked: false,
    flow: defaults.flow, tex: defaults.tex, luster: defaults.luster,
    qty: 1, name: '', note: '', dims: true, mug: false,
    view: -1 // -1 = 3D, 0… = photo index
  };

  // a shared design: ?p=02&s=l&g=turquoise&f=60&t=30&l=80#customize
  const params = new URLSearchParams(location.search);
  const shared = find(pieces, params.get('p'));
  if (shared) { state.piece = shared.id; state.glaze = shared.glaze; }
  if (SIZES.includes(params.get('s'))) state.size = params.get('s');
  if (find(glazes, params.get('g'))) { state.glaze = params.get('g'); state.glazePicked = true; }
  [['f', 'flow'], ['t', 'tex'], ['l', 'luster']].forEach(([k, key]) => {
    const n = Number(params.get(k));
    if (params.has(k) && n >= 0 && n <= 100) state[key] = Math.round(n);
  });

  const piece = () => find(pieces, state.piece);
  const glaze = () => find(glazes, state.glaze);
  const seedOf = p => pieces.indexOf(p) * 7.31;
  const fmt = n => new Intl.NumberFormat(RP.lang).format(n);
  const dimsText = (p, s) => {
    const [h, d] = p.sizes[s];
    return `${t('cfg.h')} ${fmt(h)} × ${p.flat ? t('cfg.w') : 'Ø'} ${fmt(d)} ${t('cfg.cm')}`;
  };
  const img = (name, w) => `assets/img/${name}-${name === 'hero' ? (w > 600 ? 1600 : 800) : w}.webp`;

  const form = $('#cfg-form');
  const view = $('.cfg-view');
  const rail = $('.cfg-rail');
  const photo = $('.cfg-photo');
  const status = $('.cfg-status');
  const photoZoom = RP.tapZoom(view, photo, { scale: 2.2, enabled: () => view.classList.contains('is-photo') });

  /* ================= rendering ================= */
  function renderPieces() {
    $('.cfg-pieces').innerHTML = pieces.map(p =>
      `<label class="cfg-thumb" title="${esc(t(p.name))}"><input class="sr-only" type="radio" name="piece" value="${p.id}"${p.id === state.piece ? ' checked' : ''}>` +
      `<img src="${img(p.photos[0], 600)}" alt="${esc(t(p.name))}" width="600" height="750" loading="lazy" decoding="async"></label>`).join('');
  }
  function renderSizes() {
    const p = piece();
    $('.cfg-sizes').innerHTML = SIZES.map(s =>
      `<label class="cfg-size"><input class="sr-only" type="radio" name="size" value="${s}"${s === state.size ? ' checked' : ''}>` +
      `<b>${s.toUpperCase()}</b><span>${esc(t('cfg.size.' + s))}</span><small>${esc(dimsText(p, s))}</small></label>`).join('');
  }
  function renderGlazes() {
    $('.cfg-glazes').innerHTML = glazes.map(g =>
      `<label class="cfg-swatch" title="${esc(t('cfg.g.' + g.id))}"><input class="sr-only" type="radio" name="glaze" value="${g.id}"${g.id === state.glaze ? ' checked' : ''}>` +
      `<span style="background:radial-gradient(circle at 32% 28%, ${g.c}, ${g.b} 38%, ${g.a} 78%)"></span><span class="sr-only">${esc(t('cfg.g.' + g.id))}</span></label>`).join('');
  }
  function renderRail() {
    const p = piece();
    rail.innerHTML = (no3d ? '' : `<button type="button" data-view="-1" aria-pressed="${state.view < 0}" aria-label="${esc(t('cfg.view3d'))}">${icon('box')}<span>3D</span></button>`) +
      p.photos.map((ph, i) =>
        `<button type="button" data-view="${i}" aria-pressed="${state.view === i}" aria-label="${esc(t('cfg.photo', { n: i + 1 }))}"><img src="${img(ph, 600)}" alt="" loading="lazy" decoding="async"></button>`).join('');
  }
  function renderOutputs() {
    const p = piece(), g = glaze();
    $('.cfg-name').textContent = t(p.name);
    $('.cfg-no').textContent = t('cfg.no', { n: p.id });
    $('[data-out="piece"]').textContent = t(p.name);
    $('[data-out="size"]').textContent = `${t('cfg.size.' + state.size)} · ${dimsText(p, state.size)}`;
    $('[data-out="glaze"]').textContent = t('cfg.g.' + g.id);
    ['flow', 'tex', 'luster'].forEach(k => {
      form.elements[k].value = state[k];
      $(`[data-out="${k}"]`).textContent = state[k] + '%';
    });
    form.elements.qty.value = state.qty;
    view.setAttribute('aria-label', t('cfg.canvas', { piece: t(p.name), size: t('cfg.size.' + state.size), glaze: t('cfg.g.' + g.id) }));
  }

  /* ================= message ================= */
  function shareUrl() {
    const u = new URL(location.href);
    u.search = new URLSearchParams({ p: state.piece, s: state.size, g: state.glaze, f: state.flow, t: state.tex, l: state.luster }).toString();
    u.hash = 'customize';
    return u.href;
  }
  function compose() {
    const p = piece(), name = t(p.name), size = t('cfg.size.' + state.size);
    const lines = [
      t('cfg.m.intro'), '',
      '• ' + t('cfg.m.piece', { piece: name, n: p.id }),
      '• ' + t('cfg.m.size', { size, dims: dimsText(p, state.size) }),
      '• ' + t('cfg.m.glaze', { glaze: t('cfg.g.' + state.glaze), flow: state.flow, tex: state.tex, luster: state.luster }),
      '• ' + t('cfg.m.qty', { qty: state.qty })
    ];
    const note = state.note.trim(), who = state.name.trim();
    if (note || who) lines.push('');
    if (note) lines.push(t('cfg.m.note', { note }));
    if (who) lines.push(t('cfg.m.name', { name: who }));
    lines.push('', t('cfg.m.ask'), t('cfg.m.link', { link: shareUrl() }));
    return { text: lines.join('\n'), subject: t('cfg.m.subject', { piece: name, size }) };
  }
  function renderMessage() {
    const msg = compose();
    $('.cfg-bubble').textContent = msg.text;
    $('.cfg-send').innerHTML = RP.channels(SEND).map(c => {
      const href = c.href(msg);
      const target = /^https?:/i.test(href) ? ' target="_blank" rel="noopener"' : '';
      return `<a class="btn btn-sm" data-ch="${c.key}" href="${esc(href)}"${target}>${icon(c.icon)}${esc(c.name)}</a>`;
    }).join('');
  }
  let msgTimer = 0;
  const scheduleMessage = () => { clearTimeout(msgTimer); msgTimer = setTimeout(renderMessage, 120); };

  /* ================= 3D viewer ================= */
  let viewer = null;
  let loading = null;
  let no3d = false;
  let onScreen = false;

  const applyGlaze = () => viewer && viewer.setGlaze(glaze(), { flow: state.flow / 100, tex: state.tex / 100, luster: state.luster / 100 });
  function updateLabels() {
    if (!viewer) return;
    const p = piece(), [h, d] = p.sizes[state.size];
    viewer.setLabels({ h: `${fmt(h)} ${t('cfg.cm')}`, w: `${p.flat ? t('cfg.w') : 'Ø'} ${fmt(d)} ${t('cfg.cm')}`, mug: t('cfg.mugLabel') });
  }
  const syncActive = () => { if (viewer) viewer.setActive(onScreen && !document.hidden && state.view < 0); };

  function loadViewer() {
    if (loading) return loading;
    view.classList.add('is-loading');
    loading = import(new URL('assets/js/viewer3d.js', document.baseURI).href)
      .then(mod => {
        viewer = mod.createViewer(view, { onReady: () => view.classList.remove('is-loading') });
        const p = piece();
        viewer.setPiece(p.id, p.model, seedOf(p), p.sizes[state.size]);
        applyGlaze();
        updateLabels();
        viewer.setDims(state.dims);
        viewer.setMug(state.mug);
        syncActive();
      })
      .catch(err => {
        console.warn('3D preview unavailable:', err);
        no3d = true;
        view.classList.remove('is-loading');
        view.classList.add('no-3d');
        status.textContent = t('cfg.noWebgl');
        if (state.view < 0) state.view = 0;
        renderRail();
        showView();
      });
    return loading;
  }

  function showView() {
    const p = piece();
    const is3d = state.view < 0 && !no3d;
    view.classList.toggle('is-photo', !is3d);
    photoZoom.reset();
    photo.hidden = is3d;
    if (!is3d) {
      photo.src = img(p.photos[Math.max(0, state.view)], 1000);
      photo.alt = t(p.name);
    }
    $$('[data-view]', rail).forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.view) === state.view)));
    syncActive();
  }

  // bring the 3D view on screen after a click on the options (not while arrowing through them by keyboard)
  let lastPointer = -1e9;
  form.addEventListener('pointerdown', () => { lastPointer = performance.now(); });
  function reveal3d() {
    if (!no3d && state.view >= 0) { state.view = -1; showView(); }
    if (performance.now() - lastPointer > 1500) return;
    const top = document.querySelector('header').getBoundingClientRect().bottom;
    const r = view.getBoundingClientRect();
    if (r.top >= top - 1 && r.bottom <= innerHeight + 1) return;
    const room = innerHeight - top;
    const y = r.height > room ? r.top + r.height / 2 - top - room / 2 : r.top - top - 12;
    scrollTo({ top: scrollY + y, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function selectPiece(id) {
    const p = find(pieces, id);
    if (!p) return;
    state.piece = id;
    if (!state.glazePicked) state.glaze = p.glaze;
    state.view = no3d ? 0 : -1;
    renderPieces();
    renderSizes();
    renderGlazes();
    renderRail();
    renderOutputs();
    renderMessage();
    showView();
    if (viewer) {
      viewer.setPiece(p.id, p.model, seedOf(p), p.sizes[state.size]);
      applyGlaze();
      updateLabels();
    }
  }

  /* ================= events ================= */
  form.addEventListener('submit', e => e.preventDefault());
  form.addEventListener('change', e => {
    const { name, value } = e.target;
    if (name === 'piece') { selectPiece(value); reveal3d(); }
    else if (name === 'size') {
      state.size = value;
      renderOutputs();
      renderMessage();
      if (viewer) { viewer.setSize(piece().sizes[value]); updateLabels(); }
      reveal3d();
    } else if (name === 'glaze') {
      state.glaze = value;
      state.glazePicked = true;
      applyGlaze();
      renderOutputs();
      renderMessage();
    }
  });
  form.addEventListener('input', e => {
    const { name, value } = e.target;
    if (name === 'flow' || name === 'tex' || name === 'luster') {
      state[name] = Number(value);
      $(`[data-out="${name}"]`).textContent = value + '%';
      applyGlaze();
      scheduleMessage();
    } else if (name === 'qty') {
      state.qty = Math.min(20, Math.max(1, parseInt(value, 10) || 1));
      scheduleMessage();
    } else if (name === 'name' || name === 'note') {
      state[name] = value;
      scheduleMessage();
    }
  });
  form.elements.qty.addEventListener('blur', () => { form.elements.qty.value = state.qty; });
  form.addEventListener('click', e => {
    const step = e.target.closest('[data-qty]');
    if (step) {
      state.qty = Math.min(20, Math.max(1, state.qty + Number(step.dataset.qty)));
      form.elements.qty.value = state.qty;
      renderMessage();
      return;
    }
    const copy = e.target.closest('[data-copy]');
    if (copy) {
      const link = copy.dataset.copy === 'link';
      RP.copy(link ? shareUrl() : compose().text).then(ok => RP.toast(ok ? t(link ? 'cfg.linkCopied' : 'cfg.copied') : t('cfg.copyFail')));
      return;
    }
    const send = e.target.closest('[data-ch]');
    if (send && NO_PREFILL.has(send.dataset.ch)) {
      // Telegram / Viber / Instagram can't be pre-filled reliably: put the message on the clipboard
      RP.copy(compose().text).then(ok => { if (ok) RP.toast(t('cfg.pasteHint')); });
    }
  });

  rail.addEventListener('click', e => {
    const b = e.target.closest('[data-view]');
    if (!b) return;
    state.view = Number(b.dataset.view);
    showView();
  });

  const fullBtn = $('[data-tool="full"]');
  if (!view.requestFullscreen) fullBtn.hidden = true;
  $('.cfg-tools').addEventListener('click', e => {
    const b = e.target.closest('[data-tool]');
    if (!b || !viewer) return;
    const tool = b.dataset.tool;
    if (tool === 'dims' || tool === 'mug') {
      state[tool] = !state[tool];
      b.setAttribute('aria-pressed', String(state[tool]));
      if (tool === 'dims') viewer.setDims(state.dims); else viewer.setMug(state.mug);
    } else if (tool === 'reset') {
      viewer.reset();
    } else if (tool === 'full') {
      if (document.fullscreenElement) document.exitFullscreen();
      else view.requestFullscreen().catch(() => {});
    }
  });

  // photos: magnifier follows the mouse; touch gets tap-to-zoom
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    view.addEventListener('mousemove', e => {
      if (!view.classList.contains('is-photo')) return;
      const r = view.getBoundingClientRect();
      photo.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`;
      view.classList.add('magnify');
    });
    view.addEventListener('mouseleave', () => view.classList.remove('magnify'));
  }

  // "3D" buttons on the works + the lightbox
  RP.openConfigurator = id => {
    if (find(pieces, id) && id !== state.piece) selectPiece(id);
    else if (state.view >= 0 && !no3d) { state.view = -1; showView(); }
    loadViewer();
    $('.cfg').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('.to3d');
    if (!a) return;
    e.preventDefault();
    RP.openConfigurator(a.dataset.piece);
  });

  RP.onLang(() => {
    renderPieces();
    renderSizes();
    renderGlazes();
    renderRail();
    renderOutputs();
    renderMessage();
    updateLabels();
    if (no3d) status.textContent = t('cfg.noWebgl');
  });

  // start: load three.js only when the section gets close
  if ('IntersectionObserver' in window) {
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { near.disconnect(); loadViewer(); } }, { rootMargin: '700px 0px' });
    near.observe(sec);
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; syncActive(); }).observe(view);
    // the composer has its own send buttons: keep the floating one out of the way there
    new IntersectionObserver(([e]) => RP.fabAway('compose', e.isIntersecting)).observe($('.cfg-compose'));
  } else {
    onScreen = true;
    loadViewer();
  }
  document.addEventListener('visibilitychange', syncActive);

  renderPieces();
  renderSizes();
  renderGlazes();
  renderRail();
  renderOutputs();
  renderMessage();
  showView();
  if (shared) loadViewer();
})();
