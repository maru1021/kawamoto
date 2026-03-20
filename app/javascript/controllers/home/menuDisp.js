export function menuDisp(){
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    const menuLinks = document.querySelectorAll('.menu a, .menu-supporter-btn');

    menuToggle.addEventListener('click', function() {
        if (menu.style.display === 'flex') {
            menu.style.display = 'none';
            menuToggle.classList.remove('is-open');
        } else {
            menu.style.display = 'flex';
            menuToggle.classList.add('is-open');
        }
    });

    menuLinks.forEach(a => {
        a.addEventListener('click', function(){
            menu.style.display = 'none';
            menuToggle.classList.remove('is-open');
        })
    });
}
