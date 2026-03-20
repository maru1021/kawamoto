function getEl(id) { return document.getElementById(id); }

export function getSupporterElements() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const form = getEl('supporterForm');
    return {
        csrfToken,
        modal: new bootstrap.Modal(getEl('supporterModal')),
        form,
        inputs: form.querySelectorAll('input:not([id="csrfTokenField"])'),
        saveButton: getEl('supporterSaveButton'),
        thanks: getEl('thanks'),
    };
}
