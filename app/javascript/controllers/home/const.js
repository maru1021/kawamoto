export const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
export const supporterUrl = "supporter"
export const supporterModal = new bootstrap.Modal(document.getElementById('supporterModal'));
export const supporterForm = document.getElementById('supporterForm');
export const supporterInputs = supporterForm.querySelectorAll('input:not([id="csrfTokenField"])');
export const supporterSaveButton = document.getElementById('supporterSaveButton');