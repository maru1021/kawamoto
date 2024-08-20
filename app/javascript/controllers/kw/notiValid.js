import { notiInputs } from "controllers/kw/const";

export function notiValid(){
    let valid = true

    notiInputs.forEach(function(input){
        if (input.type !== 'file') {
            if (input.value.trim() === '') {
                input.classList.add('is-invalid');
                valid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        }
    })

    return valid;
}