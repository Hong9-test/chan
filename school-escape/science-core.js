'use strict';
const ScienceCore=(()=>{
const ids=[1,4,9,14,20];
function fresh(){return{seen:[],solved:false,rescued:false};}
function validate(s){if(!s||!Array.isArray(s.seen)||s.seen.length>3||new Set(s.seen).size!==s.seen.length||s.seen.some(x=>!['record','lens','friends'].includes(x))||typeof s.solved!=='boolean'||typeof s.rescued!=='boolean'||s.rescued&&!s.solved||s.solved&&(!s.seen.includes('record')||!s.seen.includes('lens')))throw Error('과학실 기록 오류');return structuredClone(s);}
function see(s,id){if(!['record','lens','friends'].includes(id))return false;if(!s.seen.includes(id))s.seen.push(id);return true;}
function ready(s){return s.seen.includes('record')&&s.seen.includes('lens');}
function solve(s,value){if(s.solved||!ready(s))return{blocked:true};if(!value||!Number.isInteger(value.total)||value.total<0||value.total>99||!['4x7','7x4','4x6'].includes(value.layout))return{invalid:true};if(value.total!==28||value.layout!=='4x7')return{ok:false};s.solved=true;return{ok:true};}
function returnFriends(s){if(!s.solved||s.rescued)return false;s.rescued=true;return true;}
return{ids,fresh,validate,see,ready,solve,returnFriends};})();if(typeof module!=='undefined')module.exports=ScienceCore;
