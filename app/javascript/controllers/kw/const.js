export const supporterContextMenu = document.getElementById('supporterContextMenu')

export const PDFRegisteModal = new bootstrap.Modal(document.getElementById('PDFRegisterModal'));
export const notiModal = new bootstrap.Modal(document.getElementById('notiModal'));
export const notiForm = document.getElementById('notiForm');
export const notiInputs = notiForm.querySelectorAll('input:not([id="csrfTokenField"]), textarea');
export const notiSaveButton = document.getElementById('notiSaveButton');
export const notiUrl = "noti"
export const notiContextMenu = document.getElementById('notiContextMenu');