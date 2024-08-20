import { csrfToken } from "controllers/home/const"
import { notiModal, notiForm, notiUrl } from "controllers/kw/const"
import { notiValid } from "controllers/kw/notiValid";

export function notiRegister(e){
    e.preventDefault();
    let valid = notiValid();

    if(!valid){
        return
    }

    const formData = new FormData(notiForm);
    fetch(notiUrl, {
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
        const notiElement = document.getElementById('notis-carousel');
        let html = ''
        for(let i in data){
            const noti = data[i]
            html += `
            <div class="notis-slide">
                <div class="notis" id="noti-${noti.id}">
                    <div class="notiIMG">
                        ${noti.image_url ? `<img src="${noti.image_url}" alt="noti image" class="main-img">` : ''}
                    </div>
                    <h3>${noti.title}</h3>
                    <pre>${noti.article}</pre>
                </div>
            </div>`
        }
        notiElement.innerHTML = html;
        notiModal.hide();
        toastr.success('お知らせを登録しました。');
    })
    .catch(error => {
        console.error('エラー:', error);
    });
}

