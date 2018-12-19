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

  public topData = { "topup": "", "startDate": "", "method": "" };

  public showError = false;
  public confirmError = false;

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
    this.showError = false;
  }

  completeAddCompany(comProfileForm) {

    if (this.topData.startDate != null && this.topData.startDate != "") {
      this.showError = false;
    } else {
      this.showError = true;
    }

    console.log(this.showError);
    console.log(this.topData.startDate);
    this.confirmError = true;


    if (comProfileForm.valid && this.setMethod.valid && this.selType.valid && this.topData.startDate != null && this.topData.startDate != "") {
      let tempTotal = { "topup": "", "startDate": "", "method": "" };
      tempTotal.method = this.topData.method;
      tempTotal.topup = this.topData.topup;
      let datetimearray = this.topData.startDate.split("T");
      let sam = this.setDate(datetimearray[0]) + " " + this.setTime(datetimearray[1]);
      tempTotal.startDate = sam;
      if (localStorage.getItem("newTopup") != null) {
        let oldData = new Array();
        for (let list of JSON.parse(localStorage.getItem("newTopup"))) {
          oldData.push(list);
        }
        oldData.push(tempTotal);
        localStorage.setItem("newTopup", JSON.stringify(oldData));
      } else {
        let newArray = new Array();
        newArray.push(tempTotal);
        localStorage.setItem("newTopup", JSON.stringify(newArray));
      }

      this.navCtrl.push(TopupHistoryPage);
    }
  }

  goback() {
    this.navCtrl.pop();
  }

  addNew() {
    console.log(this.topData.startDate);
    if (this.setMethod.valid && this.selType.valid && this.topData.startDate != null && this.topData.startDate != "") {
      let tempTotal = { "topup": "", "startDate": "", "method": "" };
      tempTotal.method = this.topData.method;
      tempTotal.topup = this.topData.topup;
      let datetimearray = this.topData.startDate.split("T");
      let sam = this.setDate(datetimearray[0]) + " " + this.setTime(datetimearray[1]);
      tempTotal.startDate = sam;
      if (localStorage.getItem("newTopup") != null) {
        let oldData = new Array();
        for (let list of JSON.parse(localStorage.getItem("newTopup"))) {
          oldData.push(list);
        }
        oldData.push(tempTotal);
        localStorage.setItem("newTopup", JSON.stringify(oldData));
      } else {
        let newArray = new Array();
        newArray.push(tempTotal);
        localStorage.setItem("newTopup", JSON.stringify(newArray));
      }
      this.topData.startDate = "";
      this.topData.method = "";
      this.topData.topup = "";
      this.confirmError = false;
    }
  }

  ionchangeDate() {
    console.log(this.showError);
    console.log(this.confirmError);
    console.log(this.topData.startDate);
    if (this.confirmError && this.topData.startDate == "") {
      this.showError = true;
    } else {
      this.showError = false;
    }
    console.log(this.showError);
    console.log(this.confirmError);
    console.log(this.topData.startDate);
  }

  ionicInit() {

    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }
  }

  setDate(value) {
    let arraySam = value.split("-");
    console.log(arraySam);
    return arraySam[1] + "/" + arraySam[2] + "/" + arraySam[0];
  }

  setTime(value) {
    let arraySam = value.split(":");
    console.log(arraySam);
    let returnVal = "";
    if (parseInt(arraySam[0]) > 12) {
      if (parseInt(arraySam[0]) - 12 < 10) {
        returnVal = "0" + (arraySam[0] - 12).toFixed(0) + ":" + arraySam[1] + " pm";
      } else {
        returnVal = (arraySam[0] - 12).toFixed(0) + ":" + arraySam[1] + " pm";
      }
    } else {
      returnVal = arraySam[0] + ":" + arraySam[1] + " am";
    }
    return returnVal;
  }

}
