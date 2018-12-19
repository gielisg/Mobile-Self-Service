import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';


import { FormControl, Validators } from '@angular/forms';
import { PayNowPage } from '../pay-now/pay-now';
import { PaymentMethodPage } from '../payment-method/payment-method';
import { PaymentProvider } from '../../providers/payment/payment';

/**
 * Generated class for the NewPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-payment',
  templateUrl: 'new-payment.html',
})
export class NewPaymentPage {

  public payData = { "name": "", "method": "", "cardnum": "", "exm": "1", "exy": "2018" };
  public expireMonth: any[];
  public expireYear: any[];

  public userId = "";

  selType = new FormControl('', [Validators.required]);

  selExm = new FormControl('', [Validators.required]);

  selExy = new FormControl('', [Validators.required]);

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public paymentService: PaymentProvider) {
  }

  ionViewDidLoad() {
    this.expireMonth = new Array();
    this.expireYear = new Array();
    console.log('ionViewDidLoad NewPaymentPage');
    for (let i = 1; i < 13; i++) {
      this.expireMonth.push(i);
    }

    for (let i = 2018; i < 2050; i++) {
      this.expireYear.push(i);
    }
    this.ionicInit();
  }
  goback() {
    this.navCtrl.pop();
  }

  completeAddCompany(comProfileForm) {
    if (comProfileForm.valid && this.selType.valid && this.selExm.valid) {

      let addParam = {
        "name": this.payData.name,
        "number": this.payData.cardnum,
        "expireDate": this.payData.exy + "-" + this.setTwoString(this.payData.exm) + "-" + new Date().getDate() + "T00:00:00"
      };

      let loading = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      loading.present();
      this.paymentService.accountPaymentMethodAdd(addParam).subscribe(data => {
        loading.dismiss();
        this.navCtrl.pop();
        this.navCtrl.push(PaymentMethodPage);
      }, error => {
        console.log(error);
        loading.dismiss();
      });
    }
  }

  ionicInit() {
    
    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }

    this.userId = JSON.parse(localStorage.getItem('currentUser')).username;

    this.payData.exm = (new Date().getMonth() + 1).toString();
  }

  setTwoString(inputVal) {
    if (parseInt(inputVal) < 10) {
      return "0" + inputVal;
    } else {
      return inputVal;
    }
  }

}
