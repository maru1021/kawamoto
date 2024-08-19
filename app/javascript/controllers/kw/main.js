import { supporterContext } from 'controllers/kw/supporterContext';
import { searchSupporter } from 'controllers/kw/searchSupporter';
import { searchAddress } from 'controllers/home/searchAddress';
import { PDFUpload } from 'controllers/kw/PDFUpload';

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