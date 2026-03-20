import { menuDisp } from "controllers/home/menuDisp";
import { supporterRegister } from "controllers/home/supporterRegister";
import { advertisementSlide } from "controllers/home/advertisementSlide";
import { searchAddress } from "controllers/home/searchAddress";
import { scrollEffects } from "controllers/home/scrollEffects";
import { heroAnim } from "controllers/home/heroAnim";

function init() {
    let currentIndex = 0;
    let visibleCount;
    const supporterLink = document.getElementById('supporter');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    if (window.innerWidth <= 768) {
        visibleCount = 1;
        menuDisp();
        document.querySelectorAll('.carousel-hover-label').forEach(el => {
            el.style.display = "none";
        });
    } else {
        visibleCount = 3;
    }

    const thumbnails = document.querySelectorAll('.advertisement-thumbnail');
    if (thumbnails.length <= visibleCount) {
        nextBtn.classList.add('is-hidden');
    }

    supporterLink.addEventListener('click', function() {
        supporterRegister();
    });

    prevBtn.addEventListener('click', function() {
        currentIndex = advertisementSlide(-1, visibleCount, currentIndex);
    });
    nextBtn.addEventListener('click', function() {
        currentIndex = advertisementSlide(1, visibleCount, currentIndex);
    });

    document.getElementById('searchAddressBtn').addEventListener('click', function() {
        searchAddress();
    });

    scrollEffects();
    heroAnim();
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('turbo:load', init);
