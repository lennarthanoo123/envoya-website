/* ── Envoya Real Screenshot Showcase ────────────────────────────────── */
(function () {
  const isNL = window.location.pathname.startsWith('/nl');

  const SLIDES_EN = [
    { img: '/assets/screen-pull-leads.jpg', tag: 'Step 1', title: 'Pull qualified leads from Apollo', desc: 'ICP profile loaded → AI calculates search strategy → Apollo database queried → leads scored and ranked' },
    { img: '/assets/screen-apollo-preview.jpg', tag: 'Step 2', title: 'AI selects the right leads', desc: 'Exploit: proven ICP combinations (highest conversion). Explore: new potential. Wildcard: surprises. All auto-scored.' },
    { img: '/assets/screen-lead-detail.jpg', tag: 'Step 3', title: 'Full lead intelligence — per person', desc: 'ICP score 5/10, company research, AI analysis, pipeline stage, next action. Everything in one view.' },
    { img: '/assets/screen-leads.jpg', tag: 'Step 2', title: '451 leads — scored, ranked, ready', desc: 'Every lead gets an ICP score. The system knows who to approach first. You see everything at a glance.' },
    { img: '/assets/screen-email-generating.jpg', tag: 'Step 3', title: 'AI writes a personalised email', desc: 'Lead data loaded → web research → signal analysis → Claude AI writes 3 email variants in seconds.' },
    { img: '/assets/screen-email-generated.jpg', tag: 'Step 4', title: 'Email ready — personalised hook, real signal', desc: 'Pattern A: personal signal as hook. Sector-matched references. Estimated reply probability shown.' },
    { img: '/assets/screen-meetings.jpg', tag: 'Step 5', title: '42 meetings booked — and counting', desc: 'Shuttel · Fabory · BOM · Meesman · L\'Oréal. All booked by the system. You just show up.' },
    { img: '/assets/screen-ai-engine.jpg', tag: 'Step 6', title: 'AI Engine learns who converts', desc: 'Customer DNA: CEO and finance roles convert best. Tech and finance are top sectors. System adjusts automatically.' },
    { img: '/assets/screen-dashboard.jpg', tag: 'Overview', title: 'Your pipeline — always full', desc: '474 leads · 388 emails sent · 10.8% meeting rate · €14,000 contract value. Running 24/7.' },
  ];

  const SLIDES_NL = [
    { img: '/assets/screen-pull-leads.jpg', tag: 'Stap 1', title: 'Leads pullen uit Apollo', desc: 'ICP profiel geladen → AI berekent zoekstrategie → Apollo database bevraagd → leads scoren op ICP-criteria' },
    { img: '/assets/screen-apollo-preview.jpg', tag: 'Stap 2', title: 'AI selecteert de juiste leads', desc: 'Exploit: bewezen ICP-combinaties (hoogste conversie). Explore: nieuw potentieel. Wildcard: verrassingen. Allemaal automatisch gescoord.' },
    { img: '/assets/screen-lead-detail.jpg', tag: 'Stap 3', title: 'Volledige lead intelligence — per persoon', desc: 'ICP-score 5/10, bedrijfsonderzoek, AI-analyse, pipelinefase, volgende actie. Alles in één overzicht.' },
    { img: '/assets/screen-leads.jpg', tag: 'Stap 2', title: '451 leads — gescoord, gerankt, klaar', desc: 'Elke lead krijgt een ICP-score. Het systeem weet wie als eerste benaderd wordt. Jij ziet alles in één oogopslag.' },
    { img: '/assets/screen-email-generating.jpg', tag: 'Stap 3', title: 'AI schrijft een gepersonaliseerde email', desc: 'Lead data geladen → webonderzoek → signaalanalyse → Claude AI schrijft 3 emailvarianten in seconden.' },
    { img: '/assets/screen-email-generated.jpg', tag: 'Stap 4', title: 'Email klaar — persoonlijke haak, echt signaal', desc: 'Patroon A: persoonlijk signaal als haak. Sector-matched referenties. Geschatte reply-kans zichtbaar.' },
    { img: '/assets/screen-meetings.jpg', tag: 'Stap 5', title: '42 meetings geboekt — en het loopt door', desc: 'Shuttel · Fabory · BOM · Meesman · L\'Oréal. Allemaal geboekt door het systeem. Jij verschijnt gewoon.' },
    { img: '/assets/screen-ai-engine.jpg', tag: 'Stap 6', title: 'AI Engine leert wie converteert', desc: 'Customer DNA: CEO en financiële rollen converteren het sterkst. Tech en finance zijn topsectoren. Systeem past zich aan.' },
    { img: '/assets/screen-dashboard.jpg', tag: 'Overzicht', title: 'Jouw pipeline — altijd vol', desc: '474 leads · 388 emails verstuurd · 10,8% meeting rate · €14.000 contractwaarde. Draait 24/7.' },
  ];

  const SLIDES = isNL ? SLIDES_NL : SLIDES_EN;

  // Counter data
  const COUNTERS = [
    { target: 474, suffix: '', label: isNL ? 'Leads verwerkt' : 'Leads processed' },
    { target: 42,  suffix: '', label: isNL ? 'Meetings geboekt' : 'Meetings booked' },
    { target: 10.8, suffix: '%', label: isNL ? 'Meeting rate' : 'Meeting rate', isDecimal: true },
    { target: 14, suffix: 'K', label: isNL ? 'Contract waarde (€)' : 'Contract value (€)' },
  ];

  function countUp(el, target, suffix, isDecimal, duration) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = isDecimal
        ? (target * ease).toFixed(1)
        : Math.round(target * ease);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function buildShowcase(container) {
    const section = document.createElement('section');
    section.className = 'showcase-section fade-in';
    section.id = 'showcase';

    // Title
    section.innerHTML = `
      <div class="section-tag">${isNL ? 'Het systeem in actie' : 'The system in action'}</div>
      <h2 class="section-h">${isNL ? 'Kijk hoe het werkt — echte schermen' : 'See how it works — real screens'}</h2>
      <p class="section-p">${isNL
        ? 'Geen mock-ups. Dit zijn echte schermen van Lead Machine in gebruik.'
        : 'No mock-ups. These are real screens from Lead Machine in use.'}</p>`;

    // Counter strip
    const strip = document.createElement('div');
    strip.className = 'sc-counter-strip';
    const counterEls = COUNTERS.map(c => {
      const item = document.createElement('div');
      item.className = 'sc-counter-item';
      const n = document.createElement('div');
      n.className = 'sc-counter-n';
      n.innerHTML = `<span class="sc-num">0${c.suffix === 'K' ? '' : c.suffix}</span>${c.suffix === 'K' ? '<span class="sc-unit">K</span>' : ''}`;
      const l = document.createElement('div');
      l.className = 'sc-counter-l';
      l.textContent = c.label;
      item.appendChild(n);
      item.appendChild(l);
      strip.appendChild(item);
      return { el: n.querySelector('.sc-num'), ...c };
    });
    section.appendChild(strip);

    // Slider wrapper
    const sliderWrap = document.createElement('div');
    sliderWrap.className = 'sc-slider-wrap';

    const slider = document.createElement('div');
    slider.className = 'sc-slider';

    // Chrome bar
    slider.innerHTML = `
      <div class="sc-chrome">
        <div class="sc-chrome-dots"><span></span><span></span><span></span></div>
        <div class="sc-chrome-url">app.envoya.tech · Lead Machine</div>
      </div>`;

    // Slides
    const slidesEl = document.createElement('div');
    slidesEl.className = 'sc-slides';

    SLIDES.forEach((s, i) => {
      const slide = document.createElement('div');
      slide.className = 'sc-slide' + (i === 0 ? ' active' : '');
      slide.innerHTML = `
        <img src="${s.img}" alt="${s.title}" loading="lazy">
        <div class="sc-caption">
          <div class="sc-caption-tag">${s.tag}</div>
          <div class="sc-caption-title">${s.title}</div>
          <div class="sc-caption-desc">${s.desc}</div>
        </div>`;
      slidesEl.appendChild(slide);
    });

    slider.appendChild(slidesEl);

    // Arrows
    const prev = document.createElement('button');
    prev.className = 'sc-arrow sc-arrow-prev';
    prev.innerHTML = '&#8592;';
    prev.setAttribute('aria-label', 'Previous');

    const next = document.createElement('button');
    next.className = 'sc-arrow sc-arrow-next';
    next.innerHTML = '&#8594;';
    next.setAttribute('aria-label', 'Next');

    sliderWrap.appendChild(slider);
    sliderWrap.appendChild(prev);
    sliderWrap.appendChild(next);

    // Dots
    const dotsNav = document.createElement('div');
    dotsNav.className = 'sc-dots-nav';
    const dots = SLIDES.map((_, i) => {
      const d = document.createElement('div');
      d.className = 'sc-dot' + (i === 0 ? ' active' : '');
      dotsNav.appendChild(d);
      return d;
    });
    sliderWrap.appendChild(dotsNav);

    section.appendChild(sliderWrap);
    container.parentNode.insertBefore(section, container);

    // Slide logic
    const slideEls = slidesEl.querySelectorAll('.sc-slide');
    let current = 0;
    let autoTimer;

    function goTo(i) {
      slideEls[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (i + SLIDES.length) % SLIDES.length;
      slideEls[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 3500);
    }

    function stopAuto() { clearInterval(autoTimer); }

    prev.onclick = () => { stopAuto(); goTo(current - 1); startAuto(); };
    next.onclick = () => { stopAuto(); goTo(current + 1); startAuto(); };
    dots.forEach((d, i) => { d.onclick = () => { stopAuto(); goTo(i); startAuto(); }; });
    slider.onclick = () => { stopAuto(); goTo(current + 1); startAuto(); };

    // IntersectionObserver: start counters + auto-play when in view
    let started = false;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        // Animate counters
        counterEls.forEach((c, i) => {
          setTimeout(() => {
            countUp(c.el, c.target, c.suffix === 'K' ? '' : c.suffix, c.isDecimal, 1800);
          }, i * 150);
        });
        startAuto();
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(section);
  }

  function init() {
    // Remove old mock showcase if present
    const old = document.getElementById('showcase');
    if (old) old.remove();

    // Insert before demo-widget section or how-it-works
    const anchor = document.querySelector('.demo-section') ||
                   document.getElementById('how-it-works') ||
                   document.querySelector('.section');
    if (anchor) buildShowcase(anchor);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
