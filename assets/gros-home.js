/* غروس في الموقع: الواجهة الرئيسية (ترحيب فقط) وصفحة «تعرّف على غروس». يعتمد على gros.js */
(function () {
  if (!window.Gros) return;
  Gros.injectCSS();
  var D = document, PG = D.body.dataset.page, R = D.body.dataset.root || '';
  var css = D.createElement('style');
  css.textContent =
    '.gh{position:relative;width:clamp(170px,46vw,210px);margin:-10px auto 6px;z-index:3;display:flex;flex-direction:column;align-items:center;gap:2px}' +
    '.gh svg{width:100%;height:auto;display:block;filter:drop-shadow(0 14px 18px rgba(20,26,60,.25))}' +
    '.gh .glink{display:inline-block;background:rgba(255,255,255,.16);border:2px solid rgba(255,255,255,.45);color:#FFFFFF;border-radius:999px;padding:5px 16px;font-weight:700;font-size:15px;text-decoration:none;transition:background .2s,transform .2s}' +
    '.gh .glink:hover{background:rgba(255,255,255,.28);transform:translateY(-2px)}' +
    '.gh .glink:focus-visible{outline:3px solid #FDB515;outline-offset:3px}' +
    '@media (min-width:1000px){.hero .gh{position:absolute;left:max(3vw,24px);top:50%;margin:0;width:clamp(200px,17vw,250px);transform:translateY(-46%)}}' +
    /* صفحة غروس */
    '.gp{display:grid;gap:clamp(36px,6vw,60px)}' +
    '.gp .intro{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,300px);gap:28px;align-items:center}' +
    '.gp .intro .pic{background:#E6F6F7;border-radius:28px;padding:14px;display:grid;place-items:center}.gp .intro .pic svg{width:min(260px,100%);height:auto}' +
    '.gp p{margin:0 0 10px;font-size:clamp(17px,2.2vw,20px);line-height:1.9;max-width:62ch}' +
    '.gp .stg{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:12px}' +
    '.gp .st{display:grid;justify-items:center;gap:2px;text-align:center}.gp .st svg{width:100%;max-width:140px;height:auto}' +
    '.gp .st b{font-size:17px}.gp .st small{font-size:13px;opacity:.75}.gp .st i{font-style:normal;width:28px;height:28px;border-radius:50%;background:#283370;color:#FFFFFF;display:grid;place-items:center;font-size:14px;font-weight:700}' +
    '.gp .track{height:6px;border-radius:3px;background:linear-gradient(90deg,#DE4A52,#FDB515,#0AA4AD);margin-top:10px}' +
    '.gp .md{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}' +
    '.gp .mc{border:2px solid rgba(40,51,112,.14);border-radius:20px;padding:10px 10px 14px;text-align:center;display:grid;gap:2px;background:#FFFFFF}' +
    '.gp .mc svg{width:100%;max-width:130px;height:auto;margin:auto}.gp .mc b{font-size:17px}.gp .mc small{font-size:14px;opacity:.75}' +
    '.gp .how{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}' +
    '.gp .how div{background:#EEF3F8;border-radius:20px;padding:18px}.gp .how b{display:block;font-size:19px;margin-bottom:4px}.gp .how span{font-size:16px;line-height:1.8}' +
    '.gp .go{text-align:center}' +
    '@media (max-width:800px){.gp .intro{grid-template-columns:minmax(0,1fr)}.gp .intro .pic{order:-1}.gp .stg{grid-template-columns:repeat(4,minmax(0,1fr))}.gp .md{grid-template-columns:repeat(2,minmax(0,1fr))}.gp .how{grid-template-columns:minmax(0,1fr)}.gp .track{display:none}}';
  D.head.appendChild(css);
  var ar = function (n) { return String(n).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[d]; }); };

  if (PG === 'home') {
    var wrap = D.querySelector('.hero .wrap'); if (!wrap) return;
    var box = D.createElement('div'); box.className = 'gh';
    box.innerHTML = Gros.svg({ stage: 7, mood: 'welcome', title: 'غروس' }) + '<a class="glink" href="' + R + 'gros.html">تعرّف على غروس</a>';
    wrap.insertBefore(box, wrap.firstChild);
    return;
  }

  if (PG === 'gros') {
    var el = D.getElementById('grosPage'); if (!el) return;
    var stg = Gros.STAGES.map(function (s) {
      return '<div class="st">' + Gros.svg({ stage: s.n, mood: s.n === 7 ? 'joy' : 'idle' }) + '<i>' + ar(s.n) + '</i><b>' + s.name + '</b><small>' + (s.at ? 'عند ' + ar(Math.round(s.at * 100)) + '٪ من النجوم' : 'البداية') + '</small></div>';
    }).join('');
    var M = [['welcome', 'ترحيب', 'عند دخول الطفل إلى اللعبة'], ['clap', 'تصفيق', 'عند الإجابة الصحيحة'], ['joy', 'فرح', 'عند إنهاء اللعبة'], ['cheer', 'تشجيع', 'لا تيأس، حاول مرة أخرى'],
      ['sad', 'حزن خفيف', 'عند الإجابة الخاطئة'], ['think', 'تفكير', 'أثناء انتظار الإجابة'], ['wow', 'دهشة', 'عند الانتقال لمرحلة جديدة'], ['sleep', 'نائم', 'إذا ترك الطفل اللعب مدة']];
    var md = M.map(function (m) { return '<div class="mc">' + Gros.svg({ stage: 4, mood: m[0] }) + '<b>' + m[1] + '</b><small>' + m[2] + '</small></div>'; }).join('');
    el.innerHTML = '<div class="gp">' +
      '<div class="intro"><div><h2 class="ttl">من هو غروس؟</h2>' +
      '<p>غروس غرسة صغيرة ترافق أطفال برنامج غرس في رحلة تعلّم حروف القرآن الكريم. يبدأ بذرة صغيرة، ويكبر مع كل نجمة يجمعها الطفل في الألعاب، حتى يصير شجرة فيها تفاحة حمراء.</p>' +
      '<p>يفرح غروس مع الطفل حين يُصيب، ويشجّعه حين يخطئ، ليبقى التعلّم ممتعًا ومحفّزًا.</p></div>' +
      '<div class="pic">' + Gros.svg({ stage: 7, mood: 'welcome', title: 'غروس' }) + '</div></div>' +
      '<section><h2 class="ttl">مراحل النمو</h2><p>لغروس سبع مراحل. تُحسب المرحلة من مجموع النجوم التي جمعها الطفل في كل الألعاب.</p><div class="stg">' + stg + '</div><div class="track" aria-hidden="true"></div></section>' +
      '<section><h2 class="ttl">كيف تكبر الغرسة؟</h2><div class="how">' +
      '<div><b>العب واجمع النجوم</b><span>كل لعبة تعطي حتى ثلاث نجوم حسب الإتقان.</span></div>' +
      '<div><b>تابع شريط المستوى</b><span>في أعلى صفحة الألعاب شريط يُظهر مرحلة الغرسة وكم بقي للمرحلة التالية.</span></div>' +
      '<div><b>احفظ التقدّم</b><span>بإنشاء حساب يُحفظ تقدّم الطفل ويكمل من أي جهاز.</span></div></div></section>' +
      '<section><h2 class="ttl">غروس أثناء اللعب</h2><div class="md">' + md + '</div></section>' +
      '<div class="go"><a class="btn y" href="' + R + 'games/index.html">هيّا إلى الألعاب</a></div>' +
      '</div>';
  }
})();
