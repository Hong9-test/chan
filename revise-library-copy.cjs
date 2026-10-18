const fs=require('fs'),root='outputs/school-escape/';
function change(file,items){let s=fs.readFileSync(root+file,'utf8');for(const [a,b]of items){if(!s.includes(a))throw Error(file+' missing '+a.slice(0,80));s=s.replace(a,b);}fs.writeFileSync(root+file,s);}
change('library-core.js',[
["title:'반납 기록 · 첫 표식',text:'한 묶음에 책이 6권씩. 묶음은 4개다.\\n첫 표식에 넣을 책의 전체 수는?'","title:'대출증 암호 · 첫 번째 번호',text:'대출증의 첫 번째 번호가 지워져 있다.\\n단서: 책이 한 묶음에 6권씩, 모두 4묶음이다.\\n책은 모두 몇 권일까? 전체 권수를 입력하자.'"],
["title:'반납 기록 · 둘째 표식',text:'한 묶음에 책이 7권씩. 묶음은 3개다.\\n둘째 표식에 넣을 책의 전체 수는?'","title:'대출증 암호 · 두 번째 번호',text:'두 번째 번호도 같은 방법으로 찾을 수 있다.\\n단서: 책이 한 묶음에 7권씩, 모두 3묶음이다.\\n책은 모두 몇 권일까? 전체 권수를 입력하자.'"],
["text:'7 × 6의 답을 입력하면 첫 글자가 드러난다.'","text:'책 속 선생님의 이름이 암호로 가려져 있다.\\n첫 번째 식은 7 × 6이다. 답을 입력해 첫 글자를 열어 보자.'"],
["text:'8 × 4의 답을 입력하면 둘째 글자가 드러난다.'","text:'첫 글자는 찾았다. 두 번째 식은 8 × 4이다.\\n답을 입력해 이름을 완성하자.'"],
["text:'이쪽 장치에는 별이 7묶음 있다.\\n현실 친구가 알아낸 한 묶음의 수와 합쳐 전체를 구하자.'","text:'책상 위 책갈피에는 별이 7묶음 그려져 있다.\\n친구는 한 묶음에 별이 8개씩 있다고 알려 주었다.\\n별은 모두 몇 개일까? 별빛 칸에 전체 수를 입력하자.'"],
["text:'한 묶음에 빛 조각이 9개씩. 모두 4묶음이다.\\n전체 빛 조각은 몇 개일까?'","text:'이제 책갈피의 달빛 칸을 채우자.\\n빛 조각이 한 묶음에 9개씩, 모두 4묶음이다.\\n빛 조각은 모두 몇 개일까?'"],
["return{tasks,fresh,validate,see,ready,submit,rescue}","function cipherEntries(){const pairs=[[42,'커'],[32,'비'],[48,'문'],[35,'앞'],[21,'숲'],[24,'책']];for(let i=pairs.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pairs[i],pairs[j]]=[pairs[j],pairs[i]];}const a=pairs.findIndex(x=>x[1]==='커'),b=pairs.findIndex(x=>x[1]==='비');if(Math.abs(a-b)===1){const other=pairs.findIndex((x,i)=>i!==a&&i!==b&&Math.abs(i-a)>1);[pairs[b],pairs[other]]=[pairs[other],pairs[b]];}return pairs;}\nreturn{cipherEntries,tasks,fresh,validate,see,ready,submit,rescue}"]]);
change('library-ui.js',[
["label:'반납대 컴퓨터'","label:'도서관 컴퓨터'"],
["'도서관 · 복구한 곱셈 기록 '+progress.library.step+' / 6'","(progress.library.step<2?'도서관 컴퓨터 · 대출증의 빈 번호를 채우자':progress.library.step===2?'대출증 번호를 찾았다 · 책장에서 책을 찾아보자':progress.library.step===3?'책갈피의 두 번째 식을 풀어 이름을 완성하자':progress.library.step===4?'책상 위 책갈피 · 친구 소식과 별 그림을 비교하자':'책갈피의 달빛 칸에 넣을 수를 구하자')"],
["“반납 기록을 복구하세요.”","“대출증의 지워진 책 번호를 찾아 주세요.”"],
["별빛은 한 묶음에 8개래!\\n그쪽 장치에는 몇 묶음인지 봐 줘.","별 그림은 한 묶음에 8개씩이야!\\n네가 찾은 책갈피에는 몇 묶음이 그려져 있어?"],
["양쪽에서 알아낸 수를 함께 써야 책갈피가 작동한다.","친구가 알려 준 수와 책갈피의 그림을 함께 보면, 별의 전체 수를 구할 수 있겠다."],
["'복구한 반납 기록','첫 표식 24 · 둘째 표식 21\\n오른쪽 책장에서 24·21 표식의 책을 찾아보자.'","'번호를 되찾은 대출증','대출증에 책 번호 24·21이 나타났다.\\n책등에 같은 번호가 붙어 있는 책을 찾아보자.'"],
["책등에 두 개의 숫자 표식이 붙어 있다.\\n반납대의 기록을 먼저 복구해야 찾을 수 있겠다.","책등마다 번호가 붙어 있다. 어떤 책을 찾아야 할까?\\n도서관 컴퓨터 옆의 대출증에 단서가 있을 것 같다."],
["'24·21 표식의 책','『선생님은 몬스터!』 — 함께 읽었던 책이다.\\n바비는 커비 선생님을 무서워했지만, 학교 밖에서 만나며 다른 모습을 알게 되었다.\\n\\n책 사이에 낯선 곱셈 책갈피가 끼워져 있다.'","'24·21 번호의 책','『선생님은 몬스터!』 — 함께 읽었던 책이다.\\n'+(s.step>=4?'바비는 커비 선생님과 학교 밖에서 만나며 선생님의 다른 모습을 알게 되었다.':'바비가 선생님을 무서워했던 이야기다. 책 속 선생님의 이름이 검은 얼룩에 가려져 있다.')+'\\n\\n책 사이에 낯선 곱셈 책갈피가 끼워져 있다.'"],
["'<div class=\"paper\"><h3>곱셈 책갈피 · 게임 속 암호</h3><p>7 × 6 → 첫 글자<br>8 × 4 → 둘째 글자</p><p>42 → 커　32 → 비　48 → 문　35 → 앞</p></div>'","libraryCipherCard(s)"],
["장치에는 별이 7묶음이라고 적혀 있다.\\n한 묶음에 몇 개인지는 이곳 기록에 없다. 현실 친구의 ★ 단서를 확인하자.","책갈피에는 별이 7묶음 그려져 있다.\\n한 묶음에 몇 개인지는 얼룩에 가려 보이지 않는다.\\n현실에 있는 친구에게 같은 책갈피를 확인해 달라고 하자."],
["(s.step===4?'<div class=\"paper\">현실 친구의 ★ 단서: 한 묶음에 8개<br>이쪽 장치: 7묶음</div>':'')","(s.step<2?libraryLoanCard(s):s.step<4?libraryCipherCard(s):s.step===4?'<div class=\"paper\">친구가 읽은 기록: 한 묶음에 별 8개<br>책갈피에 남은 그림: 7묶음</div>':'')"],
["책장 표식: 24 · 21\\n도서관으로 돌아가 오른쪽 책장을 조사하자.","대출증에 책 번호 24·21이 나타났다.\\n도서관으로 돌아가 책등에 같은 번호가 붙은 책을 찾아보자."],
["책상 위 책갈피의 두 에너지 칸이 깨어난다.","책상 위 책갈피에 별 모양 칸과 달 모양 칸이 나타났다.\\n두 칸에 들어갈 수를 찾으면 친구가 돌아올 길이 열릴 것 같다."],
["복구한 곱셈 기록 '+s.step+' / 6","해결한 곱셈 암호 '+s.step+' / 6"],
["책장 표식: 24 · 21","대출증의 책 번호: 24 · 21"]]);
const p=root+'library-ui.js';let s=fs.readFileSync(p,'utf8');s=s.replace("let libraryDigits='';","let libraryDigits='';\nfunction libraryLoanCard(s){return '<div class=\"paper loan-card\"><h3>도서관에서 발견한 대출증</h3><p>찾을 책 번호: <b>'+(s.step>=1?'24':'□')+' · □</b></p><small>두 기록의 전체 권수를 구하면 지워진 번호가 나타난다.</small></div>';}\nfunction libraryCipherCard(s){return '<div class=\"paper\"><h3>책갈피의 암호표</h3><p>첫 글자: 7 × 6　둘째 글자: 8 × 4</p><div class=\"cipher-table\">'+LibraryCore.cipherEntries().map(([n,ch])=>'<span>'+n+'<b>'+ch+'</b></span>').join('')+'</div><p>해독한 이름: <b>'+(s.step>=3?'커':'□')+' '+(s.step>=4?'비':'□')+'</b></p><small>식의 답을 표에서 찾아 이름을 확인하자.</small></div>';}");fs.writeFileSync(p,s);
change('index.html',[['library-core.js','library-core.js?v=library-copy2'],['library-ui.js?v=library1','library-ui.js?v=library-copy2']]);
console.log('Revised library instructions, shuffled cipher and loan card.');
