(() => {
  const q = document.getElementById('faultQuery');
  const btn = document.getElementById('faultButton');
  const out = document.getElementById('faultResult');
  if (!q || !btn || !out) return;

  const norm = s => (s || '').toLowerCase().replace(/[\s_\-\.\/]+/g,' ').trim();
  const has = (s, arr) => arr.some(x => s.includes(x));

  function render(cls, title, body, actions='') {
    out.innerHTML = `<div class="result ${cls}"><h3>${title}</h3><p>${body}</p>${actions ? `<div class="result-actions">${actions}</div>` : ''}</div>`;
  }

  function search() {
    const s = norm(q.value);
    if (!s) { render('amber','Enter a code or symptom','Try a code such as P1736, P17BF, 10666, 01315 or describe what the car is doing.'); return; }

    if (has(s,['p0c29','p0c2900','auxiliary hydraulic pump'])) {
      render('red','Do not send the TCM only','P0C29 / auxiliary hydraulic pump faults normally require gearbox or vehicle-level diagnosis rather than a TCM-only postal repair.','<a class="btn btn-outline" href="/#contact">Send us the full fault details</a>');
      return;
    }

    if (has(s,['u0101','01315','no communication','no comms','loses communication','communication when hot','fails when hot'])) {
      render('green','DQ200 TCM electronics repair','No communication / hot-dropout faults are handled through our dedicated DQ200 TCM electronics service.','<a class="btn btn-dark" href="https://tcmrepair.co.uk/" target="_blank" rel="noopener">Open DQ200 TCM repair</a>');
      return;
    }

    if (has(s,['p17bf','06079','006079','p189c','006300','p1895','06293','006293','pump keeps running','pump runs constantly','pump runs all the time','pressure build up','pressure buildup','insufficient pressure','slips into neutral','loses drive','loss of drive','prnds flashing','spanner flashing'])) {
      render('green','DQ200 fixed-price hydraulic / mechatronic repair','This symptom or code matches our £399.99 fixed-price DQ200 hydraulic / mechatronic repair. The fixed price covers the internal mechatronic repair required to resolve the supported fault.','<a class="btn btn-dark" href="/dq200-hydraulic-pressure-repair/">View £399.99 repair</a>');
      return;
    }

    if (has(s,['p0841','17225','10784'])) {
      render('amber','P0841 needs context','P0841 can appear with a genuine DQ200 hydraulic pressure-loss fault, but the code alone is not enough to identify the repair. Send the complete code set and symptoms before posting the unit.','<a class="btn btn-outline" href="/#contact">Send fault details</a>');
      return;
    }

    if (has(s,['p1735','p173500','10666','p1736','p173600','10668','p0805','only even gears','only odd gears','lost even gears','lost odd gears','gearbox emergency mode','transmission emergency mode','r 2 4 6','reverse 2 4 6','gears 2 4 6','half the gears','comes back after restart','returns after restart'])) {
      render('green','Supported P1735 / P1736 fault family','This fault is covered on supported DQ380/DQ381 and DQ500 controllers. Choose the correct transmission/controller page from the unit label before sending.','<a class="btn btn-dark" href="/dq380-dq381-p1735-p1736-repair/">DQ380 / DQ381</a><a class="btn btn-outline" href="/dq500-bosch-p1735-p1736-repair/">DQ500 Bosch</a><a class="btn btn-outline" href="/dq500-continental-p1735-p1736-repair/">DQ500 Continental</a>');
      return;
    }

    if (has(s,['p0607','p0715','p0716','p2765','p2766','p0850','p0851','p176a','p176b'])) {
      render('amber','Free test first','This fault may be repairable, but we do not sell it as a fixed-price repair from the code alone. Send the controller details, complete fault scan and symptoms first.','<a class="btn btn-outline" href="/#contact">Send fault details</a>');
      return;
    }

    if (has(s,['p072a','p072b','p072c','p072d','p072e','p072f','p073a','p073b','p073c','gear not selectable','shift fork'])) {
      render('red','Vehicle / gearbox diagnosis first','These gear-selection faults can be mechanical and are not suitable for a blind TCM-only postal repair.','<a class="btn btn-outline" href="/#contact">Send us the full scan</a>');
      return;
    }

    render('amber','No fixed-price match yet','We do not want to guess from this description. Send the exact DTC, scanner wording, vehicle, gearbox type and controller part number and we will tell you whether to send it.','<a class="btn btn-outline" href="/#contact">Send fault details</a>');
  }

  btn.addEventListener('click', search);
  q.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); search(); } });
  document.querySelectorAll('[data-fill]').forEach(el => el.addEventListener('click', () => { q.value = el.dataset.fill || ''; search(); }));
})();
