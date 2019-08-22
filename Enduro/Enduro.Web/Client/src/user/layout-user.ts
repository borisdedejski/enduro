import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject
export class LayoutUser {

    constructor(public router: Router){
    }

    toggleSidebar() {
        document.getElementsByClassName('sidebar')[0].classList.toggle('d-block');
    }
}
