import { Component } from '@angular/core';
import { CallHistoryPage } from '../call-history/call-history';
import { TopupHistoryPage } from '../topup-history/topup-history';
import { ServiceDetailPage } from '../service-detail/service-detail';
import { ServiceBundlePage } from '../service-bundle/service-bundle';

import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the MyServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-services',
  templateUrl: 'my-services.html',
})
export class MyServicesPage {

  // public service_Data = [
  //   { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "Open", "plan": "Saver1" },
  //   { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "Open", "plan": "Saver1" },
  //   { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "Open", "plan": "Saver1" },
  //   { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "Open", "plan": "Saver1" }
  // ];
  public service_Data = [
    { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "open", "plan": "saver1", "change_state": false, "change_plan": false },
    { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "open", "plan": "saver1", "change_state": false, "change_plan": false },
    { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "open", "plan": "saver3", "change_state": false, "change_plan": false },
    { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "open", "plan": "saver2", "change_state": false, "change_plan": false }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyServicesPage');
    this.ionicInit();
  }

  goto_callHistory() {
    this.navCtrl.push(CallHistoryPage);
  }

  goto_topupHistory() {
    this.navCtrl.push(TopupHistoryPage);
  }

  goto_serviceDetail() {
    this.navCtrl.push(ServiceDetailPage);
  }

  goto_serviceBundle() {
    this.navCtrl.push(ServiceBundlePage);
  }

  ionicInit() {
    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
  }

  change_state(index) {

    let temp_state = false;
    for (let list of this.service_Data) {
      if (list.change_state) {
        temp_state = true;
      }
    }

    if (!this.service_Data[index].change_state && !temp_state) {
      for (let list of this.service_Data) {
        list.change_state = false;
      }
      this.service_Data[index].change_state = true;
    }
  }

  save_state(index) {
    this.service_Data[index].change_state = false;
  }

  change_plan(index) {

    let temp_state = false;
    for (let list of this.service_Data) {
      if (list.change_plan) {
        temp_state = true;
      }
    }

    if (!this.service_Data[index].change_plan && !temp_state) {
      for (let list of this.service_Data) {
        list.change_plan = false;
      }
      this.service_Data[index].change_plan = true;
    }
  }

  save_plan(index) {
    this.service_Data[index].change_plan = false;
  }

}
