export function advertisementSlide(direction, visibleCount, currentIndex) {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const advertisementElement = document.querySelector('.advertisement');
    const thumbnails = document.querySelectorAll('.advertisement-thumbnail');
    const thumbnailWidth = thumbnails[0].offsetWidth;
    const maxIndex = thumbnails.length - visibleCount;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    // Toggle button visibility via class
    if (currentIndex <= 0) {
        prevButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
    }

    if (currentIndex >= maxIndex) {
        nextButton.classList.add('is-hidden');
    } else {
        nextButton.classList.remove('is-hidden');
    }

    advertisementElement.style.transform = `translateX(${-currentIndex * thumbnailWidth}px)`;
    return currentIndex;
}
