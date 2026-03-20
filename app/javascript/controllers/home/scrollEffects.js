export function scrollEffects() {
  const fadeEls = Array.from(document.querySelectorAll('.fade-in:not(.fade-in-visible)'));
  const scrollProgress = document.getElementById('scrollProgress');
  const header = document.getElementById('header');
  const heroImg = document.getElementById('heroImg');
  const hero = document.querySelector('.hero');
  const backToTopBtn = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.menu a[href^="#"]');

  const sections = [];
  navLinks.forEach(link => {
    const el = document.getElementById(link.getAttribute('href').substring(1));
    if (el) sections.push({ el, link });
  });

  function revealVisible() {
    for (let i = fadeEls.length - 1; i >= 0; i--) {
      if (fadeEls[i].getBoundingClientRect().top < window.innerHeight - 40) {
        fadeEls[i].classList.add('fade-in-visible');
        fadeEls.splice(i, 1);
      }
    }
  }

  revealVisible();

  let ticking = false;
  window.addEventListener('scroll', function() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;

      header.classList.toggle('header--scrolled', y > 60);
      scrollProgress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';

      if (hero && heroImg && y < hero.offsetTop + hero.offsetHeight) {
        heroImg.style.transform = 'translateY(' + (y * 0.25) + 'px) scale(1.05)';
      }

      let current = '';
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.getBoundingClientRect().top <= 120) {
          current = sections[i].el.id;
          break;
        }
      }
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href').substring(1) === current);
      });

      backToTopBtn.classList.toggle('is-visible', y > 600);

      if (fadeEls.length > 0) revealVisible();

      ticking = false;
    });
  }, { passive: true });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
