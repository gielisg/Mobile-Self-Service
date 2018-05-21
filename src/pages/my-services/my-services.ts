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

  // public service_Data = [
  //   { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "Open", "plan": "Saver1" },
  //   { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "Open", "plan": "Saver1" },
  //   { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "Open", "plan": "Saver1" },
  //   { "type": "GSM", "number": "04155188882", "date": "12, March 2017", "status": "Open", "plan": "Saver1" }
  // ];
  public service_Data: any[];

  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public modalCtrl: ModalController, public serviceprovider: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyServicesPage');
    this.ionicInit();
    // this.serviceprovider.get_serviceDisplay().subscribe(result => {
    //   console.log(result.Items);
    // }, error => {
    //   console.log("error");
    // });
  }

  set_date(value) {
    let array_sam = value.split("-");
    return array_sam[2] + "-" + this.monthNames[parseInt(array_sam[1])] + "-" + array_sam[0];
  }

  get_typeSV(value) {
    let array_sam = value.split(".");
    return array_sam[0].charAt(0) + "" + array_sam[1].charAt(0) + "" + array_sam[2].charAt(0);
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

    this.service_Data = new Array();
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();

    this.serviceprovider.get_serviceDisplay()

      .subscribe(
      data => {
        if (data) {

          console.log(localStorage.getItem("set_lng"));
          if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
            this.translate.use('en');
          } else {
            this.translate.use(localStorage.getItem("set_lng"));
          }

          for (let list of data.Items) {
            let array_data = { "type": "GSM", "number": "", "date": "", "status": "open", "plan": "saver1", "change_state": false, "change_plan": false };
            array_data.type = this.get_typeSV(list.$type.split(",")[0]);
            array_data.number = list.Number;
            array_data.date = this.set_date(list.DueDate.split("T")[0]);

            this.service_Data.push(array_data);

            console.log(parseDate(list.DueDate));
            // console.log(parseDate(list.DueDate).getMonth());

          }

          console.log(data);
          // console.log(this.bill_data);

        }
        loading.dismiss();

      },
      error => {
        loading.dismiss();
      });
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
      if (typeof (data) != "undefined" && data != "") {
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
      if (typeof (data) != "undefined" && data != "") {
        this.service_Data[index].plan = data;
      }
    });
    profileModal.present();

  }

  save_plan(index) {
    this.service_Data[index].change_plan = false;
  }

}
