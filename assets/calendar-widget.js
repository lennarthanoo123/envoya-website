/* ── Envoya Calendar Widget — Dream Outcome v2 ───────────────────────── */
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

  const START_HOUR = 8;
  const HOURS = 10;
  const HOUR_H = 72;

  const TYPE_LABELS = {
    intro:     isNL ? 'Kennismaking' : 'Intro call',
    discovery: isNL ? 'Discovery'    : 'Discovery',
    pitch:     isNL ? 'Pitch'        : 'Pitch',
    deal:      isNL ? 'Deal ✓'       : 'Deal signed ✓',
  };

  const WEEKS = [
    // Week 1 — 3 appointments
    [
      { day: 1, hour: 10, min:  0, dur: 60, type: 'intro',     co: isNL ? 'Potentiële klant' : 'Potential client', init: '?' },
      { day: 3, hour: 14, min:  0, dur: 60, type: 'discovery', co: isNL ? 'Potentiële klant' : 'Potential client', init: '?' },
      { day: 4, hour: 11, min:  0, dur: 60, type: 'intro',     co: isNL ? 'Potentiële klant' : 'Potential client', init: '?' },
    ],
    // Week 2 — 8 appointments
    [
      { day: 0, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'ABN AMRO',      init: 'AA' },
      { day: 0, hour: 14, min:  0, dur: 60, type: 'discovery', co: 'KPN',           init: 'KP' },
      { day: 1, hour: 10, min:  0, dur: 60, type: 'intro',     co: 'Fabory',        init: 'FB' },
      { day: 2, hour: 10, min:  0, dur: 60, type: 'intro',     co: 'TNO',           init: 'TN' },
      { day: 2, hour: 14, min:  0, dur: 60, type: 'discovery', co: 'Meesman',       init: 'MS' },
      { day: 3, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'LeasePlan',     init: 'LP' },
      { day: 3, hour: 15, min:  0, dur: 60, type: 'pitch',     co: 'Unilever',      init: 'UN' },
      { day: 4, hour: 11, min:  0, dur: 60, type: 'intro',     co: 'TomTom',        init: 'TT' },
    ],
    // Week 3 — 16 appointments
    [
      { day: 0, hour:  8, min: 30, dur: 60, type: 'intro',     co: 'Zilveren Kruis', init: 'ZK' },
      { day: 0, hour: 10, min:  0, dur: 60, type: 'discovery', co: 'ABN AMRO',       init: 'AA' },
      { day: 0, hour: 13, min: 30, dur: 60, type: 'intro',     co: 'KPN',            init: 'KP' },
      { day: 1, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'Fabory',         init: 'FB' },
      { day: 1, hour: 10, min: 30, dur: 60, type: 'discovery', co: 'ING',            init: 'IN' },
      { day: 1, hour: 15, min:  0, dur: 60, type: 'pitch',     co: 'Unilever',       init: 'UN' },
      { day: 2, hour:  8, min: 30, dur: 60, type: 'discovery', co: 'APG',            init: 'AP' },
      { day: 2, hour: 10, min:  0, dur: 60, type: 'intro',     co: 'TNO',            init: 'TN' },
      { day: 2, hour: 14, min: 30, dur: 60, type: 'discovery', co: 'SHV Energy',     init: 'SH' },
      { day: 3, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'ECT Rotterdam',  init: 'EC' },
      { day: 3, hour: 10, min: 30, dur: 60, type: 'discovery', co: 'LeasePlan',      init: 'LP' },
      { day: 3, hour: 15, min:  0, dur: 60, type: 'pitch',     co: 'TomTom',         init: 'TT' },
      { day: 4, hour:  8, min: 30, dur: 60, type: 'discovery', co: 'Shuttel',        init: 'SH' },
      { day: 4, hour: 10, min:  0, dur: 60, type: 'pitch',     co: 'BOM',            init: 'BM' },
      { day: 4, hour: 13, min:  0, dur: 60, type: 'intro',     co: 'Mosadex',        init: 'MO' },
      { day: 4, hour: 16, min:  0, dur: 60, type: 'intro',     co: 'Royal Swinkels', init: 'RS' },
    ],
    // Week 4 — 28 appointments
    [
      { day: 0, hour:  8, min: 30, dur: 60, type: 'intro',     co: 'Zilveren Kruis',  init: 'ZK' },
      { day: 0, hour: 10, min:  0, dur: 45, type: 'discovery', co: 'ABN AMRO',        init: 'AA' },
      { day: 0, hour: 11, min: 30, dur: 60, type: 'pitch',     co: 'VodafoneZiggo',   init: 'VZ' },
      { day: 0, hour: 13, min: 30, dur: 60, type: 'intro',     co: 'KPN',             init: 'KP' },
      { day: 0, hour: 15, min:  0, dur: 45, type: 'discovery', co: 'Philips',         init: 'PH' },
      { day: 0, hour: 16, min: 30, dur: 45, type: 'intro',     co: 'NXP',             init: 'NX' },
      { day: 1, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'Fabory',          init: 'FB' },
      { day: 1, hour: 10, min: 30, dur: 60, type: 'discovery', co: 'ING',             init: 'IN' },
      { day: 1, hour: 13, min:  0, dur: 90, type: 'deal',      co: 'Triodos Bank',    init: 'TR' },
      { day: 1, hour: 15, min:  0, dur: 60, type: 'intro',     co: 'TU/e',            init: 'TU' },
      { day: 1, hour: 16, min: 30, dur: 45, type: 'pitch',     co: 'Exact',           init: 'EX' },
      { day: 2, hour:  8, min: 30, dur: 60, type: 'discovery', co: 'APG',             init: 'AP' },
      { day: 2, hour: 10, min:  0, dur: 60, type: 'intro',     co: 'TNO',             init: 'TN' },
      { day: 2, hour: 11, min: 30, dur: 60, type: 'pitch',     co: 'Unilever',        init: 'UN' },
      { day: 2, hour: 13, min:  0, dur: 60, type: 'intro',     co: 'Meesman',         init: 'MS' },
      { day: 2, hour: 14, min: 30, dur: 60, type: 'discovery', co: 'SHV Energy',      init: 'SH' },
      { day: 2, hour: 16, min:  0, dur: 60, type: 'intro',     co: 'Royal Swinkels',  init: 'RS' },
      { day: 3, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'ECT Rotterdam',   init: 'EC' },
      { day: 3, hour: 10, min: 30, dur: 60, type: 'discovery', co: 'LeasePlan',       init: 'LP' },
      { day: 3, hour: 13, min:  0, dur: 90, type: 'deal',      co: 'Philips',         init: 'PH' },
      { day: 3, hour: 15, min:  0, dur: 60, type: 'pitch',     co: 'TomTom',          init: 'TT' },
      { day: 3, hour: 16, min: 30, dur: 45, type: 'intro',     co: 'DFE Pharma',      init: 'DF' },
      { day: 4, hour:  8, min: 30, dur: 60, type: 'discovery', co: 'Shuttel',         init: 'SH' },
      { day: 4, hour: 10, min:  0, dur: 60, type: 'pitch',     co: 'BOM',             init: 'BM' },
      { day: 4, hour: 11, min: 30, dur: 45, type: 'intro',     co: 'BAM',             init: 'BA' },
      { day: 4, hour: 13, min:  0, dur: 90, type: 'deal',      co: 'Zilveren Kruis',  init: 'ZK' },
      { day: 4, hour: 14, min: 45, dur: 60, type: 'discovery', co: 'ABN AMRO',        init: 'AA' },
      { day: 4, hour: 16, min:  0, dur: 60, type: 'intro',     co: 'Mosadex',         init: 'MO' },
    ],
  ];

  const WEEK_COUNTS = [3, 8, 16, 28];

  const WEEK_SUBLABELS_EN = [
    'The agent just started.',
    'Pipeline building.',
    'Calendar filling up.',
    'This is the result.',
  ];
  const WEEK_SUBLABELS_NL = [
    'De agent is net gestart.',
    'Pipeline wordt opgebouwd.',
    'Agenda vult zich.',
    'Dit is het resultaat.',
  ];
  const WEEK_SUBLABELS = isNL ? WEEK_SUBLABELS_NL : WEEK_SUBLABELS_EN;

  const BADGE_LABELS_EN = [
    'Week 1 — 3 appointments booked',
    'Week 2 — 8 appointments booked',
    'Week 3 — 16 appointments booked',
    'Week 4 — 28 appointments booked 🚀',
  ];
  const BADGE_LABELS_NL = [
    'Week 1 — 3 afspraken geboekt',
    'Week 2 — 8 afspraken geboekt',
    'Week 3 — 16 afspraken geboekt',
    'Week 4 — 28 afspraken geboekt 🚀',
  ];
  const BADGE_LABELS = isNL ? BADGE_LABELS_NL : BADGE_LABELS_EN;

  function buildCalendar(meetings) {
    const wrap = document.createElement('div');
    wrap.className = 'cal-container';

    const hdr = document.createElement('div');
    hdr.className = 'cal-header-row';
    hdr.innerHTML = '<div class="cal-time-header"></div>' +
      DAYS.map(d => `<div class="cal-day-header"><span class="cal-day-name">${d.name}</span><span class="cal-day-num">${d.date}</span></div>`).join('');
    wrap.appendChild(hdr);

    const body = document.createElement('div');
    body.className = 'cal-body';

    const timesCol = document.createElement('div');
    timesCol.className = 'cal-times';
    for (let h = 0; h < HOURS; h++) {
      const lbl = document.createElement('div');
      lbl.className = 'cal-time-label';
      lbl.textContent = (START_HOUR + h) + ':00';
      timesCol.appendChild(lbl);
    }
    body.appendChild(timesCol);

    DAYS.forEach((_, di) => {
      const col = document.createElement('div');
      col.className = 'cal-day-col';
      col.style.height = (HOURS * HOUR_H) + 'px';

      for (let h = 0; h < HOURS; h++) {
        const line = document.createElement('div');
        line.className = 'cal-hour-line';
        col.appendChild(line);
      }

      meetings.filter(m => m.day === di).forEach(m => {
        const topOffset = ((m.hour - START_HOUR) + m.min / 60) * HOUR_H;
        const height = Math.max((m.dur / 60) * HOUR_H - 4, 28);
        const ev = document.createElement('div');
        ev.className = `cal-event-block cal-event-${m.type}`;
        if (m.type === 'deal') ev.classList.add('cal-event-deal-special');
        ev.style.top = topOffset + 'px';
        ev.style.height = height + 'px';
        const timeStr = `${m.hour}:${m.min === 0 ? '00' : m.min}`;
        ev.innerHTML = `<div class="cal-event-time">${timeStr} · ${TYPE_LABELS[m.type]}</div><div class="cal-event-name">${m.co}</div>`;
        col.appendChild(ev);
      });

      body.appendChild(col);
    });

    wrap.appendChild(body);
    return wrap;
  }

  function animateCounter(el, target, duration) {
    var start = parseInt(el.textContent) || 0;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + (target - start) * ease);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function animateEvents(container, weekIdx) {
    const events = container.querySelectorAll('.cal-event-block');
    events.forEach((ev, i) => {
      const delay = i * 80;
      setTimeout(() => {
        ev.classList.add('show');
        // Deal signed pulse
        if (ev.classList.contains('cal-event-deal-special')) {
          setTimeout(() => ev.classList.add('deal-pulse'), 150);
        }
      }, delay);
    });
  }

  function renderWeek(state, weekIdx) {
    const isLast = weekIdx === 3;

    // Update subline — hide on week 4 (calendar speaks for itself)
    if (isLast) {
      state.subline.style.display = 'none';
    } else {
      state.subline.style.display = '';
      state.subline.textContent = WEEK_SUBLABELS[weekIdx];
      state.subline.className = 'cal-dynamic-sub cal-sub-animate';
      setTimeout(() => state.subline.classList.remove('cal-sub-animate'), 400);
    }

    // Update badge: "Week X — [counter] appointments booked 🚀"
    // Structure: weekContext | counter | label
    const weekContext = isNL ? `Week ${weekIdx + 1} — ` : `Week ${weekIdx + 1} — `;
    state.badgeWeekCtx.textContent = weekContext;
    animateCounter(state.counter, WEEK_COUNTS[weekIdx], 800);
    state.badge.className = `cal-week-badge ${isLast ? 'cal-week-full' : 'cal-week-mid'}`;
    state.badgeLabel.textContent = isNL
      ? (isLast ? ' afspraken geboekt 🚀' : ' afspraken geboekt')
      : (isLast ? ' appointments booked 🚀' : ' appointments booked');

    // Build calendar
    state.calWrap.innerHTML = '';
    const cal = buildCalendar(WEEKS[weekIdx]);
    state.calWrap.appendChild(cal);
    animateEvents(cal, weekIdx);

    // Nav buttons
    state.btnBack.style.visibility = weekIdx > 0 ? 'visible' : 'hidden';
    state.btnNext.style.display = isLast ? 'none' : 'inline-flex';
    state.cta.style.display = isLast ? 'block' : 'none';
  }

  function init() {
    const container = document.getElementById('calendar-widget');
    if (!container) return;

    let currentWeek = 0;
    let autoPlayed = false;

    const wrapper = document.createElement('div');
    wrapper.className = 'cal-wrapper';

    // Dynamic subline
    const subline = document.createElement('div');
    subline.className = 'cal-dynamic-sub';
    subline.textContent = WEEK_SUBLABELS[0];

    // Badge row: "Week 1 — 3 appointments booked"
    const badgeRow = document.createElement('div');
    badgeRow.className = 'cal-badge-row';
    const badge = document.createElement('span');
    badge.className = 'cal-week-badge cal-week-mid';
    const badgeWeekCtx = document.createElement('span');
    badgeWeekCtx.className = 'cal-badge-ctx';
    badgeWeekCtx.textContent = isNL ? 'Week 1 — ' : 'Week 1 — ';
    const counter = document.createElement('span');
    counter.className = 'cal-counter';
    counter.textContent = '0';
    const badgeLabel = document.createElement('span');
    badgeLabel.className = 'cal-badge-label';
    badgeLabel.textContent = isNL ? ' afspraken geboekt' : ' appointments booked';
    badge.appendChild(badgeWeekCtx);
    badge.appendChild(counter);
    badge.appendChild(badgeLabel);
    badgeRow.appendChild(badge);

    // Calendar container
    const calWrap = document.createElement('div');

    // Nav row
    const navRow = document.createElement('div');
    navRow.className = 'cal-nav-row';

    const btnBack = document.createElement('button');
    btnBack.className = 'cal-nav-btn';
    btnBack.innerHTML = isNL ? '← Vorige week' : '← Previous week';
    btnBack.style.visibility = 'hidden';

    const weekPill = document.createElement('span');
    weekPill.className = 'cal-week-pill';

    const btnNext = document.createElement('button');
    btnNext.className = 'cal-nav-btn cal-nav-btn--primary';
    btnNext.innerHTML = isNL ? 'Volgende week →' : 'Next week →';

    navRow.appendChild(btnBack);
    navRow.appendChild(weekPill);
    navRow.appendChild(btnNext);

    // CTA (shown on week 4)
    const cta = document.createElement('div');
    cta.className = 'cal-cta-row';
    cta.style.display = 'none';
    cta.innerHTML = `<a href="https://calendly.com/lennartdehaan_envoya" target="_blank" rel="noopener" class="cal-cta-btn">
      ${isNL ? 'Boek een demo om dit voor jouw pipeline te zien →' : 'Book a demo to see this for your pipeline →'}
    </a>`;

    const state = { subline, badge, badgeLabel, badgeWeekCtx, counter, calWrap, btnBack, btnNext, cta };

    btnBack.onclick = () => {
      if (currentWeek > 0) { currentWeek--; weekPill.textContent = `Week ${currentWeek + 1} / 4`; renderWeek(state, currentWeek); }
    };
    btnNext.onclick = () => {
      if (currentWeek < 3) { currentWeek++; weekPill.textContent = `Week ${currentWeek + 1} / 4`; renderWeek(state, currentWeek); }
    };

    wrapper.appendChild(subline);
    wrapper.appendChild(badgeRow);
    wrapper.appendChild(calWrap);
    wrapper.appendChild(navRow);
    wrapper.appendChild(cta);
    container.appendChild(wrapper);

    // Initial render
    weekPill.textContent = 'Week 1 / 4';
    renderWeek(state, 0);

    // Auto-play on scroll into viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !autoPlayed) {
          autoPlayed = true;
          [1, 2, 3].forEach(w => {
            setTimeout(() => {
              currentWeek = w;
              weekPill.textContent = `Week ${w + 1} / 4`;
              renderWeek(state, w);
            }, w * 1200);
          });
        }
      });
    }, { threshold: 0.3 });
    observer.observe(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
