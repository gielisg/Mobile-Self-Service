import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';



import { FormControl, Validators } from '@angular/forms';
import { TopupHistoryPage } from '../topup-history/topup-history';
import { TranslateProvider } from '../../providers/translate/translate';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';

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

  public show_error = false;
  public confirm_error = false;

  selType = new FormControl('', [Validators.required]);

  setMethod = new FormControl('', [Validators.required]);

  selExy = new FormControl('', [Validators.required]);

  changeDate = new FormControl('', [Validators.required]);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopUpPage');
    this.ionicInit();
    this.show_error = false;
  }

  completeAddCompany(comProfileForm) {

    if (this.top_Data.start_date != null && this.top_Data.start_date != "") {
      this.show_error = false;
    } else {
      this.show_error = true;
    }

    console.log(this.show_error);
    console.log(this.top_Data.start_date);
    this.confirm_error = true;


    if (comProfileForm.valid && this.setMethod.valid && this.selType.valid && this.top_Data.start_date != null && this.top_Data.start_date != "") {
      let temp_total = { "topup": "", "start_date": "", "method": "" };
      temp_total.method = this.top_Data.method;
      temp_total.topup = this.top_Data.topup;
      let datetimearray = this.top_Data.start_date.split("T");
      let sam = this.set_date(datetimearray[0]) + " " + this.set_time(datetimearray[1]);
      temp_total.start_date = sam;
      if (localStorage.getItem("new_topup") != null) {
        let old_data = new Array();
        for (let list of JSON.parse(localStorage.getItem("new_topup"))) {
          old_data.push(list);
        }
        old_data.push(temp_total);
        localStorage.setItem("new_topup", JSON.stringify(old_data));
      } else {
        let new_array = new Array();
        new_array.push(temp_total);
        localStorage.setItem("new_topup", JSON.stringify(new_array));
      }

      this.navCtrl.push(TopupHistoryPage);
    }
  }

  goback() {
    this.navCtrl.pop();
  }

  add_new() {
    console.log(this.top_Data.start_date);
    if (this.setMethod.valid && this.selType.valid && this.top_Data.start_date != null && this.top_Data.start_date != "") {
      let temp_total = { "topup": "", "start_date": "", "method": "" };
      temp_total.method = this.top_Data.method;
      temp_total.topup = this.top_Data.topup;
      let datetimearray = this.top_Data.start_date.split("T");
      let sam = this.set_date(datetimearray[0]) + " " + this.set_time(datetimearray[1]);
      temp_total.start_date = sam;
      if (localStorage.getItem("new_topup") != null) {
        let old_data = new Array();
        for (let list of JSON.parse(localStorage.getItem("new_topup"))) {
          old_data.push(list);
        }
        old_data.push(temp_total);
        localStorage.setItem("new_topup", JSON.stringify(old_data));
      } else {
        let new_array = new Array();
        new_array.push(temp_total);
        localStorage.setItem("new_topup", JSON.stringify(new_array));
      }
      this.top_Data.start_date = "";
      this.top_Data.method = "";
      this.top_Data.topup = "";
      this.confirm_error = false;
    }
  }

  ionchange_date() {
    console.log(this.show_error);
    console.log(this.confirm_error);
    console.log(this.top_Data.start_date);
    if (this.confirm_error && this.top_Data.start_date == "") {
      this.show_error = true;
    } else {
      this.show_error = false;
    }
    console.log(this.show_error);
    console.log(this.confirm_error);
    console.log(this.top_Data.start_date);
  }

  ionicInit() {
    this.translate.translaterService();
  }

  set_date(value) {
    let array_sam = value.split("-");
    console.log(array_sam);
    return array_sam[1] + "/" + array_sam[2] + "/" + array_sam[0];
  }

  set_time(value) {
    let array_sam = value.split(":");
    console.log(array_sam);
    let return_val = "";
    if (parseInt(array_sam[0]) > 12) {
      if (parseInt(array_sam[0]) - 12 < 10) {
        return_val = "0" + (array_sam[0] - 12).toFixed(0) + ":" + array_sam[1] + " pm";
      } else {
        return_val = (array_sam[0] - 12).toFixed(0) + ":" + array_sam[1] + " pm";
      }
    } else {
      return_val = array_sam[0] + ":" + array_sam[1] + " am";
    }
    return return_val;
  }

}
