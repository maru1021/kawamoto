import { supporterValid } from "controllers/home/supporterValid";
import { csrfToken, supporterModal, supporterForm, supporterInputs, supporterSaveButton } from "controllers/home/const";

export function addSupporter(){
    const thanks = document.getElementById('thanks');

    supporterModal.show();
    supporterModal._element.addEventListener('hidden.bs.modal', function() {
        supporterForm.style.display = "block";
        thanks.style.display = "none";
        supporterInputs.forEach(function(input){
            input.classList.remove('is-invalid');
            input.value = "";
        })
    });
}

supporterSaveButton.addEventListener("click", function(event){
    event.preventDefault();
    let valid = supporterValid();

    if(!valid){
    return
    }

    const formData = new FormData(supporterForm);
    fetch('/', {
    method: 'POST',
    headers: {
        'X-CSRF-Token': csrfToken,
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    body: formData
    })
    .then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("通信に失敗しました。");
    }
    })
    .then(() => {
        supporterForm.style.display = 'none';
        thanks.style.display = 'block';
    })
    .catch(error => {
        console.error('エラー:', error);
    });
});