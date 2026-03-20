const PATTERNS = {
    post:  /^(?:\d{3}-\d{4}|\d{7})$/,
    phone: /^(?:\d{4}-\d{2}-\d{4}|\d{3}-\d{4}-\d{4}|\d{10}|\d{11})$/,
};

export function supporterValid(inputs) {
    let valid = true;

    inputs.forEach(input => {
        const name = input.getAttribute('name');
        const value = input.value.trim();
        const pattern = PATTERNS[name];
        const isValid = value !== '' && (!pattern || pattern.test(value));

        input.classList.toggle('is-invalid', !isValid);
        if (!isValid) valid = false;
    });

    return valid;
}
