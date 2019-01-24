import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';


import { TranslateProvider } from '../../providers/translate/translate';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the ChangeStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-status',
  templateUrl: 'change-status.html',
})
export class ChangeStatusPage {

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
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeStatusPage');
    this.ionicInit();
  }

  goback() {
    this.viewCtrl.dismiss("");
  }

  completeAddCompany(comProfileForm) {
    if (this.newState.valid && this.Reason.valid && this.changeDate.valid) {
      let data = this.change_state.new_state;
      this.viewCtrl.dismiss(data);
    }
  }

  ionicInit() {

    let current_state = JSON.parse(localStorage.getItem("ChangeStatusPage"));


    this.change_state.new_state = current_state.status;
    this.translate.translaterService();
  }

}
