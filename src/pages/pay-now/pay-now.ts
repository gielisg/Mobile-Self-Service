import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';

import { FormControl, Validators } from '@angular/forms';
import { PaynowCheckPage } from '../paynow-check/paynow-check';
import { HomePage } from '../home/home';
import { PaymentProvider } from '../../providers/payment/payment';

/**
 * Generated class for the PayNowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-now',
  templateUrl: 'pay-now.html',
})
export class PayNowPage {

  animalControl = new FormControl('', [Validators.required]);

  public payData = { "name": "", "method": "", "cardnum": "", "exm": "none", "exy": "2018" };
  public cancenEnable: boolean;

  public payAmount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public modalCtrl: ModalController, public paymentService: PaymentProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayNowPage');
    this.ionicInit();
    this.cancenEnable = false;
    this.payAmount = this.navParams.data.navParams;
  }

  goback() {
    this.cancenEnable = true;
    this.navCtrl.pop();
  }

  ionicInit() {
    
    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }

  }

  payNow() {
    let profileModal = this.modalCtrl.create(PaynowCheckPage);
    profileModal.onDidDismiss(data => {
      this.navCtrl.push(HomePage);
    });
    profileModal.present();
  }

  completeAddCompany(comProfileForm) {


    if (comProfileForm.valid && !this.cancenEnable) {
      let profileModal = this.modalCtrl.create(PaynowCheckPage);
      profileModal.onDidDismiss(data => {
        this.navCtrl.push(HomePage);
      });
      profileModal.present();
    }

  }

}
