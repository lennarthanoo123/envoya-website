/* ── Envoya Showcase — static HTML, JS for slider + counters ── */
(function () {
  function countUp(el, target, isDecimal, duration) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = isDecimal ? (target * ease).toFixed(1) : Math.round(target * ease);
      // Keep suffix spans
      const spans = el.querySelectorAll('span');
      el.childNodes[0].textContent = value;
      if (progress < 1) requestAnimationFrame(step);
    }
    if (el.childNodes.length === 0) el.textContent = '0';
    requestAnimationFrame(step);
  }

  function initSlider() {
    const slidesEl = document.getElementById('sc-slides');
    if (!slidesEl) return;
    const slides = slidesEl.querySelectorAll('.sc-slide');
    const dotsNav = document.getElementById('sc-dots');
    const prev = document.getElementById('sc-prev');
    const next = document.getElementById('sc-next');
    if (!slides.length) return;

    // Build dots
    const dots = Array.from(slides).map((_, i) => {
      const d = document.createElement('div');
      d.className = 'sc-dot' + (i === 0 ? ' active' : '');
      dotsNav.appendChild(d);
      return d;
    });

    let current = 0;
    let timer;

    function goTo(i) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function startAuto() { timer = setInterval(() => goTo(current + 1), 3500); }
    function stopAuto()  { clearInterval(timer); }

    if (prev) prev.onclick = () => { stopAuto(); goTo(current - 1); startAuto(); };
    if (next) next.onclick = () => { stopAuto(); goTo(current + 1); startAuto(); };
    dots.forEach((d, i) => { d.onclick = () => { stopAuto(); goTo(i); startAuto(); }; });
    slidesEl.closest('.sc-slider').onclick = () => { stopAuto(); goTo(current + 1); startAuto(); };

    startAuto();
  }

  function initCounters() {
    const targets = [
      { id: 'sc-n1', val: 474, dec: false },
      { id: 'sc-n2', val: 42,  dec: false },
      { id: 'sc-n3', val: 10.8, dec: true },
      { id: 'sc-n4', val: 14, dec: false },
    ];
    const section = document.getElementById('showcase');
    if (!section) return;

    let started = false;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        targets.forEach((t, i) => {
          const el = document.getElementById(t.id);
          if (el) setTimeout(() => countUp(el, t.val, t.dec, 1800), i * 150);
        });
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { initSlider(); initCounters(); });
  } else {
    initSlider(); initCounters();
  }
})();
