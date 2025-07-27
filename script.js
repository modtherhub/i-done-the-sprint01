let phoneCounter = 0;
let emailCounter = 1;
let adminCounter = 1;
let clinicEmailCounter = 1;
let clinicPhoneCounter = 0;
let deliveryCounter = 0;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('Application');
    if (!form) {
      console.error('Form element not found!');
      return;
    } 

    const fields = [
        { id: 'ownerName', name: 'Full Name' },
        { id: 'ownerBirthDate', name: 'Date of Birth' },
        { id: 'clinicName', name: 'Clicic Name' },
        { id: 'license', name: 'License Number' },
        { id: 'address', name: 'Address' },
        { id: 'workingHours', name: 'Working Hours' },
        { id: 'ownerAddress', name: 'Owner Address'}
    ];

    const savedData = JSON.parse(localStorage.getItem('clinicFormData')) || {};
    for (const [key, value] of Object.entries(savedData)) {
      const field = document.getElementById(key);
      if (field) field.value = value;
    }

    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => {
            const currentData = JSON.parse(localStorage.getItem('clinicFormData')) || {};
            currentData[input.id] = input.value;
            localStorage.setItem('clinicFormData', JSON.stringify(currentData));
        });
    }); 

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
 
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        fields.forEach(({ id, name }) => {
          const input = document.getElementById(id);
          const errorEl = document.getElementById(id + 'Error');
          if (input && errorEl) {
            isValid = validateField(input, errorEl, name) && isValid;
          }
        });

        document.querySelectorAll('[data-email]').forEach(inputEl => {
            const errorId = inputEl.dataset.error;
            const errorEl = document.getElementById(errorId);
            if (inputEl && errorEl) {
              isValid = validateEmail(inputEl, errorEl) && isValid;
            }
        });

        document.querySelectorAll('[data-select]').forEach(selectEl => {
            const errorId = selectEl.dataset.error;
            const fieldName = selectEl.dataset.label || 'This field';
            const errorEl = document.getElementById(errorId);
            if (selectEl && errorEl) {
              isValid = validateSelect(selectEl, errorEl, fieldName) && isValid;
            }
        });

        if (!isValid) {
            const firstError = document.querySelector('.invalid');
            if (firstError) {
              firstError.scrollIntoView({behavior: 'smooth', block: 'center'});
              firstError.focus();
            }
            alert("The fields below are required.");
            return;
        }

        const clinicData = {
            clinic: {
              owner: {
                fullName: document.getElementById('ownerName')?.value || '',
                gender: document.getElementById('gender')?.value || '',
                dateOfBirth: document.getElementById('ownerBirthDate')?.value || '',
                address: document.getElementById('ownerAddress')?.value || '',
                contactInformation: {
                  email: ownerEmail?.value || '',
                  phones: arrayToObject(getDynamicFieldValues('contactFieldsContainer', 'tel')),
                  additionalEmails: arrayToObject(getDynamicFieldValues('contactFieldsContainer', 'email'))
                },
                ownershipType: document.getElementById('onwershipType')?.value || '',
                admins: arrayToObject(getDynamicFieldValues('adminFieldsContainer', 'email'))
              },
              name: document.getElementById('clinicName')?.value || '',
              licenseNumber: document.getElementById('license')?.value || '',
              address: document.getElementById('address')?.value || '',
              contactInfo: {
                email: clinicEmail?.value || '',
                phones: arrayToObject(getDynamicFieldValues('clinicContactInformation', 'tel')),
                additionalEmails: arrayToObject(getDynamicFieldValues('clinicContactInformation', 'email'))
              },
              workingHours: document.getElementById('workingHours')?.value || '',
              deliveryOptions: arrayToObject(getDynamicFieldValues('deliveryFieldsContainer', 'text'))
            }
        };

        console.log("Clinic Data:", JSON.stringify(clinicData, null, 2));

        form.reset();
        clearDynamicFields();
        clearValidationStyles();

        alert("Form submitted successfully!");
    }); 
});