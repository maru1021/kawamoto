export function supporterValid(){
    const supporterInputs = supporterForm.querySelectorAll('input:not([id="csrfTokenField"])');
    let valid = true;

    supporterInputs.forEach(function(input){
        const name = input.getAttribute('name');
        if (input.value.trim() === '') {
        input.classList.add('is-invalid');
        valid = false;
        } else {
            if (name === 'post') {
                const postPattern = /^(?:\d{3}-\d{4}|\d{7})$/;
                if (!postPattern.test(input.value)) {
                    input.classList.add('is-invalid');
                    valid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            } else if (name === 'phone') {
                const phonePattern = /^(?:\d{4}-\d{2}-\d{4}|\d{3}-\d{4}-\d{4}|\d{10}|\d{11})$/;
                if (!phonePattern.test(input.value)) {
                    input.classList.add('is-invalid');
                    valid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            } else {
                input.classList.remove('is-invalid');
            }
        }
    })

    return valid;
}