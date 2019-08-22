import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject, bindable, bindingMode } from 'aurelia-framework';

import * as moment from 'moment';
import * as $ from 'jquery';


@autoinject
export class DataTable {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) userId;
    
    constructor() {
      
    }

    createTable() {
        
    }

    attached() {
       
    }
}
