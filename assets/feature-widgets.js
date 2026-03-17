/* feature-widgets.js — Clay-style product UI widgets for Envoya feature blocks */
(function () {
  'use strict';

  var isNL = window.location.pathname.startsWith('/nl');

  /* ─── Utility ─────────────────────────────────────────── */

  function el(tag, styles, attrs) {
    var e = document.createElement(tag);
    if (styles) Object.assign(e.style, styles);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'html') e.innerHTML = attrs[k];
        else if (k === 'text') e.textContent = attrs[k];
        else if (k === 'class') e.className = attrs[k];
        else e.setAttribute(k, attrs[k]);
      });
    }
    return e;
  }

  function countUp(elRef, from, to, duration, decimals, prefix) {
    prefix = prefix || '';
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = from + (to - from) * eased;
      elRef.textContent = prefix + val.toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function observe(id, threshold, cb) {
    var target = document.getElementById(id);
    if (!target) return;
    var fired = false;
    function fire() {
      if (fired) return;
      fired = true;
      setTimeout(function () {
        try { cb(target); } catch(e) { console.error('[fw] widget error:', e); }
      }, 200);
    }
    if (!window.IntersectionObserver) { fire(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        io.unobserve(target);
        fire();
      }
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    io.observe(target);
    setTimeout(function () {
      var rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0 && target.children.length === 0) {
        fire();
      }
    }, 1500);
    setTimeout(function () {
      if (target.children.length === 0) { fire(); }
    }, 3000);
  }

  var BASE = {
    fontFamily: 'Inter, -apple-system, sans-serif'
  };

  /* ════════════════════════════════════════════════════════
     WIDGET 1 — Lead Search UI (Block 1, indigo bg #EEF2FF)
  ════════════════════════════════════════════════════════ */
  function buildLeadWidget(container) {
    var isMobile = window.innerWidth <= 900;
    container.style.cssText = 'width:100%;' + (isMobile ? 'height:auto;' : 'height:100%;') + 'display:flex;align-items:stretch;padding:20px;box-sizing:border-box;';

    var wrap = el('div', {
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    });

    /* ── Search bar ── */
    var searchBar = el('div', {
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '9px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    });
    var spinner = el('div', { flexShrink: '0' });
    spinner.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:fwSpin 0.9s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>';
    var searchText = el('div', {
      fontFamily: BASE.fontFamily,
      fontSize: '12px',
      color: '#6366f1',
      fontWeight: '600',
      flex: '1'
    }, { text: 'Searching 275M+ contacts...' });
    var searchDots = el('div', {
      fontFamily: BASE.fontFamily,
      fontSize: '12px',
      color: '#a5b4fc',
      animation: 'fwBlink 1.2s ease-in-out infinite'
    }, { text: '●●●' });
    searchBar.appendChild(spinner);
    searchBar.appendChild(searchText);
    searchBar.appendChild(searchDots);
    wrap.appendChild(searchBar);

    /* ── Filter chips ── */
    var chipsRow = el('div', {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap'
    });
    var chips = [
      { label: 'Head of Digital ★★★★★', bg: '#EEF2FF', color: '#4338ca', border: '#c7d2fe' },
      { label: 'B2B · NL · 50-500 FTE',  bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' },
      { label: 'Recent signal ✓',         bg: '#ECFDF5', color: '#059669', border: '#6ee7b7' }
    ];
    chips.forEach(function (c) {
      var chip = el('div', {
        background: c.bg,
        color: c.color,
        border: '1px solid ' + c.border,
        borderRadius: '99px',
        padding: '4px 10px',
        fontSize: '10px',
        fontWeight: '700',
        fontFamily: BASE.fontFamily,
        whiteSpace: 'nowrap'
      }, { text: c.label });
      chipsRow.appendChild(chip);
    });
    wrap.appendChild(chipsRow);

    /* ── Lead rows ── */
    var leads = [
      { abbr: 'DU', abbrColor: '#6366f1', co: 'DUO',           person: 'Roos Ubbink',    score: 92, scoreColor: '#22c55e' },
      { abbr: 'TB', abbrColor: '#059669', co: 'Triodos Bank',   person: 'Mark de Vries',  score: 88, scoreColor: '#22c55e' },
      { abbr: 'AB', abbrColor: '#f59e0b', co: 'ABN AMRO',       person: 'Lotte Jansen',   score: 74, scoreColor: '#f59e0b' }
    ];

    var leadRows = [];
    leads.forEach(function (lead) {
      var row = el('div', {
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        opacity: '0',
        transform: 'translateY(6px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease'
      });

      /* Logo circle */
      var logo = el('div', {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: lead.abbrColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: BASE.fontFamily,
        fontSize: '11px',
        fontWeight: '800',
        color: '#fff',
        flexShrink: '0'
      }, { text: lead.abbr });

      /* Name/company */
      var info = el('div', { flex: '1', minWidth: '0' });
      var coName = el('div', {
        fontFamily: BASE.fontFamily,
        fontSize: '12px',
        fontWeight: '700',
        color: '#0f172a',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }, { text: lead.co });
      var personName = el('div', {
        fontFamily: BASE.fontFamily,
        fontSize: '10px',
        color: '#64748b',
        marginTop: '1px'
      }, { text: lead.person });
      info.appendChild(coName);
      info.appendChild(personName);

      /* Score area */
      var scoreArea = el('div', {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '4px',
        flexShrink: '0',
        minWidth: '60px'
      });
      var scoreNum = el('div', {
        fontFamily: BASE.fontFamily,
        fontSize: '13px',
        fontWeight: '800',
        color: lead.scoreColor
      }, { text: lead.score + '/100' });
      var barBg = el('div', {
        width: '56px',
        height: '4px',
        background: '#f1f5f9',
        borderRadius: '99px',
        overflow: 'hidden'
      });
      var barFg = el('div', {
        height: '100%',
        width: '0%',
        background: lead.scoreColor,
        borderRadius: '99px',
        transition: 'width 1s cubic-bezier(0.165,0.84,0.44,1)'
      });
      barBg.appendChild(barFg);
      scoreArea.appendChild(scoreNum);
      scoreArea.appendChild(barBg);

      row.appendChild(logo);
      row.appendChild(info);
      row.appendChild(scoreArea);
      wrap.appendChild(row);
      leadRows.push({ row: row, barFg: barFg, score: lead.score });
    });

    /* ── Footer ── */
    var footer = el('div', {
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '8px 12px',
      fontFamily: BASE.fontFamily,
      fontSize: '11px',
      color: '#4338ca',
      fontWeight: '700',
      textAlign: 'center',
      opacity: '0',
      transition: 'opacity 0.5s ease'
    }, { text: '↑ 847 leads found · Top 84 match your ICP' });
    wrap.appendChild(footer);

    container.appendChild(wrap);

    /* Animate */
    leadRows.forEach(function (item, i) {
      setTimeout(function () {
        item.row.style.opacity = '1';
        item.row.style.transform = 'translateY(0)';
        setTimeout(function () {
          item.barFg.style.width = item.score + '%';
        }, 80);
      }, 300 + i * 150);
    });
    setTimeout(function () { footer.style.opacity = '1'; }, 900);
  }

  /* ════════════════════════════════════════════════════════
     WIDGET 2 — Email Compose UI (Block 2, amber bg #FFFBEB)
  ════════════════════════════════════════════════════════ */
  function buildEmailWidget(container) {
    var isMobile = window.innerWidth <= 900;
    container.style.cssText = 'width:100%;' + (isMobile ? 'height:auto;' : 'height:100%;') + 'display:flex;align-items:stretch;padding:20px;box-sizing:border-box;';

    /* Outer compose window */
    var win = el('div', {
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    });

    /* Window chrome bar */
    var chrome = el('div', {
      background: '#f8fafc',
      borderBottom: '1px solid #e2e8f0',
      padding: '8px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    });
    ['#ff5f57','#ffbd2e','#28ca41'].forEach(function (c) {
      chrome.appendChild(el('div', { width: '9px', height: '9px', borderRadius: '50%', background: c, flexShrink: '0' }));
    });
    var winTitle = el('div', {
      fontFamily: BASE.fontFamily,
      fontSize: '11px',
      fontWeight: '600',
      color: '#64748b',
      marginLeft: '6px',
      flex: '1'
    }, { text: 'Nieuw bericht' });
    var aiBadge = el('div', {
      background: '#f59e0b',
      color: '#fff',
      borderRadius: '99px',
      padding: '2px 8px',
      fontSize: '9px',
      fontWeight: '800',
      fontFamily: BASE.fontFamily,
      whiteSpace: 'nowrap'
    }, { text: '✦ AI' });
    chrome.appendChild(winTitle);
    chrome.appendChild(aiBadge);
    win.appendChild(chrome);

    /* Header fields */
    var fields = nl ? [
      ['Van', 'lennart@envoya.tech'],
      ['Aan', 'roos.ubbink@duo.nl'],
      ['Onderwerp', 'Korte kennismaking — AI × DUO']
    ] : [
      ['From', 'lennart@envoya.tech'],
      ['To', 'roos.ubbink@duo.nl'],
      ['Subject', 'Quick introduction — Brush AI × DUO']
    ];
    fields.forEach(function (f, i, arr) {
      var row = el('div', {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px',
        borderBottom: i < arr.length - 1 ? '1px solid #f8fafc' : '1px solid #e2e8f0'
      });
      var label = el('div', {
        fontFamily: BASE.fontFamily,
        fontSize: '10px',
        fontWeight: '700',
        color: '#94a3b8',
        width: '56px',
        flexShrink: '0'
      }, { text: f[0] });
      var value = el('div', {
        fontFamily: BASE.fontFamily,
        fontSize: '11px',
        color: '#334155'
      }, { text: f[1] });
      row.appendChild(label);
      row.appendChild(value);
      win.appendChild(row);
    });

    /* Body */
    var body = el('div', {
      padding: '10px 12px',
      fontFamily: BASE.fontFamily,
      fontSize: '11.5px',
      color: '#1e293b',
      lineHeight: '1.65',
      flex: '1',
      overflow: 'hidden',
      minHeight: isMobile ? '80px' : 'unset'
    });
    win.appendChild(body);

    /* Signal badge */
    var badge = el('div', {
      margin: '0 12px 10px',
      background: '#ECFDF5',
      border: '1px solid #6ee7b7',
      color: '#059669',
      borderRadius: '99px',
      padding: '5px 12px',
      fontSize: '10px',
      fontWeight: '700',
      fontFamily: BASE.fontFamily,
      display: 'inline-block',
      opacity: '0',
      transition: 'opacity 0.5s ease',
      whiteSpace: 'nowrap'
    }, { text: '📡 Pattern A · Signal: Emerce eDay · Confidence 94%' });
    win.appendChild(badge);

    container.appendChild(win);

    /* Typewriter segments */
    var segs = nl ? [
      { t: 'text', c: 'Hi Roos,\n\nIk zag je ' },
      { t: 'hl',   c: 'presentatie op de Emerce eDay' },
      { t: 'text', c: ' over AI in de publieke sector.\n\nBij Brush AI helpen we ' },
      { t: 'hl',   c: 'Triodos Bank, APG en TNO' },
      { t: 'text', c: ' al met AI die echt waarde levert. Mijn collega ' },
      { t: 'hl',   c: 'Noëlle Cicilia' },
      { t: 'text', c: ' zou graag kort kennismaken.' }
    ] : [
      { t: 'text', c: 'Hi Roos,\n\nI saw your ' },
      { t: 'hl',   c: 'talk at Emerce eDay' },
      { t: 'text', c: ' on AI in the public sector — great timing for a quick note.\n\nAt Brush AI we help ' },
      { t: 'hl',   c: 'Triodos Bank, APG and TNO' },
      { t: 'text', c: ' get real value from AI. My colleague ' },
      { t: 'hl',   c: 'Noëlle Cicilia' },
      { t: 'text', c: ' would love to connect briefly.' }
    ];

    var bodySpan = el('span');
    body.appendChild(bodySpan);

    function renderSegs(list, onDone) {
      var i = 0;
      function next() {
        if (i >= list.length) { onDone && onDone(); return; }
        var s = list[i++];
        if (s.t === 'hl') {
          var hl = el('span', {
            background: 'rgba(99,102,241,0.12)',
            color: '#4f46e5',
            borderRadius: '3px',
            padding: '1px 4px',
            fontWeight: '700',
            fontSize: '11.5px'
          }, { text: s.c });
          bodySpan.appendChild(hl);
          setTimeout(next, 60);
        } else {
          typeText(s.c, bodySpan, next);
        }
      }
      next();
    }

    function typeText(text, parent, cb) {
      var i = 0;
      function tick() {
        if (i >= text.length) { cb && cb(); return; }
        var ch = text[i++];
        if (ch === '\n') { parent.appendChild(document.createElement('br')); }
        else { parent.appendChild(document.createTextNode(ch)); }
        setTimeout(tick, 16);
      }
      tick();
    }

    renderSegs(segs, function () {
      setTimeout(function () { badge.style.opacity = '1'; }, 300);
    });
  }

  /* ════════════════════════════════════════════════════════
     WIDGET 3 — Calendar/Agenda UI (Block 3, emerald bg #ECFDF5)
  ════════════════════════════════════════════════════════ */
  function buildCalWidget(container) {
    var nl = isNL;
    var isMobile = window.innerWidth <= 900;
    container.style.cssText = 'width:100%;' + (isMobile ? 'height:auto;' : 'height:100%;') + 'display:flex;align-items:stretch;padding:20px;box-sizing:border-box;';

    var wrap = el('div', {
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    });

    /* Header */
    var header = el('div', {
      background: '#f8fafc',
      borderBottom: '1px solid #e2e8f0',
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    });
    var headerTitle = el('div', {
      fontFamily: BASE.fontFamily,
      fontSize: '12px',
      fontWeight: '700',
      color: '#0f172a'
    }, { text: nl ? 'Mijn agenda — Week 4' : 'My Calendar — Week 4' });
    var meetingBadge = el('div', {
      background: '#ECFDF5',
      color: '#059669',
      border: '1px solid #6ee7b7',
      borderRadius: '99px',
      padding: '3px 10px',
      fontSize: '11px',
      fontWeight: '700',
      fontFamily: BASE.fontFamily,
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    });
    var counterSpan = el('span', {}, { text: '0' });
    meetingBadge.appendChild(counterSpan);
    meetingBadge.appendChild(document.createTextNode(nl ? ' afspraken' : ' meetings'));
    header.appendChild(headerTitle);
    header.appendChild(meetingBadge);
    wrap.appendChild(header);

    /* Meeting rows */
    var meetings = [
      { time: '09:00', day: nl ? 'Ma' : 'Mon', company: 'VodafoneZiggo', type: nl ? 'Kennismaking' : 'Intro call',    color: '#4285f4' },
      { time: '10:30', day: nl ? 'Di' : 'Tue', company: 'ABN AMRO',       type: 'Discovery',                          color: '#7986cb' },
      { time: '13:00', day: nl ? 'Ma' : 'Mon', company: 'Triodos Bank',   type: nl ? 'Deal getekend ✓' : 'Deal signed ✓', color: '#22c55e', deal: true },
      { time: '14:00', day: nl ? 'Di' : 'Tue', company: 'Philips',         type: 'Pitch',                              color: '#f59e0b' },
      { time: '09:30', day: nl ? 'Wo' : 'Wed', company: 'Alliander',       type: nl ? 'Kennismaking' : 'Intro call',  color: '#4285f4' },
      { time: '11:00', day: nl ? 'Do' : 'Thu', company: 'ASML',            type: 'Discovery',                          color: '#7986cb' }
    ];

    var rows = [];
    meetings.forEach(function (m) {
      var row = el('div', {
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        borderBottom: '1px solid #f8fafc',
        opacity: '0',
        transform: 'translateY(5px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease'
      });

      /* Time column */
      var timeCol = el('div', {
        width: '56px',
        flexShrink: '0',
        padding: '8px 10px 8px 14px',
        textAlign: 'right'
      });
      var dayLbl = el('div', {
        fontFamily: BASE.fontFamily,
        fontSize: '9px',
        fontWeight: '700',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.04em'
      }, { text: m.day });
      var timeLbl = el('div', {
        fontFamily: BASE.fontFamily,
        fontSize: '11px',
        fontWeight: '600',
        color: '#475569'
      }, { text: m.time });
      timeCol.appendChild(dayLbl);
      timeCol.appendChild(timeLbl);

      /* Event block */
      var block = el('div', {
        flex: '1',
        background: m.color,
        margin: '5px 12px 5px 0',
        borderRadius: '6px',
        padding: '7px 11px',
        minHeight: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      });
      var isDark = m.color === '#f59e0b';
      var coName = el('div', {
        fontFamily: BASE.fontFamily,
        fontSize: '11px',
        fontWeight: '700',
        color: isDark ? '#1a1000' : '#fff',
        lineHeight: '1.2'
      }, { text: m.company });
      var typeLbl = el('div', {
        fontFamily: BASE.fontFamily,
        fontSize: '9px',
        color: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)',
        marginTop: '2px'
      }, { text: m.type });
      block.appendChild(coName);
      block.appendChild(typeLbl);
      if (m.deal) { row.dataset.deal = '1'; }

      row.appendChild(timeCol);
      row.appendChild(block);
      wrap.appendChild(row);
      rows.push(row);
    });

    container.appendChild(wrap);

    countUp(counterSpan, 0, 28, 1200, 0);

    rows.forEach(function (row, i) {
      setTimeout(function () {
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
        if (row.dataset.deal) {
          setTimeout(function () {
            var block = row.querySelector('div[style*="#22c55e"]');
            if (block) {
              block.style.boxShadow = '0 0 14px rgba(34,197,94,0.4)';
              setTimeout(function () { block.style.boxShadow = '0 0 4px rgba(34,197,94,0.15)'; }, 500);
            }
          }, 300);
        }
      }, 350 + i * 110);
    });
  }

  /* ════════════════════════════════════════════════════════
     WIDGET 4 — Learning Dashboard UI (Block 4, rose bg #FFF1F2)
  ════════════════════════════════════════════════════════ */
  function buildLearnWidget(container) {
    var nl = isNL;
    var isMobile = window.innerWidth <= 900;
    container.style.cssText = 'width:100%;' + (isMobile ? 'height:auto;' : 'height:100%;') + 'display:flex;align-items:stretch;padding:20px;box-sizing:border-box;';

    var wrap = el('div', {
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      width: '100%',
      boxSizing: 'border-box',
      padding: '16px 16px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    });

    /* Title row */
    var titleRow = el('div', {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    });
    var title = el('div', {
      fontFamily: BASE.fontFamily,
      fontSize: '11px',
      fontWeight: '800',
      color: '#0f172a',
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }, { text: 'Customer DNA' });
    var liveBadge = el('div', {
      background: '#FFF1F2',
      color: '#e11d48',
      border: '1px solid #fecdd3',
      borderRadius: '99px',
      padding: '2px 8px',
      fontSize: '9px',
      fontWeight: '800',
      fontFamily: BASE.fontFamily
    }, { text: '● LIVE' });
    titleRow.appendChild(title);
    titleRow.appendChild(liveBadge);
    wrap.appendChild(titleRow);

    /* Bar stats */
    var stats = [
      { label: nl ? 'Head of Digital' : 'Head of Digital', pct: 87, color: '#6366f1' },
      { label: nl ? 'Finance sector'  : 'Finance sector',  pct: 72, color: '#f59e0b' },
      { label: 'Pattern A',                                 pct: 94, color: '#22c55e' }
    ];

    var barItems = [];
    stats.forEach(function (s) {
      var row = el('div', {
        opacity: '0',
        transform: 'translateY(6px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease'
      });

      var topRow = el('div', {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5px'
      });
      var lbl = el('div', {
        fontFamily: BASE.fontFamily,
        fontSize: '11px',
        color: '#334155',
        fontWeight: '600'
      }, { text: s.label });
      var pctLbl = el('div', {
        fontFamily: BASE.fontFamily,
        fontSize: '12px',
        fontWeight: '800',
        color: s.color
      }, { text: '0%' });
      topRow.appendChild(lbl);
      topRow.appendChild(pctLbl);
      row.appendChild(topRow);

      var barBg = el('div', {
        background: '#f1f5f9',
        borderRadius: '99px',
        height: '6px',
        overflow: 'hidden'
      });
      var barFg = el('div', {
        height: '100%',
        width: '0%',
        background: s.color,
        borderRadius: '99px',
        transition: 'width 1.2s cubic-bezier(0.165,0.84,0.44,1)'
      });
      barBg.appendChild(barFg);
      row.appendChild(barBg);
      wrap.appendChild(row);
      barItems.push({ row: row, barFg: barFg, pctLbl: pctLbl, pct: s.pct });
    });

    /* Chip row */
    var chipRow = el('div', {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
      opacity: '0',
      transition: 'opacity 0.5s ease'
    });
    [
      { text: '+2.3% this week', bg: '#ECFDF5', color: '#059669', border: '#6ee7b7' },
      { text: '↑ Improving',      bg: '#EEF2FF', color: '#4338ca', border: '#c7d2fe' }
    ].forEach(function (c) {
      chipRow.appendChild(el('div', {
        background: c.bg,
        color: c.color,
        border: '1px solid ' + c.border,
        borderRadius: '99px',
        padding: '4px 10px',
        fontSize: '10px',
        fontWeight: '700',
        fontFamily: BASE.fontFamily,
        whiteSpace: 'nowrap'
      }, { text: c.text }));
    });
    wrap.appendChild(chipRow);

    /* ICP confidence row with mini circular indicator */
    var icpRow = el('div', {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#FFF1F2',
      border: '1px solid #fecdd3',
      borderRadius: '8px',
      padding: '8px 12px',
      opacity: '0',
      transition: 'opacity 0.5s ease'
    });
    var icpLabel = el('div', {
      fontFamily: BASE.fontFamily,
      fontSize: '11px',
      fontWeight: '700',
      color: '#e11d48'
    }, { text: 'ICP Confidence' });
    var icpPct = el('div', {
      fontFamily: BASE.fontFamily,
      fontSize: '16px',
      fontWeight: '800',
      color: '#e11d48'
    }, { text: '0%' });
    icpRow.appendChild(icpLabel);
    icpRow.appendChild(icpPct);
    wrap.appendChild(icpRow);

    container.appendChild(wrap);

    /* Animate bars */
    barItems.forEach(function (item, i) {
      setTimeout(function () {
        item.row.style.opacity = '1';
        item.row.style.transform = 'translateY(0)';
        setTimeout(function () {
          item.barFg.style.width = item.pct + '%';
          countUp(item.pctLbl, 0, item.pct, 1000, 0);
          setTimeout(function () { item.pctLbl.textContent = item.pct + '%'; }, 1020);
        }, 50);
      }, 200 + i * 280);
    });

    var afterBars = 200 + barItems.length * 280 + 400;
    setTimeout(function () { chipRow.style.opacity = '1'; }, afterBars);
    setTimeout(function () {
      icpRow.style.opacity = '1';
      countUp(icpPct, 0, 87, 900, 0);
      setTimeout(function () { icpPct.textContent = '87%'; }, 920);
    }, afterBars + 300);
  }

  /* ─── Keyframes ────────────────────────────────────────── */
  function injectKeyframes() {
    if (document.getElementById('fw-keyframes')) return;
    var style = document.createElement('style');
    style.id = 'fw-keyframes';
    style.textContent = [
      '@keyframes fwSpin {',
      '  from { transform: rotate(0deg); }',
      '  to   { transform: rotate(360deg); }',
      '}',
      '@keyframes fwBlink {',
      '  0%,100% { opacity: 1; }',
      '  50%      { opacity: 0.3; }',
      '}',
      '@keyframes fwPulse {',
      '  0%,100% { opacity:1; transform:scale(1); }',
      '  50%      { opacity:0.6; transform:scale(0.95); }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ─── Init ─────────────────────────────────────────────── */
  function init() {
    injectKeyframes();
    observe('fw-lead',  0.05, function (e) { buildLeadWidget(e);  });
    observe('fw-email', 0.05, function (e) { buildEmailWidget(e); });
    observe('fw-cal',   0.05, function (e) { buildCalWidget(e);   });
    observe('fw-learn', 0.05, function (e) { buildLearnWidget(e); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
