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

  public user_Data = { "email": "", "old_pass": "", "new_pass": "", "status": "" };

  public send_data: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
    this.user_Data.email = localStorage.getItem("user_email");
    this.ionicInit();
  }

  completeAddCompany(comProfileForm) {
    if (comProfileForm.valid) {
      let loading = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      loading.present();
      let status = "change_password";
      this.user_Data.status = status;
      this.apiprovider.postData(this.user_Data).then((result) => {
        console.log(Object(result));
        loading.dismiss();
        if (Object(result).status == "success") {

          let toast = this.toastCtrl.create({
            message: Object(result).detail,
            duration: 2000
          })
          toast.present();

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

}
