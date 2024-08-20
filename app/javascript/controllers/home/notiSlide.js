export function notiSlide(direction, currentIndex, slideCount) {
    const prevButton = document.getElementById('noti-prev');
    const nextButton = document.getElementById('noti-next');
    const notisCarousel = document.querySelector('.notis-carousel');
    const slideWidth = document.querySelector('.notis-slide').offsetWidth;

    currentIndex += direction;

    prevButton.style.display = currentIndex <= 0 ? 'none' : 'block';
    nextButton.style.display = currentIndex >= (slideCount - 1) ? 'none' : 'block';

    notisCarousel.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

    return currentIndex;
}