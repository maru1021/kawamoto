import { csrfToken } from "controllers/home/const"
import { notiContextMenu, notiUrl, notiForm, notiModal } from "controllers/kw/const";
import { notiValid } from "controllers/kw/notiValid"

export function notiGetData(id){
    notiContextMenu.style.display = 'none'

    fetch(`${notiUrl}/${id}`, {
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
                const inputField = notiForm.querySelector(`[name="${key}"]`);
                if (inputField) {
                    inputField.value = data[key];
                }
            }
        }
        notiSaveButton.setAttribute('data-id', data.id);
        notiModal.show()
    })
    .catch(error => {
        console.error('エラー:', error);
    })
}

export function notiEdit(e, id){
    e.preventDefault()

    let valid = notiValid()

    if(!valid){
        return
    }

    const formData = new FormData(notiForm);

    fetch(`${notiUrl}/${id}`, {
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
        const notiElement = document.getElementById(`noti-${id}`);
        const noti = data.noti;
        const image_url = `${noti.image_url ? `<img src="${noti.image_url}">` : ''}`;

        notiElement.querySelector('h3').textContent = noti.title;
        notiElement.querySelector('pre').textContent = noti.article;
        notiElement.querySelector('.notiIMG').innerHTML = image_url;

        notiModal.hide()
        toastr.success('編集に成功しました。');
    })
    .catch(error => {
        console.error('エラー:', error);
    })
}