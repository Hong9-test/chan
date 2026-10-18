const fs=require('fs'),base='outputs/school-escape/';
function edit(file,changes){let s=fs.readFileSync(base+file,'utf8');for(const [a,b]of changes){if(!s.includes(a))throw Error(file+' missing '+a.slice(0,70));s=s.replace(a,b);}fs.writeFileSync(base+file,s);}
edit('escape-core.js',[
["const KEY=","const B=typeof LibraryCore!=='undefined'?LibraryCore:require('./library-core.js');\nconst KEY="],
["version:4,openingRevision","version:5,library:B.fresh(),openingRevision"],
["if(!p||p.version!==4","if(p&&p.version===4)p={...p,version:5,library:B.fresh()};if(!p||p.version!==5"],
["['classroom','science'].includes(p.area)","['classroom','science','library'].includes(p.area)"],
["return{...structuredClone(p),science:lab};","const library=B.validate(p.library);if((p.area==='library'||library.step||library.seen.length||library.rescued)&&!lab.rescued)throw Error('도서관 진입 순서 오류');return{...structuredClone(p),science:lab,library};"]]);
edit('first-room.js',[
["function refresh(){$('friend-news')","function refresh(){if(progress.area==='library'&&typeof refreshLibrary==='function'){refreshLibrary();return;}$('friend-news')"],
["function currentObjects(){return progress.area","function currentObjects(){if(progress.area==='library')return typeof libraryObjects!=='undefined'?libraryObjects:[];return progress.area"],
["function turn(view){if($('scene').open)return;","function turn(view){if($('scene').open)return;if(progress.area==='library'){if(typeof renderLibrary==='function')renderLibrary();return;}"],
["if(progress.area==='science'){inspectScience(id);return;}","if(progress.area==='library'){inspectLibrary(id);return;}if(progress.area==='science'){inspectScience(id);return;}"],
["function journal(){if(progress.area","function journal(){if(progress.area==='library'){libraryJournal();return;}if(progress.area"],
["if(progress.science.rescued)showRealityNews();","if(progress.area==='library')libraryNews();else if(progress.science.rescued)showRealityNews();"]]);
edit('science-ui.js',[
["도서관 탐험은 다음 개발 단계입니다. 지금은 과학실과 교실을 다시 살펴볼 수 있어요.","도서관으로 이어지는 복도에 ★ 표시가 떠올랐다."],
["[['우리 반으로 돌아간다',()=>{close();returnClassroom();}],['과학실을 더 살펴본다',close,true]]);}","[...(progress.science.rescued?[['본관 1층 도서관으로',enterLibrary]]:[]),['우리 반으로 돌아간다',()=>{close();returnClassroom();},true],['과학실을 더 살펴본다',close,true]]);}"],
["[['소식을 수첩에 간직한다',close],['귀환한 친구들 확인',scienceJournal,true]]","[['본관 1층 도서관으로',enterLibrary],['소식을 수첩에 간직한다',close,true],['귀환한 친구들 확인',scienceJournal,true]]"],
["도서관 퍼즐은 다음 개발 단계입니다.","반납대에서 ★ 기록을 찾아보자."]]);
edit('index.html',[
['<script src="escape-core.js?v=openingfix3">','<script src="library-core.js"></script><script src="escape-core.js?v=library1">'],
['first-room.js?v=openingfix3','first-room.js?v=library1'],
['<script src="science-ui.js?v=openingfix3"></script>','<script src="science-ui.js?v=library1"></script><script src="library-ui.js?v=library1"></script>']]);
fs.appendFileSync(base+'first-room.css','\n/* Library number pad: native keyboard is optional. */\n.number-pad{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:12px auto;max-width:360px}.number-pad button{min-height:52px;font-size:1.2rem;touch-action:manipulation}.number-pad button[data-digit="지우기"],.number-pad button[data-digit="한 칸 삭제"]{font-size:.9rem}.library-entry{display:flex;justify-content:center;align-items:center;gap:12px;margin:14px}.library-entry output{min-width:100px;text-align:center;font-size:2rem;font-weight:bold;border:2px solid #8ca999;border-radius:12px;padding:8px;background:#fffdf1}\n');
console.log('Integrated library; save schema v5.');
