const links = document.querySelectorAll('.navbar div a');
const sections = document.querySelectorAll('section');

function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(now) {
    if (!startTime) startTime = now;
    const elapsed = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * ease(elapsed));
    if (elapsed < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const aboutLink = document.querySelector('.navbar div a[href="#about"]');
if (aboutLink) aboutLink.classList.add('active');

links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      smoothScrollTo(top, 400);
    });
  });


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      if (!id) return;

      links.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  threshold: 0.6
});

sections.forEach(section => {
  observer.observe(section);
});