/* انتقال جميل بين صفحات موقع غرس: دائرة بتدرّج الهوية تتسع من مكان الضغط، وفي وسطها شعار غرس، ثم تنكمش لتكشف الصفحة الجديدة */
(function () {
  var D = document, H = D.documentElement, K = 'ghars_pt';
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var me = D.currentScript && D.currentScript.src, LOGO = me ? new URL('img/ghars_w.png', me).href : '';
  var G = 'linear-gradient(135deg,#283370,#0AA4AD)', E = 'cubic-bezier(.7,0,.25,1)';
  var css =
    'html.pt-in::before{content:"";position:fixed;inset:0;z-index:9998;background:' + G + ';clip-path:circle(150% at 50% 50%);transition:clip-path .6s ' + E + ';pointer-events:none}' +
    'html.pt-in.pt-go::before{clip-path:circle(0% at 50% 50%)}' +
    'html.pt-in::after{content:"";position:fixed;left:50%;top:50%;width:150px;height:72px;transform:translate(-50%,-50%);z-index:9999;background:url("' + LOGO + '") center/contain no-repeat;transition:opacity .2s;pointer-events:none}' +
    'html.pt-in.pt-go::after{opacity:0}' +
    '.pt-out{position:fixed;inset:0;z-index:9998;background:' + G + ';clip-path:circle(0% at var(--x) var(--y));transition:clip-path .5s ' + E + '}' +
    '.pt-out.on{clip-path:circle(150% at var(--x) var(--y))}' +
    '.pt-out img{position:absolute;left:50%;top:50%;width:150px;height:auto;transform:translate(-50%,-50%);opacity:0;transition:opacity .2s .28s}' +
    '.pt-out.on img{opacity:1}';
  var st = D.createElement('style'); st.textContent = css; (D.head || H).appendChild(st);

  // كشف الصفحة الجديدة
  var flag = null; try { flag = sessionStorage.getItem(K); sessionStorage.removeItem(K); } catch (e) {}
  if (flag) {
    H.classList.add('pt-in');
    var t0 = Date.now();
    var reveal = function () {
      var ready = D.querySelector('main, #app, .hero, #panel, .wrap');
      if (!ready && Date.now() - t0 < 1500) return setTimeout(reveal, 60);
      setTimeout(function () { H.classList.add('pt-go'); setTimeout(function () { H.classList.remove('pt-in', 'pt-go'); }, 700); }, 120);
    };
    if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', reveal); else reveal();
  }

  // الانتقال عند الضغط على رابط داخلي
  D.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download') || a.hasAttribute('data-lb')) return;
    var u; try { u = new URL(a.href, location.href); } catch (er) { return; }
    if (u.origin !== location.origin || !/^https?:$/.test(u.protocol)) return;
    if (u.pathname === location.pathname && u.search === location.search) return;   // نفس الصفحة (روابط #)
    if (!/\/gharssa\//.test(u.pathname) && /\/gharssa\//.test(location.pathname)) return;
    e.preventDefault();
    var o = D.createElement('div'); o.className = 'pt-out';
    o.style.setProperty('--x', e.clientX + 'px'); o.style.setProperty('--y', e.clientY + 'px');
    if (LOGO) { var im = D.createElement('img'); im.src = LOGO; im.alt = ''; o.appendChild(im); }
    D.body.appendChild(o);
    try { sessionStorage.setItem(K, '1'); } catch (er) {}
    requestAnimationFrame(function () { requestAnimationFrame(function () { o.classList.add('on'); }); });
    setTimeout(function () { location.href = u.href; }, 520);
  }, true);

  // الرجوع بزر المتصفح: إزالة أي غطاء متبقٍ
  addEventListener('pageshow', function (e) { if (e.persisted) { [].forEach.call(D.querySelectorAll('.pt-out'), function (x) { x.remove(); }); H.classList.remove('pt-in', 'pt-go'); } });
})();
