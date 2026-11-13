(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = document.getElementById('dots');
  const progress = document.getElementById('progress');
  const counter = document.getElementById('counter');
  let active = 0;

  slides.forEach((slide, index) => {
    const dot = document.createElement('a');
    dot.href = `#${slide.id}`;
    dot.setAttribute('aria-label', `Слайд ${index + 1}`);
    dot.title = `Слайд ${index + 1}`;
    dots.appendChild(dot);
  });
  const links = [...dots.querySelectorAll('a')];

  function goTo(index) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    slides[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function update(index) {
    active = index;
    links.forEach((link, i) => link.classList.toggle('active', i === index));
    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
        update(slides.indexOf(entry.target));
      }
    });
  }, { threshold: [0.45, 0.65] });
  slides.forEach(slide => observer.observe(slide));

  document.getElementById('prev').addEventListener('click', () => goTo(active - 1));
  document.getElementById('next').addEventListener('click', () => goTo(active + 1));
  document.addEventListener('keydown', event => {
    if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
      event.preventDefault(); goTo(active + 1);
    } else if (['ArrowUp', 'PageUp'].includes(event.key)) {
      event.preventDefault(); goTo(active - 1);
    } else if (event.key === 'Home') goTo(0);
    else if (event.key === 'End') goTo(slides.length - 1);
  });
  update(0);
})();