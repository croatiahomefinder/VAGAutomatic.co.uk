
const q = document.getElementById('faultQuery');
const out = document.getElementById('faultResult');
const norm = s => s.toLowerCase().replace(/[._\-/]/g,' ').replace(/\s+/g,' ').trim();
const rules = [
  {terms:['p17bf','006079','p189c','006300','p1895','insufficient pressure build up','pump keeps running','hydraulic pump protection'], type:'green', title:'DQ200 hydraulic pressure repair', price:'£399.99', url:'/dq200-hydraulic-pressure-repair/', text:'A known DQ200 hydraulic pressure fault family we support at fixed price.'},
  {terms:['p0841','17225','10784','pressure sensor range performance','transmission fluid pressure sensor'], type:'amber', title:'DQ200 pressure fault needs context', price:'Free test first', url:'/dq200-hydraulic-pressure-repair/', text:'P0841 can accompany genuine pressure loss, but it should not be treated as proof of one exact internal failure on its own.'},
  {terms:['p1735','p173500','10666','clutch 1 position sensor','position sender for clutch 1','only even gears','reverse 2nd 4th 6th'], type:'green', title:'DQ380 / DQ381 P1735 repair', price:'£329.99', url:'/dq380-dq381-p1735-p1736-repair/', text:'This matches the supported DQ380/DQ381 clutch 1 position-sensing fault family.'},
  {terms:['p1736','p173600','10668','clutch 2 position sensor','position sender for clutch 2','only odd gears','1st 3rd 5th 7th'], type:'green', title:'DQ380 / DQ381 P1736 repair', price:'£329.99', url:'/dq380-dq381-p1735-p1736-repair/', text:'This matches the supported DQ380/DQ381 clutch 2 position-sensing fault family.'},
  {terms:['p0805','clutch position sensor circuit'], type:'amber', title:'P0805 needs controller identification', price:'Free identification', url:'/repair-finder/', text:'P0805 appears on more than one hardware family. Send the TCM label or choose Bosch / Continental before posting.'},
  {terms:['p0c29','auxiliary hydraulic pump','aux hydraulic pump'], type:'red', title:'Do not send the TCM only', price:'Vehicle / gearbox diagnosis', url:'#', text:'This fault can involve the auxiliary hydraulic pump inside the gearbox. It is not a safe TCM-only postal repair.'},
  {terms:['u0101','01315','no communication','no comms','loses communication when hot','dies hot'], type:'green', title:'DQ200 TCU no-communication repair', price:'From £179.99', url:'https://tcmrepair.co.uk/', text:'This repair stays on our dedicated TCMRepair.co.uk electronics site.'}
];
function runFinder(){
  if(!q||!out) return;
  const value = norm(q.value);
  if(!value){out.innerHTML='<div class="result amber"><strong>Enter a fault code or symptom</strong><span>Try P1736, 10668, only even gears, P17BF or no communication.</span></div>';return;}
  const hit = rules.find(r => r.terms.some(t => value.includes(norm(t))));
  if(!hit){out.innerHTML='<div class="result amber"><strong>Not on our fixed-price list yet</strong><span>Do not guess. Send us the fault code, vehicle and TCM label and we will tell you whether it is a supported postal repair.</span><div class="result-actions"><a class="btn btn-dark" href="/#contact">Send fault details</a></div></div>';return;}
  const ext = hit.url.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
  const action = hit.url==='#' ? '' : `<a class="btn btn-dark" href="${hit.url}"${ext}>View repair</a>`;
  out.innerHTML=`<div class="result ${hit.type}"><strong>${hit.type==='green'?'✓ Good news. ':hit.type==='red'?'✕ ':'! '}${hit.title}</strong><span>${hit.text}</span><div style="margin-top:8px;font-weight:900;font-size:1.25rem">${hit.price}</div><div class="result-actions">${action}</div></div>`;
}
document.addEventListener('DOMContentLoaded',()=>{
  const b=document.getElementById('faultButton'); if(b) b.addEventListener('click',runFinder);
  if(q) q.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();runFinder();}});
  document.querySelectorAll('[data-fill]').forEach(el=>el.addEventListener('click',()=>{if(q){q.value=el.dataset.fill;runFinder();q.scrollIntoView({behavior:'smooth',block:'center'});}}));
});
