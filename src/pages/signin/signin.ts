import { Component } from '@angular/core';
import { HomePage } from '../home/home';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SignupPage } from '../signup/signup';

import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';
import { AuthserviceProvider } from '../../providers/authservice/authservice';


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

  public userData = { "username": "", "password": "", "email": "", "phone": "", "status": "" };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);



  public sendData: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public menu: MenuController, public authservice: AuthserviceProvider) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
    console.log(localStorage.getItem("loggedUser"));
    this.ionicInit();


    if (localStorage.getItem("loggedUser") != null && localStorage.getItem("loggedUser") != "") {
      this.navCtrl.push(HomePage);
    } else {
      this.ionicInit();
    }

  }
  gotoHome() {
    if (this.userData.username == "" || this.userData.password == "") {
      let toast = this.toastCtrl.create({
        message: 'Please input full data',
        duration: 3000,
        position: 'top'
      });

      toast.present();
    } else {
      this.navCtrl.push(HomePage);
    }
  }

  completeAddCompany(comProfileForm) {
    if (comProfileForm.valid) {
      let loading = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      this.userData.email = this.userData.username;
      loading.present();
      let status = "login";
      this.userData.status = status;

      this.authservice.login(this.userData.username, this.userData.password)

        .subscribe(
          data => {
            if (data) {
              localStorage.setItem("loggedUser", JSON.stringify(this.userData));
              this.navCtrl.push(HomePage);
            }
            loading.dismiss();

          },
          error => {

            this.userData.username = "";
            this.userData.password = "";
            loading.dismiss();
          });

    }
  }

  gotoSignup() {
    this.navCtrl.push(SignupPage);
  }

  ionicInit() {
    this.menu.swipeEnable(false);

    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }

  }


}
