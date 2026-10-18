const fs=require('fs'),root='outputs/school-escape/';
function edit(file,changes){let s=fs.readFileSync(root+file,'utf8');for(const[a,b]of changes){if(!s.includes(a))throw Error(file+' missing '+a.slice(0,65));s=s.replaceAll(a,b);}fs.writeFileSync(root+file,s);}
edit('escape-core.js',[
['version:5,library:B.fresh()','version:6,cabinetOpen:false,library:B.fresh()'],
['if(!p||p.version!==5','if(p&&p.version===5)p={...p,version:6,cabinetOpen:!!p.door};if(!p||p.version!==6'],
["['decoded','revealed','door','complete']","['decoded','revealed','cabinetOpen','door','complete']"],
['(p.door&&!p.revealed)','(p.cabinetOpen&&(!p.revealed||!p.seen.includes(\'cabinet\')))||(p.door&&!p.cabinetOpen)'],
["id==='door'?p.revealed&&p.seen.includes('cabinet'):false","id==='cabinet'?p.revealed&&p.seen.includes('cabinet'):id==='door'?p.cabinetOpen:false"],
["||(id==='door'&&p.door)","||(id==='cabinet'&&p.cabinetOpen)||(id==='door'&&p.door)"],
["if(!value||!Number.isInteger(value.number)||value.number<0||value.number>99||!['green','amber'].includes(value.channel))return{invalid:true};p.attempts++;if(value.number!==24||value.channel!=='green')return wrong(p,now);p.door=true;return{ok:true};", "if(id==='cabinet'){if(!value||typeof value.code!=='string'||!/^\\d{4}$/.test(value.code))return{invalid:true};p.attempts++;if(value.code!=='1828')return wrong(p,now);p.cabinetOpen=true;return{ok:true};}\nif(!value||!Number.isInteger(value.number)||value.number<1000||value.number>9999)return{invalid:true};p.attempts++;if(value.number!==7316)return wrong(p,now);p.door=true;return{ok:true};"]]);
edit('first-room.js',[
['보관함 메모의 수를 구하고, 지도에 나온 길을 고르자',"보관함을 열어 교실 문을 여는 방법을 찾자"],
["progress.revealed?'보관함을 열어 교실 문을 여는 방법을 찾자'","progress.cabinetOpen?'보관함 속 쪽지를 보고 앞문 자물쇠를 열자':progress.revealed?'보관함을 열어 교실 문을 여는 방법을 찾자'"],
['“저건 내 목소리를 흉내 내. 소리 대신 표시를 확인해.”','“저건 내 목소리를 흉내 내. 문을 열기 전에 쪽지의 암호부터 풀어.”'],
['뒤쪽 게시판의 자리표에서 친구들 이름이 지워져 있다.\\n빈자리 옆에는 작은 초록색 병 그림이 남았다.\\n쪽지에는 “칠판의 흔적을 찾아. 초록 표시를 따라가.”라고 쓰여 있다.','뒤쪽 게시판의 자리표에서 친구들 이름이 지워져 있다.\\n내 이름만 남아 있다.\\n쪽지 뒷면에는 “문을 열려면 이 암호가 가리키는 곳부터 찾아.”라고 쓰여 있다.'],
['친구들이 사라진 자리 옆에 초록색 병 그림이 있다.\\n누군가 이름을 지우고 장소 기호를 남겼다.\\n“문을 열려면 쪽지의 곱셈 암호부터 풀어.”','친구들의 이름은 모두 지워지고 내 이름만 남아 있다.\\n아래에는 작은 글씨가 적혀 있다.\\n“다른 친구들도 학교 어딘가에 있어. 교실 문을 열 방법부터 찾아.”'],
["else if(id==='board'){if(progress.decoded){", "else if(id==='board'){if(progress.decoded){"],
["show('칠판 뒤의 연결로 지도','해독한 대로 칠판 아래 작은 틈을 밀자 지도가 나타났다.\\n\\n초록 연결로 → 별관 1층 과학실\\n노랑 연결로 → 같은 교실로 돌아옴\\n\\n“보관함 메모에 적힌 구슬 수를 구해 문에 입력해. 그다음 지도에 나온 길을 골라.”'", "show('칠판 뒤에 숨긴 메모','칠판 아래 틈에서 접힌 종이를 꺼냈다.\\n\\n“교실 문을 여는 방법은 태블릿 보관함 안에 숨겼어.\\n보관함에 붙은 그림을 보고 네 자리 비밀번호를 찾아.”'"],
["'<div class=\"story-card\">🟢 과학실 — 친구들이 있는 곳<br>🟡 같은 교실 — 귀신의 반복 통로<br><br>옆에 작은 글씨: “보관함의 메모에 구슬 수가 있어.”</div>'", "'<div class=\"story-card\">태블릿 보관함 비밀번호<br>① 그림의 전체 수 → ② 그림의 전체 수<br>두 답을 순서대로 이어 쓴다.</div>'"],
["else if(id==='cabinet'){E.see(progress,id);show('보관함에 붙은 메모'", "else if(id==='cabinet'){E.see(progress,id);openCabinet();}/* old cabinet copy\nshow('보관함에 붙은 메모'"],
["else if(id==='door'){if(progress.door)", "*/\nelse if(id==='door'){if(progress.door)"],
['숫자 입력 장치와 초록·노랑 연결로 스위치가 있다.\\n\\n문에 입력할 수와 어떤 색을 눌러야 할지 알려 주는 단서가 필요하다.','손잡이 옆에 숫자 자물쇠가 달려 있다.\\n네 자리 비밀번호가 필요하다. 교실 안에 단서가 있을까?'],
["function openDoor(){", "function oldDoorCopy(){"],
["function showCooldown(){", "function showCooldown(){"],
["id==='cipher'?'글자 세 칸을 채워 보자.':'구슬 수와 연결로를 모두 선택해 보자.'", "id==='cipher'?'글자 세 칸을 채워 보자.':'비밀번호 네 자리를 모두 입력해 보자.'"],
["}else{exitScene();GameFX.reward('door','교실 문이 열렸다');}", "}else if(id==='cabinet'){showCabinetContents();GameFX.reward('door','태블릿 보관함이 열렸다');}else{exitScene();GameFX.reward('door','교실 문이 열렸다');}"],
['하지만 지도의 초록 표시는 바뀌지 않는다.\\n이제 소리가 아니라 단서를 믿고 나아갈 수 있다.','보관함 속 쪽지를 다시 확인했다.\\n복도를 지나 별관 1층 과학실로 내려가 보자.'],
['문 아래의 초록빛이 자리표의 병 그림과 이어진다.\\n복도 너머에서 작은 노크가 세 번 들린다.\\n친구가 아직 어딘가에 있다.','보관함 속 쪽지에는 별관 1층 과학실이라고 적혀 있다.\\n복도 너머에서 작은 노크가 세 번 들린다.\\n그곳에 친구가 있을지도 모른다.'],
['초록 연결로로 나간다','과학실로 내려간다'],
['친구가 사라진 자리 옆의 초록 병 그림.','친구들의 이름은 지워지고 내 이름만 남았다.'],
['초록→과학실. 노랑→같은 교실. 보관함 메모의 구슬 수를 구해 문에 입력한다.','칠판 뒤 메모: 태블릿 보관함에 붙은 두 그림의 전체 수를 순서대로 이어 쓴다.'],
['<b>구슬 운반 기록</b>구슬이 한 상자에 6개씩, 모두 4상자. 구슬의 전체 수를 문에 입력한다.','<b>보관함의 그림 암호</b>①과 ② 그림의 전체 수를 구해 네 자리 비밀번호를 만든다.']]);
// Remove replaced dead UI blocks entirely rather than leave contradictory instructions.
let p=root+'first-room.js',s=fs.readFileSync(p,'utf8');s=s.replace(/\/\* old cabinet copy[\s\S]*?\*\//,'');const a=s.indexOf('function oldDoorCopy(){'),b=s.indexOf('function showCooldown(){',a);if(a<0||b<0)throw Error('old door missing');s=s.slice(0,a)+s.slice(b);
const ha=s.indexOf('function hint(){'),hb=s.indexOf('function exitScene(){',ha);s=s.slice(0,ha)+`function hint(){progress.hints++;save();if(dialogMode==='cabinet'){$('message').textContent='한 상자 안의 수 × 상자의 수로 각 그림의 전체 수를 구해 보자. ①의 답을 먼저, ②의 답을 뒤에 이어 쓴다.';return;}if(dialogMode==='door'){$('message').textContent='태블릿 보관함 안에서 찾은 쪽지에 앞문 비밀번호가 적혀 있다.';return;}const level=Math.min(3,++hintSteps.cipher);$('message').textContent=[null,'△ ○ □ 순서대로, 식의 답에 해당하는 글자를 표에서 찾자.','첫 식 3 × 4는 12. 표에서 맞는 글자를 찾자.','3 × 4 = 12, 4 × 6 = 24, 5 × 7 = 35. 표와 대조해 보자.'][level];}\n`+s.slice(hb);
s+=`\nfunction cabinetPictures(){return '<div class="cabinet-pictures">'+[[3,6],[4,7]].map(([boxes,each],n)=>'<section><h3>'+['①','②'][n]+'</h3><div class="bead-boxes" aria-label="'+each+'개씩 '+boxes+'상자">'+Array.from({length:boxes},()=>'<div class="bead-box" aria-hidden="true">'+'<i></i>'.repeat(each)+'</div>').join('')+'</div></section>').join('')+'</div>';}
function openCabinet(){if(progress.cabinetOpen){showCabinetContents();return;}if(!progress.revealed){show('잠긴 태블릿 보관함','네 자리 숫자 자물쇠가 달려 있고, 옆에는 구슬 그림 두 개가 붙어 있다.\\n그림을 어떤 순서로 읽는지 알려 주는 메모를 먼저 찾아보자.',null,[['교실로 돌아간다',close]]);$('content').innerHTML=cabinetPictures();return;}showClassLock('cabinet','태블릿 보관함 · 숫자 자물쇠','①과 ② 그림의 구슬은 각각 모두 몇 개일까?\\n①의 답 뒤에 ②의 답을 이어 네 자리 비밀번호를 입력하자.',cabinetPictures());}
function cabinetNote(){return '<div class="paper"><h3>보관함 안에서 찾은 쪽지</h3><p>교실 앞문 비밀번호: <b>7316</b></p><p>문을 나가면 별관 <b>1층 과학실</b>로 와 줘.\\n친구들이 기다리고 있어.</p></div>';}
function showCabinetContents(){show('열린 태블릿 보관함','태블릿 사이에 접힌 쪽지가 끼워져 있다.\\n교실 앞문을 여는 방법과 친구들이 있는 곳이 적혀 있다.',null,[['쪽지를 챙기고 앞문으로 간다',close]]);$('content').innerHTML=cabinetNote();}
function openDoor(){if(progress.door){exitScene();return;}if(!E.ready(progress,'door')){toast('먼저 태블릿 보관함 안의 단서를 찾아보자.');return;}showClassLock('door','교실 앞문 · 숫자 자물쇠','보관함에서 찾은 쪽지를 보고 앞문 비밀번호 네 자리를 입력하자.',cabinetNote());}
function showClassLock(kind,title,text,card){show(title,text,kind,[['자물쇠 열기',()=>{const raw=$('class-lock-code').value;attempt(kind,kind==='cabinet'?{code:raw}:{number:/^\\d{4}$/.test(raw)?+raw:NaN});}],['힌트',hint,true],['교실로 돌아간다',close,true]]);$('content').innerHTML=card+'<label for="class-lock-code">비밀번호 네 자리</label><input id="class-lock-code" class="class-lock-code" type="text" inputmode="none" readonly maxlength="4" aria-label="비밀번호 네 자리"><div class="number-pad">'+['1','2','3','4','5','6','7','8','9','지우기','0','한 칸 삭제'].map(k=>'<button data-lock-digit="'+k+'">'+k+'</button>').join('')+'</div>';$('content').querySelectorAll('[data-lock-digit]').forEach(b=>b.onclick=()=>{if(Date.now()<progress.pauseUntil){showCooldown();return;}const el=$('class-lock-code'),k=b.dataset.lockDigit;el.value=k==='지우기'?'':k==='한 칸 삭제'?el.value.slice(0,-1):el.value.length<4?el.value+k:el.value;});}
`;
s=s.replace("if(progress.seen.includes('cabinet'))h+=", "if(progress.cabinetOpen)h+=cabinetNote();if(progress.seen.includes('cabinet'))h+=");fs.writeFileSync(p,s);
edit('science-ui.js',[["'자리표의 초록 병 그림과 같은 표시가 과학실 문에 있다.\\n문을 밀자, 유리 너머에서 작은 노크가 세 번 들린다.'","'보관함 속 쪽지에 적힌 별관 1층 과학실을 찾았다.\\n문을 밀자, 유리 너머에서 작은 노크가 세 번 들린다.'"]]);
edit('index.html',[['escape-core.js?v=library1','escape-core.js?v=locks1'],['first-room.js?v=fx1','first-room.js?v=locks1'],['science-ui.js?v=fx1','science-ui.js?v=locks1']]);
fs.appendFileSync(root+'first-room.css','\n.cabinet-pictures section{background:#fff9eb;padding:10px;border:1px solid #c9bea0;border-radius:8px;margin:8px 0}.cabinet-pictures h3{margin:0 0 8px}.bead-boxes{display:flex;gap:8px;flex-wrap:wrap}.bead-box{width:72px;min-height:56px;display:grid;grid-template-columns:repeat(3,1fr);align-content:center;gap:5px;border:3px solid #aa8663;padding:7px;border-radius:4px;background:#eee4cc}.bead-box i{width:12px;height:12px;background:#618e81;border-radius:50%}.class-lock-code{display:block;width:100%;max-width:250px;margin:10px auto;background:#fffdf2;color:#30474c;border:2px solid #9daf91;border-radius:10px;font-size:30px;letter-spacing:10px;text-align:center;padding:8px}\n');
console.log('Classroom cabinet→note→numeric door; schema v6.');
