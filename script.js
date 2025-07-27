let phoneCounter = 0;
let emailCounter = 1;
let adminCounter = 1;
let clinicEmailCounter = 1;
let clinicPhoneCounter = 0;
let deliveryCounter = 0;

document.addEventListener('DOMContentLoaded', () => {
    const fields = [
        { id: 'ownerName', name: 'Full Name' },
        { id: 'ownerBirthDate', name: 'Date of Birth' },
        { id: 'clinicName', name: 'Clicic Name' },
        { id: 'license', name: 'License Number' },
        { id: 'address', name: 'Address' },
        { id: 'workingHours', name: 'Working Hours' },
        { id: 'ownerAddress', name: 'Owner Address'}
    ];

    fields.forEach(({ id, name }) => {
        const input = document.getElementById(id);
        const errorEl = document.getElementById(id + 'Error');
        if (input && errorEl) {
          input.addEventListener('blur', () => validateField(input, errorEl, name));
          input.addEventListener('input', () => validateField(input, errorEl, name));
        }
    });

    setupEmailValidation();
    setupSelectValidation();
});