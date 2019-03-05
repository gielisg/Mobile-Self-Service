import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  private passData = { "password": "", "confirmPass": "", "accountNumber": "" };
  private submitState = false;

  private confirmPassword = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
    public accountServer: AuthserviceProvider,
    public authservice: AuthserviceProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
    this.ionicInit();
  }

  ionicInit() {
    this.translate.translaterService();
  }

  goback() {
    this.viewCtrl.dismiss("");
  }

  forgotSubmit(forgotPasswordData) {
    this.submitState = true;
    console.log(forgotPasswordData);
    if (forgotPasswordData.valid && this.passData.password == this.passData.confirmPass
      && this.confirmPassword.valid) {
      this.viewCtrl.dismiss({ state: "success" });
    }
  }

  submitAddPayment() {
    document.getElementById("trigersubmit").click()
  }


}
