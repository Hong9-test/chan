'use strict';
const CafeteriaCore=(()=>{
function fresh(){return{entered:false,tray:false,decoded:false,seated:false,note:false};}
function validate(s){if(!s||Object.keys(fresh()).some(k=>typeof s[k]!=='boolean')||(s.tray&&!s.entered)||(s.decoded&&!s.tray)||(s.seated&&!s.decoded)||(s.note&&!s.seated))throw Error('급식실 진행 오류');return Object.fromEntries(Object.keys(fresh()).map(k=>[k,s[k]]));}
function solve(s,n){if(!s.tray||s.decoded)return{blocked:true};if(n!==18)return{ok:false};s.decoded=true;return{ok:true};}
function sit(s,table,n){if(!s.decoded||s.seated)return{blocked:true};if(table!=='inner'||n!==18)return{ok:false};s.seated=true;return{ok:true};}
return{fresh,validate,solve,sit};})();if(typeof module!=='undefined')module.exports=CafeteriaCore;
