import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';

import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  public userData = { "email": "", "oldPass": "", "newPass": "", "status": "" };

  public sendData: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
    this.userData.email = localStorage.getItem("userEmail");
    this.ionicInit();
  }

  completeAddCompany(comProfileForm) {
    if (comProfileForm.valid) {

    }
  }
  goback() {
    this.navCtrl.pop();
  }

  ionicInit() {
    
    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }
  }

}
