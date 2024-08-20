import { notiContextMenu, notiModal } from "controllers/kw/const";
import { notiGetData } from 'controllers/kw/notiEdit';
import { notiDelete } from 'controllers/kw/notiDelete';

export function notiContext(e){
    const targetElement = e.target.closest('.notis');
    if (targetElement) {
    e.preventDefault();

    notiContextMenu.style.display = 'block';
    notiContextMenu.style.top = `${e.clientY + window.scrollY}px`;
    notiContextMenu.style.left = `${e.clientX + window.scrollX}px`;

    const notiId = targetElement.id.replace("noti-", '');
    const editElement = document.getElementById('notiMenuEdit');
    const deleteElement = document.getElementById('notiMenuDelete');

    editElement.replaceWith(editElement.cloneNode(true));
    deleteElement.replaceWith(deleteElement.cloneNode(true));

    const newEditElement = document.getElementById('notiMenuEdit');
    const newDeleteElement = document.getElementById('notiMenuDelete');

    newEditElement.addEventListener('click', function() {
        notiGetData(notiId);
    });

    newDeleteElement.addEventListener('click', function() {
        notiContextMenu.style.display = 'none';
        if (confirm('本当に削除しますか？')) {
            notiDelete(notiId);
        }
    });
    }
}

document.addEventListener('click', function() {
    notiContextMenu.style.display = 'none';
});