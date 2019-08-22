import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import 'bootstrap-daterangepicker';
import * as $ from "jquery";
import * as moment from 'moment';

@autoinject
export class Datepicker {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) start;

  element: HTMLElement;
  elementspan: HTMLElement;

  attached() {
    if (typeof (this.start) == "undefined") {
      this.start = moment();
    }

    $(this.element).daterangepicker({
      startDate: this.start,
      singleDatePicker: true,
      minDate: this.start,
    }, (s) => this.changeValueSingle(s));

    this.changeValueSingle(this.start);
  }

  changeValueSingle(start) {

    $(this.elementspan).html(start.format('MMMM D, YYYY'));
    let evt = new CustomEvent("changing", {
      detail: {
        startDate: start.format('MMMM D YYYY'),
      },
      bubbles: true
    });
    this.element.dispatchEvent(evt);
  }
}
