/* feature-widgets.js — Live animated widgets for Envoya feature blocks */
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

  function countUp(el, from, to, duration, decimals, prefix) {
    prefix = prefix || '';
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = from + (to - from) * eased;
      el.textContent = prefix + val.toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function observe(id, threshold, cb) {
    var target = document.getElementById(id);
    if (!target) return;
    if (!window.IntersectionObserver) { cb(target); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        io.unobserve(target);
        setTimeout(function () { cb(target); }, 200);
      }
    }, { threshold: threshold });
    io.observe(target);
  }

  /* ════════════════════════════════════════════════════════
     WIDGET 1 — Lead Intelligence
  ════════════════════════════════════════════════════════ */
  function buildLeadWidget(container) {
    container.style.cssText = 'width:100%;height:100%;min-height:280px;display:flex;align-items:stretch;';

    var card = el('div', {
      background: '#0c1220',
      borderRadius: '14px',
      padding: '20px',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      position: 'relative',
      overflow: 'hidden'
    });

    /* Avatar + info row */
    var topRow = el('div', { display: 'flex', alignItems: 'center', gap: '12px' });

    var avatar = document.createElement('img');
    avatar.src = '/assets/roos-ubbink.jpg';
    avatar.alt = 'Roos Ubbink';
    avatar.style.width = '44px';
    avatar.style.height = '44px';
    avatar.style.borderRadius = '50%';
    avatar.style.objectFit = 'cover';
    avatar.style.objectPosition = 'center top';
    avatar.style.flexShrink = '0';
    avatar.style.border = '2px solid rgba(99,102,241,0.4)';

    var info = el('div', { flex: '1' });
    var name = el('div', {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '15px',
      fontWeight: '700',
      color: '#f1f5f9',
      lineHeight: '1.2'
    }, { text: 'Roos Ubbink' });
    var role = el('div', {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '12px',
      color: '#94a3b8',
      marginTop: '2px'
    }, { text: 'Head of Digital · DUO · 850 medewerkers' });
    info.appendChild(name);
    info.appendChild(role);
    topRow.appendChild(avatar);
    topRow.appendChild(info);
    card.appendChild(topRow);

    /* ICP Score row */
    var scoreRow = el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' });
    var scoreLabel = el('div', {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '11px',
      fontWeight: '600',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }, { text: 'ICP Score' });
    var scoreNum = el('div', {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '26px',
      fontWeight: '800',
      color: '#818cf8'
    }, { text: '0' });
    scoreRow.appendChild(scoreLabel);
    scoreRow.appendChild(scoreNum);
    card.appendChild(scoreRow);

    /* ICP annotation */
    var scoreAnnotation = el('div', {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '11px', fontWeight: '600', color: '#6366F1', marginBottom: '4px'
    }, { text: nl ? 'Alleen scores 80+ komen door' : 'Only 80+ scores enter your pipeline' });
    card.appendChild(scoreAnnotation);

    /* Progress bar */
    var barBg = el('div', {
      background: '#1e293b',
      borderRadius: '99px',
      height: '8px',
      overflow: 'hidden',
      width: '100%'
    });
    var barFg = el('div', {
      background: 'linear-gradient(90deg, #4f46e5, #818cf8)',
      height: '100%',
      width: '0%',
      borderRadius: '99px',
      transition: 'width 1.6s cubic-bezier(0.165,0.84,0.44,1)'
    });
    barBg.appendChild(barFg);
    card.appendChild(barBg);

    /* Tags */
    var tagsRow = el('div', { display: 'flex', gap: '8px', flexWrap: 'wrap' });
    var t1 = el('div', {
      background: 'rgba(79,70,229,0.18)',
      color: '#818cf8',
      borderRadius: '99px',
      padding: '4px 12px',
      fontSize: '11px',
      fontWeight: '600',
      fontFamily: 'Inter, -apple-system, sans-serif'
    }, { text: 'Head of Digital ★★★★★' });
    var t2 = el('div', {
      background: 'rgba(245,158,11,0.18)',
      color: '#fbbf24',
      borderRadius: '99px',
      padding: '4px 12px',
      fontSize: '11px',
      fontWeight: '600',
      fontFamily: 'Inter, -apple-system, sans-serif'
    }, { text: 'Overheid ★★★★' });
    tagsRow.appendChild(t1);
    tagsRow.appendChild(t2);
    card.appendChild(tagsRow);

    /* Signal box */
    var signalBox = el('div', {
      background: 'rgba(79,70,229,0.10)',
      border: '1px solid rgba(79,70,229,0.25)',
      borderRadius: '10px',
      padding: '12px 14px',
      opacity: '0',
      transition: 'opacity 0.6s ease',
      marginTop: '2px'
    });

    var sigHeader = el('div', { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' });

    var dot = el('div', {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#4f46e5',
      flexShrink: '0',
      animation: 'fwPulse 1.8s ease-in-out infinite'
    });
    var sigTitle = el('div', {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '11px',
      fontWeight: '700',
      color: '#818cf8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }, { text: '📡 Signal detected · Pattern A' });
    sigHeader.appendChild(dot);
    sigHeader.appendChild(sigTitle);

    var sigQuote = el('div', {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '12px',
      color: '#cbd5e1',
      fontStyle: 'italic',
      lineHeight: '1.5',
      marginBottom: '4px'
    }, { text: '"Roos sprak op de Emerce eDay over AI in de publieke sector — 14 mrt 2026."' });

    var sigSource = el('div', {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '11px',
      color: '#64748b'
    }, { text: '→ Bron: Emerce.nl' });

    signalBox.appendChild(sigHeader);
    signalBox.appendChild(sigQuote);
    signalBox.appendChild(sigSource);
    card.appendChild(signalBox);

    container.appendChild(card);

    /* Animate */
    countUp(scoreNum, 0, 92, 1400, 0);
    setTimeout(function () { barFg.style.width = '92%'; }, 50);
    setTimeout(function () { signalBox.style.opacity = '1'; }, 1800);
  }

  /* ════════════════════════════════════════════════════════
     WIDGET 2 — Email Writer
  ════════════════════════════════════════════════════════ */
  function buildEmailWidget(container) {
    container.style.cssText = 'width:100%;height:100%;min-height:280px;display:flex;align-items:stretch;';

    var win = el('div', {
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.10)'
    });

    /* Top bar */
    var topBar = el('div', {
      background: '#f8fafc',
      borderBottom: '1px solid #e2e8f0',
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    });

    var dots = el('div', { display: 'flex', gap: '5px' });
    [['#ff5f57'], ['#ffbd2e'], ['#28ca41']].forEach(function (c) {
      dots.appendChild(el('div', {
        width: '10px', height: '10px', borderRadius: '50%', background: c[0], flexShrink: '0'
      }));
    });
    dots.style.flexShrink = '0';

    var title = el('div', {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '12px',
      fontWeight: '600',
      color: '#475569',
      flex: '1'
    }, { text: 'New email — Roos Ubbink · DUO' });

    var aiBadge = el('div', {
      background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
      color: '#fff',
      borderRadius: '99px',
      padding: '3px 10px',
      fontSize: '10px',
      fontWeight: '700',
      fontFamily: 'Inter, -apple-system, sans-serif',
      animation: 'fwPulse 2s ease-in-out infinite',
      whiteSpace: 'nowrap'
    }, { text: 'AI writing' });

    topBar.appendChild(dots);
    topBar.appendChild(title);
    topBar.appendChild(aiBadge);
    win.appendChild(topBar);

    /* Meta rows */
    [
      ['Van', 'lennart@envoya.tech'],
      ['Aan', 'roos.ubbink@duo.nl'],
      ['Onderwerp', 'Korte kennismaking — Brush AI × DUO']
    ].forEach(function (row, i, arr) {
      var r = el('div', {
        display: 'flex',
        gap: '8px',
        padding: '8px 14px',
        borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none',
        alignItems: 'center'
      });
      var label = el('div', {
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontSize: '11px',
        fontWeight: '600',
        color: '#94a3b8',
        width: '60px',
        flexShrink: '0'
      }, { text: row[0] });
      var value = el('div', {
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontSize: '12px',
        color: '#334155'
      }, { text: row[1] });
      r.appendChild(label);
      r.appendChild(value);
      win.appendChild(r);
    });

    /* Body area — fixed height, overflow hidden so typing doesn't push layout */
    var body = el('div', {
      padding: '12px 14px',
      flex: '1',
      overflow: 'hidden',
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '12.5px',
      color: '#1e293b',
      lineHeight: '1.6',
      position: 'relative'
    });
    win.appendChild(body);

    /* Confidence badge (hidden initially) */
    var confBadge = el('div', {
      margin: '8px 14px 12px',
      background: 'rgba(16,185,129,0.1)',
      border: '1px solid rgba(16,185,129,0.3)',
      color: '#10b981',
      borderRadius: '99px',
      padding: '5px 14px',
      fontSize: '11px',
      fontWeight: '700',
      fontFamily: 'Inter, -apple-system, sans-serif',
      display: 'inline-block',
      opacity: '0',
      transition: 'opacity 0.5s ease'
    }, { text: '✓ Pattern A — Personal signal · Confidence: 94%' });
    win.appendChild(confBadge);

    container.appendChild(win);

    /* Typewriter */
    var segments = [
      { type: 'text', content: 'Hi Roos,\n\nIk zag je ' },
      { type: 'highlight', content: 'presentatie op de Emerce eDay' },
      { type: 'text', content: ' over AI in de publieke sector — mooie aanleiding.\n\nBij Brush AI helpen we ' },
      { type: 'highlight', content: 'Triodos Bank, APG en TNO' },
      { type: 'text', content: ' met AI die echt waarde levert.\n\nMijn collega ' },
      { type: 'highlight', content: 'Noëlle Cicilia' },
      { type: 'text', content: ', AI Person of the Year, zou graag kort kennismaken.\n\nSta je open voor een korte, inhoudelijke kennismaking?' }
    ];

    var bodySpan = el('span');
    body.appendChild(bodySpan);

    function renderSegments(segs, onDone) {
      var i = 0;
      function next() {
        if (i >= segs.length) { onDone && onDone(); return; }
        var seg = segs[i++];
        if (seg.type === 'highlight') {
          var hl = el('span', {
            background: 'rgba(79,70,229,0.12)',
            color: '#4f46e5',
            borderRadius: '4px',
            padding: '1px 5px',
            fontWeight: '600',
            fontSize: '12.5px'
          }, { text: seg.content });
          bodySpan.appendChild(hl);
          setTimeout(next, 80);
        } else {
          typeText(seg.content, bodySpan, next);
        }
      }
      next();
    }

    function typeText(text, parent, cb) {
      var i = 0;
      function tick() {
        if (i >= text.length) { cb && cb(); return; }
        var ch = text[i++];
        if (ch === '\n') {
          parent.appendChild(document.createElement('br'));
        } else {
          parent.appendChild(document.createTextNode(ch));
        }
        setTimeout(tick, 18);
      }
      tick();
    }

    renderSegments(segments, function () {
      setTimeout(function () { confBadge.style.opacity = '1'; }, 400);
    });
  }

  /* ════════════════════════════════════════════════════════
     WIDGET 3 — Calendar
  ════════════════════════════════════════════════════════ */
  function buildCalWidget(container) {
    var nl = isNL;
    container.style.cssText = 'width:100%;height:100%;min-height:280px;display:flex;align-items:stretch;';

    var wrap = el('div', {
      background: '#0a0f1e',
      borderRadius: '14px',
      padding: '18px',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    });

    /* Header */
    var header = el('div', {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '11px',
      fontWeight: '800',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    });
    var headerPrefix = document.createTextNode('WEEK 4 — ');
    var counterSpan = el('span', { color: '#e2e8f0' }, { text: '0' });
    var headerSuffix = document.createTextNode(nl ? ' afspraken geboekt' : ' meetings booked');
    header.appendChild(headerPrefix);
    header.appendChild(counterSpan);
    header.appendChild(headerSuffix);
    wrap.appendChild(header);

    /* Meeting cards */
    var meetings = [
      { company: 'VodafoneZiggo', type: nl ? 'Intro gesprek' : 'Intro call', time: 'Ma 10:00', bg: '#1e3a5f', accent: '#3b82f6' },
      { company: 'Triodos Bank', type: nl ? 'Deal getekend ✓' : 'Deal signed ✓', time: 'Ma 14:00', bg: '#052e16', accent: '#10b981', deal: true },
      { company: 'ABN AMRO', type: 'Discovery', time: 'Di 09:00', bg: '#2d1b69', accent: '#7c3aed' },
      { company: 'Philips', type: 'Pitch', time: 'Di 14:00', bg: '#451a03', accent: '#f59e0b' },
      { company: 'Alliander', type: nl ? 'Intro gesprek' : 'Intro call', time: 'Wo 10:00', bg: '#2d1b69', accent: '#7c3aed' },
      { company: 'ASML', type: 'Discovery', time: 'Do 11:00', bg: '#1e3a5f', accent: '#3b82f6' }
    ];

    var cards = [];
    meetings.forEach(function (m) {
      var card = el('div', {
        background: m.bg,
        borderLeft: '3px solid ' + m.accent,
        borderRadius: '8px',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: '0',
        transform: 'translateY(10px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        position: 'relative'
      });

      var left = el('div');
      var company = el('div', {
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontSize: '13px',
        fontWeight: '700',
        color: '#f1f5f9',
        lineHeight: '1.2'
      }, { text: m.company });
      var type = el('div', {
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontSize: '11px',
        color: m.accent,
        marginTop: '2px',
        fontWeight: '600'
      }, { text: m.type });
      left.appendChild(company);
      left.appendChild(type);

      var time = el('div', {
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontSize: '11px',
        color: '#64748b',
        fontWeight: '600',
        flexShrink: '0'
      }, { text: m.time });

      card.appendChild(left);
      card.appendChild(time);

      if (m.deal) {
        card.dataset.isDeal = '1';
      }

      wrap.appendChild(card);
      cards.push(card);
    });

    container.appendChild(wrap);

    /* Animate counter */
    countUp(counterSpan, 0, 28, 1200, 0);

    /* Staggered cards */
    cards.forEach(function (card, i) {
      setTimeout(function () {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        if (card.dataset.isDeal) {
          setTimeout(function () {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 0 16px rgba(16,185,129,0.45)';
            setTimeout(function () {
              card.style.transform = 'scale(1)';
              card.style.boxShadow = '0 0 8px rgba(16,185,129,0.2)';
            }, 200);
          }, 420);
        }
      }, 400 + i * 80);
    });
  }

  /* ════════════════════════════════════════════════════════
     WIDGET 4 — Learning Engine
  ════════════════════════════════════════════════════════ */
  function buildLearnWidget(container) {
    var nl = isNL;
    container.style.cssText = 'width:100%;height:100%;min-height:280px;display:flex;align-items:stretch;';

    var wrap = el('div', {
      background: '#0c1220',
      borderRadius: '14px',
      padding: '22px 20px',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      alignItems: 'stretch'
    });

    /* Center badge */
    var badge = el('div', {
      background: '#1e293b',
      borderRadius: '99px',
      padding: '8px 18px',
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '11px',
      fontWeight: '800',
      color: '#818cf8',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      textAlign: 'center',
      alignSelf: 'center',
      animation: 'fwGlow 2.5s ease-in-out infinite'
    }, { text: 'AUTO-LEARNING ENGINE' });
    wrap.appendChild(badge);

    /* Stats */
    var stats = [
      { label: 'Head of Digital', labelNL: 'Head of Digital', val: 2.3, max: 5 },
      { label: 'Finance sector', labelNL: 'Financiële sector', val: 1.8, max: 4 },
      { label: 'Pattern A reply rate', labelNL: 'Pattern A respons', val: 4.0, max: 6 }
    ];

    var statEls = [];
    stats.forEach(function (s) {
      var row = el('div', {
        opacity: '0',
        transform: 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease'
      });

      var topRow = el('div', {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5px'
      });

      var lbl = el('div', {
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontSize: '12px',
        color: '#94a3b8',
        fontWeight: '500'
      }, { text: nl ? s.labelNL : s.label });

      var numSpan = el('div', {
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontSize: '14px',
        fontWeight: '800',
        color: '#10b981'
      }, { text: '+0.0%' });

      topRow.appendChild(lbl);
      topRow.appendChild(numSpan);
      row.appendChild(topRow);

      var barBg = el('div', {
        background: '#1e293b',
        borderRadius: '99px',
        height: '4px',
        overflow: 'hidden'
      });
      var barFg = el('div', {
        background: 'linear-gradient(90deg, #10b981, #34d399)',
        height: '100%',
        width: '0%',
        borderRadius: '99px',
        transition: 'width 1s cubic-bezier(0.165,0.84,0.44,1)'
      });
      barBg.appendChild(barFg);
      row.appendChild(barBg);

      wrap.appendChild(row);
      statEls.push({ row: row, numSpan: numSpan, barFg: barFg, val: s.val, max: s.max });
    });

    /* ICP confidence badge */
    var icpBadge = el('div', {
      background: 'rgba(79,70,229,0.15)',
      border: '1px solid rgba(79,70,229,0.3)',
      borderRadius: '99px',
      padding: '6px 18px',
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: '12px',
      fontWeight: '700',
      color: '#818cf8',
      textAlign: 'center',
      alignSelf: 'center',
      opacity: '0',
      transition: 'opacity 0.5s ease'
    }, { text: 'ICP confidence: 87%' });
    wrap.appendChild(icpBadge);

    container.appendChild(wrap);

    /* Animate rows */
    statEls.forEach(function (s, i) {
      setTimeout(function () {
        s.row.style.opacity = '1';
        s.row.style.transform = 'translateY(0)';
        setTimeout(function () {
          countUp(s.numSpan, 0, s.val, 800, 1, '+');
          // append % after countUp finishes:
          setTimeout(function () { s.numSpan.textContent = '+' + s.val.toFixed(1) + '%'; }, 820);
          s.barFg.style.width = ((s.val / s.max) * 100) + '%';
        }, 50);
      }, i * 300);
    });

    setTimeout(function () { icpBadge.style.opacity = '1'; }, stats.length * 300 + 900);
  }

  /* ─── Keyframes ────────────────────────────────────────── */
  function injectKeyframes() {
    if (document.getElementById('fw-keyframes')) return;
    var style = document.createElement('style');
    style.id = 'fw-keyframes';
    style.textContent = [
      '@keyframes fwPulse {',
      '  0%,100%{opacity:1;transform:scale(1);}',
      '  50%{opacity:0.6;transform:scale(0.95);}',
      '}',
      '@keyframes fwGlow {',
      '  0%,100%{box-shadow:0 0 0 rgba(79,70,229,0);}',
      '  50%{box-shadow:0 0 12px rgba(79,70,229,0.4);}',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ─── Init ─────────────────────────────────────────────── */
  function init() {
    injectKeyframes();

    observe('fw-lead', 0.3, function (el) { buildLeadWidget(el); });
    observe('fw-email', 0.2, function (el) { buildEmailWidget(el); });
    observe('fw-cal', 0.2, function (el) { buildCalWidget(el); });
    observe('fw-learn', 0.3, function (el) { buildLearnWidget(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
