import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { BillHistoryPage } from '../pages/bill-history/bill-history';
import { CallHistoryPage } from '../pages/call-history/call-history';
import { ChangeStatusPage } from '../pages/change-status/change-status';
import { MyDevicesPage } from '../pages/my-devices/my-devices';
import { MyServicesPage } from '../pages/my-services/my-services';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { MydetailPage } from '../pages/mydetail/mydetail';
import { NewPaymentPage } from '../pages/new-payment/new-payment';
import { PayNowPage } from '../pages/pay-now/pay-now';
import { PaymentMethodPage } from '../pages/payment-method/payment-method';
import { ServiceBundlePage } from '../pages/service-bundle/service-bundle';
import { ServiceDetailPage } from '../pages/service-detail/service-detail';
import { SettingsPage } from '../pages/settings/settings';
import { TopUpPage } from '../pages/top-up/top-up';
import { TopupHistoryPage } from '../pages/topup-history/topup-history';
import { TransactionHistoryPage } from '../pages/transaction-history/transaction-history';


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
      console.log('Welcome', user, 'at', time);
    });

    this.ionicInit();

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  loggedIn() {
    console.log("logged in");
  }

  openPage(page) {
    if (page.title == 'asdfasdf') {
      console.log(page);
      alert("click");
    } else {
      this.translate.get('logout').subscribe(
        value => {

          if (page.title == value) {
            localStorage.setItem("user_email", "");
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
      { title: 'my_devices', component: MyDevicesPage, image: "devices" }
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

