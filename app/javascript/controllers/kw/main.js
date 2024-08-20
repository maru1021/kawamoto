import { notiSlide } from 'controllers/home/notiSlide';
import { PDFRegisteModal, notiModal, notiSaveButton } from 'controllers/kw/const';
import { supporterContext } from 'controllers/kw/supporterContext';
import { searchSupporter } from 'controllers/kw/searchSupporter';
import { searchAddress } from 'controllers/home/searchAddress';
import { PDFUpload } from 'controllers/kw/PDFUpload';
import { notiRegister } from 'controllers/kw/notiRegister';
import { notiContext } from 'controllers/kw/notiContext';
import { notiEdit } from 'controllers/kw/notiEdit';


document.addEventListener('DOMContentLoaded', function() {
    const supporterTable = document.getElementById('supporterTable');
    const search = document.getElementById('search');
    const searchAddressBtn = document.getElementById('searchAddressBtn');
    const uploadFormButton = document.getElementById('uploadFormButton');
    const PDFModalDisp = document.getElementById('PDFRegister');
    const notiModalDisp = document.getElementById('notiRegister');

    PDFModalDisp.addEventListener('click', function(){
        PDFRegisteModal.show();
    });

    notiModalDisp.addEventListener('click', function(){
        notiModal.show();
    });

    notiSaveButton.addEventListener('click', function(e){
        const dataId = this.getAttribute('data-id');
        if(dataId){
            notiEdit(e, dataId)
        }else{
            notiRegister(e);
        }
    })

    document.getElementById('notiModal').addEventListener('hidden.bs.modal', function(){
        const inputs = document.querySelectorAll('#notiForm input, #notiForm textarea');
        inputs.forEach(function(input) {
            input.value = '';
            input.classList.remove('is-invalid');
        });

        notiSaveButton.removeAttribute('data-id');
    })

    search.addEventListener('keyup', function(){
        const col = ['name', 'post', 'address', 'phone', 'birth']
        searchSupporter(col);
    });

    supporterTable.addEventListener('contextmenu', function(e) {
        supporterContext(e);
    });

    document.querySelector('.notis-container').addEventListener('contextmenu', function(e){
        notiContext(e)
    })

    searchAddressBtn.addEventListener('click', function() {
        searchAddress();
    });

    uploadFormButton.addEventListener('click', function(e){
        PDFUpload(e);
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