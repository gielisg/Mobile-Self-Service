import { Component } from '@angular/core';
import { HomePage } from '../home/home';

import { FormControl, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';

import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';


import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { TranslateProvider } from '../../providers/translate/translate';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';


/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})


export class SigninPage {

  public user_Data = { "username": "", "password": "", "email": "", "phone": "", "status": "" };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);



  public send_data: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
    public menu: MenuController,
    public authservice: AuthserviceProvider,
    private modalCtrl: ModalController,
  ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
    console.log(localStorage.getItem("login_infor"));
    this.ionicInit();


    if (localStorage.getItem("login_infor") != null && localStorage.getItem("login_infor") != "") {
      this.navCtrl.push(HomePage);
    } else {
      this.ionicInit();
    }

  }
  goto_home() {
    if (this.user_Data.username == "" || this.user_Data.password == "") {
      // let toast = this.toastCtrl.create({
      //   message: 'Please input full data',
      //   duration: 3000,
      //   position: 'top'
      // });

      this.toast.show('Please input full data');

      // toast.present();
    } else {
      this.navCtrl.push(HomePage);
    }
  }

  completeAddCompany(comProfileForm) {
    if (comProfileForm.valid) {
      this.loading.show();
      this.user_Data.email = this.user_Data.username;
      let status = "login";
      this.user_Data.status = status;

      this.authservice.login(this.user_Data.username, this.user_Data.password)

        .subscribe(
          data => {
            if (data) {
              localStorage.setItem("login_infor", JSON.stringify(this.user_Data));
              this.navCtrl.push(HomePage);
            }
            this.loading.hide();

          },
          error => {

            this.user_Data.username = "";
            this.user_Data.password = "";
            this.loading.hide();
          });

    }
  }

  goto_signup() {
    this.navCtrl.push(SignupPage);
  }

  ionicInit() {
    this.menu.swipeEnable(false);
    this.translate.translaterService();
  }

  gotoForgot() {
    let profileModal = this.modalCtrl.create(ForgotPasswordPage);
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }


}
