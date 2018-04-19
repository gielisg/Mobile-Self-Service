import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController, Events } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';

import { ChangePasswordPage } from '../change-password/change-password';
import { FormControl, Validators } from '@angular/forms';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public select_lng: any;

  selectFormControl = new FormControl('', [Validators.required]);
  // selectFormControl = new FormControl('', [
  //   Validators.required,
  // ]);

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public cdr: ChangeDetectorRef, public menuCtrl: MenuController
    , public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.ionicInit();
  }

  goto_changePass() {
    this.navCtrl.push(ChangePasswordPage);
  }

  ionicInit() {

    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.select_lng = "en";
      this.translate.setDefaultLang("en");
    } else {
      this.select_lng = localStorage.getItem("set_lng");
      this.translate.use(localStorage.getItem("set_lng"));
    }
    console.log(this.select_lng);

  }

  selected_lng() {
    console.log(this.select_lng);
    localStorage.setItem("set_lng", this.select_lng);
    this.createUser("This is fake");
    this.ionicInit();
  }

  ngAfterViewChecked() {
    this.translate.use(this.select_lng);
    this.events.publish('user:login');
    this.cdr.detectChanges();
  }

  open_menu() {
  }

  createUser(user) {
    console.log('User created!')
    this.events.publish('user:created', user, Date.now());
  }

  ngAfterViewInit() {
    this.translate.use(this.select_lng);
    this.events.publish('user:login');
    this.cdr.detectChanges();
  }

}
