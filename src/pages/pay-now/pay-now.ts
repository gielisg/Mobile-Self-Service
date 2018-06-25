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

  public pay_Data = { "name": "", "method": "", "cardnum": "", "exm": "none", "exy": "2018" };
  public cancen_enable: boolean;

  public pay_amount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public modalCtrl: ModalController, public paymentService: PaymentProvider) {
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
    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }

    // let loading = this.loadingCtrl.create({
    //   content: "Please Wait..."
    // });
    // loading.present();

    // this.paymentService.get_paymentAvailList().subscribe(data => {
    //   console.log(data);
    //   loading.dismiss();

    // }, error => {
    //   console.log(error);
    //   loading.dismiss();
    // });

    // this.paymentService.account_paymentMethod(2806).subscribe(data => {
    //   console.log(data);
    //   /////////// This is work
    // }, error => {
    //   console.log(error);
    // });

    // this.paymentService.account_paymentMethodCancel(2806).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    // });

    // this.paymentService.account_paymentMethodMakeDefault(2806).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    // });

    // let update_param = {
    //   "name": "dfdefeegsdg",
    //   "number": "12342332354",
    //   "expireDate": new Date().toISOString(),
    //   "payment_id": 2806,
    // };
    // this.paymentService.account_paymentMethodUpdate(update_param).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    // });

    // let update_param = {
    //   "name": "dfdefeegsdg",
    //   "amount": 0.15,
    //   "expireDate": new Date().toISOString(),
    //   "payment_id": 9143,
    // };
    // this.paymentService.payment_RequestCreate(update_param).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    // });

    // this.paymentService.payment_MethodFromAccountNumberAndType().subscribe(data => {
    //   console.log(data);
    //   /////////this is work
    // }, error => {
    //   console.log(error);
    // });
  }

  pay_now() {
    let profileModal = this.modalCtrl.create(PaynowCheckPage);
    profileModal.onDidDismiss(data => {
      console.log(data);
      console.log("finish payment");
      this.navCtrl.push(HomePage);
    });
    profileModal.present();
  }

  completeAddCompany(comProfileForm) {

    console.log(comProfileForm.valid);
    console.log(comProfileForm);

    if (comProfileForm.valid && !this.cancen_enable) {
      let profileModal = this.modalCtrl.create(PaynowCheckPage);
      profileModal.onDidDismiss(data => {
        console.log(data);
        console.log("finish payment");
        this.navCtrl.push(HomePage);
      });
      profileModal.present();
    }

  }

}
