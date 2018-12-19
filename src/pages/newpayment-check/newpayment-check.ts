import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NewpaymentCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newpayment-check',
  templateUrl: 'newpayment-check.html',
})
export class NewpaymentCheckPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewpaymentCheckPage');
  }

  openPayment() {
    let data = "open";
    this.viewCtrl.dismiss(data);
  }

  closePayment() {
    let data = "close";
    this.viewCtrl.dismiss(data);
  }

}
