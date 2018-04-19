import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';


import { FormControl, Validators } from '@angular/forms';
import { PayNowPage } from '../pay-now/pay-now';

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

  public pay_Data = { "name": "", "method": "", "cardnum": "", "exm": "1", "exy": "2018" };
  public expireMonth: any[];
  public expireYear: any[];

  selType = new FormControl('', [Validators.required]);

  selExm = new FormControl('', [Validators.required]);

  selExy = new FormControl('', [Validators.required]);

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService) {
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
      this.navCtrl.push(PayNowPage);
    }
  }

  ionicInit() {
    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
  }

}
