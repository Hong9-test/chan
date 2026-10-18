const fs=require('fs'),root='outputs/school-escape/';let s=fs.readFileSync(root+'library-ui.js','utf8');
const begin=s.indexOf("if(id==='book'){"),end=s.indexOf("\nif(id==='gate')",begin);if(begin<0||end<0)throw Error('book handler not found');
const old=s.slice(begin,end),body=old.slice(old.indexOf("LibraryCore.see(s,'book');"),-1);
s=s.slice(0,begin)+"if(id==='book'){openLibraryShelf();return;}"+s.slice(end);
s=s.replace("+' · □</b></p>","+' · '+(s.step>=2?'21':'□')+'</b></p>");
s+=`\n// A close-up aisle reuses the investigation dialog; no new save fields.
let shelfDepth=0;
const shelfBooks=[['18·24','21·24','24·28','28·21','35·24','24·12','21·35','32·21'],['42·21','24·35','28·24','21·28','35·21','24·21','24·32','32·24']].map(row=>{const a=[...row];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;});
function openLibraryShelf(depth=0){
shelfDepth=depth;const s=progress.library;
show(depth?'本'.replace('本','서가 안쪽'):'책장 사이로 들어왔다',s.step<2?'책등에 두 개씩 적힌 숫자가 보인다. 어떤 번호를 찾아야 할까?\\n도서관 컴퓨터 옆의 대출증부터 확인해 보자.':'책등의 두 번호를 대출증과 비교해 보자.\\n번호가 모두 같은 책을 누르면 꺼내 볼 수 있다.','shelf',[
[depth?'서가 입구로 돌아간다':'서가 안쪽으로 들어간다',()=>openLibraryShelf(depth?0:1)],['도서관으로 나온다',close,true]]);
$('content').innerHTML=libraryLoanCard(s)+'<section class="shelf-closeup" aria-label="'+(depth?'서가 안쪽':'서가 입구')+'"><div class="aisle-sign">'+(depth?'서가 안쪽':'서가 입구')+'</div>'+[0,1].map(row=>'<div class="book-row">'+shelfBooks[depth].slice(row*4,row*4+4).map((code,i)=>'<button class="book-spine spine-'+((i+row*3+depth)%5)+'" data-book-code="'+code+'" aria-label="책 번호 '+code+'"><i aria-hidden="true"></i><span>'+code+'</span><small>도서관</small></button>').join('')+'</div>').join('')+'<div class="aisle-floor" aria-hidden="true"></div></section>';
$('content').querySelectorAll('[data-book-code]').forEach(b=>b.onclick=()=>{if(s.step<2){$('message').textContent='대출증에 지워진 번호를 먼저 찾아야 어떤 책인지 알 수 있어.';return;}if(b.dataset.bookCode!=='24·21'){$('message').textContent='책 번호 '+b.dataset.bookCode+' — 대출증의 두 번호와 모두 같은지 다시 살펴보자.';b.classList.add('checked-book');return;}openLibraryBook();});
}
function openLibraryBook(){const s=progress.library;if(s.step<2)return;${body}}
`;
s=s.replace("depth?'本'.replace('本','서가 안쪽')","depth?'서가 안쪽'");
fs.writeFileSync(root+'library-ui.js',s);
let html=fs.readFileSync(root+'index.html','utf8').replace('library-ui.js?v=library-copy2','library-ui.js?v=library-shelf1');fs.writeFileSync(root+'index.html',html);
fs.appendFileSync(root+'first-room.css',`\n/* First-person shelf close-up: code-drawn book spines, no new image assets. */
.shelf-closeup{position:relative;background:linear-gradient(90deg,#493020,#795135 50%,#493020);border:12px solid #88603f;border-radius:5px;padding:12px 18px 0;box-shadow:inset 0 0 45px #120c08aa}
.aisle-sign{width:max-content;margin:0 auto 15px;background:#e6d7ac;color:#4d3c2c;padding:5px 15px;border-radius:3px;font-size:12px}
.book-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));align-items:end;gap:9px;border-bottom:13px solid #b08758;box-shadow:0 8px 9px #1b100c88;margin-bottom:19px;padding:0 8px}
.book-spine{height:142px;border-radius:5px 8px 0 0;border:1px solid #fff4;box-shadow:inset 5px 0 #ffffff19,inset -5px 0 #0002,3px 0 3px #0005;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:13px 4px 10px;color:#f8efd5;font-weight:bold;transition:transform .15s}
.book-spine:hover,.book-spine:focus-visible{transform:translateY(-8px)}.book-spine span{background:#faf2d6;color:#35424a;padding:7px 3px;width:100%;font-size:16px;border-radius:3px;white-space:nowrap}.book-spine small{font-size:10px;font-weight:normal;letter-spacing:1px}.book-spine i{width:70%;height:4px;border-block:1px solid #ffe8aa88}.spine-0{background:#4e7972}.spine-1{background:#986648}.spine-2{background:#615f8b}.spine-3{background:#95834c}.spine-4{background:#45738a}.checked-book{filter:brightness(.8)}.aisle-floor{height:15px;background:linear-gradient(#31251b,transparent)}
@media(max-width:650px){.shelf-closeup{border-width:8px;padding:10px 6px 0}.book-row{gap:5px;padding:0 3px;margin-bottom:15px}.book-spine{height:118px;padding-inline:3px}.book-spine span{font-size:13px;padding-inline:0}.book-spine small{font-size:9px}}
`);
console.log('Added two-depth shelf investigation with book-number matching.');
