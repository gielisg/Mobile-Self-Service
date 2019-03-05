import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';
import { PaymentProvider } from '../../providers/payment/payment';
import { AuthserviceProvider } from '../../providers/authservice/authservice';

/**
 * Generated class for the PaymentUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-update',
  templateUrl: 'payment-update.html',
})
export class PaymentUpdatePage {


  public payData = { "name": "", "paymentId": 0, "number": "", "exm": "", "exy": '' };
  public expireMonth: any[];
  public expireYear: any[];

  public userId = "";

  selExm = new FormControl('', [Validators.required]);

  selExy = new FormControl('', [Validators.required]);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public paymentService: PaymentProvider,
    public authservice: AuthserviceProvider,
    public viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentUpdatePage');
    this.ionicInit();
  }

  ionicInit() {

    this.translate.translaterService();

    this.expireMonth = new Array();
    this.expireYear = new Array();

    this.payData.paymentId = parseInt(localStorage.getItem('paymentID'));
    this.payData.number = localStorage.getItem('paymentCardNumber');
    this.payData.name = localStorage.getItem('paymentUserName');

    console.log('ionViewDidLoad NewPaymentPage');
    for (let i = 1; i < 13; i++) {
      this.expireMonth.push(i);
    }

    for (let i = new Date().getFullYear(); i < 2050; i++) {
      this.expireYear.push(i);
    }

    this.userId = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  setTwostring(inputVal) {
    if (parseInt(inputVal) < 10) {
      return "0" + inputVal;
    } else {
      return inputVal;
    }
  }

  goback() {
    // this.navCtrl.pop();
    this.viewCtrl.dismiss('');
  }

  paymentSubmit(comProfileForm) {
    if (this.selExm.valid && this.selExy.valid) {

      let addParam = {
        "name": this.payData.name,
        "paymentId": this.payData.paymentId,
        "number": this.payData.number,
        "expireDate": this.payData.exy + "-" + this.setTwostring(this.payData.exm) + "-" + new Date().getDate() + "T00:00:00"
      };

      this.loading.show();
      this.paymentService.account_paymentMethodUpdate(addParam).subscribe(data => {
        console.log(data);
        this.loading.hide();
        this.viewCtrl.dismiss({ name: this.payData.name, expireDate: addParam.expireDate });
      }, error => {
        console.log(error);
        let errorBody = JSON.parse(error._body);
        if (errorBody.Code.Name == 'InvalidSessionKeyException') {
          this.authservice.createRandomSessionKey().subscribe(result => {
            if (result) {
              console.log(result);
              this.ionicInit();
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

  submitAddPayment() {
    console.log('sdsdhjfsd');
    document.getElementById("trigersubmit").click()
  }

}
