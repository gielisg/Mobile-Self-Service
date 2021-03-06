import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';

import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
    public viewCtrl: ViewController,
  ) {
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
      let data = this.change_state.new_state;
      this.viewCtrl.dismiss(data);
    }
  }

  ionicInit() {
    let current_state = JSON.parse(localStorage.getItem("ChangePlanPage"));

    this.change_state.new_state = current_state.plan;

    this.translate.translaterService();
  }

}
