import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';
import { TopUpPage } from '../top-up/top-up';


/**
 * Generated class for the TopupHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topup-history',
  templateUrl: 'topup-history.html',
})
export class TopupHistoryPage {

  public set_defalt = [
    { "top": "unlimited1", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited2", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited1", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited2", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited1", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited2", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited1", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited1", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" }
  ];

  public top_Data: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopupHistoryPage');
    this.ionicInit();
  }
  goto_newTopup() {
    this.navCtrl.push(TopUpPage);
  }
  goback() {
    this.navCtrl.pop();
  }

  ionicInit() {
    console.log(JSON.parse(localStorage.getItem("new_topup")));
    this.top_Data = new Array();
    for (let list of this.set_defalt) {
      this.top_Data.push(list);
    }
    if (localStorage.getItem("new_topup") != null) {
      console.log("not_null");
      let storage = JSON.parse(localStorage.getItem("new_topup"));
      for (let list of storage) {
        let sam_data = { "top": "", "date": "", "expiry": "12/04/2017", "status": "Open" };
        sam_data.top = list.topup;
        sam_data.date = list.start_date;
        this.top_Data.push(sam_data);
      }
    }
    console.log(this.top_Data);
    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
  }

}
