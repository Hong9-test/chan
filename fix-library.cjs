const fs=require('fs');
let p='work/test-science.cjs',s=fs.readFileSync(p,'utf8').replaceAll('version,4','version,5');fs.writeFileSync(p,s);
p='outputs/school-escape/library-ui.js';s=fs.readFileSync(p,'utf8').replace("'反납대 컴퓨터'.replace('反','반')","'반납대 컴퓨터'").replace("[['책장을 더듬어 찾는다',()=>inspectLibrary('book')],['주변을 살펴본다',close,true]]","[['책장을 찾으러 간다',close]]").replace("e.key==='Enter'&&e.target===document.body","e.key==='Enter'&&(e.target===document.body||e.target.hasAttribute('data-digit'))");fs.writeFileSync(p,s);
