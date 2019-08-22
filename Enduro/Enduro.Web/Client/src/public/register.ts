import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ApiService } from "shared/ApiService";
import { ValidationRules, ValidationController, validateTrigger, ValidationRenderer } from 'aurelia-validation';
import { SignUpValidationRenderer } from "./SignUpValidationRenderer";

@autoinject
export class Register {

  signUpForm: HTMLElement;
  signupTitleText: HTMLElement;
  user: User;
  email: any;
  fullName: any;
  password: any;
  confirmPassword: any;
  validationRenderer: ValidationRenderer;

  constructor(private router: Router, private api: ApiService, private validator: ValidationController) {
    this.user = new User();
    this.validator.validateTrigger = validateTrigger.change;
    this.generateValidationRules();
    this.validationRenderer = new SignUpValidationRenderer();
  }

  async signUpPost() {
    let response = await this.api.post("/registration", this.user)
    await this.showSuccessMessage();
  }
  generateValidationRules() {
    ValidationRules.customRule(
      'matchesProperty',
      (value, obj, otherPropertyName) =>
        value === null
        || value === undefined
        || value === ''
        || obj[otherPropertyName] === null
        || obj[otherPropertyName] === undefined
        || obj[otherPropertyName] === ''
        || value === obj[otherPropertyName],
      '${$displayName} must match ${$getDisplayName($config.otherPropertyName)}', otherPropertyName => ({ otherPropertyName })
    );

  }
  showSuccessMessage() {
    let form = this.signUpForm;

    let message = document.createElement('p');
    message.innerHTML = `<b>A verification email has been sent to <span style="color: #2dc997">${this.user.email}</span>, please follow the link inside to verify 
                      your account and start your journey with us.</b>`;

    this.signupTitleText.innerText = "Almost done!";
    form.parentNode.replaceChild(message, form);
  }
}
class User {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
