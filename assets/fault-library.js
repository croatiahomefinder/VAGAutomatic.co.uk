(() => {
  const input=document.getElementById('faultLibrarySearch'); const cards=[...document.querySelectorAll('.fault-card')]; const buttons=[...document.querySelectorAll('.filter-btn')]; const empty=document.getElementById('faultEmpty'); if(!input||!cards.length)return;
  let filter='all';
  const norm=s=>(s||'').toLowerCase().replace(/[\s_\-\.\/]+/g,' ').trim();
  function apply(){const q=norm(input.value);let shown=0;cards.forEach(card=>{const fam=norm(card.dataset.family),hay=norm(card.dataset.search+' '+card.textContent);const familyOk=filter==='all'||fam.includes(filter);const searchOk=!q||hay.includes(q);const on=familyOk&&searchOk;card.hidden=!on;if(on)shown++;}); if(empty)empty.hidden=shown!==0;}
  input.addEventListener('input',apply); buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=norm(b.dataset.filter);apply();}));
})();