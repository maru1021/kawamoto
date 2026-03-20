let initialized = false;

export function menuDisp(){
    if (initialized) return;
    initialized = true;

    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    const header = document.getElementById('header');

    function openMenu() {
        header.classList.add('menu-open');
        menu.style.display = 'flex';
        menuToggle.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'メニューを閉じる');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.style.display = 'none';
        header.classList.remove('menu-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', function() {
        menu.style.display === 'flex' ? closeMenu() : openMenu();
    });

    document.querySelectorAll('.menu a, .menu-supporter-btn').forEach(a => {
        a.addEventListener('click', closeMenu);
    });
}
