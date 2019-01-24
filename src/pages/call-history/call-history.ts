import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';


/**
 * Generated class for the CallHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-history',
  templateUrl: 'call-history.html',
})
export class CallHistoryPage {

  public call_historyData = [
    { "call_num": "04155188882", "date": "12, March, 2017 10:15 am", "duration": "15 seconds", "tariff": "Plan Z", "cost": "0.15" },
    { "call_num": "46546565658", "date": "12, March, 2017 10:15 am", "duration": "15 seconds", "tariff": "Plan Z", "cost": "0.15" },
    { "call_num": "45378345383", "date": "12, March, 2017 10:15 am", "duration": "15 seconds", "tariff": "Plan Z", "cost": "0.15" },
    { "call_num": "45373453783", "date": "12, March, 2017 10:15 am", "duration": "15 seconds", "tariff": "Plan Z", "cost": "0.15" },
    { "call_num": "83783838754", "date": "12, March, 2017 10:15 am", "duration": "15 seconds", "tariff": "Plan Z", "cost": "0.15" },
    { "call_num": "23889373834", "date": "12, March, 2017 10:15 am", "duration": "15 seconds", "tariff": "Plan Z", "cost": "0.15" }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallHistoryPage');
    this.ionicInit();
  }
  goback() {
    this.navCtrl.pop();
  }

  ionicInit() {

    this.translate.translaterService();

  }

}
