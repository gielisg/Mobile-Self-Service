import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';



import { FormControl, Validators } from '@angular/forms';
import { PayNowPage } from '../pay-now/pay-now';
import { PaymentMethodPage } from '../payment-method/payment-method';
import { PaymentProvider } from '../../providers/payment/payment';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { TranslateProvider } from '../../providers/translate/translate';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';

/**
 * Generated class for the NewPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-payment',
  templateUrl: 'new-payment.html',
})
export class NewPaymentPage {

  public pay_Data = { "name": "", "method": "", "cardnum": "", "exm": "1", "exy": "2018" };
  public expireMonth: any[];
  public expireYear: any[];

  public userId = "";

  selType = new FormControl('', [Validators.required]);

  selExm = new FormControl('', [Validators.required]);

  selExy = new FormControl('', [Validators.required]);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
    public paymentService: PaymentProvider,
    public authservice: AuthserviceProvider,
  ) {
  }

  ionViewDidLoad() {
    this.expireMonth = new Array();
    this.expireYear = new Array();
    console.log('ionViewDidLoad NewPaymentPage');
    for (let i = 1; i < 13; i++) {
      this.expireMonth.push(i);
    }

    for (let i = 2018; i < 2050; i++) {
      this.expireYear.push(i);
    }
    this.ionicInit();
  }
  goback() {
    this.navCtrl.pop();
  }

  completeAddCompany(comProfileForm) {
    if (comProfileForm.valid && this.selType.valid && this.selExm.valid) {

      let add_param = {
        "name": this.pay_Data.name,
        "number": this.pay_Data.cardnum,
        "expireDate": this.pay_Data.exy + "-" + this.set_twostring(this.pay_Data.exm) + "-" + new Date().getDate() + "T00:00:00"
      };

      this.loading.show();
      this.paymentService.account_paymentMethodAdd(add_param).subscribe(data => {
        console.log(data);
        this.loading.hide();
        this.navCtrl.pop();
        this.navCtrl.push(PaymentMethodPage);
      }, error => {
        console.log(error);
        let errorBody = JSON.parse(error._body);
        console.log(errorBody);
        if (errorBody.Code.Name == 'InvalidSessionKeyException') {
          this.authservice.createRandomSessionKey().subscribe(result => {
            if (result) {
              console.log(result);
              this.completeAddCompany(comProfileForm);
            }
          }, error => {
            console.log(error);
            this.loading.hide();
          });
        }
        this.loading.hide();
      });
    }
  }

  ionicInit() {

    this.translate.translaterService();

    this.userId = JSON.parse(localStorage.getItem('currentUser')).username;

    this.pay_Data.exm = (new Date().getMonth() + 1).toString();
  }

  set_twostring(input_val) {
    if (parseInt(input_val) < 10) {
      return "0" + input_val;
    } else {
      return input_val;
    }
  }

}
