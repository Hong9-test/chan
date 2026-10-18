const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const archive='outputs/에듀테크게임-1-보존',next='outputs/school-escape';
if(fs.existsSync(archive)||fs.existsSync(next))throw Error('대상 폴더가 이미 있어 덮어쓰지 않습니다.');
fs.mkdirSync(archive,{recursive:true});fs.cpSync('outputs/village-lab',archive+'/source',{recursive:true});
fs.copyFileSync('outputs/에듀테크-게임-테스트-1.html',archive+'/에듀테크게임-1.html');
fs.cpSync('outputs/구구숲-개발',archive+'/개발기록',{recursive:true});
const files=fs.readdirSync('outputs/village-lab').filter(n=>fs.statSync('outputs/village-lab/'+n).isFile());
const manifest=files.map(n=>{const original=fs.readFileSync('outputs/village-lab/'+n),copy=fs.readFileSync(archive+'/source/'+n);if(hash(original)!==hash(copy))throw Error('보존 불일치: '+n);return{file:n,sha256:hash(copy)};});
if(hash(fs.readFileSync(archive+'/에듀테크게임-1.html'))!==hash(fs.readFileSync('outputs/에듀테크-게임-테스트-1.html')))throw Error('실행 파일 불일치');
fs.writeFileSync(archive+'/보존목록.json',JSON.stringify({project:'에듀테크게임 1',date:'2026-10-18',saveVersion:13,saveKey:'edutech-game-test-1-v1',files:manifest},null,2));
fs.writeFileSync(archive+'/README.md','# 에듀테크게임 1 — 보존본\n\n2026-10-18 저장 v13, 돌껍질 거북 반격까지 보존. `에듀테크게임-1.html`을 열어 실행한다. source는 모듈 원본 사본, 개발기록은 당시 문서 사본이다. 기존 outputs/village-lab 및 저장 키는 유지한다. 공개 GitHub 버전은 v12이며 이 보존본은 v13이다.\n\n브라우저 학생 저장 데이터는 HTML 파일에 포함되지 않는다. 기존 게임의 백업/복원 기능으로 따로 내보내야 하며, 다른 주소에서 열면 기존 진행이 보이지 않을 수 있다.\n');
fs.mkdirSync(next+'/docs',{recursive:true});fs.mkdirSync(next+'/reuse',{recursive:true});
fs.copyFileSync('outputs/village-lab/character.js',next+'/reuse/character.js');
fs.writeFileSync(next+'/README.md',`# 에듀테크게임 2 방탈출

활성 프로젝트. 배경은 초등학교, 귀엽고 신기한 미스터리 탐험과 곱셈 수수께끼. 게임1을 덮어쓰지 않는다.

현재: 프로젝트 분리/기획 시작. 아직 게임2 실행 화면은 만들지 않았다. reuse/character.js는 게임1 캐릭터 렌더러 후보 복사본이며 실행에 연결하지 않았다.

개발 순서: docs/01-개발계획.md. 참고/미확정 선택: docs/02-자료와결정.md.
저장 키 예약: edutech-game-2-escape-v1. 게임1 저장을 자동 이전/삭제하지 않는다. 새 로컬 미리보기는 별도 포트를 사용하며 기존4175는 게임1로 남긴다.
`);
fs.writeFileSync(next+'/docs/01-개발계획.md',`# 첫 개발 계획

## 확정
- 명칭: 에듀테크게임 2 방탈출. 대상: 곱셈구구를 배운 초등2학년, 개인 태블릿.
- 초등학교 탐험/탈출/수수께끼. 이동과 관찰이 중심이며 문제를 계속 푸는 사냥 구조를 그대로 옮기지 않는다.
- 게임1 원본/실행본/개발기록 별도 보존. 새 게임은 school-escape 안에서 개발. 새 라이브러리/서버/유료 이미지 생성 없이 첫 흐름부터 확인.

## 추천 첫 완성 흐름 — 교실 한 곳
1. 교실을 자유롭게 이동하고 가까운 책상/책장/칠판을 조사한다.
2. 책상에서 도형 순서 단서를 찾고, 책장의 묶음 배열을 곱셈으로 해석한다.
3. 칠판 단서와 조합해 사물함 잠금을 풀고 열쇠를 얻는다.
4. 열쇠로 교실 문을 열어 복도로 나가면 첫 사건 완료. 문 열림/빛/효과로 공간 변화를 보여준다.

주의: 이 퍼즐 구성은 추천 초안. 수수께끼를 지나치게 긴 독해/복잡한 순서 암기로 만들지 않는다. 단서 의미를 이해해도 찍기로 풀 수 있다면 단서 확인과 장치 조작을 연결한다.

## 개발 단계
1. 작은 교실/부드러운 이동/가까이 조사/단서 수집/문 열림까지 한 흐름 구현.
2. 곱셈 장치 2~3유형, 단계 힌트, 무작위 입력 방지, 진행 저장/처음부터 재시작. 첫 퍼즐을 외워 반복하는 문제는 연습 식 변형으로 보완.
3. 실제 태블릿 조작/읽기량/막히는 구간 확인 후 조정. 빠른 정답보다 정확한 해결을 우선한다.
4. 검증된 교실 구성 요소로 도서관 또는 과학실 하나를 추가. 특별 이벤트/회피는 필요할 때 재사용.
5. 학교 전체 연결/탈출 결말, 개인 최고 기록은 도움 횟수와 함께 표시. 공개 순위/실시간 경쟁은 후속 선택.
6. 단일 HTML/공유 후보 정리 및 요청 시 일괄 게시. 중간 GitHub 게시 금지 유지.

## 재사용 경계
- 재사용: 방향별 캐릭터, 드래그/키보드 이동 방식, 카메라/충돌 해결 경험, 모달 입력 처리, 저장 검증/백업 설계, 효과음/연출 방식.
- 선별 이식: 제한 시야는 창고 등 특정 구역, 회피는 특별 사건. 기존 전투/보상 수치는 자동 적용하지 않는다.
- 새 구현: 조사 대상/단서 목록/장치 상태/열쇠/문 연결/사건 완료 저장.
- 복사하지 않을 기본 흐름: 몬스터 반복 사냥, 강화 재료 파밍, 공방/마을 시설 전체.

## 최소 검사
이동/조사 거리/닫힌 문 차단→단서→장치→열쇠→문 열림. 새로고침 후 단서/문 상태 보존, 게임1 저장 키 불변, 390×844와 태블릿 가로 화면에서 버튼/대화 접근 가능. 실제 iPad 검증과 Chrome 모형을 구분한다.
`);
fs.writeFileSync(next+'/docs/02-자료와결정.md',`# 자료와 결정

## 사용자 확정 2026-10-18
기존 게임은 에듀테크게임1로 따로 보존, 새 프로젝트는 에듀테크게임2 방탈출. 초등학교 배경 탐험/탈출/수수께끼. 기존 자산과 검증된 기능은 선별 재사용한다.

## 참고
- 사용자 제공: 추석 방탈출 ZEP https://zep.us/play/aW5rg3
- 브라우저에서 제목 ‘추석 방탈출 퀴즈_1’과 공간 안내는 확인. 내부 실제 퍼즐/정답/진행 구조는 아직 플레이 검증하지 못했다. 특정 장치가 있다고 단정하거나 이미지/맵을 복제하지 않는다.
- 사용자가 기억나지 않는 추가 자료는 미확인. 현재 자료만으로 작은 교실 원형 제작은 가능하므로 자료를 더 찾는 일을 필수 선행 조건으로 만들지 않는다.

## 첫 장치 선택 제안
A 추천: 조사/단서 조합 중심 + 숫자 잠금장치. 구현 부담 작고 방탈출의 관찰/추리 흐름을 먼저 검증.
B: 위 흐름에 정령 추격/짧은 회피 사건. 기존 회피를 쓸 수 있지만 타이밍/실패/저장 처리 부담 증가. 첫 교실 검증 뒤 추가 추천.
두 번 틀리면 사냥 실패하던 게임1 규칙은 그대로 이전하지 않는다. 오답 불이익은 잠금장치 지연/힌트 사용과 연계해 별도 제안한다.
`);
const ap='AGENTS.md',old=fs.readFileSync(ap,'utf8');fs.writeFileSync(ap,`# 2026-10-18 활성 프로젝트 변경 — 최우선\n\n사용자 요청으로 새 활성 프로젝트는 **에듀테크게임 2 방탈출**. 먼저 outputs/school-escape/README.md와 필요한 docs를 읽는다. 원본 폴더는 outputs/school-escape/이며 기존 village-lab은 게임1 전용으로 보존한다. outputs/에듀테크게임-1-보존/에 소스/단일HTML/기록/해시 목록이 있다. 게임1을 요청 없이 수정/덮어쓰기/저장 데이터 이전하지 않는다. 게임2는 별도 저장 키 edutech-game-2-escape-v1/별도 미리보기 포트/별도 산출물을 사용한다. 기존4175와 GitHub test1.html은 게임1이다. 중간 게시 금지/관련 최소 검사/사용량 예비/선택지 기록 원칙은 계속 적용한다. 아래의 ‘활성 프로젝트/유일 원본’은 게임1에 한정한 과거 지침이다.\n\n`+old);
fs.appendFileSync('outputs/구구숲-개발/05-결정기록.md','\n## 프로젝트 분리 2026-10-18\n사용자 요청으로 게임1 v13을 별도 보존하고, 에듀테크게임2 방탈출을 outputs/school-escape에서 시작. 이후 게임1 기능 개발은 보류. 게임1 기존 소스/저장 키/공개 링크 유지.\n');
console.log('PASS: game1 source hashes and standalone match; separate game2 plan/renderer candidate/save namespace; AGENTS updated.');
