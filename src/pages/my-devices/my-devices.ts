import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { TransactionHistoryPage } from '../transaction-history/transaction-history';
import { TopupHistoryPage } from '../topup-history/topup-history';
import { ServiceDetailPage } from '../service-detail/service-detail';
import { ServiceBundlePage } from '../service-bundle/service-bundle';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';
import { TopUpPage } from '../top-up/top-up';


/**
 * Generated class for the MyDevicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-devices',
  templateUrl: 'my-devices.html',
})
export class MyDevicesPage {

  public device_Data = [
    { "type": "GSM", "device_id": "041523", "date": "12, March 2017", "status": "open", "plan": "saver1", "change_state": false, "change_plan": false },
    { "type": "GSM", "device_id": "245678", "date": "12, March 2017", "status": "open", "plan": "saver1", "change_state": false, "change_plan": false },
    { "type": "GSM", "device_id": "875482", "date": "12, March 2017", "status": "open", "plan": "saver3", "change_state": false, "change_plan": false },
    { "type": "GSM", "device_id": "685683", "date": "12, March 2017", "status": "open", "plan": "saver2", "change_state": false, "change_plan": false }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDevicesPage');
    this.ionicInit();
  }

  goto_transactionHistory() {
    this.navCtrl.push(TransactionHistoryPage);
  }

  goto_topupHistory() {
    // this.navCtrl.push(TopupHistoryPage);
    this.navCtrl.push(TopUpPage);
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
    for (let list of this.device_Data) {
      if (list.change_state) {
        temp_state = true;
      }
    }

    if (!this.device_Data[index].change_state && !temp_state) {
      for (let list of this.device_Data) {
        list.change_state = false;
      }
      this.device_Data[index].change_state = true;
    }
  }

  save_state(index) {
    this.device_Data[index].change_state = false;
  }

  change_plan(index) {

    let temp_state = false;
    for (let list of this.device_Data) {
      if (list.change_plan) {
        temp_state = true;
      }
    }

    if (!this.device_Data[index].change_plan && !temp_state) {
      for (let list of this.device_Data) {
        list.change_plan = false;
      }
      this.device_Data[index].change_plan = true;
    }
  }

  save_plan(index) {
    this.device_Data[index].change_plan = false;
  }

}
