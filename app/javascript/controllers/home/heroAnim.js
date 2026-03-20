export function heroAnim() {
  document.querySelectorAll('.hero-anim').forEach(el => {
    const delay = parseInt(el.dataset.delay) * 180;
    setTimeout(() => el.classList.add('hero-anim--visible'), 300 + delay);
  });
}
