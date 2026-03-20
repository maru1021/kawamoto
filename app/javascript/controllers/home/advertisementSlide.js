function loadLazyImages(thumbnails, currentIndex, visibleCount) {
    for (let i = currentIndex; i < currentIndex + visibleCount + 1 && i < thumbnails.length; i++) {
        const img = thumbnails[i].querySelector('.lazy-img');
        if (img && !img.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy-img');
        }
    }
}

export function advertisementSlide(direction, visibleCount, currentIndex) {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const track = document.querySelector('.advertisement');
    const thumbnails = document.querySelectorAll('.advertisement-thumbnail');
    const maxIndex = thumbnails.length - visibleCount;

    currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));

    prevButton.classList.toggle('is-hidden', currentIndex <= 0);
    nextButton.classList.toggle('is-hidden', currentIndex >= maxIndex);

    loadLazyImages(thumbnails, currentIndex, visibleCount);

    track.style.transform = `translateX(${-currentIndex * thumbnails[0].offsetWidth}px)`;
    return currentIndex;
}
