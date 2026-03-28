/* ── Envoya Visual Demo Widget ──────────────────────────────────────── */
(function () {
  'use strict';

  const isNL = window.location.pathname.startsWith('/nl');

  const T = {
    url: isNL ? 'app.envoya.tech · Lead Machine' : 'app.envoya.tech · Lead Machine',
    step1: isNL ? '① Leads' : '① Leads',
    step2: isNL ? '② Email' : '② Email',
    step3: isNL ? '③ Reply' : '③ Reply',
    step4: isNL ? '④ Meeting' : '④ Meeting',
    leadsTitle: isNL ? 'Apollo Pull — 12 gekwalificeerde leads' : 'Apollo Pull — 12 qualified leads',
    leadsCount: isNL ? '12 leads gevonden' : '12 leads found',
    emailTitle: isNL ? 'AI Email genereren voor Annemiek Vos' : 'Generating AI email for Annemiek Vos',
    emailTo: 'annemiek.vos@zilverenkruis.nl',
    emailSubject: isNL ? 'Kennismaking Jeffrey van den Dungen' : 'Introduction Jeffrey van den Dungen',
    emailBody: isNL
      ? 'Ik zag je recente interview over digitale transformatie in de zorg — leek me een mooie aanleiding voor een kennismaking.\n\nMet onze Creative Services ondersteunen we organisaties met flexibele UX capaciteit — bij piekbelasting of strategische UX-vraagstukken. We werken o.a. met <strong>APG, ABN AMRO en LeasePlan</strong>. Organisaties die zoeken naar hoe je digitale producten laat landen in complexe organisaties, niet als losstaand project.\n\nGezien jouw rol als Head of Digital bij Zilveren Kruis, leek het me waardevol om je in contact te brengen met mijn collega <strong>Jeffrey van den Dungen</strong>, Managing Director bij Jungle Minds, voormalig Head of Design bij bol.com. Jeffrey spreekt regelmatig met digitale leiders over hoe je UX structureel verankert, niet als extra capaciteitslaag.\n\nSta je open voor een korte, inhoudelijke kennismaking met Jeffrey?'
      : 'I saw your recent interview on digital transformation in healthcare — seemed like a great reason to reach out.\n\nThrough our Creative Services, we support organisations with flexible UX capacity — for peak demand or strategic UX challenges. We work with <strong>APG, ABN AMRO and LeasePlan</strong>. Organisations looking at how to embed digital products in complex environments, not as a side project.\n\nGiven your role as Head of Digital at Zilveren Kruis, I thought it would be valuable to introduce you to my colleague <strong>Jeffrey van den Dungen</strong>, Managing Director at Jungle Minds. Jeffrey regularly speaks with digital leaders about embedding UX structurally, not as an extra layer.\n\nWould you be open to a brief, substantive introduction with Jeffrey?',
    patternTag: 'Pattern A',
    signalTag: isNL ? 'Persoonlijk signaal gevonden' : 'Personal signal detected',
    refsTag: isNL ? 'Refs: APG · ABN AMRO · LeasePlan' : 'Refs: APG · ABN AMRO · LeasePlan',
    replyTitle: isNL ? 'Nieuwe reactie ontvangen' : 'New reply received',
    replyFrom: 'Annemiek Vos · Zilveren Kruis',
    replyMsg: isNL
      ? '"Interessant! Ik zou graag eens kennismaken. Kunnen we volgende week iets inplannen?"'
      : '"Interesting! I\'d love to connect. Can we schedule something next week?"',
    statusFrom: isNL ? 'Status: Benaderd' : 'Status: Contacted',
    statusTo: isNL ? 'Meeting gepland ✓' : 'Meeting planned ✓',
    meetingTitle: isNL ? 'Meeting geboekt! 🎉' : 'Meeting booked! 🎉',
    meetingDetail: isNL
      ? 'Annemiek Vos · Head of Digital · Zilveren Kruis\nDinsdag 24 maart · 10:00'
      : 'Annemiek Vos · Head of Digital · Zilveren Kruis\nTuesday, March 24 · 10:00 AM',
    stat1n: '35', stat1l: isNL ? 'meetings dit kwartaal' : 'meetings this quarter',
    stat2n: isNL ? '14,4%' : '14.4%', stat2l: isNL ? 'responsrate' : 'reply rate',
    stat3n: '1', stat3l: isNL ? 'deal gesloten' : 'deal closed',
  };

  const LEADS = [
    { initials: 'AV', name: 'Annemiek Vos', sub: 'Head of Digital · Zilveren Kruis', score: 94, stars: '★★★★★' },
    { initials: 'LB', name: 'Lars Bakker',  sub: 'UX Director · ABN AMRO',           score: 87, stars: '★★★★' },
    { initials: 'SH', name: 'Sophie Hendriks', sub: 'Lead UX Designer · VodafoneZiggo', score: 81, stars: '★★★★' },
    { initials: 'MR', name: 'Marc Rietdijk', sub: 'Product Design Lead · ING',        score: 76, stars: '★★★' },
    { initials: 'JV', name: 'Joost Vermeer', sub: 'UX Lead · Unilever',              score: 71, stars: '★★★' },
  ];

  function buildScreen1() {
    const div = document.createElement('div');
    div.className = 'vdw-screen';
    div.innerHTML = `
      <div class="vdw-leads-header">
        <span class="vdw-screen-title">${T.leadsTitle}</span>
        <span class="vdw-badge">${T.leadsCount}</span>
      </div>`;
    LEADS.forEach(l => {
      const row = document.createElement('div');
      row.className = 'vdw-lead-row';
      row.innerHTML = `
        <div class="vdw-avatar">${l.initials}</div>
        <div class="vdw-lead-info">
          <div class="vdw-lead-name">${l.name}</div>
          <div class="vdw-lead-sub">${l.sub}</div>
        </div>
        <div class="vdw-score-bar">
          <div class="vdw-score-label">${l.score}/100</div>
          <div class="vdw-score-track"><div class="vdw-score-fill" data-w="${l.score}"></div></div>
        </div>
        <div class="vdw-stars">${l.stars}</div>`;
      div.appendChild(row);
    });
    return div;
  }

  function animateScreen1(screen) {
    const rows = screen.querySelectorAll('.vdw-lead-row');
    rows.forEach((row, i) => {
      setTimeout(() => {
        row.classList.add('appear');
        if (i === 0) row.classList.add('selected');
        const fill = row.querySelector('.vdw-score-fill');
        if (fill) fill.style.width = fill.dataset.w + '%';
      }, i * 180);
    });
  }

  function buildScreen2() {
    const div = document.createElement('div');
    div.className = 'vdw-screen';
    div.innerHTML = `
      <div class="vdw-leads-header" style="margin-bottom:12px">
        <span class="vdw-screen-title">${T.emailTitle}</span>
        <span class="vdw-badge green">AI ✓</span>
      </div>
      <div class="vdw-email-shell">
        <div class="vdw-email-header">
          <div class="vdw-email-field">To: <span>${T.emailTo}</span></div>
          <div class="vdw-email-field">Subject: <span>${T.emailSubject}</span></div>
        </div>
        <div class="vdw-email-body vdw-typing-cursor" id="vdw-email-body">Hi Annemiek,<br><br></div>
      </div>
      <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px">
        <span class="vdw-email-tag">${T.patternTag}</span>
        <span class="vdw-email-tag">${T.signalTag}</span>
        <span class="vdw-email-tag">${T.refsTag}</span>
      </div>`;
    return div;
  }

  function animateScreen2(screen) {
    const body = screen.querySelector('#vdw-email-body');
    if (!body) return;
    const paragraphs = T.emailBody.split('\n\n');
    let i = 0;
    function addNext() {
      if (i >= paragraphs.length) {
        body.classList.remove('vdw-typing-cursor');
        return;
      }
      const p = document.createElement('p');
      p.style.marginBottom = '10px';
      p.innerHTML = paragraphs[i];
      body.appendChild(p);
      i++;
      setTimeout(addNext, 900);
    }
    setTimeout(addNext, 400);
  }

  function buildScreen3() {
    const div = document.createElement('div');
    div.className = 'vdw-screen';
    div.innerHTML = `
      <div class="vdw-leads-header" style="margin-bottom:14px">
        <span class="vdw-screen-title">${T.replyTitle}</span>
        <span class="vdw-badge green">Positief</span>
      </div>
      <div class="vdw-inbox-row" id="vdw-inbox">
        <div class="vdw-inbox-avatar">AV</div>
        <div>
          <div class="vdw-inbox-name">${T.replyFrom}</div>
          <div class="vdw-inbox-sub">Re: ${T.emailSubject}</div>
          <div class="vdw-inbox-msg">${T.replyMsg}</div>
        </div>
      </div>
      <div class="vdw-status-change" id="vdw-status">
        <span>${T.statusFrom}</span>
        <span class="vdw-arrow">→</span>
        <span>${T.statusTo}</span>
      </div>`;
    return div;
  }

  function animateScreen3(screen) {
    setTimeout(() => screen.querySelector('#vdw-inbox')?.classList.add('appear'), 300);
    setTimeout(() => screen.querySelector('#vdw-status')?.classList.add('appear'), 1100);
  }

  function buildScreen4() {
    const div = document.createElement('div');
    div.className = 'vdw-screen';
    const detailLines = T.meetingDetail.split('\n').join('<br>');
    div.innerHTML = `
      <div class="vdw-cal-confirm" id="vdw-cal">
        <div class="vdw-cal-icon">📅</div>
        <div class="vdw-cal-title">${T.meetingTitle}</div>
        <div class="vdw-cal-detail">${detailLines}</div>
      </div>
      <div class="vdw-pipeline-stats" id="vdw-stats">
        <div class="vdw-pstat"><div class="vdw-pstat-n">${T.stat1n}</div><div class="vdw-pstat-l">${T.stat1l}</div></div>
        <div class="vdw-pstat"><div class="vdw-pstat-n">${T.stat2n}</div><div class="vdw-pstat-l">${T.stat2l}</div></div>
        <div class="vdw-pstat"><div class="vdw-pstat-n">${T.stat3n}</div><div class="vdw-pstat-l">${T.stat3l}</div></div>
      </div>`;
    return div;
  }

  function animateScreen4(screen) {
    setTimeout(() => screen.querySelector('#vdw-cal')?.classList.add('appear'), 300);
    setTimeout(() => screen.querySelector('#vdw-stats')?.classList.add('appear'), 900);
  }

  const SCREENS = [
    { build: buildScreen1, animate: animateScreen1, duration: 3200 },
    { build: buildScreen2, animate: animateScreen2, duration: 5500 },
    { build: buildScreen3, animate: animateScreen3, duration: 3500 },
    { build: buildScreen4, animate: animateScreen4, duration: 4000 },
  ];

  function buildWidget(container) {
    const shell = document.createElement('div');
    shell.className = 'vdw-shell';

    // Title bar
    shell.innerHTML = `
      <div class="vdw-titlebar">
        <div class="vdw-dots">
          <div class="vdw-dot vdw-dot-r"></div>
          <div class="vdw-dot vdw-dot-y"></div>
          <div class="vdw-dot vdw-dot-g"></div>
        </div>
        <div class="vdw-url">${T.url}</div>
      </div>
      <div class="vdw-tabs">
        <div class="vdw-tab active" id="vdw-tab-0">${T.step1}</div>
        <div class="vdw-tab" id="vdw-tab-1">${T.step2}</div>
        <div class="vdw-tab" id="vdw-tab-2">${T.step3}</div>
        <div class="vdw-tab" id="vdw-tab-3">${T.step4}</div>
      </div>
      <div class="vdw-progress-bar"><div class="vdw-progress-fill" id="vdw-progress"></div></div>
      <div class="vdw-content" id="vdw-content"></div>`;

    container.appendChild(shell);
    return shell;
  }

  function run(shell) {
    let step = 0;
    const screens = SCREENS.map(s => s.build());
    const content = shell.querySelector('#vdw-content');
    const progress = shell.querySelector('#vdw-progress');

    function showStep(i) {
      // Update tabs
      shell.querySelectorAll('.vdw-tab').forEach((t, ti) => {
        t.className = 'vdw-tab' + (ti < i ? ' done' : ti === i ? ' active' : '');
      });

      // Swap screen
      content.innerHTML = '';
      const screen = screens[i];
      screen.className = 'vdw-screen visible';
      content.appendChild(screen);
      SCREENS[i].animate(screen);

      // Progress
      if (progress) progress.style.width = ((i + 1) / SCREENS.length * 100) + '%';

      // Auto-advance
      setTimeout(() => {
        const next = (i + 1) % SCREENS.length;
        // Reset screens on loop
        if (next === 0) {
          screens.forEach((s, si) => {
            const fresh = SCREENS[si].build();
            screens[si] = fresh;
          });
          if (progress) progress.style.width = '0%';
        }
        showStep(next);
      }, SCREENS[i].duration);
    }

    showStep(0);
  }

  function init() {
    const container = document.getElementById('demo-widget');
    if (!container) return;
    const shell = buildWidget(container);
    setTimeout(() => run(shell), 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
