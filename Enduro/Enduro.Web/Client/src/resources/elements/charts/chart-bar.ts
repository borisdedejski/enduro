import * as c3 from 'c3';
import { bindable } from 'aurelia-framework';

export class ChartBar {
  chart;
  chartHolder: HTMLElement;

  @bindable data: any;
  i: any;
  errorProfit: HTMLElement;
  carList: any = [];
  el :any;
  colOne:any;
  constructor(){
    this.colOne = [];
  }
  async attached() {

    await this.data;
    console.log(this.data);

    if (this.data != undefined && this.data.length > 0) {
      for(var i=0;i<this.data.length;i++){
        this.colOne.push([this.data[i].carMake,this.data[i].profitPerCar])
      }
      this.errorProfit.style.display = "none";
      let len;
      let totalWidth;
      if (this.data.length > 0) {
        len = this.data.length;
      }
      if (len > 20) {
        totalWidth = len * 65;
      }
      else {
        totalWidth = 1000;
      }
      this.chart = c3.generate({
        bindto: this.chartHolder,
        data: {
          columns: 
            this.colOne
          ,
          type: 'bar'
        },
        bar: {
          width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
          }
          // or
          //width: 100 // this makes bar width 100px
        }

      });
    }
    else {
      this.errorProfit.style.color = "red";
      this.errorProfit.style.display = "block";
      this.errorProfit.style.fontWeight = "bold";
    }
  }
  
  async dataChanged() {
    this.attached();
  }
}
