import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
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


////////api and other part.

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';


import { ApiproviderProvider } from '../providers/apiprovider/apiprovider';
import { ChangePasswordPage } from '../pages/change-password/change-password';


import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PaynowCheckPage } from '../pages/paynow-check/paynow-check';
import { NewpaymentCheckPage } from '../pages/newpayment-check/newpayment-check';
import { ChangePlanPage } from '../pages/change-plan/change-plan';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,

    BillHistoryPage,
    CallHistoryPage,
    ChangeStatusPage,
    MyDevicesPage,
    MyServicesPage,
    MyaccountPage,
    MydetailPage,
    NewPaymentPage,
    PayNowPage,
    PaymentMethodPage,
    ServiceBundlePage,
    ServiceDetailPage,
    SettingsPage,
    TopUpPage,
    TopupHistoryPage,
    TransactionHistoryPage,
    ChangePasswordPage,
    PaynowCheckPage,
    NewpaymentCheckPage,
    ChangePlanPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MatInputModule, MatButtonModule, MatChipsModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,

    BillHistoryPage,
    CallHistoryPage,
    ChangeStatusPage,
    MyDevicesPage,
    MyServicesPage,
    MyaccountPage,
    MydetailPage,
    NewPaymentPage,
    PayNowPage,
    PaymentMethodPage,
    ServiceBundlePage,
    ServiceDetailPage,
    SettingsPage,
    TopUpPage,
    TopupHistoryPage,
    TransactionHistoryPage,
    ChangePasswordPage,
    PaynowCheckPage,
    NewpaymentCheckPage,
    ChangePlanPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiproviderProvider
  ]
})
export class AppModule { }
