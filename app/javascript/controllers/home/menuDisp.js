export function menuDisp(){
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    const menuLinks = document.querySelectorAll('.menu a');

    menuToggle.addEventListener('click', function() {
        if (menu.style.display === 'flex') {
        menu.style.display = 'none';
        menuToggle.textContent = '☰'
        } else {
        menu.style.display = 'flex';
        menuToggle.textContent = '×'
        }
    });

    menuLinks.forEach(a => {
        a.addEventListener('click', function(){
        menu.style.display = 'none';
        menuToggle.textContent = '☰'
        })
    });
}