/* غروس في الواجهة الرئيسية: كبير وتفاعلي. يعتمد على gros.js */
(function () {
  var hero = document.querySelector('.hero'), wrap = hero && hero.querySelector('.wrap');
  if (!wrap || !window.Gros) return;
  Gros.injectCSS();
  var css = document.createElement('style');
  css.textContent =
    '.gh{position:relative;width:clamp(140px,22vw,190px);margin:-10px auto 4px;z-index:3}' +
    '@media (min-width:1000px){.hero .gh{position:absolute;left:max(3vw,24px);top:50%;margin:0;width:clamp(160px,14vw,210px);transform:translateY(-44%)}.hero .gh .gb{right:auto;left:-10%;top:-30%;min-width:0;width:120%;max-width:none;border-radius:22px;transform-origin:50% 100%}}' +
    '.gh button{display:block;width:100%;background:none;border:0;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .35s cubic-bezier(.2,.9,.3,1.4)}' +
    '.gh button:focus-visible{outline:3px solid #FDB515;outline-offset:6px;border-radius:24px}' +
    '.gh button:active{transform:scale(.94)}' +
    '.gh svg{width:100%;height:auto;display:block;filter:drop-shadow(0 14px 18px rgba(20,26,60,.25))}' +
    '.gh .gb{position:absolute;top:2%;right:88%;min-width:150px;max-width:220px;background:#FFFFFF;color:#283370;border-radius:22px 22px 6px 22px;padding:10px 14px;font-weight:700;font-size:clamp(15px,2.2vw,18px);line-height:1.5;box-shadow:0 12px 24px -10px rgba(20,26,60,.45);opacity:0;transform:translateY(8px) scale(.9);transform-origin:100% 100%;transition:opacity .3s,transform .3s;pointer-events:none;text-align:center;z-index:4}' +
    '.gh .gb.on{opacity:1;transform:none;pointer-events:auto}' +
    '.gh .gb a{display:inline-block;margin-top:6px;background:#FDB515;color:#283370;border-radius:999px;padding:4px 14px;text-decoration:none}' +
    '.gh .tip{display:block;text-align:center;font-size:14px;font-weight:700;opacity:.85;margin-top:2px}' +
    '.gh .sp{position:absolute;width:14px;height:14px;pointer-events:none;animation:ghSp .9s ease-out forwards}' +
    '@keyframes ghSp{0%{opacity:1;transform:translate(0,0) scale(.4)}100%{opacity:0;transform:translate(var(--x),var(--y)) scale(1.2) rotate(180deg)}}' +
    '@media (max-width:700px){.gh{width:clamp(140px,40vw,170px);display:flex;flex-direction:column;align-items:center}.gh .gb{position:static;order:-1;width:min(80vw,260px);max-width:none;min-height:3.6em;display:grid;place-items:center;margin-bottom:6px;border-radius:22px;transform:none;transition:opacity .3s}.gh .gb.on{transform:none}.gh button{width:100%}}';
  document.head.appendChild(css);

  var stage = 7, mood = 'welcome', n = 0;
  var games = (document.querySelector('a[href*="games/"]') || {}).href || 'games/index.html';

  var box = document.createElement('div'); box.className = 'gh';
  box.innerHTML = '<div class="gb" role="status" aria-live="polite"></div><button type="button" aria-label="غروس، اضغط عليه"></button><span class="tip">اضغط على غروس</span>';
  wrap.insertBefore(box, wrap.firstChild);
  var btn = box.querySelector('button'), bub = box.querySelector('.gb'), tip = box.querySelector('.tip');
  var bt = 0, mt = 0, it = 0;
  function draw() { btn.innerHTML = Gros.svg({ stage: stage, mood: mood }); }
  function set(m, ms, back) { mood = m; draw(); clearTimeout(mt); if (ms) mt = setTimeout(function () { mood = back || 'idle'; draw(); }, ms); idle(); }
  function say(html, ms) { bub.innerHTML = html; bub.classList.add('on'); clearTimeout(bt); bt = setTimeout(function () { bub.classList.remove('on'); }, ms || 3200); }
  function idle() { clearTimeout(it); it = setTimeout(function () { mood = 'sleep'; draw(); say('خخخ.. اضغط لتوقظني', 2600); }, 30000); }
  function sparks() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var C = ['#FDB515', '#DE4A52', '#0AA4AD', '#FFFFFF'];
    for (var i = 0; i < 10; i++) {
      var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('class', 'sp');
      s.innerHTML = '<path fill="' + C[i % 4] + '" d="M12 2.6l2.9 6 6.5.8-4.8 4.5 1.2 6.5L12 17.3l-5.8 3.1 1.2-6.5L2.6 9.4l6.5-.8z"/>';
      var a = Math.random() * Math.PI * 2, r = 70 + Math.random() * 60;
      s.style.cssText = 'left:50%;top:45%;--x:' + (Math.cos(a) * r).toFixed(0) + 'px;--y:' + (Math.sin(a) * r - 30).toFixed(0) + 'px';
      box.appendChild(s); setTimeout(function (x) { return function () { x.remove(); }; }(s), 950);
    }
  }
  var ACTS = [['joy', 'أنا غروس! أكبر مع كل نجمة تجمعها'], ['clap', 'أحسنت! هكذا يصفّق الأبطال'], ['wow', 'واو! هل جرّبت ألعاب الحروف؟'], ['cheer', 'لا تيأس أبدًا، حاول مرة أخرى!'], ['think', 'أفكّر.. ما أول حرف في كلمة «قلم»؟'], ['joy', 'صحيح! حرف القاف<br><a href="GAMES">هيّا نلعب</a>']];
  btn.onclick = function () {
    tip.hidden = true;
    if (mood === 'sleep') { set('welcome', 1800); say('صباح الخير! أنا صحوت'); return; }
    var x = ACTS[n++ % ACTS.length];
    set(x[0], x[0] === 'think' ? 2600 : 1800); if (x[0] === 'joy' || x[0] === 'wow') sparks();
    say(x[1].replace('GAMES', games), x[1].indexOf('<a') > 0 ? 5000 : 2600);
  };
  btn.addEventListener('mouseenter', function () { if (mood === 'idle') set('clap', 1300); });
  // يميل نحو المؤشر قليلًا
  if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect(), dx = (e.clientX - (r.left + r.width / 2)) / innerWidth;
      btn.style.transform = 'rotate(' + Math.max(-7, Math.min(7, dx * 14)).toFixed(1) + 'deg)';
    }, { passive: true });
  }
  draw(); set('welcome', 2600);
  setTimeout(function () { say('السلام عليكم! أنا غروس', 3200); }, 600);
})();
