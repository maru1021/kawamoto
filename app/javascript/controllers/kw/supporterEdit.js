import { csrfToken, supporterUrl, supporterModal, supporterForm, supporterSaveButton } from "controllers/home/const";
import { supporterValid } from "controllers/home/supporterValid";
import { supporterContextMenu } from "controllers/kw/const";

export function supporterGetData(id){
    supporterContextMenu.style.display = 'none'

    fetch(`${supporterUrl}/${id}`, {
        method: 'GET',
        headers: {
            'X-CSRF-Token': csrfToken,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("通信に失敗しました。");
        }
    })
    .then(data => {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                const inputField = supporterForm.querySelector(`[name="${key}"]`);
                if (inputField) {
                    inputField.value = data[key];
                }
            }
        }
        supporterSaveButton.setAttribute('data-id', data.id);
        supporterModal.show()
        supporterSaveButton.addEventListener('click', supporterEdit)
    })
    .catch(error => {
        console.error('エラー:', error);
    })
}

function supporterEdit(e){
    e.preventDefault()
    const id = this.getAttribute('data-id')

    let valid = supporterValid()

    if(!valid){
        return
    }

    const formData = new FormData(supporterForm);

    fetch(`${supporterUrl}/${id}`, {
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
    .then(data => {
        const row = document.getElementById(id);
        const supporter = data.supporter;
        row.querySelector('.supporter-name').textContent = supporter.name;
        row.querySelector('.supporter-post').textContent = supporter.post;
        row.querySelector('.supporter-address').textContent = supporter.address;
        row.querySelector('.supporter-phone').textContent = supporter.phone;
        row.querySelector('.supporter-birth').textContent = supporter.birth;

        supporterModal.hide()
        toastr.success('編集に成功しました。');
    })
    .catch(error => {
        console.error('エラー:', error);
    })
}
