import { csrfToken, supporterUrl } from '../home/const'

export function supporterDelete(id){
    fetch(`${supporterUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'X-CSRF-Token': csrfToken,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
    })
    .then(response =>{
        if(response.ok){
            const row = document.getElementById(id);
            row.remove();
            toastr.success('削除に成功しました。');
        }
    })
    .catch(error => {
        console.error('エラー:', error)
    })
}