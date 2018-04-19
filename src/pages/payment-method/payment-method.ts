import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';


import { NewPaymentPage } from '../new-payment/new-payment';
import { NewpaymentCheckPage } from '../newpayment-check/newpayment-check';

/**
 * Generated class for the PaymentMethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html',
})
export class PaymentMethodPage {


  public detail_Data = [
    { "name": "katie hazel", "type": "visa", "number": "4164xxxxxxxx1680", "expiry": "30/17", "status": "open" },
    { "name": "Gorden Gielis", "type": "visa", "number": "4564xxxxxxxx7113", "expiry": "30/20", "status": "open" }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public alertCtrl: AlertController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodPage');
    this.ionicInit();
  }
  goback() {
    this.navCtrl.pop();
  }
  goto_newPayment() {
    let profileModal = this.modalCtrl.create(NewpaymentCheckPage);
    profileModal.onDidDismiss(data => {
      console.log(data);
      if (data == "open") {
        this.navCtrl.push(NewPaymentPage);
      }
    });
    profileModal.present();
  }

  ionicInit() {
    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
  }

  deleteItem(index) {
    this.detail_Data.splice(index, 1);
  }

}
