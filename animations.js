document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);

        if (entry.target.classList.contains('key')) {
          const delay = parseFloat(entry.target.style.transitionDelay || 0) * 1000;
          setTimeout(() => {
            entry.target.style.transitionDelay = '0s';
            entry.target.style.transition = 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease';
          }, 550 + delay);
        }
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.key').forEach((key, i) => {
    key.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(key);
  });

  document.querySelectorAll('.skills-title').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(el);
  });

  const tabs = document.querySelector('.tabs');
  if (tabs) observer.observe(tabs);

  document.querySelectorAll('.input-box').forEach((box, i) => {
    box.style.transitionDelay = `${0.1 + i * 0.12}s`;
    observer.observe(box);
  });

  const contactTitle = document.querySelector('.contact-container h2');
  if (contactTitle) observer.observe(contactTitle);

  const submitBtn = document.querySelector('.contact-form button');
  if (submitBtn) {
    submitBtn.style.transitionDelay = '0.48s';
    observer.observe(submitBtn);
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.append(dot);

    let mx = 0, my = 0;
    let lastTrail = 0, colorIdx = 0;
    const trailColors = ['rgba(130, 130, 255, 0.65)', 'rgba(100, 220, 190, 0.55)'];

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';

      const now = Date.now();
      if (now - lastTrail > 38) {
        lastTrail = now;
        const t = document.createElement('span');
        t.className = 'cursor-trail';
        t.style.left = mx + 'px';
        t.style.top = my + 'px';
        t.style.background = trailColors[colorIdx++ % 2];
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 680);
      }
    });

    document.querySelectorAll('a, button, .key, .tab').forEach(el => {
      el.addEventListener('mouseenter', () => dot.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => dot.classList.remove('cursor-hover'));
    });

    document.addEventListener('mouseleave', () => dot.style.opacity = '0');
    document.addEventListener('mouseenter', () => dot.style.opacity = '1');
  }
});
