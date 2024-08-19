export const supporterContextMenu = document.getElementById('supporterContextMenu')

const notiForm = document.getElementById('notiForm');
const notiInputs = notiForm.querySelectorAll('input:not([id="csrfTokenField"])');
const notiSaveButton = document.getElementById('notiSaveButton');
const notiModal = new bootstrap.Modal(document.getElementById('notiModal'));