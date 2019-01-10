import { Component, ViewChild } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';

import { Chart } from 'chart.js';

/**
 * Generated class for the ServiceBundlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-bundle',
  templateUrl: 'service-bundle.html',
})
export class ServiceBundlePage {

  @ViewChild('barCanvas') barCanvas;
  barChart: any;


  id = 'AngularChart2';
  width = "100%";
  height = 300;
  type = 'pie2d';
  dataFormat = 'json';
  dataSource;
  public myJson;


  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';




  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService) {
    this.dataSource = {
      "chart": {
        "theme": "fint",
        "text": "asdfasdf"
      },
      "data": [{
        "label": "Non/Usage",
        "value": 500
      },
      {
        "label": "Calls",
        "value": 190
      },
      {
        "label": "Data",
        "value": 300
      },
      {
        "label": "SMS/MMS",
        "value": 120
      }
      ]
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceBundlePage');
    this.ionicInit();

  }

  goback() {
    this.navCtrl.pop();
  }

  ionicInit() {

    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }
  }

}
