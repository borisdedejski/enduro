import {
  ValidationRenderer,
  RenderInstruction,
  ValidateResult
} from 'aurelia-validation';

export class SignUpValidationRenderer {
  render(instruction: RenderInstruction) {
    for (let { result, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
      }
    }

    for (let { result, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
      }
    }
  }

  add(element: Element, result: ValidateResult) {
    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    if (result.valid) {
      if (!formGroup.classList.contains('invalid-input')) {
        formGroup.classList.add('is-valid');
      }
    } else {
      // add the has-error class to the enclosing form-group div
      formGroup.classList.remove('is-valid');
      formGroup.classList.add('invalid-input');

      // add help-block
      const message = document.createElement('span');
      message.className = 'help-block validation-message';
      message.textContent = result.message;
      message.id = `validation-message-${result.id}`;
      formGroup.appendChild(message);
    }
  }

  remove(element: Element, result: ValidateResult) {
    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    if (result.valid) {
      if (formGroup.classList.contains('is-valid')) {
        formGroup.classList.remove('is-valid');
      }
    } else {
      // remove help-block
      const message = formGroup.querySelector(`#validation-message-${result.id}`);
      if (message) {
        formGroup.removeChild(message);

        // remove the has-error class from the enclosing form-group div
        if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
          formGroup.classList.remove('invalid-input');
        }
      }
    }
  }
}
