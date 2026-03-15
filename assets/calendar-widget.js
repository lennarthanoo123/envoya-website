/* ── Envoya Calendar Widget ─────────────────────────────────────────── */
(function () {
  const isNL = window.location.pathname.startsWith('/nl');

  const DAYS_EN = [
    { name: 'MON', date: '17' }, { name: 'TUE', date: '18' },
    { name: 'WED', date: '19' }, { name: 'THU', date: '20' },
    { name: 'FRI', date: '21' },
  ];
  const DAYS_NL = [
    { name: 'MA', date: '17' }, { name: 'DI', date: '18' },
    { name: 'WO', date: '19' }, { name: 'DO', date: '20' },
    { name: 'VR', date: '21' },
  ];
  const DAYS = isNL ? DAYS_NL : DAYS_EN;
  const TIMES = ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];

  const TYPE_LABELS = {
    intro:     isNL ? 'Kennismaking' : 'Intro call',
    discovery: isNL ? 'Discovery'    : 'Discovery',
    pitch:     isNL ? 'Pitch'        : 'Pitch',
    deal:      isNL ? 'Deal ✓'       : 'Deal ✓',
  };

  // Week 1: only 3 meetings, lots of empty space
  const WEEK1 = [
    { day: 1, time: '10:00', type: 'intro',     co: 'Prospect X',  init: 'PX' },
    { day: 3, time: '14:00', type: 'discovery', co: 'Prospect Y',  init: 'PY' },
    { day: 4, time: '11:00', type: 'intro',     co: 'Prospect Z',  init: 'PZ' },
  ];

  // Week 4: 30 meetings, max 1 per slot per day
  const WEEK4 = [
    // Monday (6 meetings)
    { day: 0, time: '8:00',  type: 'intro',     co: 'Zilveren Kruis',   init: 'ZK' },
    { day: 0, time: '9:00',  type: 'discovery', co: 'ABN AMRO',         init: 'AA' },
    { day: 0, time: '10:00', type: 'pitch',      co: 'VodafoneZiggo',    init: 'VZ' },
    { day: 0, time: '12:00', type: 'intro',      co: 'KPN',              init: 'KP' },
    { day: 0, time: '14:00', type: 'discovery',  co: 'Philips',          init: 'PH' },
    { day: 0, time: '16:00', type: 'intro',      co: 'NXP',              init: 'NX' },
    // Tuesday (6 meetings)
    { day: 1, time: '8:00',  type: 'intro',      co: 'Fabory',           init: 'FB' },
    { day: 1, time: '9:00',  type: 'discovery',  co: 'ING',              init: 'IN' },
    { day: 1, time: '10:00', type: 'deal',        co: 'Triodos Bank',     init: 'TR' },
    { day: 1, time: '12:00', type: 'intro',       co: 'TU/e',             init: 'TU' },
    { day: 1, time: '14:00', type: 'pitch',       co: 'Exact',            init: 'EX' },
    { day: 1, time: '16:00', type: 'intro',       co: 'Meesman',          init: 'MS' },
    // Wednesday (6 meetings)
    { day: 2, time: '8:00',  type: 'discovery',  co: 'APG',              init: 'AP' },
    { day: 2, time: '9:00',  type: 'intro',       co: 'TNO',              init: 'TN' },
    { day: 2, time: '11:00', type: 'pitch',       co: 'Unilever',         init: 'UN' },
    { day: 2, time: '13:00', type: 'intro',       co: 'BAM',              init: 'BA' },
    { day: 2, time: '15:00', type: 'discovery',   co: 'SHV Energy',       init: 'SH' },
    { day: 2, time: '17:00', type: 'intro',       co: 'Royal Swinkels',   init: 'RS' },
    // Thursday (6 meetings)
    { day: 3, time: '8:00',  type: 'intro',       co: 'ECT Rotterdam',    init: 'EC' },
    { day: 3, time: '9:00',  type: 'discovery',   co: 'LeasePlan',        init: 'LP' },
    { day: 3, time: '10:00', type: 'deal',         co: 'Philips',          init: 'PH' },
    { day: 3, time: '12:00', type: 'pitch',        co: 'TomTom',           init: 'TT' },
    { day: 3, time: '14:00', type: 'intro',        co: 'DFE Pharma',       init: 'DF' },
    { day: 3, time: '16:00', type: 'discovery',    co: 'Mosadex',          init: 'MO' },
    // Friday (6 meetings)
    { day: 4, time: '8:00',  type: 'discovery',   co: 'Shuttel',          init: 'SH' },
    { day: 4, time: '9:00',  type: 'pitch',        co: 'BOM',              init: 'BM' },
    { day: 4, time: '11:00', type: 'intro',        co: 'Meesman',          init: 'MS' },
    { day: 4, time: '13:00', type: 'deal',          co: 'Zilveren Kruis',   init: 'ZK' },
    { day: 4, time: '15:00', type: 'discovery',    co: 'ABN AMRO',         init: 'AA' },
    { day: 4, time: '17:00', type: 'intro',        co: 'TNO',              init: 'TN' },
  ];

  function buildCalendar(meetings) {
    const wrap = document.createElement('div');
    wrap.className = 'cal-container';

    // Header
    const hdr = document.createElement('div');
    hdr.className = 'cal-header-row';
    hdr.innerHTML = '<div class="cal-time-col"></div>' +
      DAYS.map(d => `<div class="cal-day-header"><span class="cal-day-name">${d.name}</span><span class="cal-day-num">${d.date}</span></div>`).join('');
    wrap.appendChild(hdr);

    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:52px repeat(5,1fr);';

    TIMES.forEach(time => {
      const row = document.createElement('div');
      row.className = 'cal-row';
      row.innerHTML = `<div class="cal-time-col">${time}</div>`;

      DAYS.forEach((_, di) => {
        const cell = document.createElement('div');
        cell.className = 'cal-cell';
        const m = meetings.find(m => m.day === di && m.time === time);
        if (m) {
          const ev = document.createElement('div');
          ev.className = `cal-event cal-event-${m.type}`;
          ev.innerHTML = `<div class="cal-event-avatar">${m.init}</div><div class="cal-event-body"><div class="cal-event-type">${TYPE_LABELS[m.type]}</div><div class="cal-event-company">${m.co}</div></div>`;
          cell.appendChild(ev);
        }
        row.appendChild(cell);
      });
      grid.appendChild(row);
    });

    wrap.appendChild(grid);
    return wrap;
  }

  function animateEvents(container) {
    const events = container.querySelectorAll('.cal-event');
    events.forEach((ev, i) => setTimeout(() => ev.classList.add('show'), i * 55));
  }

  function init() {
    const container = document.getElementById('calendar-widget');
    if (!container) return;

    let showFull = false;

    const LABEL_EMPTY = isNL ? 'Week 1 — vóór Lead Machine (3 meetings)' : 'Week 1 — before Lead Machine (3 meetings)';
    const LABEL_FULL  = isNL ? 'Week 4 — 30 meetings geboekt 🚀' : 'Week 4 — 30 meetings booked 🚀';
    const BTN_FORWARD = isNL ? 'Zie week 4 →' : 'See week 4 →';
    const BTN_BACK    = isNL ? '← Terug naar week 1' : '← Back to week 1';

    const wrapper = document.createElement('div');
    wrapper.className = 'cal-wrapper';

    const badge = document.createElement('div');
    badge.className = 'cal-badge-row';
    badge.innerHTML = `<span class="cal-week-badge cal-week-empty">${LABEL_EMPTY}</span>`;

    const calWrap = document.createElement('div');
    calWrap.appendChild(buildCalendar(WEEK1));

    const btn = document.createElement('button');
    btn.className = 'cal-toggle-btn';
    btn.textContent = BTN_FORWARD;

    btn.onclick = () => {
      showFull = !showFull;
      calWrap.innerHTML = '';
      const cal = buildCalendar(showFull ? WEEK4 : WEEK1);
      calWrap.appendChild(cal);
      if (showFull) animateEvents(cal);
      badge.innerHTML = `<span class="cal-week-badge ${showFull ? 'cal-week-full' : 'cal-week-empty'}">${showFull ? LABEL_FULL : LABEL_EMPTY}</span>`;
      btn.textContent = showFull ? BTN_BACK : BTN_FORWARD;
    };

    wrapper.appendChild(badge);
    wrapper.appendChild(calWrap);
    wrapper.appendChild(btn);
    container.appendChild(wrapper);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
