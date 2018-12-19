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
import { ServiceProvider } from '../../providers/service/service';
import { parseDate } from 'ionic-angular/util/datetime-util';

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

  public serviceData: any[];

  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public modalCtrl: ModalController, public serviceprovider: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyServicesPage');
    this.ionicInit();
  }

  setDate(value) {
    let arraySam = value.split("-");
    return arraySam[2] + ", " + this.monthNames[parseInt(arraySam[1])] + " " + arraySam[0];
  }

  getTypeSV(value) {
    let arraySam = value.split(".");
    return arraySam[0].charAt(0) + "" + arraySam[1].charAt(0) + "" + arraySam[2].charAt(0);
  }

  gotoCallHistory() {
    this.navCtrl.push(CallHistoryPage);
  }

  gotoTopupHistory() {
    this.navCtrl.push(TopupHistoryPage);
  }

  gotoServiceDetail() {
    this.navCtrl.push(ServiceDetailPage);
  }

  gotoServiceBundle() {
    this.navCtrl.push(ServiceBundlePage);
  }

  ionicInit() {

    this.serviceData = new Array();
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();

    this.serviceprovider.getServiceDisplay()

      .subscribe(
        data => {
          if (data) {
            if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
              this.translate.use('en');
            } else {
              this.translate.use(localStorage.getItem("setLang"));
            }

            for (let list of data.Items) {
              let arrayData = { "type": "GSM", "number": "", "date": "", "status": "open", "plan": "saver1", "changeState": false, "changePlan": false };
              arrayData.type = this.getTypeSV(list.$type.split(",")[0]);
              arrayData.number = list.Number;
              arrayData.date = this.setDate(list.DueDate.split("T")[0]);

              this.serviceData.push(arrayData);

            }

          }
          loading.dismiss();

        },
        error => {
          loading.dismiss();
        });
  }

  changeStateService(index) {

    let changeData = { "index": "", "status": "" };
    changeData.index = index;
    changeData.status = this.serviceData[index].status;
    localStorage.setItem("ChangeStatusPage", JSON.stringify(changeData));
    let profileModal = this.modalCtrl.create(ChangeStatusPage);
    profileModal.onDidDismiss(data => {
      if (typeof (data) != "undefined" && data != "") {
        this.serviceData[index].status = data;
      }
    });
    profileModal.present();

  }

  saveState(index) {

    this.serviceData[index].changeState = false;

  }

  changePlan(index) {

    let changeData = { "index": "", "plan": "" };
    changeData.index = index;
    changeData.plan = this.serviceData[index].plan;
    localStorage.setItem("ChangePlanPage", JSON.stringify(changeData));
    let profileModal = this.modalCtrl.create(ChangePlanPage);
    profileModal.onDidDismiss(data => {
      if (typeof (data) != "undefined" && data != "") {
        this.serviceData[index].plan = data;
      }
    });
    profileModal.present();

  }

  savePlan(index) {
    this.serviceData[index].changePlan = false;
  }

}
