import { menuDisp } from "controllers/home/menuDisp";
import { supporterRegister } from "controllers/home/supporterRegister";
import { advertisementSlide } from "controllers/home/advertisementSlide";
import { searchAddress } from "controllers/home/searchAddress";
import { notiSlide } from "controllers/home/notiSlide"

document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    let visibleCount;
    const supporterLink = document.getElementById('supporter');

    if (window.innerWidth <= 480) {
        const lineLink = document.getElementById('line-link');
        const partyLink = document.getElementById('party-link');
        const hoverText = document.querySelectorAll('.hover-text')

        visibleCount = 1;
        menuDisp();
        lineLink.innerHTML = "公式Line";
        partyLink.innerHTML = "日本共産党リンク";
        supporterLink.style.display = "inline-block";
        supporterLink.style.textAlign = "left";
        hoverText.forEach(function(element) {
            element.style.display = "none";
        })
    } else {
        visibleCount = 3;
    }

    supporterLink.addEventListener('click', function() {
        supporterRegister();
    });

    document.getElementById('prev').addEventListener('click', function(){
        currentIndex = advertisementSlide(-1, visibleCount, currentIndex);
    })
    document.getElementById('next').addEventListener('click', function(){
        currentIndex = advertisementSlide(1, visibleCount, currentIndex);
    });

    document.getElementById('searchAddressBtn').addEventListener('click', function() {
        searchAddress()
    });

    let notiCurrentIndex = 0;
    const notiSlideCount = document.querySelectorAll('.notis-slide').length;

    document.getElementById('noti-prev').addEventListener('click', function(){
        notiCurrentIndex = notiSlide(-1, notiCurrentIndex, notiSlideCount);
    });

    document.getElementById('noti-next').addEventListener('click', function(){
        notiCurrentIndex = notiSlide(1, notiCurrentIndex, notiSlideCount);
    });
});