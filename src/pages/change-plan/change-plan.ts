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

  public change_state = { "new_state": "", "reason": "", "effect_date": "", "note": "" };

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
    this.navCtrl.pop();
  }

  completeAddCompany(comProfileForm) {
    if (comProfileForm.valid){
      let data = this.change_state.new_state;
      this.viewCtrl.dismiss(data);
    }
  }

  ionicInit() {
    let current_state = JSON.parse(localStorage.getItem("ChangePlanPage"));

    this.change_state.new_state = current_state.plan;

    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
  }

}
