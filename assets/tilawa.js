/* مشغّل التلاوات في صفحات المستويات: بطاقة طفولية، غروس يكبر مع الاستماع، ونجوم عند الإتمام. ألوان الهوية فقط. */
(function () {
 var CSSDONE = false;
 window.tilawaMount = function () {
  var D = document, list = D.querySelector('.surahs.tl'); if (!list || list.dataset.tl) return; list.dataset.tl = 1;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var KEY = 'ghars_tilawa', done = {};
  try { done = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} };
  var ar = function (n) { return String(n).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[d]; }); };
  var tm = function (s) { s = Math.max(0, Math.floor(s || 0)); return ar(Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0')); };
  var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z"/></svg>';
  var PLAY = '<svg class="i-pl" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.9l10.6-6.8a1 1 0 0 0 0-1.7L9.5 4.3A1 1 0 0 0 8 5.2z"/></svg>';
  var PAUSE = '<svg class="i-pa" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4.5" width="4.4" height="15" rx="1.6"/><rect x="13.6" y="4.5" width="4.4" height="15" rx="1.6"/></svg>';

  var css = D.createElement('style');
  css.textContent =
    '.surahs.tl{gap:14px}' +
    '.surahs.tl li{--c:var(--sky);position:relative;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:14px;padding:12px 16px;border:2px solid var(--line);border-radius:26px;background:var(--white);overflow:hidden;transition:border-color .3s,box-shadow .3s,transform .3s}' +
    '.surahs.tl li::before{content:"";position:absolute;inset:0;background:radial-gradient(120% 140% at 100% 0%,color-mix(in srgb,var(--c) 14%,transparent),transparent 60%);opacity:.7;transition:opacity .4s;pointer-events:none}' +
    '.surahs.tl li:hover{border-color:var(--c);transform:translateY(-2px);box-shadow:0 10px 22px rgba(40,51,112,.10)}' +
    '.surahs.tl li.on{border-color:var(--c);box-shadow:0 12px 28px color-mix(in srgb,var(--c) 30%,transparent)}.surahs.tl li.on::before{opacity:1}' +
    '.surahs.tl .c1{--c:var(--sky)}.surahs.tl .c2{--c:var(--yellow)}.surahs.tl .c3{--c:var(--red)}.surahs.tl .c4{--c:var(--navy)}' +
    /* غروس */
    '.tl .tg{position:relative;width:62px;height:62px;border-radius:50%;background:color-mix(in srgb,var(--c) 16%,var(--white));display:grid;place-items:end center;overflow:visible;flex:none}' +
    '.tl .tg svg.gros{width:58px;height:auto;margin-bottom:2px;transition:transform .4s cubic-bezier(.3,1.6,.5,1)}' +
    '.tl li.grow .tg svg.gros{animation:tl-pop .5s cubic-bezier(.3,1.6,.5,1)}' +
    '@keyframes tl-pop{0%{transform:scale(.7)}100%{transform:scale(1)}}' +
    '.tl .tg .ok{position:absolute;top:-6px;left:-6px;width:26px;height:26px;border-radius:50%;background:var(--yellow);display:none;place-items:center;box-shadow:0 2px 0 var(--navy)}' +
    '.tl .tg .ok svg{width:16px;height:16px;fill:var(--white)}.tl li.dn .tg .ok{display:grid;animation:tl-pop .5s cubic-bezier(.3,1.6,.5,1)}' +
    /* الاسم والمسار */
    '.tl .tm{display:grid;gap:8px;min-width:0;position:relative}' +
    '.tl .tm b{font-size:21px;color:var(--navy);line-height:1.2}' +
    '.tl .tm small{font-size:14px;color:var(--soft);font-weight:700}' +
    '.tl .tr{position:relative;height:14px;border-radius:999px;background:var(--mist);cursor:pointer;touch-action:none;box-shadow:inset 0 2px 0 rgba(40,51,112,.06)}' +
    '.tl .tr i{position:absolute;inset-block:0;right:0;width:var(--p,0%);border-radius:inherit;background:linear-gradient(270deg,var(--c),color-mix(in srgb,var(--c) 60%,var(--yellow)));transition:width .25s linear}' +
    '.tl .tr .st{position:absolute;top:50%;right:var(--p,0%);width:28px;height:28px;transform:translate(50%,-50%);transition:right .25s linear;filter:drop-shadow(0 2px 0 rgba(40,51,112,.35))}' +
    '.tl .tr .st svg{width:100%;height:100%;fill:var(--yellow);stroke:var(--navy);stroke-width:1.4}' +
    '.tl li.on .tr .st svg{animation:tl-spin 2.4s linear infinite}' +
    '@keyframes tl-spin{to{transform:rotate(-360deg)}}' +
    '.tl .tt{display:flex;justify-content:space-between;gap:8px;font-size:14px;color:var(--soft);font-weight:700}' +
    /* زر التشغيل */
    '.tl .pb{position:relative;width:62px;height:62px;border-radius:50%;border:0;background:var(--c);color:var(--white);display:grid;place-items:center;cursor:pointer;box-shadow:0 5px 0 color-mix(in srgb,var(--c) 55%,var(--navy));transition:transform .15s,box-shadow .15s;flex:none}' +
    '.tl .c2 .pb{color:var(--navy)}' +
    '.tl .pb:hover{transform:translateY(-2px) scale(1.05)}.tl .pb:active{transform:translateY(3px);box-shadow:0 2px 0 color-mix(in srgb,var(--c) 55%,var(--navy))}' +
    '.tl .pb:focus-visible{outline:3px solid var(--navy);outline-offset:3px}' +
    '.tl .pb svg{width:28px;height:28px;fill:currentColor}.tl .pb .i-pa{display:none}.tl li.on .pb .i-pa{display:block}.tl li.on .pb .i-pl{display:none}' +
    '.tl .pb::before,.tl .pb::after{content:"";position:absolute;inset:0;border-radius:50%;border:3px solid var(--c);opacity:0;pointer-events:none}' +
    '.tl li.on .pb::before{animation:tl-ring 1.8s ease-out infinite}.tl li.on .pb::after{animation:tl-ring 1.8s ease-out .9s infinite}' +
    '@keyframes tl-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.7);opacity:0}}' +
    '.tl li.ld .pb svg{opacity:0}' +
    '.tl li.ld .pb::after{opacity:1;inset:10px;border-color:var(--white) transparent transparent transparent;animation:tl-rot .8s linear infinite}' +
    '@keyframes tl-rot{to{transform:rotate(360deg)}}' +
    /* نجوم متطايرة */
    '.tl .sp{position:absolute;width:16px;height:16px;pointer-events:none;z-index:2;animation:tl-up 1.8s ease-out forwards}' +
    '.tl .sp svg{width:100%;height:100%;fill:var(--k,var(--yellow))}' +
    '@keyframes tl-up{0%{transform:translate(0,0) scale(.3) rotate(0);opacity:0}15%{opacity:1}100%{transform:translate(var(--dx,0),-70px) scale(1) rotate(160deg);opacity:0}}' +
    '.tl .bs{position:absolute;width:20px;height:20px;pointer-events:none;z-index:3;animation:tl-burst 1.1s cubic-bezier(.2,.8,.3,1) forwards}' +
    '.tl .bs svg{width:100%;height:100%;fill:var(--k,var(--yellow))}' +
    '@keyframes tl-burst{0%{transform:translate(0,0) scale(.2);opacity:1}70%{opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(1.1) rotate(220deg);opacity:0}}' +
    '.tl .yay{position:absolute;inset-inline:0;top:50%;transform:translateY(-50%) scale(.6);text-align:center;font-size:clamp(17px,4.4vw,22px);font-weight:700;color:var(--navy);opacity:0;pointer-events:none;z-index:3;animation:tl-yay 2.2s cubic-bezier(.3,1.5,.5,1) forwards}' +
    '.tl .yay span{background:var(--yellow);border-radius:999px;padding:4px 18px;box-shadow:0 3px 0 var(--navy)}' +
    '@keyframes tl-yay{0%{opacity:0;transform:translateY(-50%) scale(.6)}15%{opacity:1;transform:translateY(-50%) scale(1)}80%{opacity:1}100%{opacity:0;transform:translateY(-90%) scale(1)}}' +
    /* أنواع أخرى */
    '.tl .tx{justify-self:end}.tl .tx .mini{padding:10px 20px;font-size:16px}.tl .tx .soon{display:inline-block;background:color-mix(in srgb,var(--sky) 14%,var(--white));border-radius:999px;padding:8px 16px}' +
    '@media (max-width:480px){.surahs.tl li{gap:10px;padding:10px 12px}.tl .tg{width:52px;height:52px}.tl .tg svg.gros{width:48px}.tl .pb{width:54px;height:54px}.tl .tm b{font-size:19px}}' +
    '@media (prefers-reduced-motion:reduce){.tl *{animation:none!important;transition:none!important}}';
  if (!CSSDONE) { D.head.appendChild(css); CSSDONE = true; }

  var G = function (st, mood) { return window.Gros ? Gros.svg({ stage: st, mood: mood || 'idle' }) : ''; };
  var cur = null;

  [].forEach.call(list.querySelectorAll('li'), function (li, idx) {
    li.classList.add('c' + (idx % 4 + 1));
    var id = li.dataset.k, tg = li.querySelector('.tg'), au = li.querySelector('audio');
    var isDone = !!done[id];
    tg.innerHTML = G(isDone ? 7 : 1, isDone ? 'joy' : 'idle') + '<span class="ok" title="أتممت الاستماع">' + STAR + '</span>';
    if (isDone) { li.classList.add('dn'); var g0 = tg.querySelector('.gros'); if (g0) { g0.classList.remove('m-joy'); } }
    if (!au) return;
    var pb = li.querySelector('.pb'), tr = li.querySelector('.tr'), tc = li.querySelector('.tc'), td = li.querySelector('.td');
    var stage = isDone ? 7 : 1, spT = 0;
    var setG = function (st, mood) {
      if (st === stage && !mood) return; stage = st;
      tg.innerHTML = G(st, mood || 'idle') + '<span class="ok">' + STAR + '</span>';
      li.classList.remove('grow'); void li.offsetWidth; li.classList.add('grow');
    };
    var spark = function () {
      if (RM) return; var s = D.createElement('span'); s.className = 'sp'; s.innerHTML = STAR;
      var r = li.getBoundingClientRect(), b = tg.getBoundingClientRect();
      s.style.left = (b.left - r.left + b.width / 2 - 8 + (Math.random() * 30 - 15)) + 'px'; s.style.top = (b.top - r.top + 6) + 'px';
      s.style.setProperty('--dx', (Math.random() * 50 - 25) + 'px'); s.style.setProperty('--k', ['var(--yellow)', 'var(--sky)', 'var(--red)'][Math.random() * 3 | 0]);
      li.appendChild(s); setTimeout(function () { s.remove(); }, 1900);
    };
    var burst = function () {
      if (RM) return; var r = li.getBoundingClientRect(), b = pb.getBoundingClientRect();
      var cx = b.left - r.left + b.width / 2 - 10, cy = b.top - r.top + b.height / 2 - 10;
      for (var i = 0; i < 16; i++) {
        var s = D.createElement('span'); s.className = 'bs'; s.innerHTML = STAR; var a = i / 16 * Math.PI * 2, d = 60 + Math.random() * 70;
        s.style.left = cx + 'px'; s.style.top = cy + 'px'; s.style.setProperty('--dx', Math.cos(a) * d + 'px'); s.style.setProperty('--dy', Math.sin(a) * d * .6 + 'px');
        s.style.setProperty('--k', ['var(--yellow)', 'var(--sky)', 'var(--red)', 'var(--navy)'][i % 4]);
        li.appendChild(s); (function (x) { setTimeout(function () { x.remove(); }, 1200); })(s);
      }
      var y = D.createElement('div'); y.className = 'yay'; y.innerHTML = '<span>أحسنت! أتممت الاستماع</span>'; li.appendChild(y); setTimeout(function () { y.remove(); }, 2300);
    };
    var upd = function () {
      var d = au.duration, p = d ? au.currentTime / d : 0;
      li.style.setProperty('--p', (p * 100).toFixed(2) + '%');
      tc.textContent = tm(au.currentTime); if (d && isFinite(d)) td.textContent = tm(d);
      if (!li.classList.contains('dn')) { var st = Math.min(7, 1 + Math.floor(p * 7)); if (st !== stage) setG(st); }
    };
    pb.addEventListener('click', function () {
      if (au.paused) { if (cur && cur !== au) cur.pause(); cur = au; au.play().catch(function () { li.classList.remove('ld'); }); }
      else au.pause();
    });
    au.addEventListener('play', function () { li.classList.add('on'); pb.setAttribute('aria-label', 'إيقاف ' + li.dataset.n); clearInterval(spT); spT = setInterval(spark, 700); });
    au.addEventListener('pause', function () { li.classList.remove('on', 'ld'); pb.setAttribute('aria-label', 'استمع إلى ' + li.dataset.n); clearInterval(spT); });
    au.addEventListener('waiting', function () { li.classList.add('ld'); });
    au.addEventListener('playing', function () { li.classList.remove('ld'); });
    au.addEventListener('loadedmetadata', upd); au.addEventListener('timeupdate', upd);
    au.addEventListener('ended', function () {
      li.classList.remove('on'); clearInterval(spT); done[id] = 1; save(); li.classList.add('dn'); stage = 0; setG(7, 'joy'); burst();
      setTimeout(function () { var g = tg.querySelector('.gros'); if (g) g.classList.remove('m-joy'); }, 3000);
    });
    // التقديم والتأخير بالسحب على المسار
    var seek = function (e) {
      var r = tr.getBoundingClientRect(), p = Math.min(1, Math.max(0, (r.right - e.clientX) / r.width));
      if (au.duration && isFinite(au.duration)) { au.currentTime = p * au.duration; upd(); }
    };
    tr.addEventListener('pointerdown', function (e) { if (!au.duration) return; tr.setPointerCapture(e.pointerId); seek(e); tr.onpointermove = seek; });
    tr.addEventListener('pointerup', function () { tr.onpointermove = null; });
    tr.addEventListener('keydown', function (e) {
      if (!au.duration) return; var k = e.key;
      if (k === 'ArrowLeft') au.currentTime = Math.min(au.duration, au.currentTime + 5); else if (k === 'ArrowRight') au.currentTime = Math.max(0, au.currentTime - 5); else return;
      e.preventDefault(); upd();
    });
  });
 };
 window.tilawaMount();
})();
