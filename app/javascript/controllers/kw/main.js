import { supporterContext } from './supporterContext';
import { searchSupporter } from './searchSupporter';
import { searchAddress } from '../home/searchAddress';
import { PDFUpload } from './PDFUpload';

document.addEventListener('DOMContentLoaded', function() {
    const supporterTable = document.getElementById('supporterTable');
    const search = document.getElementById('search');
    const searchAddressBtn = document.getElementById('searchAddressBtn')
    const uploadFormButton = document.getElementById('uploadFormButton');

    search.addEventListener('keyup', function(){
        const col = ['name', 'post', 'address', 'phone', 'birth']
        searchSupporter(col);
    })

    supporterTable.addEventListener('contextmenu', function(e) {
        supporterContext(e);
    });

    searchAddressBtn.addEventListener('click', function() {
        searchAddress();
    });

    uploadFormButton.addEventListener('click', function(e){
        PDFUpload(e);
    })
});