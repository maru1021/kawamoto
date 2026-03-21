let initialized = false;

export function scrollEffects() {
  if (initialized) return;
  initialized = true;

  const scrollProgress = document.getElementById('scrollProgress');
  const header = document.getElementById('header');
  const heroImg = document.getElementById('heroImg');
  const hero = document.querySelector('.hero');
  const backToTopBtn = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.menu a[href^="#"]');

  const fadeEls = Array.from(document.querySelectorAll('.fade-in:not(.fade-in-visible)'));
  const sections = Array.from(navLinks, link => {
    const el = document.getElementById(link.getAttribute('href').substring(1));
    return el ? { el, link } : null;
  }).filter(Boolean);

  function revealVisible() {
    for (let i = fadeEls.length - 1; i >= 0; i--) {
      if (fadeEls[i].getBoundingClientRect().top < window.innerHeight - 40) {
        fadeEls[i].classList.add('fade-in-visible');
        fadeEls.splice(i, 1);
      }
    }
  }

  revealVisible();

  // Ken Burns: ページ読み込み後ゆっくり一方向にパン＆ズームして停止
  const KB_DURATION = 8000;
  let kbStart = null;
  let kbProgress = 0; // 0→1 の進行値（スクロールハンドラと共有）

  function easeOut(t) { return 1 - (1 - t) * (1 - t); }

  function updateHeroTransform() {
    if (!hero || !heroImg) return;
    const y = window.scrollY;
    if (y >= hero.offsetTop + hero.offsetHeight) return;

    const heroH = hero.offsetHeight;
    const scrollRatio = Math.min(y / heroH, 1);

    const scale = 1.05 + scrollRatio * 0.15 + kbProgress * 0.03;
    const moveX = scrollRatio * -20 + kbProgress * -10;
    const moveY = y * 0.25 + kbProgress * -5;

    heroImg.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
  }

  function kbLoop(timestamp) {
    if (!kbStart) kbStart = timestamp;
    const raw = Math.min((timestamp - kbStart) / KB_DURATION, 1);
    kbProgress = easeOut(raw);
    updateHeroTransform();
    if (raw < 1) requestAnimationFrame(kbLoop);
  }

  if (hero && heroImg) {
    requestAnimationFrame(kbLoop);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;

      header.classList.toggle('header--scrolled', y > 60);
      scrollProgress.style.width = `${docH > 0 ? (y / docH) * 100 : 0}%`;

      updateHeroTransform();

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

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
