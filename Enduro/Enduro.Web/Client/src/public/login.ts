import { EventTest } from 'public/EventTest';
import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { EventAggregator } from 'aurelia-event-aggregator';
import { ApiService } from 'shared/ApiService';

@autoinject
export class Login {
  subs: any;
  errorText: HTMLElement;
  rememberMeChecked: boolean;
  user: User;

  constructor(private router: Router, private eventAggregator: EventAggregator, private api: ApiService) {
    this.subs = this.eventAggregator.subscribe(EventTest, () => {
    })
  }
  activate() {
  }
  deactivate() {
    this.subs.dispose();
  }
  detached() {
  }
  attached(){
    this.errorText.style.display="none";

  }
  async signInUser() {
    this.api.persistStorage = this.rememberMeChecked;

    let response = await this.api.authenticate(this.user);
    if (response === undefined) {
      this.errorText.style.display = "block";
      this.errorText.style.color ="red";
      this.errorText.style.fontWeight = "bold";
    } else {
      this.router.navigate('home');
      this.errorText.style.display = "none";
    }
  }

  toRegister() {
    this.router.navigate('register')
  }
}
class User {
  username: string;
  password: string;
}
