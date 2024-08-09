document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const visibleCount = 3;
    const advertisementElement = document.querySelector('.advertisement');
    const thumbnails = document.querySelectorAll('.advertisement-thumbnail');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    function slide(direction) {
        const maxIndex = thumbnails.length - visibleCount;
        currentIndex += direction;

        if (currentIndex <= 0) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block';
        }

        if (currentIndex >= thumbnails.length - visibleCount) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'block';
        }

        if (currentIndex < 0) {
            currentIndex = 0;
        } else if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        const offset = -currentIndex * (thumbnails[0].offsetWidth + 10);
        advertisementElement.style.transform = `translateX(${offset}px)`;
    }

    document.getElementById('prev').addEventListener('click', () => slide(-1));
    document.getElementById('next').addEventListener('click', () => slide(1));
});
