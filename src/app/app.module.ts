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
import { APP_CONFIG, AppConfig } from '../model';


////////api and other part.

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { ApiproviderProvider } from '../providers/apiprovider/apiprovider';
import { ChangePasswordPage } from '../pages/change-password/change-password';


import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { PaynowCheckPage } from '../pages/paynow-check/paynow-check';
import { NewpaymentCheckPage } from '../pages/newpayment-check/newpayment-check';
import { ChangePlanPage } from '../pages/change-plan/change-plan';
import { AuthserviceProvider } from '../providers/authservice/authservice';


import { Base64 } from '@ionic-native/base64';


// import * as FusionCharts from 'fusioncharts';
// import * as Charts from 'fusioncharts/fusioncharts.charts';
// import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
// import { FusionChartsModule } from 'angular4-fusioncharts';
import { ServiceProvider } from '../providers/service/service';
import { PaymentProvider } from '../providers/payment/payment';
// FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);
import { ChartsModule } from 'ng2-charts';
import { LoadingProvider } from '../providers/loading/loading';
import { ToastProvider } from '../providers/toast/toast';
import { TranslateProvider } from '../providers/translate/translate';
import { BillProvider } from '../providers/bill/bill';
import { TransactionProvider } from '../providers/transaction/transaction';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { AccountBalancePage } from '../pages/account-balance/account-balance';
import { PaymentUpdatePage } from '../pages/payment-update/payment-update';
import { MatCheckboxModule } from '@angular/material';

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
    ForgotPasswordPage,
    AccountBalancePage,
    PaymentUpdatePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    ChartsModule,
    // FusionChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MatInputModule, MatButtonModule, MatChipsModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule
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
    ForgotPasswordPage,
    AccountBalancePage,
    PaymentUpdatePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    File,
    Base64,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiproviderProvider,
    AuthserviceProvider,
    { provide: APP_CONFIG, useValue: AppConfig },
    ServiceProvider,
    PaymentProvider,
    LoadingProvider,
    ToastProvider,
    TranslateProvider,
    BillProvider,
    TransactionProvider
  ]
})
export class AppModule { }
