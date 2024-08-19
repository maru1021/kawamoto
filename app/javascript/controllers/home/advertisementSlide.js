export function advertisementSlide(direction, visibleCount, currentIndex) {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const advertisementElement = document.querySelector('.advertisement');
    const thumbnails = document.querySelectorAll('.advertisement-thumbnail');
    const thumbnailWidth = thumbnails[0].offsetWidth;
    const maxIndex = thumbnails.length - visibleCount;

    currentIndex += direction;

    if (currentIndex <= 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
    }

    if (currentIndex >= maxIndex) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }

    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    advertisementElement.style.transform = `translateX(${-currentIndex * thumbnailWidth}px)`;
    return currentIndex;
}