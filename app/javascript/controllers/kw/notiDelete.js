import { csrfToken } from 'controllers/home/const'
import { notiUrl } from 'controllers/kw/const'

export function notiDelete(id){
    fetch(`${notiUrl}/${id}`, {
        method: 'DELETE',
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
    .then(data =>{
        const notiElement = document.getElementById('notis-carousel');
        let html = ''
        for(let i in data){
            const noti = data[i]
            html += `
            <div class="notis-slide">
                <div class="notis" id="noti-${noti.id}">
                    <h3>${noti.title}</h3>
                    <div class="notiIMG">
                        ${noti.image_url ? `<img src="${noti.image_url}" alt="noti image" class="main-img">` : ''}
                    </div>
                    <pre>${noti.article}</pre>
                </div>
            </div>`
        }
        notiElement.innerHTML = html;
        toastr.success('お知らせを削除しました。');
    })
    .catch(error => {
        console.error('エラー:', error)
    })
}