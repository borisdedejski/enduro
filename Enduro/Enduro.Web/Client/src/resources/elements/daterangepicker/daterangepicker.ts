import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import 'bootstrap-daterangepicker';
import * as $ from "jquery";
import * as moment from 'moment';
import { ApiService } from 'shared/ApiService';

@autoinject
export class Daterangepicker {
   @bindable({ defaultBindingMode: bindingMode.twoWay }) start;
   @bindable({ defaultBindingMode: bindingMode.twoWay }) end;
   @bindable({ defaultBindingMode: bindingMode.twoWay }) maxdate;

   startDate;
   endDate;
   element: HTMLElement;
   elementspan: HTMLElement;
   @bindable userid = ""
   constructor(private api: ApiService) {

   }

   async attached() {
       let lifetime;
       this.startDate = moment();
       this.endDate = moment();
       this.start = this.startDate.format("MMMM D, YYYY");
       this.end = this.endDate.format("MMMM D, YYYY");
       
           $(this.element).daterangepicker({
               startDate: this.startDate,
               endDate: this.endDate,
               maxDate: this.maxdate
              //  ranges: {
                   
              //  }
           }, (s, e) => this.changeValueDouble(s, e));
       
   }

   changeValueDouble(start, end) {
       $(this.elementspan).html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
       this.start = start.format("MM/DD/YYYY");
       this.end = end.format("MM/DD/YYYY");
       let evt = new CustomEvent("change", {
           detail: {
               startDate: start.format('MM/DD/YYYY'),
               endDate: end.format('MM/DD/YYYY'),

           },
           bubbles: true
       });
       this.element.dispatchEvent(evt);
   }

}
