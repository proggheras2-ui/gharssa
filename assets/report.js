/* تقرير إتقان الحروف بهوية غرس — يُستخدم في صفحة أولياء الأمور وبوابة المعلمين */
function drawGharsReport(o){
  var F=o.font||'Ruqi';
  return Promise.all([document.fonts.load('700 40px "'+F+'"'),document.fonts.load('500 30px "'+F+'"')]).then(function(){
    var L=o.letters,mk=o.marks,ok=0,no=0;mk.forEach(function(v){if(v===1)ok++;else if(v===0)no++;});
    var W=1240,H=680+Math.ceil(L.length/7)*174+20+110+60+90,cv=document.createElement('canvas');cv.width=W;cv.height=H;var x=cv.getContext('2d');x.direction='rtl';
    var NAVY='#283370',SKY='#0AA4AD',RED='#DE4A52',YEL='#FDB515',MIST='#EEF3F8';
    var rr=function(X,Y,w,h,r,fill,stroke,lw){x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+w,Y,X+w,Y+h,r);x.arcTo(X+w,Y+h,X,Y+h,r);x.arcTo(X,Y+h,X,Y,r);x.arcTo(X,Y,X+w,Y,r);x.closePath();if(fill){x.fillStyle=fill;x.fill();}if(stroke){x.strokeStyle=stroke;x.lineWidth=lw||2;x.stroke();}};
    var T=function(t,X,Y,size,col,w,al){x.font=(w||700)+' '+size+'px "'+F+'"';x.fillStyle=col;x.textAlign=al||'right';x.fillText(t,X,Y);};
    x.fillStyle='#fff';x.fillRect(0,0,W,H);
    var gh=o.gheras,gs=o.ghars,hy=40,lh=120,w1=gh.naturalWidth*lh/gh.naturalHeight,w2=gs.naturalWidth*lh/gs.naturalHeight,gap=70,sx=(W+w1+gap+w2)/2;
    x.drawImage(gh,sx-w1,hy,w1,lh);x.fillStyle=NAVY;x.fillRect(sx-w1-gap/2-1.5,hy+15,3,lh-30);x.drawImage(gs,sx-w1-gap-w2,hy,w2,lh);
    var g=x.createLinearGradient(W,0,0,0);g.addColorStop(0,NAVY);g.addColorStop(1,SKY);x.fillStyle=g;x.fillRect(0,200,W,14);
    T('تقرير إتقان الحروف',W/2,300,62,NAVY,700,'center');
    rr(80,340,W-160,190,28,MIST);
    T('البطل: '+o.name,W-120,410,44,NAVY);T('المعلم: '+o.teacher,W-120,465,30,'#4a5488',500);
    T('تاريخ التقرير: '+new Date().toLocaleDateString('ar-SA-u-ca-gregory-nu-latn',{year:'numeric',month:'long',day:'numeric'}),W-120,510,26,'#4a5488',500);
    var pct=L.length?ok/L.length:0,cx=230,cy=435,R=72;
    x.lineWidth=20;x.strokeStyle='#fff';x.beginPath();x.arc(cx,cy,R,0,Math.PI*2);x.stroke();
    x.strokeStyle=SKY;x.lineCap='round';x.beginPath();x.arc(cx,cy,R,-Math.PI/2,-Math.PI/2+Math.PI*2*pct);x.stroke();x.lineCap='butt';
    T(Math.round(pct*100)+'%',cx,cy+14,40,NAVY,700,'center');
    var cw=320,cg=24;rr(W/2+cg/2,560,cw,80,40,SKY);T('أتقن: '+ok,W/2+cg/2+cw/2,612,32,'#fff',700,'center');rr(W/2-cg/2-cw,560,cw,80,40,RED);T('لم يتقن بعد: '+no,W/2-cg/2-cw/2,612,32,'#fff',700,'center');
    var cols=7,gx=24,tw=(W-160-gx*(cols-1))/cols,th=150,top=680;
    L.forEach(function(Lt,i){var r=Math.floor(i/cols),k=i%cols,X=W-80-tw-(k*(tw+gx)),Y=top+r*(th+gx),v=mk[i];
      rr(X,Y,tw,th,24,v===1?SKY:v===0?RED:'#fff',v===1||v===0?null:'#D9E2EE',3);
      var col=v===1||v===0?'#fff':NAVY;T(Lt,X+tw/2,Y+(Lt.length>3?86:92),Lt.length>3?44:64,col,700,'center');
      T(v===1?'أتقن ✓':v===0?'لم يتقن':'—',X+tw/2,Y+132,24,col,500,'center');});
    var endY=top+Math.ceil(L.length/cols)*(th+gx);
    var msg=ok===L.length?'ما شاء الله! أتقن جميع الحروف، بارك الله فيه وجعله من أهل القرآن.':ok>=L.length*0.7?'أداء رائع! نسأل الله أن يتمّ عليه إتقان بقية الحروف.':'بداية طيبة، ومع التدريب في البيت سيتقن الحروف بإذن الله.';
    rr(80,endY+20,W-160,110,28,'#FFF6E0');T(msg,W/2,endY+88,30,NAVY,700,'center');
    var fy=H-90,g2=x.createLinearGradient(W,0,0,0);g2.addColorStop(0,NAVY);g2.addColorStop(1,SKY);x.fillStyle=g2;x.fillRect(0,fy,W,90);
    var dots=[YEL,'#fff',RED,'#fff',YEL];for(var i=0;i<26;i++){x.fillStyle=dots[i%5];x.globalAlpha=.85;x.beginPath();x.arc(30+i*(W-60)/25,fy+45,i%2?6:10,0,Math.PI*2);x.fill();}x.globalAlpha=1;
    return cv;
  });
}
function loadImg(src){return new Promise(function(ok,no){var i=new Image();i.onload=function(){ok(i)};i.onerror=no;i.src=src;});}
