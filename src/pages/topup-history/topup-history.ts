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

  public setDefalt = [
    { "top": "unlimited1", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited2", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited1", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited2", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited1", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited2", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited1", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" },
    { "top": "unlimited1", "date": "12, March, 2017 10:12 am", "expiry": "12/04/2017", "status": "open" }
  ];

  public topData: any[];

  public userId  = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopupHistoryPage');
    this.ionicInit();
  }
  gotoNewTopup() {
    this.navCtrl.push(TopUpPage);
  }
  goback() {
    this.navCtrl.pop();
  }

  ionicInit() {
    this.topData = new Array();
    for (let list of this.setDefalt) {
      this.topData.push(list);
    }
    if (localStorage.getItem("newTopup") != null) {
      let storage = JSON.parse(localStorage.getItem("newTopup"));
      for (let list of storage) {
        let samData = { "top": "", "date": "", "expiry": "12/04/2017", "status": "Open" };
        samData.top = list.topup;
        samData.date = list.startDate;
        this.topData.push(samData);
      }
    }
    this.userId = JSON.parse(localStorage.getItem('currentUser')).username;
    
    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }
  }

}
