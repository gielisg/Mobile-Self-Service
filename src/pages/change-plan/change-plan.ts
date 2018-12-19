import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ChangePlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-plan',
  templateUrl: 'change-plan.html',
})
export class ChangePlanPage {

  public changeState = { "newState": "", "reason": "", "effectDate": "", "note": "" };

  newState = new FormControl('', [Validators.required]);

  Reason = new FormControl('', [Validators.required]);

  changeDate = new FormControl('', [Validators.required]);

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePlanPage');
    this.ionicInit();
  }

  goback() {
    this.viewCtrl.dismiss("");
  }

  completeAddCompany(comProfileForm) {
    if (this.changeDate.valid && this.Reason.valid && this.newState.valid) {
      let data = this.changeState.newState;
      this.viewCtrl.dismiss(data);
    }
  }

  ionicInit() {
    let currentState = JSON.parse(localStorage.getItem("ChangePlanPage"));

    this.changeState.newState = currentState.plan;


    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }
  }

}
