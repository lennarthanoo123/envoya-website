/* ── Envoya Calendar Widget — Dream Outcome v3 ───────────────────────── */
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
  const HOUR_H = 52;

  const TYPE_LABELS = {
    intro:     isNL ? 'Kennismaking' : 'Intro call',
    discovery: isNL ? 'Discovery'    : 'Discovery',
    pitch:     isNL ? 'Pitch'        : 'Pitch',
    deal:      isNL ? 'Deal ✓'       : 'Deal signed ✓',
  };

  const WEEKS = [
    // Week 1 — 4 appointments (sparse)
    [
      { day: 1, hour: 10, min:  0, dur: 60, type: 'intro',     co: isNL ? 'Potentiële klant' : 'Potential client' },
      { day: 2, hour: 14, min:  0, dur: 60, type: 'intro',     co: isNL ? 'Potentiële klant' : 'Potential client' },
      { day: 3, hour: 11, min:  0, dur: 60, type: 'discovery', co: isNL ? 'Potentiële klant' : 'Potential client' },
      { day: 4, hour: 15, min:  0, dur: 60, type: 'intro',     co: isNL ? 'Potentiële klant' : 'Potential client' },
    ],
    // Week 2 — 10 appointments
    [
      { day: 0, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'ABN AMRO'     },
      { day: 0, hour: 14, min:  0, dur: 60, type: 'discovery', co: 'KPN'          },
      { day: 1, hour: 10, min:  0, dur: 60, type: 'intro',     co: 'Fabory'       },
      { day: 1, hour: 15, min:  0, dur: 60, type: 'intro',     co: 'TomTom'       },
      { day: 2, hour: 10, min:  0, dur: 60, type: 'intro',     co: 'TNO'          },
      { day: 2, hour: 14, min:  0, dur: 60, type: 'discovery', co: 'Meesman'      },
      { day: 3, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'LeasePlan'    },
      { day: 3, hour: 15, min:  0, dur: 60, type: 'pitch',     co: 'Unilever'     },
      { day: 4, hour: 10, min:  0, dur: 60, type: 'intro',     co: 'ING'          },
      { day: 4, hour: 14, min:  0, dur: 60, type: 'discovery', co: 'APG'          },
    ],
    // Week 3 — 18 appointments
    [
      { day: 0, hour:  8, min: 30, dur: 60, type: 'intro',     co: 'Zilveren Kruis' },
      { day: 0, hour: 10, min:  0, dur: 60, type: 'discovery', co: 'ABN AMRO'       },
      { day: 0, hour: 13, min: 30, dur: 60, type: 'intro',     co: 'KPN'            },
      { day: 0, hour: 15, min:  0, dur: 60, type: 'pitch',     co: 'VodafoneZiggo'  },
      { day: 1, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'Fabory'         },
      { day: 1, hour: 10, min: 30, dur: 60, type: 'discovery', co: 'ING'            },
      { day: 1, hour: 15, min:  0, dur: 60, type: 'pitch',     co: 'Unilever'       },
      { day: 2, hour:  8, min: 30, dur: 60, type: 'discovery', co: 'APG'            },
      { day: 2, hour: 10, min:  0, dur: 60, type: 'intro',     co: 'TNO'            },
      { day: 2, hour: 14, min: 30, dur: 60, type: 'discovery', co: 'SHV Energy'     },
      { day: 3, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'ECT Rotterdam'  },
      { day: 3, hour: 10, min: 30, dur: 60, type: 'discovery', co: 'LeasePlan'      },
      { day: 3, hour: 14, min:  0, dur: 60, type: 'pitch',     co: 'TomTom'         },
      { day: 3, hour: 16, min:  0, dur: 45, type: 'intro',     co: 'DFE Pharma'     },
      { day: 4, hour:  8, min: 30, dur: 60, type: 'discovery', co: 'Shuttel'        },
      { day: 4, hour: 10, min:  0, dur: 60, type: 'pitch',     co: 'BOM'            },
      { day: 4, hour: 13, min:  0, dur: 60, type: 'intro',     co: 'Mosadex'        },
      { day: 4, hour: 16, min:  0, dur: 60, type: 'intro',     co: 'Royal Swinkels' },
    ],
    // Week 4 — 28 appointments
    [
      { day: 0, hour:  8, min: 30, dur: 60, type: 'intro',     co: 'Zilveren Kruis' },
      { day: 0, hour: 10, min:  0, dur: 45, type: 'discovery', co: 'ABN AMRO'       },
      { day: 0, hour: 11, min: 30, dur: 60, type: 'pitch',     co: 'VodafoneZiggo'  },
      { day: 0, hour: 13, min: 30, dur: 60, type: 'intro',     co: 'KPN'            },
      { day: 0, hour: 15, min:  0, dur: 45, type: 'discovery', co: 'Philips'        },
      { day: 0, hour: 16, min: 30, dur: 45, type: 'intro',     co: 'NXP'            },
      { day: 1, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'Fabory'         },
      { day: 1, hour: 10, min: 30, dur: 60, type: 'discovery', co: 'ING'            },
      { day: 1, hour: 13, min:  0, dur: 90, type: 'deal',      co: 'Triodos Bank'   },
      { day: 1, hour: 15, min:  0, dur: 60, type: 'intro',     co: 'TU/e'           },
      { day: 1, hour: 16, min: 30, dur: 45, type: 'pitch',     co: 'Exact'          },
      { day: 2, hour:  8, min: 30, dur: 60, type: 'discovery', co: 'APG'            },
      { day: 2, hour: 10, min:  0, dur: 60, type: 'intro',     co: 'TNO'            },
      { day: 2, hour: 11, min: 30, dur: 60, type: 'pitch',     co: 'Unilever'       },
      { day: 2, hour: 13, min:  0, dur: 60, type: 'intro',     co: 'Meesman'        },
      { day: 2, hour: 14, min: 30, dur: 60, type: 'discovery', co: 'SHV Energy'     },
      { day: 2, hour: 16, min:  0, dur: 60, type: 'intro',     co: 'Royal Swinkels' },
      { day: 3, hour:  9, min:  0, dur: 60, type: 'intro',     co: 'ECT Rotterdam'  },
      { day: 3, hour: 10, min: 30, dur: 60, type: 'discovery', co: 'LeasePlan'      },
      { day: 3, hour: 13, min:  0, dur: 90, type: 'deal',      co: 'Philips'        },
      { day: 3, hour: 15, min:  0, dur: 60, type: 'pitch',     co: 'TomTom'         },
      { day: 3, hour: 16, min: 30, dur: 45, type: 'intro',     co: 'DFE Pharma'     },
      { day: 4, hour:  8, min: 30, dur: 60, type: 'discovery', co: 'Shuttel'        },
      { day: 4, hour: 10, min:  0, dur: 60, type: 'pitch',     co: 'BOM'            },
      { day: 4, hour: 11, min: 30, dur: 45, type: 'intro',     co: 'BAM'            },
      { day: 4, hour: 13, min:  0, dur: 90, type: 'deal',      co: 'Zilveren Kruis' },
      { day: 4, hour: 14, min: 45, dur: 60, type: 'discovery', co: 'ABN AMRO'       },
      { day: 4, hour: 16, min:  0, dur: 60, type: 'intro',     co: 'Mosadex'        },
    ],
  ];

  const WEEK_COUNTS = [4, 10, 18, 28];

  const WEEK_SUBLABELS_EN = [
    'The agent just started.',
    'Pipeline building.',
    'Calendar filling up.',
    'Every appointment booked by your agent. You just showed up.',
  ];
  const WEEK_SUBLABELS_NL = [
    'De agent is net gestart.',
    'Pipeline wordt opgebouwd.',
    'Agenda vult zich.',
    'Elke afspraak geboekt door je agent. Jij verscheen gewoon.',
  ];
  const WEEK_SUBLABELS = isNL ? WEEK_SUBLABELS_NL : WEEK_SUBLABELS_EN;

  // ── Build calendar grid ──────────────────────────────────────────────────

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

  // ── Animate counter ──────────────────────────────────────────────────────

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

  // ── Animate event cards — staggered 60ms ────────────────────────────────

  function animateEvents(container, onComplete) {
    const events = container.querySelectorAll('.cal-event-block');
    const total = events.length;
    events.forEach((ev, i) => {
      setTimeout(() => {
        ev.classList.add('show');
        if (ev.classList.contains('cal-event-deal-special')) {
          setTimeout(() => ev.classList.add('deal-pulse'), 150);
        }
        if (i === total - 1 && onComplete) {
          setTimeout(onComplete, 200);
        }
      }, i * 60);
    });
  }

  // ── Render a week ────────────────────────────────────────────────────────

  function renderWeek(state, weekIdx, onComplete) {
    const isLast = weekIdx === 3;

    // Subline — week 4 shows full sentence
    state.subline.style.display = '';
    state.subline.textContent = WEEK_SUBLABELS[weekIdx];
    state.subline.className = 'cal-dynamic-sub cal-sub-animate';
    setTimeout(() => state.subline.classList.remove('cal-sub-animate'), 400);

    // Badge pill: "Week X — [counter] appointments booked 🚀"
    state.badgeWeekCtx.textContent = `Week ${weekIdx + 1} — `;
    animateCounter(state.counter, WEEK_COUNTS[weekIdx], Math.min(WEEK_COUNTS[weekIdx] * 60, 800));
    state.badge.className = `cal-week-badge ${isLast ? 'cal-week-full' : 'cal-week-mid'}`;
    state.badgeLabel.textContent = isNL
      ? (isLast ? ' afspraken geboekt 🚀' : ' afspraken geboekt')
      : (isLast ? ' appointments booked 🚀' : ' appointments booked');

    // Week pill indicator
    state.weekPill.textContent = `Week ${weekIdx + 1} / 4`;

    // Build + animate calendar (desktop grid)
    state.calWrap.innerHTML = '';
    const cal = buildCalendar(WEEKS[weekIdx]);
    state.calWrap.appendChild(cal);
    animateEvents(cal, onComplete);

    // Build mobile stat counter view
    state.mobileList.innerHTML = '';
    const meetings = WEEKS[weekIdx];
    const dealCount = meetings.filter(m => m.type === 'deal').length;
    const dealCompanies = meetings.filter(m => m.type === 'deal');

    const statsGrid = document.createElement('div');
    statsGrid.className = 'cal-mobile-stats';

    const stats = [
      { id: 'mob-appts', num: WEEK_COUNTS[weekIdx], lbl: isNL ? 'afspraken' : 'appointments' },
      { id: 'mob-deals', num: dealCount, lbl: isNL ? 'deals getekend' : 'deals signed', deal: true },
    ];

    stats.forEach(s => {
      const cell = document.createElement('div');
      cell.className = 'cal-mobile-stat';
      const numEl = document.createElement('span');
      numEl.className = 'cal-mobile-stat-num' + (s.deal ? ' deal-num' : '');
      numEl.id = s.id;
      numEl.textContent = '0';
      const lblEl = document.createElement('span');
      lblEl.className = 'cal-mobile-stat-lbl';
      lblEl.textContent = s.lbl;
      cell.appendChild(numEl);
      cell.appendChild(lblEl);
      statsGrid.appendChild(cell);
      animateCounter(numEl, s.num, 800);
    });

    state.mobileList.appendChild(statsGrid);

    // Deal signed rows (only if any this week)
    if (dealCompanies.length > 0) {
      const dealsWrap = document.createElement('div');
      dealsWrap.className = 'cal-mobile-deals';
      dealCompanies.forEach((m, i) => {
        const row = document.createElement('div');
        row.className = 'cal-mobile-deal-row';
        row.innerHTML = `<span class="cal-mobile-deal-dot"></span><span class="cal-mobile-deal-co">${m.co}</span><span class="cal-mobile-deal-lbl">${TYPE_LABELS['deal']}</span>`;
        dealsWrap.appendChild(row);
        setTimeout(() => row.classList.add('show'), 600 + i * 200);
      });
      state.mobileList.appendChild(dealsWrap);
    }

    // Nav
    state.btnBack.style.visibility = weekIdx > 0 ? 'visible' : 'hidden';
    state.btnNext.style.display = isLast ? 'none' : 'inline-flex';

    // CTA only shown after week 4 fully completes (onComplete fires it)
    if (!isLast) state.cta.style.display = 'none';
  }

  // ── Init ─────────────────────────────────────────────────────────────────

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

    // Badge row: "Week 1 — 4 appointments booked"
    const badgeRow = document.createElement('div');
    badgeRow.className = 'cal-badge-row';
    const badge = document.createElement('span');
    badge.className = 'cal-week-badge cal-week-mid';
    const badgeWeekCtx = document.createElement('span');
    badgeWeekCtx.className = 'cal-badge-ctx';
    badgeWeekCtx.textContent = 'Week 1 — ';
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

    // Calendar container (desktop grid + mobile list)
    const calWrap = document.createElement('div');
    const mobileList = document.createElement('div');
    mobileList.className = 'cal-mobile-list';

    // Nav row
    const navRow = document.createElement('div');
    navRow.className = 'cal-nav-row';

    const btnBack = document.createElement('button');
    btnBack.className = 'cal-nav-btn';
    btnBack.innerHTML = isNL ? '← Vorige week' : '← Previous week';
    btnBack.style.visibility = 'hidden';

    const weekPill = document.createElement('span');
    weekPill.className = 'cal-week-pill';
    weekPill.textContent = 'Week 1 / 4';

    const btnNext = document.createElement('button');
    btnNext.className = 'cal-nav-btn cal-nav-btn--primary';
    btnNext.innerHTML = isNL ? 'Volgende week →' : 'Next week →';

    navRow.appendChild(btnBack);
    navRow.appendChild(weekPill);
    navRow.appendChild(btnNext);

    // CTA — hidden until week 4 fully completes
    const cta = document.createElement('div');
    cta.className = 'cal-cta-row';
    cta.style.display = 'none';
    cta.innerHTML = `<a href="https://calendly.com/lennartdehaan_envoya" target="_blank" rel="noopener" class="cal-cta-btn">
      ${isNL ? 'Boek een demo om dit voor jouw pipeline te zien →' : 'Book a demo to see this for your pipeline →'}
    </a>`;

    const state = { subline, badge, badgeLabel, badgeWeekCtx, counter, calWrap, mobileList, btnBack, btnNext, weekPill, cta };

    btnBack.onclick = () => {
      if (currentWeek > 0) { currentWeek--; cta.style.display = 'none'; renderWeek(state, currentWeek); }
    };
    btnNext.onclick = () => {
      if (currentWeek < 3) { currentWeek++; renderWeek(state, currentWeek, currentWeek === 3 ? () => { cta.style.display = 'block'; } : null); }
    };

    wrapper.appendChild(subline);
    wrapper.appendChild(badgeRow);
    wrapper.appendChild(calWrap);
    wrapper.appendChild(mobileList);
    wrapper.appendChild(navRow);
    wrapper.appendChild(cta);
    container.appendChild(wrapper);

    // Initial render — week 1
    renderWeek(state, 0);

    // Auto-play on scroll into viewport (fires once)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !autoPlayed) {
          autoPlayed = true;
          // Advance week by week with 1.2s gap between transitions
          [1, 2, 3].forEach(w => {
            setTimeout(() => {
              currentWeek = w;
              const isLastWeek = w === 3;
              renderWeek(state, w, isLastWeek ? () => { cta.style.display = 'block'; } : null);
            }, w * 1200);
          });
        }
      });
    }, { threshold: 0.25 });
    observer.observe(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
