function createInputField(containerId, type, labelText, placeholder, isRequired, counter) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found!`);
    return;
  }

  const fieldId = `${type}${counter}`;
  const errorId = `${fieldId}Error`;

  const fieldWrapper = document.createElement('div');
  fieldWrapper.classList.add('field-entry');
  
  fieldWrapper.innerHTML = `
    <div class="custom-form">
      <div class="group">
        <input 
          type="${type}" 
          id="${fieldId}" 
          name="${type}" 
          placeholder=""
          ${isRequired ? 'required' : ''}
          data-error="${fieldId}Error"
          ${type === "email" ? 'data-email="true"' : ''}
        />
        <label class="floating-label" for="${fieldId}">${labelText}</label>
        <span id="${fieldId}Error" class="error"></span>
      </div>
    </div>
     
    <button type="button" class="removeBtn" onclick="this.parentNode.remove()">Remove</button>
  `;

  container.appendChild(fieldWrapper);

  const inputEl = document.getElementById(fieldId);
  const errorEl = document.getElementById(errorId);

  if (!inputEl || !errorEl) {
    console.error('Failed to create input or error element!');
    return;
  }

  inputEl.addEventListener('blur', () => validateField(inputEl, errorEl, labelText));
  inputEl.addEventListener('input', () => validateField(inputEl, errorEl, labelText));
 
  if (type === 'email') {
    inputEl.addEventListener('blur', () => validateEmail(inputEl, errorEl));
    inputEl.addEventListener('input', () => validateEmail(inputEl, errorEl));
  }
}