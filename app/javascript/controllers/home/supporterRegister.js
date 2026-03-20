import { supporterValid } from "controllers/home/supporterValid";
import { getSupporterElements } from "controllers/home/const";

let bound = false;

export function supporterRegister() {
    const { csrfToken, modal, form, inputs, saveButton, thanks } = getSupporterElements();

    modal.show();
    modal._element.addEventListener('hidden.bs.modal', () => {
        form.style.display = 'block';
        thanks.style.display = 'none';
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
            input.value = '';
        });
    });

    if (bound) return;
    bound = true;

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (!supporterValid(inputs)) return;

        fetch('/', {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken,
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: new FormData(form),
        })
        .then(response => {
            if (!response.ok) throw new Error('通信に失敗しました。');
            return response.json();
        })
        .then(() => {
            form.style.display = 'none';
            thanks.style.display = 'block';
        })
        .catch(error => {
            console.error('エラー:', error);
            alert('登録に失敗しました。もう一度お試しください。');
        });
    });
}
