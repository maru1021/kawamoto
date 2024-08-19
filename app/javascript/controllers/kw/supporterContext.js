import { supporterGetData } from 'controllers/kw/supporterEdit';
import { supporterDelete } from 'controllers/kw/supporterDelete';
import { supporterContextMenu } from 'controllers/kw/const';

export function supporterContext(e){
    const targetElement = e.target.closest('tr');
    if (targetElement && targetElement.parentElement.tagName === 'TBODY') {
        e.preventDefault();
        supporterContextMenu.style.display = 'block';
        supporterContextMenu.style.top = `${e.clientY + window.scrollY}px`;
        supporterContextMenu.style.left = `${e.clientX + window.scrollX}px`;
        supporterContextMenu.style.zIndex = '1000';

        const trId = targetElement.id;
        const editElement = document.getElementById('supporterMenuEdit');
        const deleteElement = document.getElementById('supporterMenuDelete');

        editElement.replaceWith(editElement.cloneNode(true));
        deleteElement.replaceWith(deleteElement.cloneNode(true));

        const newEditElement = document.getElementById('supporterMenuEdit');
        const newDeleteElement = document.getElementById('supporterMenuDelete');

        newEditElement.addEventListener('click', function(){
            supporterGetData(trId);
        });
        newDeleteElement.addEventListener('click', function(){
            supporterContextMenu.style.display = 'none';
            if(confirm('本当に削除しますか?')){
                supporterDelete(trId);
            }
        });
    }
}

document.addEventListener('click', function(e) {
    if (!supporterContextMenu.contains(e.target)) {
        supporterContextMenu.style.display = 'none';
    }
});