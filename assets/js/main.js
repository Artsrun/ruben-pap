/* Ruben Pap Ceramics — site behaviour (no dependencies) */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const root = document.documentElement;
  const header = $('header');
  const CFG = window.SITE_CONFIG || {};
  const I18N = window.I18N || { langs: { en: 'English' }, t: {} };
  const DICT = I18N.t;
  const store = {
    get: key => { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set: (key, val) => { try { localStorage.setItem(key, val); } catch (e) { /* storage blocked */ } }
  };
  const setInert = (on, els) => els.forEach(el => { if (el) el.inert = on; });
  const lockScroll = on => root.classList.toggle('lock', on);

  /* ================= translations ================= */
  let lang = I18N.langs[root.dataset.lang] ? root.dataset.lang : 'en';

  // strings created by this script
  const t = (key, vars) => {
    const entry = DICT[key] || {};
    let s = entry[lang] != null ? entry[lang] : entry.en != null ? entry.en : '';
    if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : ''));
    return s;
  };

  // keep the English that ships in index.html, so switching back to English is lossless
  const original = new Map();
  const attrPairs = el => el.dataset.i18nAttr.split(';').map(pair => pair.split(':').map(s => s.trim()));
  $$('[data-i18n],[data-i18n-html],[data-i18n-attr]').forEach(el => {
    const o = {};
    if (el.dataset.i18n) o.text = el.textContent;
    if (el.dataset.i18nHtml) o.html = el.innerHTML;
    if (el.dataset.i18nAttr) attrPairs(el).forEach(([attr]) => { o['@' + attr] = el.getAttribute(attr); });
    original.set(el, o);
  });
  const pick = (key, english) => (lang !== 'en' && DICT[key] && DICT[key][lang] != null ? DICT[key][lang] : english);

  function translatePage() {
    root.lang = lang;
    root.dataset.lang = lang;
    original.forEach((o, el) => {
      if ('text' in o) el.textContent = pick(el.dataset.i18n, o.text);
      if ('html' in o) el.innerHTML = pick(el.dataset.i18nHtml, o.html);
      if (el.dataset.i18nAttr) attrPairs(el).forEach(([attr, key]) => el.setAttribute(attr, pick(key, o['@' + attr])));
    });
  }

  function syncCanonical() {
    const link = $('link[rel="canonical"]');
    if (!link) return;
    const base = link.href.split('?')[0];
    const param = new URLSearchParams(location.search).get('lang');
    link.href = I18N.langs[param] && param !== 'en' ? `${base}?lang=${param}` : base;
  }

  const langListeners = [];
  function setLang(next, byUser) {
    if (!I18N.langs[next]) return;
    lang = next;
    translatePage();
    syncLangUi();
    renderContacts();
    syncTheme();
    syncMenuBtn();
    if (lbOpen) show(cur);
    langListeners.forEach(fn => fn(lang));
    if (byUser) {
      store.set('rp-lang', next);
      const url = new URL(location.href);
      if (next === 'en') url.searchParams.delete('lang');
      else url.searchParams.set('lang', next);
      history.replaceState(null, '', url);
    }
    syncCanonical();
    root.classList.remove('i18n-wait');
  }

  /* language switcher */
  const langBtn = $('.lang-btn');
  const langList = $('#lang-list');

  function syncLangUi() {
    $('.lang-cur', langBtn).textContent = lang.toUpperCase();
    $$('[data-lang]', langList).forEach(b => b.setAttribute('aria-current', String(b.dataset.lang === lang)));
  }
  function setLangList(open) {
    langList.hidden = !open;
    langBtn.setAttribute('aria-expanded', String(open));
    if (open) ($('[aria-current="true"]', langList) || $('button', langList)).focus();
  }
  langBtn.addEventListener('click', () => setLangList(langList.hidden));
  langList.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]');
    if (!b) return;
    setLang(b.dataset.lang, true);
    setLangList(false);
    langBtn.focus();
  });
  langList.addEventListener('keydown', e => {
    if (e.key === 'Tab') return setLangList(false);
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const items = $$('button', langList);
    const i = items.indexOf(document.activeElement);
    items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus();
  });

  /* ================= theme ================= */
  const themeBtn = $('.theme-btn');
  const darkMq = matchMedia('(prefers-color-scheme: dark)');
  const effectiveTheme = () => root.dataset.theme || (darkMq.matches ? 'dark' : 'light');

  function syncTheme() {
    const dark = effectiveTheme() === 'dark';
    themeBtn.setAttribute('aria-label', t(dark ? 'ui.themeLight' : 'ui.themeDark'));
    $$('meta[name="theme-color"]').forEach(m => { m.content = dark ? '#171513' : '#f2eee7'; });
  }
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = effectiveTheme() === 'dark' ? 'light' : 'dark';
    store.set('rp-theme', root.dataset.theme);
    syncTheme();
  });
  if (darkMq.addEventListener) darkMq.addEventListener('change', syncTheme);

  /* ================= header + mobile menu ================= */
  const onScroll = () => header.classList.toggle('solid', scrollY > 60);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const nav = $('#site-nav');
  const menuBtn = $('.menu-btn');
  const menuOpen = () => nav.classList.contains('open');

  function syncMenuBtn() {
    $('span', menuBtn).textContent = t(menuOpen() ? 'ui.close' : 'ui.menu');
  }
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    syncMenuBtn();
    lockScroll(open);
    setInert(open, [$('main'), $('footer'), $('.skip')]);
    fabAway('menu', open);
    if (open) $('a', nav).focus();
  }
  menuBtn.addEventListener('click', () => setMenu(!menuOpen()));
  nav.addEventListener('click', e => { if (menuOpen() && e.target.closest('a[href^="#"]')) setMenu(false); });
  const menuMq = matchMedia('(max-width: 1180px)');
  const onMenuMq = () => { if (!menuMq.matches && menuOpen()) setMenu(false); };
  if (menuMq.addEventListener) menuMq.addEventListener('change', onMenuMq);

  /* ================= contact channels ================= */
  const enc = encodeURIComponent;
  const digits = v => String(v).replace(/\D/g, '');
  const isPhone = v => /^\+?[\d\s().-]{6,}$/.test(String(v).trim());
  const handle = v => String(v).trim().replace(/^https?:\/\/(www\.)?[^/]+\//i, '').replace(/[@/]/g, '').split('?')[0];
  const withText = (url, msg) => (msg && msg.text ? `${url}?text=${enc(msg.text)}` : url);

  const CHANNELS = {
    whatsapp: { icon: 'whatsapp', name: () => 'WhatsApp', detail: v => v,
      href: (v, msg) => withText(`https://wa.me/${digits(v)}`, msg) },
    telegram: { icon: 'telegram', name: () => 'Telegram', detail: v => (isPhone(v) ? v : '@' + handle(v)),
      href: (v, msg) => withText(`https://t.me/${isPhone(v) ? '+' + digits(v) : handle(v)}`, msg) },
    viber: { icon: 'viber', name: () => 'Viber', detail: v => v,
      href: v => `viber://chat?number=%2B${digits(v)}` },
    instagram: { icon: 'instagram', name: () => 'Instagram', detail: v => '@' + handle(v),
      href: v => `https://ig.me/m/${handle(v)}`, profile: v => `https://www.instagram.com/${handle(v)}/` },
    facebook: { icon: 'facebook', name: () => 'Facebook',
      href: v => (/^https?:/i.test(v) ? v : `https://www.facebook.com/${handle(v)}`) },
    email: { icon: 'mail', name: () => t('ch.email'), detail: v => v,
      href: (v, msg) => `mailto:${v}` + (msg ? `?subject=${enc(msg.subject)}&body=${enc(msg.text)}` : '') },
    phone: { icon: 'phone', name: () => t('ch.phone'), detail: v => v,
      href: v => `tel:+${digits(v)}` }
  };
  const SETS = {
    hello: ['whatsapp', 'telegram', 'viber', 'instagram', 'email', 'phone'], // floating button
    visit: ['whatsapp', 'telegram', 'viber', 'email', 'phone'],              // "Book via"
    piece: ['whatsapp', 'telegram', 'viber', 'instagram', 'email'],          // lightbox "Ask about this piece"
    social: ['instagram', 'facebook', 'whatsapp', 'telegram', 'viber']       // footer + mobile menu icons
  };
  const MESSAGES = {
    hello: () => ({ text: t('msg.hello'), subject: t('msg.subjectHello') }),
    visit: () => ({ text: t('msg.visit'), subject: t('msg.subjectVisit') }),
    piece: vars => ({ text: t('msg.piece', vars), subject: t('msg.subjectPiece', vars) })
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const icon = id => `<svg class="ic" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const target = href => (/^https?:/i.test(href) ? ' target="_blank" rel="noopener"' : '');

  // the configured channels among `keys`, with a link builder for a { text, subject } message
  const channelList = keys => keys.filter(k => CHANNELS[k] && String(CFG[k] || '').trim()).map(k => {
    const c = CHANNELS[k];
    const v = String(CFG[k]).trim();
    return { key: k, c, v, name: c.name(), icon: c.icon, href: msg => c.href(v, msg) };
  });

  // fills a [data-channels] box; keeps the static fallback when nothing is configured
  function renderChannels(box, vars) {
    const set = box.dataset.channels;
    const msg = MESSAGES[set] && MESSAGES[set](vars);
    const items = channelList(SETS[set]).map(i => {
      const href = set === 'social' && i.c.profile ? i.c.profile(i.v) : i.href(msg);
      return { ...i, attrs: `href="${esc(href)}"${target(href)}` };
    });
    if (!items.length) return 0;
    if (set === 'hello') {
      box.innerHTML = items.map(i =>
        `<li><a ${i.attrs}><span class="ch-ic">${icon(i.c.icon)}</span><span><b>${esc(i.name)}</b><small>${esc(i.c.detail(i.v))}</small></span></a></li>`).join('');
    } else if (set === 'visit') {
      box.innerHTML = `<span class="label">${esc(t('visit.book'))}</span><div class="book-row">` +
        items.map(i => `<a class="btn btn-sm" ${i.attrs}>${icon(i.c.icon)}${esc(i.name)}</a>`).join('') + '</div>';
    } else {
      box.innerHTML = items.map(i => `<a class="ic-link" ${i.attrs} aria-label="${esc(i.name)}" title="${esc(i.name)}">${icon(i.c.icon)}</a>`).join('');
    }
    return items.length;
  }

  function renderContacts() {
    $$('[data-channels]').forEach(box => {
      if (box.dataset.channels === 'piece') return; // rendered per image in the lightbox
      const n = renderChannels(box);
      if (box.dataset.channels === 'hello') fab.hidden = !n;
    });
    if (CFG.email) {
      $$('[data-cfg="email"]').forEach(a => { a.href = 'mailto:' + CFG.email; a.textContent = CFG.email; });
      $$('[data-cfg-href="email"]').forEach(a => { a.href = 'mailto:' + CFG.email; });
    }
    if (CFG.phone) $$('[data-cfg="phone"]').forEach(a => { a.href = 'tel:+' + digits(CFG.phone); a.textContent = CFG.phone; });
    const q = enc(CFG.mapQuery || 'Komitas Avenue 49/3, Yerevan, Armenia');
    const maps = {
      google: CFG.googleMaps || `https://www.google.com/maps/search/?api=1&query=${q}`,
      yandex: CFG.yandexMaps || `https://yandex.com/maps/?text=${q}`
    };
    $$('[data-map]').forEach(a => { a.href = maps[a.dataset.map]; });
  }

  /* floating contact button */
  const fab = $('#fab');
  const fabBtn = $('.fab-btn', fab);
  const fabPanel = $('#fab-panel');
  const awayReasons = new Set();

  function setFab(open) {
    fabPanel.hidden = !open;
    fab.classList.toggle('is-open', open);
    fabBtn.setAttribute('aria-expanded', String(open));
  }
  function fabAway(reason, on) {
    if (on) awayReasons.add(reason); else awayReasons.delete(reason);
    fab.classList.toggle('away', awayReasons.size > 0);
    if (awayReasons.size) setFab(false);
  }
  fabBtn.addEventListener('click', () => setFab(fabPanel.hidden));
  fabPanel.addEventListener('click', e => { if (e.target.closest('a')) setFab(false); });

  /* ================= lightbox ================= */
  const lb = $('#lb');
  const lbImg = $('.lb-img', lb);
  const lbTitle = $('.lb-title', lb);
  const lbCount = $('.lb-count', lb);
  const lbAsk = $('.lb-ask', lb);
  const lbAskLinks = $('.lb-ask-links', lb);
  const lbStatus = $('.lb-status', lb);
  const lb3d = $('.lb-3d', lb);
  const shots = $$('.zoom');
  let cur = 0;
  let lbOpen = false;
  let lastFocus = null;
  let hideTimer = 0;

  function describe(btn) {
    const img = $('img', btn);
    const work = btn.closest('.work');
    if (!work) return { src: btn.dataset.full, alt: img.alt, title: img.alt };
    const [name, num] = $$('figcaption span', work).map(s => s.textContent);
    const to3d = $('.to3d', work);
    return { src: btn.dataset.full, alt: img.alt, title: `${num} — ${name}`, piece: { name, n: num }, pieceId: to3d && to3d.dataset.piece };
  }
  function show(i) {
    cur = (i + shots.length) % shots.length;
    const it = describe(shots[cur]);
    if (lbImg.getAttribute('src') !== it.src) {
      lbImg.classList.add('loading');
      lbImg.onload = lbImg.onerror = () => lbImg.classList.remove('loading');
      lbImg.src = it.src;
    }
    lbImg.alt = it.alt;
    lbTitle.textContent = it.title;
    lbCount.textContent = `${cur + 1} / ${shots.length}`;
    lbStatus.textContent = `${it.title} — ${cur + 1} / ${shots.length}`;
    lbAsk.hidden = !(it.piece && renderChannels(lbAskLinks, it.piece));
    lb3d.hidden = !(it.pieceId && RP.openConfigurator);
    lb3d.dataset.piece = it.pieceId || '';
    [cur + 1, cur - 1].forEach(j => { new Image().src = shots[(j + shots.length) % shots.length].dataset.full; });
  }
  const behindLightbox = () => [header, $('main'), $('footer'), $('.skip')];
  function openLb(i) {
    clearTimeout(hideTimer);
    lastFocus = document.activeElement;
    lbOpen = true;
    show(i);
    lb.hidden = false;
    void lb.offsetWidth; // start the fade from opacity 0
    lb.classList.add('open');
    lockScroll(true);
    setInert(true, behindLightbox());
    fabAway('lightbox', true);
    $('.lb-x', lb).focus();
  }
  function closeLb() {
    if (!lbOpen) return;
    lbOpen = false;
    lb.classList.remove('open');
    lockScroll(false);
    setInert(false, behindLightbox());
    fabAway('lightbox', false);
    hideTimer = setTimeout(() => { lb.hidden = true; }, 300);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  shots.forEach((btn, i) => btn.addEventListener('click', () => openLb(i)));
  $('.lb-x', lb).addEventListener('click', closeLb);
  $('.lb-pv', lb).addEventListener('click', () => show(cur - 1));
  $('.lb-nx', lb).addEventListener('click', () => show(cur + 1));
  lb3d.addEventListener('click', () => {
    const id = lb3d.dataset.piece;
    closeLb();
    if (RP.openConfigurator) RP.openConfigurator(id);
  });
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-fig')) closeLb(); });

  let touchX = null;
  let touchY = 0;
  lb.addEventListener('touchstart', e => {
    touchX = e.touches.length === 1 ? e.touches[0].clientX : null;
    touchY = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    touchX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(cur + (dx < 0 ? 1 : -1));
  }, { passive: true });

  /* ================= keyboard + outside clicks ================= */
  document.addEventListener('keydown', e => {
    if (lbOpen) {
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
      return;
    }
    if (e.key !== 'Escape') return;
    if (!langList.hidden) { setLangList(false); langBtn.focus(); }
    else if (!fabPanel.hidden) { setFab(false); fabBtn.focus(); }
    else if (menuOpen()) { setMenu(false); menuBtn.focus(); }
  });
  document.addEventListener('click', e => {
    if (!langList.hidden && !e.target.closest('.lang')) setLangList(false);
    if (!fabPanel.hidden && !e.target.closest('#fab')) setFab(false);
  });

  /* ================= scroll effects ================= */
  const links = $$('a[href^="#"]', nav).filter(a => a.hash.length > 1);
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
    }), { threshold: 0.12 });
    $$('.rv').forEach(el => reveal.observe(el));

    // highlight the section in the middle of the screen
    const spy = new IntersectionObserver(entries => entries.forEach(e => {
      const a = links.find(l => l.hash === '#' + e.target.id);
      if (!a) return;
      if (e.isIntersecting) {
        links.forEach(l => l.removeAttribute('aria-current'));
        a.setAttribute('aria-current', 'true');
      } else {
        a.removeAttribute('aria-current');
      }
    }), { rootMargin: '-45% 0px -54% 0px' });
    links.forEach(a => { const s = $(a.hash); if (s) spy.observe(s); });

    // hide the floating button while the contact footer is on screen
    new IntersectionObserver(([e]) => fabAway('footer', e.isIntersecting), { threshold: 0.1 }).observe($('#contact'));
  } else {
    $$('.rv').forEach(el => el.classList.add('in'));
    fabAway('footer', false);
  }

  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ================= toast + clipboard ================= */
  const toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.setAttribute('role', 'status');
  toastEl.setAttribute('aria-live', 'polite');
  document.body.append(toastEl);
  let toastTimer = 0;
  function toast(text) {
    toastEl.textContent = text;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
  }
  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.append(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { /* not allowed */ }
      ta.remove();
      return ok;
    }
  }

  /* small API for configurator.js */
  const RP = window.RP = {
    t, esc, icon, toast, copy, fabAway,
    get lang() { return lang; },
    onLang: fn => langListeners.push(fn),
    channels: keys => channelList(keys).map(({ key, name, icon: ic, href }) => ({ key, name, icon: ic, href }))
  };

  /* ================= start ================= */
  setLang(lang, false);
})();
