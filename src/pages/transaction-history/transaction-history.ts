import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateProvider } from '../../providers/translate/translate';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';
import { TransactionProvider } from '../../providers/transaction/transaction';
import { AuthserviceProvider } from '../../providers/authservice/authservice';


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

  public setDefault: any[];

  public transactionList: any[];
  public showMoreState: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
    public tranService: TransactionProvider,
    public authService: AuthserviceProvider,
  ) {
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
    this.setDefault = new Array();
    this.showMoreState = true;

    this.translate.translaterService();

    this.loading.show();

    this.tranService.getTransactionHistory().subscribe((data: any) => {
      console.log(data);
      for (let list of data.Items) {
        this.setDefault.push(list);
        // console.log(list.Number);
      }
      // console.log(this.setDefault);
      this.add_moreAction();
      this.loading.hide();

    }, error => {
      console.log(error);
      if (Object(error).Code.Name == 'InvalidSessionKeyException') {
        this.authService.createRandomSessionKey().subscribe(result => {
          if (result) {
            console.log(result);
            // localStorage.setItem('sessionKey', result);
            this.ionicInit();
          }
        }, error => {
          console.log(error);
        });
      }
      this.loading.hide();
    });
  }

  add_moreAction() {
    this.loading.show();
    // setTimeout(() => {
    if (this.transactionList.length < this.setDefault.length) {
      if (this.setDefault.length - this.transactionList.length > 25) {
        let arrayNum = 0;
        if (this.transactionList.length == 0) {
          arrayNum = 0;
        } else {
          arrayNum = this.transactionList.length - 1;
          setTimeout(() => {
            this.loading.hide();
          }, 1500);
        }
        for (let i = arrayNum; i <= arrayNum + 25; i++) {
          let param = { "tranNum": "", "type": "", "date": "12 / 18", "amount": "0.01", "status": "precessing" };
          param.tranNum = this.setDefault[i].Number;
          param.type = this.setDefault[i].Type.Name;
          param.amount = this.setDefault[i].Total;
          param.status = this.setDefault[i].Status.Name;
          param.date = this.setDefault[i].Date.split('T')[0].split('-')[1] + ' / ' + this.setDefault[i].Date.split('T')[0].split('-')[2];
          this.transactionList.push(param);
        }
      } else {
        let arrayNum = 0;
        if (this.transactionList.length == 0) {
          arrayNum = 0;
        } else {
          arrayNum = this.transactionList.length - 1;
          setTimeout(() => {
            this.loading.hide();
          }, 1500);
        }
        for (let i = arrayNum; i < this.setDefault.length; i++) {
          let param = { "tranNum": "", "type": "", "date": "12 / 18", "amount": "0.01", "status": "precessing" };
          param.tranNum = this.setDefault[i].Number;
          param.type = this.setDefault[i].Type.Name;
          param.amount = this.setDefault[i].Total;
          param.status = this.setDefault[i].Status.Name;
          param.date = this.setDefault[i].Date.split('T')[0].split('-')[1] + ' / ' + this.setDefault[i].Date.split('T')[0].split('-')[2];
          this.transactionList.push(param);
        }
      }

      this.showMoreState = true;
    } else {
      this.showMoreState = false;
    }

    if (this.transactionList.length >= this.setDefault.length) {
      this.showMoreState = false;
    }
    // this.loading.hide();
    // }, 1500);
  }

}
