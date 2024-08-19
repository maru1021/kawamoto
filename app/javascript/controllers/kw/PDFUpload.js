import { csrfToken } from "../home/const";

export function PDFUpload(e){
    uploadFormButton.disabled = true;
    e.preventDefault()

    const formData = new FormData();
    const fileField = document.getElementById('pdf');

    if(fileField.files.length === 0){
        alert('PDFファイルを選択してください')
    }

    formData.append('pdf', fileField.files[0]);
    fileField.value = '';

    fetch('/advertisements', {
        method: 'POST',
        headers: {
        'X-CSRF-Token': csrfToken
        },
        body: formData
    })
    .then(response => {
        if(response.ok){
            toastr.success('アップロードに成功しました。');
        }else{
            toastr.error('アップロードに失敗しました。');
        }
    })
    .catch(error => {
        console.error('エラー:', error);
    })
    .finally(() => {
        uploadFormButton.disabled = false;
    });
}