function createElement(tag, attributes = {}, content = '') {
  const el = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  if (content) {
    el.textContent = content;
  }
  return el;
}

function addElementToDOM(id, content) {
  let container = document.getElementById(id);
  if (!container) {
    container = createElement('div', { id });
    document.body.appendChild(container);
  }
  container.textContent = content;
}

function removeElementFromDOM(id) {
  const el = document.getElementById(id);
  if (el) {
    el.remove();
  }
}

function displayErrorMessage(id, message) {
  let errorEl = document.getElementById(id);
  if (!errorEl) {
    errorEl = createElement('div', { id, class: 'error-message' });
    document.body.appendChild(errorEl);
  }
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
}

function simulateClick(id, message) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element with id "${id}" not found`);

  const newEl = el.cloneNode(true);
  el.parentNode.replaceChild(newEl, el);

  newEl.addEventListener('click', () => {
    addElementToDOM(id, message);
  });

  newEl.click();
}

function handleFormSubmit(formId, outputId) {
  const form = document.getElementById(formId);
  const output = document.getElementById(outputId);

  if (!form) {
    displayErrorMessage('error-message', `Form with id "${formId}" not found`);
    return;
  }

  const newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);

  newForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = newForm.querySelector('input');
    if (!input || !input.value.trim()) {
      displayErrorMessage('error-message', 'Input cannot be empty');
      return;
    }
    if (output) {
      output.textContent = input.value;
    }
  });

  newForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

module.exports = {
  createElement,
  addElementToDOM,
  removeElementFromDOM,
  displayErrorMessage,
  simulateClick,
  handleFormSubmit,
};