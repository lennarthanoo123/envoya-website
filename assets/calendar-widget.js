/* ── Envoya Calendar Widget — Google Calendar style ─────────────────── */
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

  // Hours shown: 8 AM – 6 PM = 10 hours
  const START_HOUR = 8;
  const HOURS = 10;
  const HOUR_H = 72; // px per hour

  const TYPE_LABELS = {
    intro:     isNL ? 'Kennismaking' : 'Intro call',
    discovery: isNL ? 'Discovery'    : 'Discovery',
    pitch:     isNL ? 'Pitch'        : 'Pitch',
    deal:      isNL ? 'Deal ✓'       : 'Deal signed ✓',
  };

  // Week 1: only 3 sparse meetings
  const WEEK1 = [
    { day: 1, hour: 10, min: 0, dur: 60, type: 'intro',     co: isNL ? 'Potentiële klant' : 'Potential client', init: '?' },
    { day: 3, hour: 14, min: 0, dur: 60, type: 'discovery', co: isNL ? 'Potentiële klant' : 'Potential client', init: '?' },
    { day: 4, hour: 11, min: 0, dur: 60, type: 'intro',     co: isNL ? 'Potentiële klant' : 'Potential client', init: '?' },
  ];

  // Week 4: 30 meetings, realistic times, proportional blocks
  const WEEK4 = [
    // Monday
    { day: 0, hour:  8, min:30, dur: 60, type: 'intro',     co: 'Zilveren Kruis',  init: 'ZK' },
    { day: 0, hour: 10, min: 0, dur: 45, type: 'discovery', co: 'ABN AMRO',        init: 'AA' },
    { day: 0, hour: 11, min:30, dur: 60, type: 'pitch',     co: 'VodafoneZiggo',   init: 'VZ' },
    { day: 0, hour: 13, min:30, dur: 60, type: 'intro',     co: 'KPN',             init: 'KP' },
    { day: 0, hour: 15, min: 0, dur: 45, type: 'discovery', co: 'Philips',         init: 'PH' },
    { day: 0, hour: 16, min:30, dur: 45, type: 'intro',     co: 'NXP',             init: 'NX' },
    // Tuesday
    { day: 1, hour:  9, min: 0, dur: 60, type: 'intro',     co: 'Fabory',          init: 'FB' },
    { day: 1, hour: 10, min:30, dur: 60, type: 'discovery', co: 'ING',             init: 'IN' },
    { day: 1, hour: 13, min: 0, dur: 90, type: 'deal',      co: 'Triodos Bank',    init: 'TR' },
    { day: 1, hour: 15, min: 0, dur: 60, type: 'intro',     co: 'TU/e',            init: 'TU' },
    { day: 1, hour: 16, min:30, dur: 45, type: 'pitch',     co: 'Exact',           init: 'EX' },
    // Wednesday
    { day: 2, hour:  8, min:30, dur: 60, type: 'discovery', co: 'APG',             init: 'AP' },
    { day: 2, hour: 10, min: 0, dur: 60, type: 'intro',     co: 'TNO',             init: 'TN' },
    { day: 2, hour: 11, min:30, dur: 60, type: 'pitch',     co: 'Unilever',        init: 'UN' },
    { day: 2, hour: 13, min: 0, dur: 60, type: 'intro',     co: 'Meesman',         init: 'MS' },
    { day: 2, hour: 14, min:30, dur: 60, type: 'discovery', co: 'SHV Energy',      init: 'SH' },
    { day: 2, hour: 16, min: 0, dur: 60, type: 'intro',     co: 'Royal Swinkels',  init: 'RS' },
    // Thursday
    { day: 3, hour:  9, min: 0, dur: 60, type: 'intro',     co: 'ECT Rotterdam',   init: 'EC' },
    { day: 3, hour: 10, min:30, dur: 60, type: 'discovery', co: 'LeasePlan',       init: 'LP' },
    { day: 3, hour: 13, min: 0, dur: 90, type: 'deal',      co: 'Philips',         init: 'PH' },
    { day: 3, hour: 15, min: 0, dur: 60, type: 'pitch',     co: 'TomTom',          init: 'TT' },
    { day: 3, hour: 16, min:30, dur: 45, type: 'intro',     co: 'DFE Pharma',      init: 'DF' },
    // Friday
    { day: 4, hour:  8, min:30, dur: 60, type: 'discovery', co: 'Shuttel',         init: 'SH' },
    { day: 4, hour: 10, min: 0, dur: 60, type: 'pitch',     co: 'BOM',             init: 'BM' },
    { day: 4, hour: 11, min:30, dur: 45, type: 'intro',     co: 'BAM',             init: 'BA' },
    { day: 4, hour: 13, min: 0, dur: 90, type: 'deal',      co: 'Zilveren Kruis',  init: 'ZK' },
    { day: 4, hour: 14, min:45, dur: 60, type: 'discovery', co: 'ABN AMRO',        init: 'AA' },
    { day: 4, hour: 16, min: 0, dur: 60, type: 'intro',     co: 'Mosadex',         init: 'MO' },
  ];

  function timeLabel(hour) {
    return hour + ':00';
  }

  function buildCalendar(meetings) {
    const wrap = document.createElement('div');
    wrap.className = 'cal-container';

    // Header row
    const hdr = document.createElement('div');
    hdr.className = 'cal-header-row';
    hdr.innerHTML = '<div class="cal-time-header"></div>' +
      DAYS.map(d => `<div class="cal-day-header"><span class="cal-day-name">${d.name}</span><span class="cal-day-num">${d.date}</span></div>`).join('');
    wrap.appendChild(hdr);

    // Body
    const body = document.createElement('div');
    body.className = 'cal-body';

    // Time labels
    const timesCol = document.createElement('div');
    timesCol.className = 'cal-times';
    for (let h = 0; h < HOURS; h++) {
      const lbl = document.createElement('div');
      lbl.className = 'cal-time-label';
      lbl.textContent = timeLabel(START_HOUR + h);
      timesCol.appendChild(lbl);
    }
    body.appendChild(timesCol);

    // Day columns
    DAYS.forEach((_, di) => {
      const col = document.createElement('div');
      col.className = 'cal-day-col';
      col.style.height = (HOURS * HOUR_H) + 'px';

      // Hour lines
      for (let h = 0; h < HOURS; h++) {
        const line = document.createElement('div');
        line.className = 'cal-hour-line';
        col.appendChild(line);
      }

      // Events for this day
      const dayMeetings = meetings.filter(m => m.day === di);
      dayMeetings.forEach(m => {
        const topOffset = ((m.hour - START_HOUR) + m.min / 60) * HOUR_H;
        const height = Math.max((m.dur / 60) * HOUR_H - 4, 28);

        const ev = document.createElement('div');
        ev.className = `cal-event-block cal-event-${m.type}`;
        ev.style.top = topOffset + 'px';
        ev.style.height = height + 'px';

        const timeStr = `${m.hour}:${m.min === 0 ? '00' : m.min}`;
        ev.innerHTML = `
          <div class="cal-event-time">${timeStr} · ${TYPE_LABELS[m.type]}</div>
          <div class="cal-event-name">${m.co}</div>`;
        col.appendChild(ev);
      });

      body.appendChild(col);
    });

    wrap.appendChild(body);
    return wrap;
  }

  function animateEvents(container) {
    const events = container.querySelectorAll('.cal-event-block');
    events.forEach((ev, i) => {
      ev.style.animationDelay = (i * 40) + 'ms';
      setTimeout(() => ev.classList.add('show'), i * 40);
    });
  }

  function init() {
    const container = document.getElementById('calendar-widget');
    if (!container) return;

    let showFull = false;

    const LABEL_EMPTY = isNL ? 'Week 1 — vóór Lead Machine (3 afspraken)' : 'Week 1 — before Lead Machine (3 appointments)';
    const LABEL_FULL  = isNL ? 'Week 4 — 28 afspraken geboekt 🚀' : 'Week 4 — 28 appointments booked 🚀';
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
