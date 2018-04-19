import { Component } from '@angular/core';
import { CallHistoryPage } from '../call-history/call-history';
import { TopupHistoryPage } from '../topup-history/topup-history';
import { ServiceDetailPage } from '../service-detail/service-detail';
import { ServiceBundlePage } from '../service-bundle/service-bundle';

import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';
import { ChangeStatusPage } from '../change-status/change-status';
import { ChangePlanPage } from '../change-plan/change-plan';

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
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public modalCtrl: ModalController) {
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

    // this.navCtrl.push(ChangeStatusPage, { navParams: index });
    let change_data = { "index": "", "status": "" };
    change_data.index = index;
    change_data.status = this.service_Data[index].status;
    localStorage.setItem("ChangeStatusPage", JSON.stringify(change_data));
    let profileModal = this.modalCtrl.create(ChangeStatusPage);
    profileModal.onDidDismiss(data => {
      console.log(data);
      if (typeof (data) != "undefined") {
        this.service_Data[index].status = data;
      }
    });
    profileModal.present();

  }

  save_state(index) {

    this.service_Data[index].change_state = false;

  }

  change_plan(index) {

    // this.navCtrl.push(ChangePlanPage, { navParams: index });
    let change_data = { "index": "", "plan": "" };
    change_data.index = index;
    change_data.plan = this.service_Data[index].plan;
    localStorage.setItem("ChangePlanPage", JSON.stringify(change_data));
    let profileModal = this.modalCtrl.create(ChangePlanPage);
    profileModal.onDidDismiss(data => {
      console.log(data);
      if (typeof (data) != "undefined") {
        this.service_Data[index].plan = data;
      }
    });
    profileModal.present();

  }

  save_plan(index) {
    this.service_Data[index].change_plan = false;
  }

}
