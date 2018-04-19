import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';

import { FormControl, Validators } from '@angular/forms';
import { PaynowCheckPage } from '../paynow-check/paynow-check';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayNowPage');
    this.ionicInit();
  }

  goback() {
    this.navCtrl.pop();
  }

  ionicInit() {
    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
  }

  pay_now() {
    let profileModal = this.modalCtrl.create(PaynowCheckPage);
    profileModal.onDidDismiss(data => {
      console.log(data);
      console.log("finish payment");
    });
    profileModal.present();
  }

}
