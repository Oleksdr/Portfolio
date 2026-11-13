// Active les animations (le contenu reste visible si le JS ne se charge pas).
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // La pile de compétences s'assemble quand elle arrive à l'écran
  const stack = document.querySelector('.stack');
  if (stack && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        stack.classList.add('is-built');
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(stack);
  } else if (stack) {
    stack.classList.add('is-built');
  }

  // Année du pied de page
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

});
