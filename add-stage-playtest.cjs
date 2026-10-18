const fs=require('fs'),root='outputs/school-escape/';function edit(file,list){let s=fs.readFileSync(root+file,'utf8');for(const[a,b]of list){if(!s.includes(a))throw Error(file+' '+a.slice(0,45));s=s.replaceAll(a,b);}fs.writeFileSync(root+file,s);}
edit('first-room.js',[
['E=EscapeCore,stage=',"E=typeof SchoolPlaytest!=='undefined'&&SchoolPlaytest.mode?{...EscapeCore,KEY:EscapeCore.KEY+'-check-'+SchoolPlaytest.mode}:EscapeCore,stage="],
['let progress=E.fresh(),',"let progress=typeof SchoolPlaytest!=='undefined'&&SchoolPlaytest.mode?SchoolPlaytest.seed():E.fresh(),"],
['try{const raw=localStorage.getItem(E.KEY);',"try{const raw=typeof SchoolPlaytest!=='undefined'&&SchoolPlaytest.mode?null:localStorage.getItem(E.KEY);"]]);
edit('library-ui.js',[
["$('content').innerHTML=libraryCipherCard(s);GameFX.reward('book'", "$('content').innerHTML=(s.step===2?libraryPictureRiddle():'<details><summary>책갈피 그림 다시 보기</summary>'+libraryPictureRiddle()+'</details>')+libraryCipherCard(s);GameFX.reward('book'"]]);
edit('index.html',[
['<script src="game-fx.js?v=fx1">','<script src="playtest.js?v=playtest1" data-development-only></script><script src="game-fx.js?v=fx1">'],
['first-room.js?v=journal1','first-room.js?v=playtest1'],
['library-ui.js?v=picture1','library-ui.js?v=playtest1'],
['first-room.css?v=picture1','first-room.css?v=playtest1']]);
fs.appendFileSync(root+'first-room.css','\n.playtest-banner{max-width:1150px;margin:0 auto 10px;padding:9px 12px;background:#463b27;border:1px solid #c0a66b;border-radius:8px;color:#f5dfaa;font-size:12px}#playtest-menu{border-color:#ad965e}\n');
console.log('Isolated local-only stage selection; picture visible in book inspection.');
