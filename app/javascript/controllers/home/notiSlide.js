export function notiSlide(direction, currentIndex, slideCount) {
    const prevButton = document.getElementById('noti-prev');
    const nextButton = document.getElementById('noti-next');
    const carousel = document.querySelector('.notis-carousel');
    const slideWidth = document.querySelector('.notis-slide').offsetWidth;

    currentIndex = Math.max(0, Math.min(currentIndex + direction, slideCount - 1));

    prevButton.style.display = currentIndex <= 0 ? 'none' : 'block';
    nextButton.style.display = currentIndex >= slideCount - 1 ? 'none' : 'block';

    carousel.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    return currentIndex;
}
