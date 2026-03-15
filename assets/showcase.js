(function() {
  function init() {
    const section = document.getElementById('showcase');
    if (!section) return;

    // Animate funnel bars when in view
    const fills = section.querySelectorAll('.sc-fill-anim');
    const cards = section.querySelectorAll('.sc-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;

        // Funnel bars
        fills.forEach(f => {
          const w = parseFloat(f.dataset.w || 0) / 4.22; // out of 100
          setTimeout(() => { f.style.width = w + '%'; }, 300);
        });

        // Cards stagger in
        cards.forEach((c, i) => {
          setTimeout(() => c.classList.add('show'), 400 + i * 200);
        });

        observer.disconnect();
      });
    }, { threshold: 0.15 });

    observer.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
