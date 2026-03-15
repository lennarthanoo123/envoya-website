/* ─── Envoya Live Demo Widget ─────────────────────────────────
   Animated 5-step agent simulation
   Pure vanilla JS — no dependencies
   ──────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── Language detection ───────────────────────────────────── */
  const isNL = window.location.pathname.startsWith('/nl') ||
    (document.documentElement.lang || '').toLowerCase().startsWith('nl');

  /* ── Step data ────────────────────────────────────────────── */
  const STEPS_EN = [
    {
      label: 'Step 1 — Apollo Pull',
      lines: [
        { text: '🔍  Searching Apollo database...', delay: 0 },
        { text: '     → 847 companies matched ICP profile', delay: 380, cls: 'pos' },
        { text: '     → Filtering: Netherlands · 100+ employees · UX/Design roles', delay: 700 },
        { text: '     → 12 qualified leads found', delay: 1050, cls: 'pos' },
      ],
    },
    {
      label: 'Step 2 — ICP Scoring',
      lines: [
        { text: '🎯  Scoring leads against campaign ICP...', delay: 0 },
        { text: '     <bar8> Annemiek Vos · Zilveren Kruis     <val>94/100 ★★★★★</val>', delay: 400 },
        { text: '     <bar7> Lars Bakker · ABN AMRO             <val>87/100 ★★★★</val>', delay: 750 },
        { text: '     <bar6> Sophie Hendriks · VodafoneZiggo    <val>81/100 ★★★★</val>', delay: 1100 },
      ],
    },
    {
      label: 'Step 3 — Email Generated',
      lines: [
        { text: '✉️   Generating personalised email...', delay: 0 },
        { text: '     Pattern: <hl>A</hl>  (personal signal detected)', delay: 380 },
        { text: '     Hook: <val>"Ik zag je interview over digitale transformatie —"</val>', delay: 720 },
        { text: '     VP: Creative Services · refs: APG, ABN AMRO, LeasePlan', delay: 1050 },
        { text: '     → Email ready for <hl>Annemiek Vos</hl>', delay: 1380, cls: 'pos' },
      ],
    },
    {
      label: 'Step 4 — Reply Received',
      lines: [
        { text: '📩  New reply detected — <hl>Annemiek Vos</hl>', delay: 0 },
        { text: '     Sentiment: <pos>POSITIVE ✓</pos>', delay: 420 },
        { text: '     <val>"Interessant! Kunnen we volgende week inplannen?"</val>', delay: 760 },
        { text: '     → Status updated: replied → <pos>meeting</pos>', delay: 1120 },
      ],
    },
    {
      label: 'Step 5 — Meeting Booked',
      lines: [
        { text: '📅  Meeting booked!', delay: 0, cls: 'pos' },
        { text: '     Annemiek Vos · Head of UX · Zilveren Kruis', delay: 380 },
        { text: '     Tuesday, March 24 · <val>10:00 AM</val>', delay: 720 },
        { text: '     ─────────────────────────────────', delay: 1000, cls: 'dim' },
        { text: '     Pipeline: <hl>35 meetings this quarter</hl>  <pos>↑ 14.4% reply rate</pos>', delay: 1300 },
      ],
    },
  ];

  const STEPS_NL = [
    {
      label: 'Stap 1 — Apollo Pull',
      lines: [
        { text: '🔍  Apollo database doorzoeken...', delay: 0 },
        { text: '     → 847 bedrijven matchen ICP-profiel', delay: 380, cls: 'pos' },
        { text: '     → Filter: Nederland · 100+ medewerkers · UX/Design-rollen', delay: 700 },
        { text: '     → 12 gekwalificeerde leads gevonden', delay: 1050, cls: 'pos' },
      ],
    },
    {
      label: 'Stap 2 — ICP-scoring',
      lines: [
        { text: '🎯  Leads scoren op campagne-ICP...', delay: 0 },
        { text: '     <bar8> Annemiek Vos · Zilveren Kruis     <val>94/100 ★★★★★</val>', delay: 400 },
        { text: '     <bar7> Lars Bakker · ABN AMRO             <val>87/100 ★★★★</val>', delay: 750 },
        { text: '     <bar6> Sophie Hendriks · VodafoneZiggo    <val>81/100 ★★★★</val>', delay: 1100 },
      ],
    },
    {
      label: 'Stap 3 — E-mail gegenereerd',
      lines: [
        { text: '✉️   Gepersonaliseerde e-mail genereren...', delay: 0 },
        { text: '     Patroon: <hl>A</hl>  (persoonlijk signaal gedetecteerd)', delay: 380 },
        { text: '     Hook: <val>"Ik zag je interview over digitale transformatie —"</val>', delay: 720 },
        { text: '     VP: Creative Services · refs: APG, ABN AMRO, LeasePlan', delay: 1050 },
        { text: '     → E-mail klaar voor <hl>Annemiek Vos</hl>', delay: 1380, cls: 'pos' },
      ],
    },
    {
      label: 'Stap 4 — Reactie ontvangen',
      lines: [
        { text: '📩  Nieuwe reactie — <hl>Annemiek Vos</hl>', delay: 0 },
        { text: '     Sentiment: <pos>POSITIEF ✓</pos>', delay: 420 },
        { text: '     <val>"Interessant! Kunnen we volgende week inplannen?"</val>', delay: 760 },
        { text: '     → Status bijgewerkt: reactie → <pos>meeting</pos>', delay: 1120 },
      ],
    },
    {
      label: 'Stap 5 — Meeting gepland',
      lines: [
        { text: '📅  Meeting gepland!', delay: 0, cls: 'pos' },
        { text: '     Annemiek Vos · Head of UX · Zilveren Kruis', delay: 380 },
        { text: '     Dinsdag 24 maart · <val>10:00</val>', delay: 720 },
        { text: '     ─────────────────────────────────', delay: 1000, cls: 'dim' },
        { text: '     Pipeline: <hl>35 meetings dit kwartaal</hl>  <pos>↑ 14,4% reply rate</pos>', delay: 1300 },
      ],
    },
  ];

  const STEPS = isNL ? STEPS_NL : STEPS_EN;
  const STEP_LABELS_EN = ['Apollo', 'Scoring', 'Email', 'Reply', 'Meeting'];
  const STEP_LABELS_NL = ['Apollo', 'Scoring', 'E-mail', 'Reactie', 'Meeting'];
  const STEP_LABELS = isNL ? STEP_LABELS_NL : STEP_LABELS_EN;

  /* ── Progress between steps (ms) ─────────────────────────── */
  const STEP_PAUSE = 2200;   // pause after last line of each step
  const LOOP_PAUSE = 3000;   // pause before restart

  /* ── Render helper: parse mini-tag syntax ─────────────────── */
  const BARS = {
    8: '<span class="bar-filled">████████</span><span class="bar-empty">░░</span>',
    7: '<span class="bar-filled">███████</span><span class="bar-empty">░░░</span>',
    6: '<span class="bar-filled">██████</span><span class="bar-empty">░░░░</span>',
  };

  function renderText(raw) {
    return raw
      .replace(/<bar(\d)>/g, (_, n) => BARS[n] || '')
      .replace(/<\/bar>/g, '')
      .replace(/<hl>(.*?)<\/hl>/g, '<span class="hl">$1</span>')
      .replace(/<pos>(.*?)<\/pos>/g, '<span class="pos">$1</span>')
      .replace(/<val>(.*?)<\/val>/g, '<span class="val">$1</span>')
      .replace(/<dim>(.*?)<\/dim>/g, '<span class="dim">$1</span>');
  }

  /* ── Build DOM ────────────────────────────────────────────── */
  function buildWidget(container) {
    // Live badge
    const badge = document.createElement('div');
    badge.className = 'demo-live-badge';
    badge.innerHTML = '<span class="demo-live-dot"></span> LIVE';
    container.parentNode.insertBefore(badge, container);

    // Panel
    const panel = document.createElement('div');
    panel.className = 'demo-panel';
    panel.innerHTML = `
      <div class="demo-panel-header">
        <span class="demo-panel-dot"></span>
        <span class="demo-panel-dot"></span>
        <span class="demo-panel-dot"></span>
        <span class="demo-panel-title">envoya-agent · lead-machine</span>
      </div>
      <div class="demo-step-label">
        <span></span>
        <span id="demo-step-label-text">${STEPS[0].label}</span>
        <span></span>
      </div>
      <div class="demo-terminal" id="demo-terminal"></div>
      <div class="demo-progress-wrap">
        <div class="demo-progress-track">
          <div class="demo-progress-fill" id="demo-progress-fill"></div>
        </div>
        <div class="demo-progress-labels" id="demo-progress-labels"></div>
      </div>
    `;
    container.appendChild(panel);

    // Step labels
    const labelsEl = panel.querySelector('#demo-progress-labels');
    STEP_LABELS.forEach((lbl) => {
      const s = document.createElement('span');
      s.className = 'demo-progress-step';
      s.textContent = lbl;
      labelsEl.appendChild(s);
    });

    return panel;
  }

  /* ── Animation engine ─────────────────────────────────────── */
  function startWidget(panel) {
    const terminal   = panel.querySelector('#demo-terminal');
    const progressFill = panel.querySelector('#demo-progress-fill');
    const stepLabelEl  = panel.querySelector('#demo-step-label-text');
    const stepDots     = panel.querySelectorAll('.demo-progress-step');
    let currentStep  = 0;
    let running      = true;

    function clearTerminal() {
      terminal.innerHTML = '';
    }

    function appendLine(lineObj) {
      const el = document.createElement('span');
      el.className = 'demo-line' + (lineObj.cls ? ' ' + lineObj.cls : '');
      el.innerHTML = renderText(lineObj.text);
      terminal.appendChild(el);
      // Scroll to bottom
      terminal.scrollTop = terminal.scrollHeight;
    }

    function updateProgress(stepIndex) {
      const pct = ((stepIndex + 1) / STEPS.length) * 100;
      progressFill.style.width = pct + '%';
      stepDots.forEach((dot, i) => {
        dot.className = 'demo-progress-step' +
          (i < stepIndex ? ' done' : i === stepIndex ? ' active' : '');
      });
    }

    function runStep(stepIndex) {
      if (!running) return;

      const step = STEPS[stepIndex];
      stepLabelEl.textContent = step.label;
      updateProgress(stepIndex);
      clearTerminal();

      let maxDelay = 0;
      step.lines.forEach((line) => {
        maxDelay = Math.max(maxDelay, line.delay);
        setTimeout(() => {
          if (running) appendLine(line);
        }, line.delay);
      });

      // After last line + pause → next step or loop
      const totalWait = maxDelay + STEP_PAUSE;
      setTimeout(() => {
        if (!running) return;
        const next = stepIndex + 1;
        if (next < STEPS.length) {
          runStep(next);
        } else {
          // Fade out, then restart
          panel.classList.add('fading');
          setTimeout(() => {
            if (!running) return;
            panel.classList.remove('fading');
            runStep(0);
          }, LOOP_PAUSE);
        }
      }, totalWait);
    }

    runStep(0);

    // Return a stop handle (useful if widget leaves viewport in future)
    return function stop() { running = false; };
  }

  /* ── IntersectionObserver — start only when visible ──────── */
  function init() {
    const container = document.getElementById('demo-widget');
    if (!container) return;

    const panel = buildWidget(container);
    let stopFn = null;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            stopFn = startWidget(panel);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(panel);
  }

  /* ── Boot ─────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
