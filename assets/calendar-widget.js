/**
 * Envoya Before/After Calendar Widget
 * Shows Week 1 (empty) vs Week 4 (packed with meetings)
 * Auto-animates with a toggle switch
 */
(function() {
  const isNL = window.location.pathname.startsWith('/nl');

  const MEETINGS_WEEK4 = [
    // Monday
    { day: 1, time: '9:00', label: isNL ? '☎️ Intro · Zilveren Kruis' : '☎️ Intro · Zilveren Kruis', color: '#6366f1', duration: 1 },
    { day: 1, time: '11:00', label: isNL ? '📹 Kennismaking · ABN AMRO' : '📹 Discovery · ABN AMRO', color: '#818cf8', duration: 1 },
    { day: 1, time: '14:00', label: isNL ? '🤝 Pitch · VodafoneZiggo' : '🤝 Pitch · VodafoneZiggo', color: '#6366f1', duration: 1 },
    // Tuesday
    { day: 2, time: '9:00', label: isNL ? '☎️ Intro · Fabory' : '☎️ Intro · Fabory', color: '#818cf8', duration: 1 },
    { day: 2, time: '10:00', label: isNL ? '📹 Kennismaking · ING' : '📹 Discovery · ING', color: '#6366f1', duration: 1 },
    { day: 2, time: '13:00', label: isNL ? '🤝 Deal · Triodos Bank' : '🤝 Deal · Triodos Bank', color: '#4ade80', duration: 1 },
    { day: 2, time: '15:00', label: isNL ? '☎️ Intro · TU/e' : '☎️ Intro · TU/e', color: '#818cf8', duration: 1 },
    // Wednesday
    { day: 3, time: '9:00', label: isNL ? '📹 Kennismaking · APG' : '📹 Discovery · APG', color: '#6366f1', duration: 1 },
    { day: 3, time: '11:00', label: isNL ? '☎️ Intro · TNO' : '☎️ Intro · TNO', color: '#818cf8', duration: 1 },
    { day: 3, time: '14:00', label: isNL ? '🤝 Pitch · Unilever' : '🤝 Pitch · Unilever', color: '#6366f1', duration: 1 },
    { day: 3, time: '16:00', label: isNL ? '☎️ Intro · Meesman' : '☎️ Intro · Meesman', color: '#818cf8', duration: 1 },
    // Thursday
    { day: 4, time: '9:00', label: isNL ? '☎️ Intro · BAM' : '☎️ Intro · BAM', color: '#818cf8', duration: 1 },
    { day: 4, time: '10:00', label: isNL ? '📹 Kennismaking · KPN' : '📹 Discovery · KPN', color: '#6366f1', duration: 1 },
    { day: 4, time: '13:00', label: isNL ? '🤝 Deal · Philips' : '🤝 Deal signed · Philips', color: '#4ade80', duration: 1 },
    { day: 4, time: '15:00', label: isNL ? '📹 Kennismaking · LeasePlan' : '📹 Discovery · LeasePlan', color: '#6366f1', duration: 1 },
    // Friday
    { day: 5, time: '9:00', label: isNL ? '☎️ Intro · SHV Energy' : '☎️ Intro · SHV Energy', color: '#818cf8', duration: 1 },
    { day: 5, time: '11:00', label: isNL ? '🤝 Pitch · TomTom' : '🤝 Pitch · TomTom', color: '#6366f1', duration: 1 },
    { day: 5, time: '14:00', label: isNL ? '☎️ Intro · NXP' : '☎️ Intro · NXP', color: '#818cf8', duration: 1 },
  ];

  const DAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const DAYS_NL = ['Ma', 'Di', 'Wo', 'Do', 'Vr'];
  const DAYS = isNL ? DAYS_NL : DAYS_EN;
  const TIMES = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  function buildCalendar(isFull) {
    const grid = document.createElement('div');
    grid.className = 'cal-grid';

    // Header row
    const headerRow = document.createElement('div');
    headerRow.className = 'cal-header-row';
    headerRow.innerHTML = '<div class="cal-time-col"></div>' +
      DAYS.map((d, i) => `<div class="cal-day-col"><span class="cal-day-label">${d}</span></div>`).join('');
    grid.appendChild(headerRow);

    // Time slots
    TIMES.forEach(time => {
      const row = document.createElement('div');
      row.className = 'cal-row';
      row.innerHTML = `<div class="cal-time-col">${time}</div>`;

      DAYS.forEach((d, dayIdx) => {
        const cell = document.createElement('div');
        cell.className = 'cal-cell';

        if (isFull) {
          const meeting = MEETINGS_WEEK4.find(m => m.day === dayIdx + 1 && m.time === time);
          if (meeting) {
            const block = document.createElement('div');
            block.className = 'cal-block';
            block.style.background = meeting.color === '#4ade80'
              ? 'rgba(74,222,128,0.15)'
              : 'rgba(99,102,241,0.15)';
            block.style.borderLeft = `3px solid ${meeting.color}`;
            block.style.color = meeting.color === '#4ade80' ? '#4ade80' : '#a5b4fc';
            block.textContent = meeting.label;
            cell.appendChild(block);
          }
        }

        row.appendChild(cell);
      });

      grid.appendChild(row);
    });

    return grid;
  }

  function init() {
    const container = document.getElementById('calendar-widget');
    if (!container) return;

    let showFull = false;

    const label = isNL
      ? '<span class="cal-week-badge cal-week-empty">Week 1 — voor Lead Machine</span>'
      : '<span class="cal-week-badge cal-week-empty">Week 1 — before Lead Machine</span>';

    const labelFull = isNL
      ? '<span class="cal-week-badge cal-week-full">Week 4 — 17 meetings geboekt 🚀</span>'
      : '<span class="cal-week-badge cal-week-full">Week 4 — 17 meetings booked 🚀</span>';

    const btnText = isNL
      ? ['→ Zie week 4', '← Zie week 1']
      : ['→ See week 4', '← See week 1'];

    const wrapper = document.createElement('div');
    wrapper.className = 'cal-wrapper';

    const badgeEl = document.createElement('div');
    badgeEl.className = 'cal-badge-row';
    badgeEl.innerHTML = label;

    const calContainer = document.createElement('div');
    calContainer.className = 'cal-container';
    calContainer.appendChild(buildCalendar(false));

    const btn = document.createElement('button');
    btn.className = 'cal-toggle-btn';
    btn.textContent = btnText[0];
    btn.onclick = () => {
      showFull = !showFull;
      calContainer.innerHTML = '';
      const cal = buildCalendar(showFull);
      cal.style.opacity = '0';
      calContainer.appendChild(cal);
      setTimeout(() => { cal.style.transition = 'opacity 0.4s'; cal.style.opacity = '1'; }, 10);
      badgeEl.innerHTML = showFull ? labelFull : label;
      btn.textContent = showFull ? btnText[1] : btnText[0];
    };

    wrapper.appendChild(badgeEl);
    wrapper.appendChild(calContainer);
    wrapper.appendChild(btn);
    container.appendChild(wrapper);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
