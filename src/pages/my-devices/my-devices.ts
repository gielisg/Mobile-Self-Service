import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { TransactionHistoryPage } from '../transaction-history/transaction-history';
import { TopupHistoryPage } from '../topup-history/topup-history';
import { ServiceDetailPage } from '../service-detail/service-detail';
import { ServiceBundlePage } from '../service-bundle/service-bundle';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';
import { TopUpPage } from '../top-up/top-up';
import { ChangePlanPage } from '../change-plan/change-plan';
import { ChangeStatusPage } from '../change-status/change-status';


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

  public deviceData = [
    { "type": "GSM", "deviceId": "041523", "date": "12, March 2017", "status": "open", "plan": "saver1", "changeState": false, "changePlan": false },
    { "type": "GSM", "deviceId": "245678", "date": "12, March 2017", "status": "open", "plan": "saver1", "changeState": false, "changePlan": false },
    { "type": "GSM", "deviceId": "875482", "date": "12, March 2017", "status": "open", "plan": "saver3", "changeState": false, "changePlan": false },
    { "type": "GSM", "deviceId": "685683", "date": "12, March 2017", "status": "open", "plan": "saver2", "changeState": false, "changePlan": false }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDevicesPage');
    this.ionicInit();
  }

  gotoTransactionHistory() {
    this.navCtrl.push(TransactionHistoryPage);
  }

  gotoTopupHistory() {
    this.navCtrl.push(TopUpPage);
  }

  gotoServiceDetail() {
    this.navCtrl.push(ServiceDetailPage);
  }

  gotoServiceBundle() {
    this.navCtrl.push(ServiceBundlePage);
  }

  ionicInit() {

    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }
  }

  changeStateDevice(index) {
    let changeData = { "index": "", "status": "" };
    changeData.index = index;
    changeData.status = this.deviceData[index].status;
    localStorage.setItem("ChangeStatusPage", JSON.stringify(changeData));
    let profileModal = this.modalCtrl.create(ChangeStatusPage);
    profileModal.onDidDismiss(data => {
      if (typeof (data) != "undefined" && data != "") {
        this.deviceData[index].status = data;
      }
    });
    profileModal.present();
  }

  saveState(index) {
    this.deviceData[index].changeState = false;
  }

  changePlanDevice(index) {
    let changeData = { "index": "", "plan": "" };
    changeData.index = index;
    changeData.plan = this.deviceData[index].plan;
    localStorage.setItem("ChangePlanPage", JSON.stringify(changeData));
    let profileModal = this.modalCtrl.create(ChangePlanPage);
    profileModal.onDidDismiss(data => {
      if (typeof (data) != "undefined" && data != "") {
        this.deviceData[index].plan = data;
      }
    });
    profileModal.present();
  }

  savePlan(index) {
    this.deviceData[index].changePlan = false;
  }

}
