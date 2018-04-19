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

  public set_default = [
    { "tran_num": "3014657", "type": "receipt", "date": "12 / 18", "amount": "0.01", "status": "precessing" },
    { "tran_num": "5275851", "type": "receipt", "date": "12 / 18", "amount": "0.01", "status": "precessing" },
    { "tran_num": "8548948", "type": "receipt", "date": "02 / 18", "amount": "0.01", "status": "precessing" },
    { "tran_num": "3879948", "type": "receipt", "date": "01 / 19", "amount": "0.01", "status": "precessing" },
    { "tran_num": "2438789", "type": "receipt", "date": "07 / 19", "amount": "0.01", "status": "precessing" },
    { "tran_num": "3878978", "type": "receipt", "date": "06 / 19", "amount": "0.01", "status": "precessing" }
  ];

  public transactionList: any[];
  public show_moreState: boolean;

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
    this.show_moreState = true;
    for (let list of this.set_default) {
      this.transactionList.push(list);
    }
    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
  }

  add_moreAction() {
    if (this.transactionList.length + this.set_default.length < 25) {
      for (let list of this.set_default) {
        this.transactionList.push(list);
      }
      this.show_moreState = true;
    } else {
      this.show_moreState = false;
    }
    
    if (this.transactionList.length > 25) {
      this.show_moreState = false;
    }


  }

}
