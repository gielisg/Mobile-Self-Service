import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


import { FormControl, Validators } from '@angular/forms';
import { PaynowCheckPage } from '../paynow-check/paynow-check';
import { HomePage } from '../home/home';
import { PaymentProvider } from '../../providers/payment/payment';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';
import { AuthserviceProvider } from '../../providers/authservice/authservice';

/**
 * Generated class for the PayNowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-now',
  templateUrl: 'pay-now.html',
})
export class PayNowPage {

  animalControl = new FormControl('', [Validators.required]);

  public pay_Data = { "name": "", "method": "", "cardnum": "", "exm": "none", "exy": "2018" };
  public cancen_enable: boolean;

  public pay_amount: any;
  public totalAmount: any;
  private checked = false;

  customAmount = new FormControl('', [
    Validators.required
  ]);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
    public modalCtrl: ModalController,
    public paymentService: PaymentProvider,
    public authservice: AuthserviceProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayNowPage');
    this.ionicInit();
    this.cancen_enable = false;
    this.pay_amount = parseFloat(this.navParams.data.navParams);
    this.totalAmount = parseFloat(this.navParams.data.navParams);
  }

  goback() {
    // this.cancen_enable = true;
    this.navCtrl.pop();
  }

  ionicInit() {

    this.translate.translaterService();

  }

  pay_now() {
    let profileModal = this.modalCtrl.create(PaynowCheckPage);
    profileModal.onDidDismiss(data => {
      this.navCtrl.push(HomePage);
    });
    profileModal.present();
  }

  paymentSubmit(comProfileForm) {

    console.log(this.customAmount.valid);

    if (comProfileForm.valid && !this.cancen_enable && (this.customAmount.valid && this.checked || !this.checked)
      && this.pay_amount <= this.totalAmount) {
      this.loading.show();
      if (this.pay_Data.method == 'Paypal') {
        if (this.checked) {

        } else {
          this.pay_amount = this.totalAmount;
        }
        this.paymentService.setAccountBalanceByDefault(parseFloat(this.pay_amount)).subscribe((result: any) => {
          console.log(result);
          this.cancen_enable = true;
          this.loading.hide();
        }, error => {
          let errorBody = JSON.parse(error._body);
          console.log(errorBody);
          if (errorBody.Code.Name == 'InvalidSessionKeyException') {
            this.authservice.createRandomSessionKey().subscribe(result => {
              if (result) {
                console.log(result);
                this.paymentSubmit(comProfileForm);
              }
            }, error => {
              console.log(error);
              this.loading.hide();
            });
          } else {
            this.toast.show(errorBody.Message);
          }
          this.loading.hide();
        })
      } else {
        this.paymentService.setAccountBalanceByCard(parseFloat(this.pay_amount)).subscribe((result: any) => {
          console.log(result);
          this.cancen_enable = true;
          this.loading.hide();
        }, error => {
          let errorBody = JSON.parse(error._body);
          console.log(errorBody);
          if (errorBody.Code.Name == 'InvalidSessionKeyException') {
            this.authservice.createRandomSessionKey().subscribe(result => {
              if (result) {
                console.log(result);
                this.paymentSubmit(comProfileForm);
              }
            }, error => {
              console.log(error);
              this.loading.hide();
            });
          } else {
            this.toast.show(errorBody.Message);
          }
          this.loading.hide();
        })
      }
    }

  }

  changeCheck() {
    console.log(this.checked);
  }

  gotoPaymenthistory() {
    this.cancen_enable = false;
    this.navCtrl.push(HomePage);
  }

}
