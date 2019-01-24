import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';



/**
 * Generated class for the ServiceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-detail',
  templateUrl: 'service-detail.html',
})
export class ServiceDetailPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceDetailPage');
    this.ionicInit();
  }

  goback() {
    this.navCtrl.pop();
  }

  ionicInit() {
    this.translate.translaterService();
  }

}
