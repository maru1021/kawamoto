import { menuDisp } from "controllers/home/menuDisp";
import { supporterRegister } from "controllers/home/supporterRegister";
import { advertisementSlide } from "controllers/home/advertisementSlide";
import { searchAddress } from "controllers/home/searchAddress";
import { scrollEffects } from "controllers/home/scrollEffects";
import { heroAnim } from "controllers/home/heroAnim";

let initialized = false;

function init() {
    if (initialized) return;
    initialized = true;

    let currentIndex = 0;
    const isMobile = window.innerWidth <= 768;
    const visibleCount = isMobile ? 1 : 3;

    menuDisp();

    if (isMobile) {
        document.querySelectorAll('.carousel-hover-label').forEach(el => {
            el.style.display = 'none';
        });
    }

    const thumbnails = document.querySelectorAll('.advertisement-thumbnail');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    if (thumbnails.length <= visibleCount) {
        nextBtn.classList.add('is-hidden');
    }

    document.getElementById('supporter').addEventListener('click', () => supporterRegister());

    prevBtn.addEventListener('click', () => {
        currentIndex = advertisementSlide(-1, visibleCount, currentIndex);
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = advertisementSlide(1, visibleCount, currentIndex);
    });

    document.getElementById('searchAddressBtn').addEventListener('click', () => searchAddress());

    scrollEffects();
    heroAnim();
}

document.addEventListener('turbo:load', init);
