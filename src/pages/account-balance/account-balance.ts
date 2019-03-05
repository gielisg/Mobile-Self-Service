import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { PaymentProvider } from '../../providers/payment/payment';

/**
 * Generated class for the AccountBalancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-balance',
  templateUrl: 'account-balance.html',
})
export class AccountBalancePage {

  public expireMonth: any[];
  public expireYear: any[];
  
  private cardState = false;
  private defaultState = false;



  selType = new FormControl('', [Validators.required]);
  selExm = new FormControl('', [Validators.required]);
  selExy = new FormControl('', [Validators.required]);

  private balanceData = {
    'method': '',
    'amount': 25.689,
    'cardNum': '',
    'name': '',
    'exm': '',
    'exy': '',
    'expireDate': ''
    // 'exm': new Date().getMonth() + 1,
    // 'exy': new Date().getFullYear()
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
    public accountServer: AuthserviceProvider,
    public authservice: AuthserviceProvider,
    public paymentService: PaymentProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountBalancePage');
    this.ionicInit();
    this.selectMethod();
  }

  ionicInit() {
    this.translate.translaterService();

    this.expireMonth = new Array();
    this.expireYear = new Array();
    console.log('ionViewDidLoad AccountBalancePage');
    for (let i = 1; i < 13; i++) {
      this.expireMonth.push(i);
    }

    for (let i = new Date().getFullYear(); i < 2050; i++) {
      this.expireYear.push(i);
    }
  }

  selectMethod() {
    console.log(this.balanceData.method);
    if (this.balanceData.method == "Paypal") {
      this.defaultState = true;
      this.cardState = false;
    } else if (this.balanceData.method == 'Visa') {
      this.defaultState = false;
      this.cardState = true;
    } else {
      this.cardState = false;
      this.defaultState = false;
    }
  }

  goback() {
    this.navCtrl.pop();
  }

  setTwostring(inputVal) {
    if (parseInt(inputVal) < 10) {
      return "0" + inputVal;
    } else {
      return inputVal;
    }
  }

  setMonthList() {
    console.log(this.balanceData.exy);
    if (this.balanceData.exy == (new Date().getFullYear()).toString()) {
      if (parseInt(this.balanceData.exm) < new Date().getMonth() + 1) {
        this.balanceData.exm = '';
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
    console.log(this.expireMonth);
  }

  balanceSubmit(balanceForm) {
    console.log(balanceForm);
    if (balanceForm.valid) {
      this.balanceData.expireDate =
        this.balanceData.exy + "-" +
        this.setTwostring(this.balanceData.exm) + "-" +
        new Date().getDate() + "T00:00:00";
      this.loading.show();
      if (this.balanceData.method == 'Paypal') {
        this.paymentService.setAccountBalanceByDefault(this.balanceData.amount).subscribe(result => {
          console.log(result);
          this.loading.hide();
          this.navCtrl.pop();
        }, error => {
          console.log(error);
          let errorBody = JSON.parse(error._body);
          console.log(errorBody);
          if (errorBody.Code.Name == 'InvalidSessionKeyException') {
            this.authservice.createRandomSessionKey().subscribe(result => {
              if (result) {
                console.log(result);
                this.balanceSubmit(balanceForm);
              }
            }, error => {
              console.log(error);
              this.loading.hide();
            });
          } else {
            this.toast.show(errorBody.Message);
          }
          this.loading.hide();
        });
      } else {
        this.paymentService.setAccountBalanceByCard(this.balanceData).subscribe(result => {
          console.log(result);
          this.loading.hide();
          this.navCtrl.pop();
        }, error => {
          console.log(error);
          let errorBody = JSON.parse(error._body);
          console.log(errorBody);
          if (errorBody.Code.Name == 'InvalidSessionKeyException') {
            this.authservice.createRandomSessionKey().subscribe(result => {
              if (result) {
                console.log(result);
                this.balanceSubmit(balanceForm);
              }
            }, error => {
              console.log(error);
              this.loading.hide();
            });
          } else {
            this.toast.show(errorBody.Message);
          }
          this.loading.hide();
        });
      }
    }
  }

}
