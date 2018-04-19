import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';

import { FormControl, Validators } from '@angular/forms';
import { TopupHistoryPage } from '../topup-history/topup-history';

/**
 * Generated class for the TopUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-up',
  templateUrl: 'top-up.html',
})
export class TopUpPage {

  public top_Data = { "topup": "", "start_date": "", "method": "" };

  selType = new FormControl('', [Validators.required]);

  setMethod = new FormControl('', [Validators.required]);

  selExy = new FormControl('', [Validators.required]);

  changeDate = new FormControl('', [Validators.required]);

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopUpPage');
    this.ionicInit();
  }

  completeAddCompany(comProfileForm) {
    if (comProfileForm.valid && this.setMethod.valid && this.selType.valid && this.changeDate.valid) {
      if (localStorage.getItem("new_topup") != null) {
        let old_data = new Array();
        for (let list of JSON.parse(localStorage.getItem("new_topup"))) {
          old_data.push(list);
        }
        old_data.push(this.top_Data);
        localStorage.setItem("new_topup", JSON.stringify(old_data));
      } else {
        let new_array = new Array();
        new_array.push(this.top_Data);
        localStorage.setItem("new_topup", JSON.stringify(new_array));
      }

      this.navCtrl.push(TopupHistoryPage);
    }
  }

  goback() {
    this.navCtrl.pop();
  }

  add_new() {
    console.log("asdfasd");
    this.top_Data.topup = "";
    this.top_Data.start_date = "";
    this.top_Data.method = "";
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
