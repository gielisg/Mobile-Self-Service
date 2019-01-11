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

  public user_Data = { "username": "", "password": "", "email": "", "phone": "", "address": "", "status": "" };
  public confirm_state: boolean;

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

  public send_data: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public menu: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.confirm_state = true;
    this.ionicInit();
  }

  completeAddCompany(comProfileForm) {
    if (comProfileForm.valid && this.emailFormControl.valid) {
      localStorage.setItem("signup_infor", JSON.stringify(this.user_Data));
    }
  }
  goto_signin() {
    this.navCtrl.pop();
  }

  ionicInit() {
    this.menu.swipeEnable(false);
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.setDefaultLang('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
    
  }

}
