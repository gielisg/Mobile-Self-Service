import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { MyServicesPage } from '../pages/my-services/my-services';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { MydetailPage } from '../pages/mydetail/mydetail';
import { SettingsPage } from '../pages/settings/settings';


import { TranslateService } from '@ngx-translate/core';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = SigninPage;


  public pages: Array<{ title: string, component: any, image: string }>;
  bottom_pages: Array<{ title: string, component: any, image: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen
    , public translate: TranslateService, public events: Events, public menuCtrl: MenuController) {

    events.subscribe('user:created', (user, time) => {

      this.ionicInit();
    });

    this.ionicInit();

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  loggedIn() {
  }

  openPage(page) {
    if (page.title == 'asdfasdf') {
      alert("click");
    } else {
      this.translate.get('logout').subscribe(
        value => {

          if (page.title == value) {
            localStorage.setItem("login_infor", "");
            this.nav.setRoot(SigninPage);
          } else {
            this.nav.push(page.component);
          }

        }
      );
    }
  }

  ionicInit() {

    this.pages = [
      { title: 'home', component: HomePage, image: "home" },
      { title: 'my_details', component: MydetailPage, image: "list" },
      { title: 'my_account', component: MyaccountPage, image: "person_icon" },
      { title: 'my_services', component: MyServicesPage, image: "visa_card" },
      // { title: 'my_devices', component: MyDevicesPage, image: "devices" }
    ];

    this.bottom_pages = [
      { title: 'settings', component: SettingsPage, image: "setting" },
      { title: 'logout', component: null, image: "log_out" },
    ];

    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang(localStorage.getItem('set_lng') != null ? localStorage.getItem('set_lng') : "en");
    this.translate.use(localStorage.getItem('set_lng') != null ? localStorage.getItem('set_lng') : "en");

    for (let list of this.pages) {
      this.translate.get(list.title).subscribe(
        value => {
          list.title = value;
        }
      );
    }

    for (let list of this.bottom_pages) {
      this.translate.get(list.title).subscribe(
        value => {
          list.title = value;
        }
      );
    }

  }
}

