import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';



import { FormControl, Validators } from '@angular/forms';
import { PaymentProvider } from '../../providers/payment/payment';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { TranslateProvider } from '../../providers/translate/translate';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { MyaccountPage } from '../myaccount/myaccount';

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

  public pay_Data = { "name": "", "method": "", "cardnum": "", "exm": "", "exy": "" };
  public expireMonth: any[];
  public expireYear: any[];

  public userId = "";

  selType = new FormControl('', [Validators.required]);

  selExm = new FormControl('', [Validators.required]);

  selExy = new FormControl('', [Validators.required]);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingProvider,
    private toast: ToastProvider,
    private translate: TranslateProvider,
    private paymentService: PaymentProvider,
    private authservice: AuthserviceProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPaymentPage');
    this.ionicInit();
  }
  goback() {
    this.navCtrl.pop();
  }

  completeAddCompany(comProfileForm) {
    if (comProfileForm.valid && this.selType.valid && this.selExm.valid) {

      let add_param = {
        "name": this.pay_Data.name,
        "cardType": '',
        "cardCodeType": '',
        "number": this.pay_Data.cardnum,
        "expireDate": this.pay_Data.exy + "-" + this.set_twostring(this.pay_Data.exm) + "-" + this.set_twostring(new Date().getDate()) + "T00:00:00"
      };

      if (this.pay_Data.method == 'credit') {
        add_param.cardType = 'CC';
        add_param.cardCodeType = 'C';
      } else if (this.pay_Data.method == 'debit') {
        add_param.cardType = 'DD';
        add_param.cardCodeType = 'D';
      } else {
        add_param.cardType = 'MC';
        add_param.cardCodeType = 'C';
      }

      this.loading.show();
      this.paymentService.account_paymentMethodAdd(add_param).subscribe(data => {
        console.log(data);
        this.loading.hide();
        this.navCtrl.push(MyaccountPage);
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
        } else {
          this.toast.show(errorBody.Message)
        }
        this.loading.hide();
      });
    }
  }

  ionicInit() {

    this.translate.translaterService();

    this.expireMonth = new Array();
    this.expireYear = new Array();
    for (let i = 1; i < 13; i++) {
      this.expireMonth.push(i);
    }

    for (let i = new Date().getFullYear(); i < 2050; i++) {
      this.expireYear.push(i);
    }

    this.userId = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  set_twostring(input_val) {
    if (parseInt(input_val) < 10) {
      return "0" + input_val;
    } else {
      return input_val;
    }
  }

  selectExpireYear() {
    if (parseInt(this.pay_Data.exy) == new Date().getFullYear()) {
      if (parseInt(this.pay_Data.exm) == new Date().getMonth() + 1) {
        this.pay_Data.exm = '';
      }
      this.expireMonth = new Array();
      for (let i = new Date().getMonth() + 1; i < 13; i++) {
        this.expireMonth.push(i);
      }
    } else {
      this.expireMonth = new Array();
      for (let i = 1; i < 13; i++) {
        this.expireMonth.push(i);
      }
    }
  }

}
