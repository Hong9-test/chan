const fs=require('fs'),root='outputs/school-escape/';
function edit(file,list){let s=fs.readFileSync(root+file,'utf8');for(const[a,b]of list){if(!s.includes(a))throw Error(file+' missing '+a.slice(0,70));s=s.replace(a,b);}fs.writeFileSync(root+file,s);}
edit('first-room.js',[
["function paintObjects(){const rect=", "function paintObjects(){GameFX.world(progress);const rect="],
["function show(title,text,mode=null,actions=[]){dialogMode=mode;", "function show(title,text,mode=null,actions=[]){GameFX.clear();dialogMode=mode;"],
["function close(){$('scene').close();", "function close(){GameFX.clear();$('scene').close();"],
["cipherSlots=[];}else exitScene();}else{", "cipherSlots=[];GameFX.reward('rune','숨겨진 장소를 알아냈다','칠판 뒤');}else{exitScene();GameFX.reward('door','교실 문이 열렸다');}}else{GameFX.wrong();"],
["if(protectedSave)$('message').textContent='손상된 기존 기록", "GameFX.soundButton($('actions'));if(protectedSave)$('message').textContent='손상된 기존 기록"]]);
edit('science-ui.js',[
["[['친구들에게 간다',()=>{close();inspectScience('friends');}]]);", "[['친구들에게 간다',()=>{close();inspectScience('friends');}]]);GameFX.reward('beam','빛이 친구들에게 닿았다','28');paintObjects();"],
["progress.pauseUntil=Date.now()+2200;save();$('message')", "progress.pauseUntil=Date.now()+2200;save();GameFX.wrong();$('message')"],
["$('content').innerHTML=portraits();}\nfunction scienceJournal", "$('content').innerHTML=portraits();GameFX.reward('rescue','친구 5명이 학교로 돌아갔다');}\nfunction scienceJournal"]]);
edit('library-ui.js',[
["progress.pauseUntil=Date.now()+2200;libraryDigits='';", "progress.pauseUntil=Date.now()+2200;GameFX.wrong();libraryDigits='';"],
["[['친구의 목소리를 찾는다',close]]);}", "[['친구의 목소리를 찾는다',close]]);GameFX.reward(s.step===6?'beam':'rune',s.step<3?'대출증의 번호를 찾았다':s.step<5?'암호의 글자를 찾았다':'책갈피에 빛이 켜졌다',['','24','24 · 21','커','커 · 비','★ 56','★ 56　☾ 36'][s.step]);paintObjects();}"],
["save();refreshLibrary();libraryEnding();", "save();refreshLibrary();libraryEnding(true);paintObjects();"],
["function libraryEnding(){", "function libraryEnding(celebrate=false){"],
["[['도서관을 다시 살펴본다',close]]);}", "[['도서관을 다시 살펴본다',close]]);if(celebrate)GameFX.reward('rescue','친구가 학교로 돌아갔다');}"],
["$('content').innerHTML=libraryCipherCard(s);}", "$('content').innerHTML=libraryCipherCard(s);GameFX.reward('book','책장에서 책을 꺼냈다');}"]]);
edit('index.html',[
['</head><body>','<link rel="stylesheet" href="game-fx.css?v=fx1"></head><body>'],
['<script src="first-room.js?v=story-review1">','<script src="game-fx.js?v=fx1"></script><script src="first-room.js?v=fx1">'],
['science-ui.js?v=story-review1','science-ui.js?v=fx1'],
['library-ui.js?v=story-review1','library-ui.js?v=fx1']]);
edit('game-fx.js',[["<span>発見</span></i>'.replace('発見','발견')","<span>발견</span></i>'"],["b.textContent=sound?'効果音を切る':'効果音をつける';",'']]);
console.log('Integrated short reward, world state and optional sound effects.');
