import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PaynowCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paynow-check',
  templateUrl: 'paynow-check.html',
})
export class PaynowCheckPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaynowCheckPage');
  }

  goto_paymenthistory() {
    let data = "paynow_check";
    this.viewCtrl.dismiss();
    // this.navCtrl.pop();
  }

}
