import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


import { FormControl, Validators } from '@angular/forms';
import { PaynowCheckPage } from '../paynow-check/paynow-check';
import { HomePage } from '../home/home';
import { PaymentProvider } from '../../providers/payment/payment';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';

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

  public pay_Data = { "name": "", "method": "", "cardnum": "", "exm": "none", "exy": "2018" };
  public cancen_enable: boolean;

  public pay_amount: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
    public modalCtrl: ModalController,
    public paymentService: PaymentProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayNowPage');
    this.ionicInit();
    this.cancen_enable = false;
    this.pay_amount = this.navParams.data.navParams;
  }

  goback() {
    this.cancen_enable = true;
    this.navCtrl.pop();
  }

  ionicInit() {

    this.translate.translaterService();

  }

  pay_now() {
    let profileModal = this.modalCtrl.create(PaynowCheckPage);
    profileModal.onDidDismiss(data => {
      this.navCtrl.push(HomePage);
    });
    profileModal.present();
  }

  completeAddCompany(comProfileForm) {


    if (comProfileForm.valid && !this.cancen_enable) {
      let profileModal = this.modalCtrl.create(PaynowCheckPage);
      profileModal.onDidDismiss(data => {
        this.navCtrl.push(HomePage);
      });
      profileModal.present();
    }

  }

}
