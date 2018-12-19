import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the TransactionHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-history',
  templateUrl: 'transaction-history.html',
})
export class TransactionHistoryPage {

  public setDefault = [
    { "tranNum": "3014657", "type": "receipt", "date": "12 / 18", "amount": "0.01", "status": "precessing" },
    { "tranNum": "5275851", "type": "receipt", "date": "12 / 18", "amount": "0.01", "status": "precessing" },
    { "tranNum": "8548948", "type": "receipt", "date": "02 / 18", "amount": "0.01", "status": "precessing" },
    { "tranNum": "3879948", "type": "receipt", "date": "01 / 19", "amount": "0.01", "status": "precessing" },
    { "tranNum": "2438789", "type": "receipt", "date": "07 / 19", "amount": "0.01", "status": "precessing" },
    { "tranNum": "3878978", "type": "receipt", "date": "06 / 19", "amount": "0.01", "status": "precessing" }
  ];

  public transactionList: any[];
  public showMoreState: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionHistoryPage');
    this.ionicInit();
  }
  goback() {
    this.navCtrl.pop();
  }

  ionicInit() {
    this.transactionList = new Array();
    this.showMoreState = true;
    for (let list of this.setDefault) {
      this.transactionList.push(list);
    }

    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }
  }

  addMoreAction() {
    if (this.transactionList.length + this.setDefault.length < 25) {
      for (let list of this.setDefault) {
        this.transactionList.push(list);
      }
      this.showMoreState = true;
    } else {
      this.showMoreState = false;
    }

    if (this.transactionList.length > 25) {
      this.showMoreState = false;
    }


  }

}
