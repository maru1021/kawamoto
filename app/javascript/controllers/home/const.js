export const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
export const supporterUrl = "supporter"
export const supporterModal = new bootstrap.Modal(document.getElementById('supporterModal'));
export const supporterSaveButton = document.getElementById('supporterSaveButton');