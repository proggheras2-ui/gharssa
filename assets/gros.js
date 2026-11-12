/* غروس — شخصية برنامج غرس. ألوان الهوية فقط. */
(function (W) {
  var N = '#283370', S = '#0AA4AD', R = '#DE4A52', Y = '#FDB515', H = '#FFFFFF';
  var CSS = '' +
  '.gros{display:block;overflow:visible}' +
  '.gros *{transform-box:fill-box}' +
  '.gros .g-all{transform-origin:50% 100%;animation:g-breath 3.2s ease-in-out infinite}' +
  '.gros .g-eye{transform-origin:50% 50%;animation:g-blink 4.6s infinite}' +
  '.gros .g-crown{transform-origin:50% 100%;animation:g-sway 4s ease-in-out infinite}' +
  '.gros .g-armL{transform-origin:100% 50%}.gros .g-armR{transform-origin:0% 50%}' +
  '.gros .g-fx{opacity:0}' +
  /* ترحيب */
  '.gros.m-welcome .g-armR{animation:g-wave .9s ease-in-out infinite}' +
  '.gros.m-welcome .g-all{animation:g-hop 1.8s ease-in-out infinite}' +
  /* تصفيق */
  '.gros.m-clap .g-armL{animation:g-clapL .42s ease-in-out infinite}' +
  '.gros.m-clap .g-armR{animation:g-clapR .42s ease-in-out infinite}' +
  '.gros.m-clap .g-fx{animation:g-pop .84s ease-out infinite}' +
  /* فرح */
  '.gros.m-joy .g-all{animation:g-jump .8s cubic-bezier(.3,.7,.4,1) infinite}' +
  '.gros.m-joy .g-armL{animation:g-upL .8s ease-in-out infinite}.gros.m-joy .g-armR{animation:g-upR .8s ease-in-out infinite}' +
  '.gros.m-joy .g-fx{animation:g-pop .8s ease-out infinite}' +
  /* حزن */
  '.gros.m-sad .g-all{animation:g-slump 3s ease-in-out infinite}' +
  '.gros.m-sad .g-crown{animation:none;transform:rotate(-14deg) translateY(4px)}' +
  '.gros.m-sad .g-armL{transform:rotate(-38deg)}.gros.m-sad .g-armR{transform:rotate(38deg)}' +
  '.gros.m-sad .g-tear{animation:g-tear 1.8s ease-in infinite}' +
  /* تفكير */
  '.gros.m-think .g-armR{transform:translate(-14px,-4px) rotate(185deg)}' +
  '.gros.m-think .g-bub{animation:g-float 2.4s ease-in-out infinite}' +
  '.gros.m-think .g-all{animation:g-tilt 3s ease-in-out infinite}' +
  /* تشجيع */
  '.gros.m-cheer .g-armR{animation:g-fist .7s ease-in-out infinite}' +
  '.gros.m-cheer .g-all{animation:g-nod .7s ease-in-out infinite}' +
  '.gros.m-wow .g-all{animation:g-grow 1.6s ease-in-out infinite}.gros.m-wow .g-fx{animation:g-pop 1.6s ease-out infinite}.gros.m-wow .g-armL{transform:rotate(55deg)}.gros.m-wow .g-armR{transform:rotate(-55deg)}' +
  '@keyframes g-grow{0%,100%{transform:scale(1)}40%{transform:scale(1.08)}}' +
  /* نوم */
  '.gros.m-sleep .g-all{animation:g-breath 4.5s ease-in-out infinite}' +
  '.gros.m-sleep .g-z{animation:g-zz 2.6s linear infinite}' +
  '@keyframes g-breath{0%,100%{transform:scale(1,1)}50%{transform:scale(1.025,.975)}}' +
  '@keyframes g-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}' +
  '@keyframes g-sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}' +
  '@keyframes g-wave{0%,100%{transform:rotate(-20deg)}50%{transform:rotate(-75deg)}}' +
  '@keyframes g-hop{0%,70%,100%{transform:translateY(0)}80%{transform:translateY(-8px)}}' +
  '@keyframes g-clapL{0%,100%{transform:translateX(4px) rotate(-120deg)}50%{transform:translateX(13px) rotate(-162deg)}}' +
  '@keyframes g-clapR{0%,100%{transform:translateX(-4px) rotate(120deg)}50%{transform:translateX(-13px) rotate(162deg)}}' +
  '@keyframes g-jump{0%,100%{transform:translateY(0) scale(1.06,.94)}45%{transform:translateY(-26px) scale(.96,1.05)}}' +
  '@keyframes g-upL{0%,100%{transform:rotate(20deg)}45%{transform:rotate(80deg)}}' +
  '@keyframes g-upR{0%,100%{transform:rotate(-20deg)}45%{transform:rotate(-80deg)}}' +
  '@keyframes g-pop{0%{opacity:0;transform:scale(.4)}30%{opacity:1}100%{opacity:0;transform:scale(1.3) translateY(-10px)}}' +
  '@keyframes g-slump{0%,100%{transform:translateY(3px) rotate(-1.5deg)}50%{transform:translateY(4px) rotate(1.5deg)}}' +
  '@keyframes g-tear{0%{opacity:0;transform:translateY(0)}20%{opacity:1}100%{opacity:0;transform:translateY(22px)}}' +
  '@keyframes g-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}' +
  '@keyframes g-tilt{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(2deg)}}' +
  '@keyframes g-fist{0%,100%{transform:rotate(-40deg)}50%{transform:rotate(-80deg) translateY(-4px)}}' +
  '@keyframes g-nod{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}' +
  '@keyframes g-zz{0%{opacity:0;transform:translate(0,0) scale(.6)}30%{opacity:1}100%{opacity:0;transform:translate(14px,-30px) scale(1.2)}}' +
  '@media (prefers-reduced-motion:reduce){.gros *{animation:none!important}}';

  function leaf(x, y, len, ang, fill) {
    var w = len * 0.42;
    return '<path transform="translate(' + x + ' ' + y + ') rotate(' + ang + ')" d="M0 0 C' + (len * .3) + ' ' + (-w) + ' ' + (len * .8) + ' ' + (-w) + ' ' + len + ' 0 C' + (len * .8) + ' ' + w + ' ' + (len * .3) + ' ' + w + ' 0 0Z" fill="' + (fill || S) + '"/>' +
      '<path transform="translate(' + x + ' ' + y + ') rotate(' + ang + ')" d="M2 0 L' + (len * .82) + ' 0" stroke="' + H + '" stroke-opacity=".55" stroke-width="2" stroke-linecap="round" fill="none"/>';
  }
  function crown(stage) {
    var s = '';
    if (stage === 1) {
      s += '';
    } else if (stage === 2) {
      s += '<path d="M100 106 q-3 -9 3 -14" stroke="' + S + '" stroke-width="4" fill="none" stroke-linecap="round"/>' + leaf(102, 93, 13, -40);
    } else if (stage === 3) {
      s += '<path d="M100 106 L100 84" stroke="' + S + '" stroke-width="5" stroke-linecap="round"/>' +
        leaf(100, 86, 26, -150) + leaf(100, 86, 26, -30);
    } else if (stage === 4) {
      s += '<path d="M100 106 Q97 85 100 66" stroke="' + S + '" stroke-width="5.5" fill="none" stroke-linecap="round"/>' +
        leaf(99, 92, 28, -160) + leaf(99, 88, 28, -20) + leaf(100, 70, 30, -135) + leaf(100, 68, 30, -45);
    } else if (stage === 5) {
      s += '<path d="M100 106 Q96 78 100 46" stroke="' + S + '" stroke-width="6" fill="none" stroke-linecap="round"/>' +
        leaf(98, 94, 30, -165) + leaf(98, 90, 30, -15) + leaf(99, 74, 34, -150) + leaf(99, 72, 34, -30) +
        leaf(100, 54, 32, -125) + leaf(100, 52, 32, -55) +
        '<circle cx="100" cy="42" r="9" fill="' + Y + '"/><circle cx="100" cy="42" r="4" fill="' + H + '" fill-opacity=".7"/>';
    } else if (stage === 6) {
      s += '<path d="M100 108 Q98 92 100 76" stroke="' + N + '" stroke-width="7" fill="none" stroke-linecap="round"/>' +
        '<g fill="' + S + '"><circle cx="100" cy="52" r="24"/><circle cx="78" cy="64" r="17"/><circle cx="122" cy="64" r="17"/><circle cx="100" cy="72" r="16"/></g>' +
        '<g fill="' + H + '" fill-opacity=".22"><circle cx="90" cy="42" r="6"/><circle cx="74" cy="60" r="4"/></g>' +
        '<g fill="' + H + '"><circle cx="86" cy="56" r="4"/><circle cx="116" cy="48" r="4"/><circle cx="108" cy="68" r="3.5"/></g>' +
        '<g fill="' + Y + '"><circle cx="86" cy="56" r="1.6"/><circle cx="116" cy="48" r="1.6"/><circle cx="108" cy="68" r="1.4"/></g>';
    } else {
      s += '<path d="M100 108 Q98 90 100 70" stroke="' + N + '" stroke-width="9" fill="none" stroke-linecap="round"/>' +
        '<path d="M100 84 Q88 76 82 64" stroke="' + N + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
        '<path d="M100 80 Q112 72 118 60" stroke="' + N + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
        '<g fill="' + S + '"><circle cx="100" cy="30" r="30"/><circle cx="68" cy="46" r="24"/><circle cx="132" cy="46" r="24"/>' +
        '<circle cx="80" cy="18" r="20"/><circle cx="120" cy="18" r="20"/><circle cx="100" cy="56" r="22"/></g>' +
        '<g fill="' + H + '" fill-opacity=".22"><circle cx="86" cy="14" r="8"/><circle cx="62" cy="40" r="6"/><circle cx="114" cy="22" r="5"/></g>' +
        '<g transform="translate(128 52)"><path d="M0 -14 q2 -8 9 -10" stroke="' + N + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        leaf(2, -13, 12, -40) +
        '<path d="M0 -10 C-10 -16 -18 -6 -16 4 C-14 14 -6 18 0 14 C6 18 14 14 16 4 C18 -6 10 -16 0 -10Z" fill="' + R + '"/>' +
        '<ellipse cx="-8" cy="-3" rx="3" ry="5" fill="' + H + '" fill-opacity=".55"/></g>' +
        '<circle cx="74" cy="30" r="5" fill="' + R + '"/>';
    }
    return '<g class="g-crown">' + s + '</g>';
  }
  function face(m) {
    var e = '', mo = '', ex = '';
    var eyeO = function (dx, dy) {
      return '<g class="g-eye"><ellipse cx="85" cy="148" rx="8" ry="9.5" fill="' + N + '"/><ellipse cx="115" cy="148" rx="8" ry="9.5" fill="' + N + '"/>' +
        '<circle cx="' + (88 + dx) + '" cy="' + (144 + dy) + '" r="3.4" fill="' + H + '"/><circle cx="' + (118 + dx) + '" cy="' + (144 + dy) + '" r="3.4" fill="' + H + '"/>' +
        '<circle cx="' + (82 + dx) + '" cy="' + (152 + dy) + '" r="1.5" fill="' + H + '"/><circle cx="' + (112 + dx) + '" cy="' + (152 + dy) + '" r="1.5" fill="' + H + '"/></g>';
    };
    var happy = '<path d="M79 148 Q86 139 93 148 M107 148 Q114 139 121 148" stroke="' + N + '" stroke-width="3.6" fill="none" stroke-linecap="round"/>';
    if (m === 'joy' || m === 'clap') {
      e = happy;
      mo = '<path d="M91 161 Q100 174 109 161 Z" fill="' + N + '" stroke="' + N + '" stroke-width="2" stroke-linejoin="round"/><path d="M95 167 Q100 164 105 167 Q100 171 95 167Z" fill="' + R + '"/>';
    } else if (m === 'sad') {
      e = eyeO(-1, 1) + '<path d="M78 136 Q85 135 91 131 M122 136 Q115 135 109 131" stroke="' + N + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
      mo = '<path d="M90 167 Q100 159 110 167" stroke="' + N + '" stroke-width="3.4" fill="none" stroke-linecap="round"/>';
      ex = '<path class="g-tear" d="M80 154 q-4 7 0 10 q4 -3 0 -10Z" fill="' + S + '" stroke="' + H + '" stroke-width="1.2"/>';
    } else if (m === 'think') {
      e = eyeO(1, -2) + '<path d="M80 135 Q86 132 92 135" stroke="' + N + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
      mo = '<path d="M94 164 Q100 162 106 165" stroke="' + N + '" stroke-width="3.2" fill="none" stroke-linecap="round"/>';
    } else if (m === 'wow') {
      e = '<g class="g-eye"><circle cx="86" cy="145" r="8" fill="' + N + '"/><circle cx="114" cy="145" r="8" fill="' + N + '"/><circle cx="89" cy="141" r="3" fill="' + H + '"/><circle cx="117" cy="141" r="3" fill="' + H + '"/></g>' +
        '<path d="M78 132 Q86 127 93 132 M107 132 Q114 127 122 132" stroke="' + N + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
      mo = '<ellipse cx="100" cy="164" rx="6" ry="7.5" fill="' + N + '"/><ellipse cx="100" cy="167" rx="3.5" ry="3" fill="' + R + '"/>';
    } else if (m === 'sleep') {
      e = '<path d="M80 147 Q86 151 92 147 M108 147 Q114 151 120 147" stroke="' + N + '" stroke-width="3.2" fill="none" stroke-linecap="round"/>';
      mo = '<ellipse cx="100" cy="163" rx="3.5" ry="4" fill="' + N + '"/>';
    } else if (m === 'cheer') {
      e = eyeO(0, 0) + '<path d="M79 135 Q86 131 93 136 M107 136 Q114 131 121 135" stroke="' + N + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
      mo = '<path d="M93 162 Q100 170 107 162" stroke="' + N + '" stroke-width="3.2" fill="none" stroke-linecap="round"/>';
    } else {
      e = eyeO(0, 0);
      mo = '<path d="M94 163 Q100 169 106 163" stroke="' + N + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    }
    var cheeks = '<ellipse cx="72" cy="162" rx="7.5" ry="4.5" fill="' + R + '" fill-opacity=".42"/><ellipse cx="128" cy="162" rx="7.5" ry="4.5" fill="' + R + '" fill-opacity=".42"/>';
    return cheeks + e + mo + ex;
  }
  function fx(m) {
    if (m === 'joy' || m === 'clap' || m === 'wow') {
      var st = function (x, y, r, c) { var p = ''; for (var i = 0; i < 10; i++) { var a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .45 : r; p += (i ? 'L' : 'M') + (x + rr * Math.cos(a)).toFixed(1) + ' ' + (y + rr * Math.sin(a)).toFixed(1); } return '<path d="' + p + 'Z" fill="' + c + '"/>'; };
      return '<g class="g-fx">' + st(40, 120, 9, Y) + st(162, 112, 8, Y) + st(52, 92, 5, R) + st(150, 86, 6, S) + '</g>';
    }
    if (m === 'think') return '<g class="g-bub"><circle cx="146" cy="118" r="4" fill="' + Y + '"/><circle cx="156" cy="104" r="6" fill="' + Y + '"/>' +
      '<circle cx="170" cy="82" r="16" fill="' + Y + '"/><text x="170" y="89" text-anchor="middle" font-size="20" font-weight="700" fill="' + N + '" font-family="Ruqiaround,Tahoma,sans-serif">؟</text></g>';
    if (m === 'sleep') return '<g class="g-z" fill="' + N + '" font-family="Tahoma,sans-serif" font-weight="700"><text x="134" y="120" font-size="14">z</text></g>';
    return '';
  }
  function arms() {
    var a = function (cls, x, ang) {
      return '<g class="' + cls + '"><g transform="translate(' + x + ' 168) rotate(' + ang + ')">' +
        '<path d="M0 0 C6 -9 20 -10 26 -2 C20 6 6 6 0 0Z" fill="' + S + '" stroke="' + N + '" stroke-width="2.4" stroke-linejoin="round"/></g></g>';
    };
    // left arm points to the left (rotate 180 + droop), right arm to the right
    return a('g-armL', 62, 160) + a('g-armR', 138, 20);
  }
  function svg(o) {
    o = o || {};
    var st = Math.max(1, Math.min(7, o.stage || 4)), m = o.mood || 'idle';
    var body = '';
    if (st === 1) {
      // قشرة البذرة الصفراء: البطل يفقس من بذرته
      body += '<path d="M56 168 C50 120 80 100 100 104 C120 100 150 120 144 168Z" fill="' + S + '" stroke="' + N + '" stroke-width="2.4"/>';
    } else {
      body += '<path d="M100 104 C134 104 148 128 148 154 C148 178 128 189 100 189 C72 189 52 178 52 154 C52 128 66 104 100 104Z" fill="' + S + '" stroke="' + N + '" stroke-width="2.4"/>' +
        '<ellipse cx="80" cy="124" rx="10" ry="6" fill="' + H + '" fill-opacity=".35" transform="rotate(-25 80 124)"/>';
    }
    var shell = st === 1 ?
      '<path d="M48 160 L58 150 L66 160 L76 149 L86 160 L96 150 L104 160 L114 149 L124 160 L134 150 L142 160 L152 152 C156 186 132 204 100 204 C68 204 44 186 48 160Z" fill="' + Y + '" stroke="' + N + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M66 178 q10 6 18 2 M116 182 q10 2 16 -4" stroke="' + N + '" stroke-opacity=".35" stroke-width="2.4" fill="none" stroke-linecap="round"/>' : '';
    var pot = '<path d="M60 196 L140 196 L132 236 L68 236Z" fill="' + N + '"/><rect x="54" y="186" width="92" height="16" rx="6" fill="' + Y + '"/>' +
      '<path d="M76 214 h48" stroke="' + H + '" stroke-opacity=".25" stroke-width="3" stroke-linecap="round"/>';
    var inner = crown(st) + body + (st === 1 ? '' : arms()) + face(m) + shell + fx(m);
    var lab = o.title ? '<title>' + o.title + '</title>' : '';
    return '<svg class="gros m-' + m + ' s-' + st + '" viewBox="0 -12 200 252" role="img" xmlns="http://www.w3.org/2000/svg">' + lab +
      '<ellipse cx="100" cy="238" rx="58" ry="5" fill="' + N + '" fill-opacity=".15"/>' + pot +
      '<g class="g-all">' + inner + '</g></svg>';
  }
  function injectCSS() { if (document.getElementById('gros-css')) return; var s = document.createElement('style'); s.id = 'gros-css'; s.textContent = CSS; document.head.appendChild(s); }
  // المراحل حسب نسبة التقدم (0..1)
  var STAGES = [{ n: 1, name: 'بذرة', at: 0 }, { n: 2, name: 'برعم', at: .07 }, { n: 3, name: 'نبتة صغيرة', at: .17 }, { n: 4, name: 'نبتة', at: .3 }, { n: 5, name: 'نبتة مزهرة', at: .45 }, { n: 6, name: 'شجيرة', at: .63 }, { n: 7, name: 'شجرة التفاح', at: .85 }];
  function stageFor(p) { var s = STAGES[0]; STAGES.forEach(function (x) { if (p >= x.at) s = x; }); return s; }
  W.Gros = { svg: svg, css: CSS, injectCSS: injectCSS, STAGES: STAGES, stageFor: stageFor,
    mount: function (el, o) { injectCSS(); el.innerHTML = svg(o); } };
})(window);
