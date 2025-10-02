(function(){
  const fromInput = document.getElementById('from');
  const toInput = document.getElementById('to');
  const useNow = document.getElementById('useNow');

  const yearsEl = document.getElementById('years');
  const monthsEl = document.getElementById('months');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  const monthsTot = document.getElementById('monthsTot');
  const weeksTot  = document.getElementById('weeksTot');
  const daysTot   = document.getElementById('daysTot');
  const hoursTot  = document.getElementById('hoursTot');
  const minutesTot= document.getElementById('minutesTot');
  const secondsTot= document.getElementById('secondsTot');

  fromInput.value = '2005-08-25T23:15';
  toInput.value   = '2025-08-29T23:17';

  function calcAndRender(){
    const from = new Date(fromInput.value);
    const to = useNow.checked ? new Date() : new Date(toInput.value);
    if (isNaN(from) || isNaN(to)) return;

    let start = from; let end = to;
    if (start > end){ [start,end] = [end,start]; }

    const diffMs = end - start;

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours   = Math.floor(totalMinutes / 60);
    const totalDays    = Math.floor(totalHours / 24);
    const totalWeeks   = (totalDays / 7);
    const totalMonthsApprox = Math.floor(totalDays / 30.4375);

    let y = 0, m = 0;
    const s = new Date(start.getTime());
    while (true){
      const next = new Date(s.getFullYear()+1, s.getMonth(), s.getDate(), s.getHours(), s.getMinutes(), s.getSeconds());
      if (next <= end){ s.setFullYear(s.getFullYear()+1); y++; } else break;
    }
    while (true){
      const next = new Date(s.getFullYear(), s.getMonth()+1, s.getDate(), s.getHours(), s.getMinutes(), s.getSeconds());
      if (next <= end){ s.setMonth(s.getMonth()+1); m++; } else break;
    }
    const remMs = end - s;
    const remSeconds = Math.floor(remMs/1000);
    const remMinutes = Math.floor(remSeconds/60);
    const remHours = Math.floor(remMinutes/60);
    const remDays = Math.floor(remHours/24);

    yearsEl.textContent = y;
    monthsEl.textContent = m;
    daysEl.textContent = remDays;
    hoursEl.textContent = remHours % 24;
    minutesEl.textContent = remMinutes % 60;
    secondsEl.textContent = remSeconds % 60;

    monthsTot.textContent = totalMonthsApprox.toLocaleString();
    weeksTot.textContent  = Number(totalWeeks.toFixed(2)).toLocaleString();
    daysTot.textContent   = totalDays.toLocaleString();
    hoursTot.textContent  = totalHours.toLocaleString();
    minutesTot.textContent= totalMinutes.toLocaleString();
    secondsTot.textContent= totalSeconds.toLocaleString();
  }

  fromInput.addEventListener('input', calcAndRender);
  toInput.addEventListener('input', calcAndRender);
  useNow.addEventListener('change', function(){
    toInput.disabled = useNow.checked;
    calcAndRender();
    if (useNow.checked){
      if (!window._liveTimer) window._liveTimer = setInterval(calcAndRender,1000);
    } else {
      if (window._liveTimer){ clearInterval(window._liveTimer); window._liveTimer = null; }
    }
  });

  calcAndRender();
})();
