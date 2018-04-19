import { Component } from '@angular/core';
import { HomePage } from '../home/home';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SignupPage } from '../signup/signup';

import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';


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

  // matcher = new MyErrorStateMatcher();


  public send_data: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public menu: MenuController) {

    // translate.use('ru');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
    this.ionicInit();


  }
  goto_home() {
    if (this.user_Data.username == "" || this.user_Data.password == "") {
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
      // this.navCtrl.push(HomePage);
      let loading = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      this.user_Data.email = this.user_Data.username;
      loading.present();
      let status = "login";
      this.user_Data.status = status;
      this.apiprovider.postData(this.user_Data).then((result) => {
        console.log(Object(result));
        loading.dismiss();
        if (Object(result).status == "success") {
          console.log(result);
          localStorage.setItem("user_email", Object(result).userid);
          this.navCtrl.push(HomePage);
        } else {
          let toast = this.toastCtrl.create({
            message: Object(result).detail,
            duration: 2000
          })
          toast.present();
        };

      }, (err) => {
        let toast = this.toastCtrl.create({
          message: "No Network",
          duration: 2000
        })
        toast.present();
        loading.dismiss();
      });
    }
  }

  goto_signup() {
    this.navCtrl.push(SignupPage);
  }

  ionicInit() {
    this.menu.swipeEnable(false);
    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
  }


}
