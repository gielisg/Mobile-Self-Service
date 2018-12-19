import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';

import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public userData = { "username": "", "password": "", "email": "", "phone": "", "address": "", "status": "" };
  public confirmState: boolean;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  phoneFormControl = new FormControl('', [
    Validators.required
  ]);

  public sendData: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public menu: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.confirmState = true;
    this.ionicInit();
  }

  completeAddCompany(comProfileForm) {
    if (comProfileForm.valid && this.emailFormControl.valid) {
      localStorage.setItem("signup_infor", JSON.stringify(this.userData));
    }
  }
  gotoSignin() {
    this.navCtrl.pop();
  }

  ionicInit() {
    this.menu.swipeEnable(false);
    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.setDefaultLang('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }
    
  }

}
