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
    
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
  }

}
