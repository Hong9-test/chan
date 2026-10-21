'use strict';
const LibraryCore=(()=>{
const tasks=[
{title:'대출증 암호 · 첫 번째 번호',text:'대출증에 찾을 책의 첫 번째 번호가 지워져 있다.\n단서: 책이 한 묶음에 6권씩, 모두 4묶음이다.\n책은 모두 몇 권일까? 전체 권수를 입력하자.',answer:24,unit:'권',hint:'6 × 3에 한 묶음의 6권을 더해 보자.',rows:4,cols:6},
{title:'대출증 암호 · 두 번째 번호',text:'두 번째 번호도 같은 방법으로 찾을 수 있다.\n단서: 책이 한 묶음에 7권씩, 모두 3묶음이다.\n책은 모두 몇 권일까? 전체 권수를 입력하자.',answer:21,unit:'권',hint:'7 × 2에 한 묶음의 7권을 더해 보자.',rows:3,cols:7},
{title:'책갈피 · 첫 글자',text:'같은 그림은 같은 수를 뜻한다.\n책 한 권과 열쇠 한 개가 각각 어떤 수인지 알아내자.\n마지막 줄의 곱셈 답을 입력하면 첫 글자가 나타난다.',answer:42,unit:'',hint:'같은 책 3권의 합은 21, 같은 열쇠 2개의 합은 12야. 각각의 값을 구한 뒤 두 값을 곱해 보자.'},
{title:'책갈피 · 둘째 글자',text:'첫 글자는 찾았다. 두 번째 식은 8 × 4이다.\n답을 입력해 이름을 완성하자.',answer:32,unit:'',hint:'8 × 3에 8을 더해 보자.'},
{title:'귀환 장치 · 별빛 칸',text:'책상 위 책갈피에 “별 7묶음”이라고 적혀 있다.\n친구는 한 묶음에 별이 8개씩 있다고 알려 주었다.\n별은 모두 몇 개일까? 별빛 칸에 전체 수를 입력하자.',answer:56,unit:'개',hint:'친구 소식의 한 묶음 수를 확인하자. 그 수 × 7.'},
{title:'귀환 장치 · 달빛 칸',text:'이제 책갈피의 달빛 칸을 채우자.\n빛 조각이 한 묶음에 9개씩, 모두 4묶음이다.\n빛 조각은 모두 몇 개일까?',answer:36,unit:'개',hint:'9 × 3에 9를 더해 보자.',rows:4,cols:9}
];
function fresh(){return{step:0,seen:[],rescued:false};}
function validate(s){if(!s||!Number.isInteger(s.step)||s.step<0||s.step>6||!Array.isArray(s.seen)||new Set(s.seen).size!==s.seen.length||s.seen.some(x=>!['record','book','news','gate'].includes(x))||typeof s.rescued!=='boolean'||s.step>0&&!s.seen.includes('record')||s.step>2&&!s.seen.includes('book')||s.step>4&&!s.seen.includes('news')||s.rescued&&s.step!==6)throw Error('도서관 기록 오류');return structuredClone(s);}
function see(s,id){if(!['record','book','news','gate'].includes(id)||id==='book'&&s.step<2)return false;if(!s.seen.includes(id))s.seen.push(id);return true;}
function ready(s){return s.step<6&&s.seen.includes('record')&&(s.step<2||s.seen.includes('book'))&&(s.step<4||s.seen.includes('news'));}
function submit(s,answer){if(!ready(s))return{blocked:true};if(!Number.isInteger(answer)||answer<0||answer>99)return{invalid:true};if(answer!==tasks[s.step].answer)return{ok:false};s.step++;return{ok:true};}
function rescue(s){if(s.step!==6||s.rescued)return false;s.rescued=true;return true;}
function cipherEntries(){const pairs=[[42,'커'],[32,'비'],[48,'문'],[35,'앞'],[21,'숲'],[24,'책']];for(let i=pairs.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pairs[i],pairs[j]]=[pairs[j],pairs[i]];}const a=pairs.findIndex(x=>x[1]==='커'),b=pairs.findIndex(x=>x[1]==='비');if(Math.abs(a-b)===1){const other=pairs.findIndex((x,i)=>i!==a&&i!==b&&Math.abs(i-a)>1);[pairs[b],pairs[other]]=[pairs[other],pairs[b]];}return pairs;}
return{cipherEntries,tasks,fresh,validate,see,ready,submit,rescue};})();if(typeof module!=='undefined')module.exports=LibraryCore;
