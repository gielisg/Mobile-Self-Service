import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
    public menu: MenuController,
  ) {
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
    this.translate.translaterService();
  }

}
