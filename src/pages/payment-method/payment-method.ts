import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';



import { NewPaymentPage } from '../new-payment/new-payment';
import { NewpaymentCheckPage } from '../newpayment-check/newpayment-check';
import { PaymentProvider } from '../../providers/payment/payment';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { TranslateProvider } from '../../providers/translate/translate';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the PaymentMethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html',
})
export class PaymentMethodPage {


  public detail_Data = [];
  public account_number = "";

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
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodPage');
    this.ionicInit();
  }
  goback() {
    this.navCtrl.pop();
  }
  goto_newPayment() {
    let profileModal = this.modalCtrl.create(NewpaymentCheckPage);
    profileModal.onDidDismiss(data => {
      if (data == "open") {
        this.navCtrl.push(NewPaymentPage);
      }
    });
    profileModal.present();
  }

  ionicInit() {

    this.translate.translaterService();
    this.account_number = JSON.parse(localStorage.getItem('currentUser')).username;

    this.loading.show();

    this.paymentService.get_paymentAvailList().subscribe(data => {
      for (let list of data) {
        let array_sam = { "name": "", "type": "", "number": "", "expiry": "", "status": "open", "payment_id": 0 };
        array_sam.payment_id = list.Id;
        array_sam.name = list.AccountName;
        array_sam.number = list.AccountNumber;
        array_sam.type = list.PaymentMethod.Type.Description;
        if (list.ExpiryDate != null) {
          array_sam.expiry = this.get_expiryDate(list.ExpiryDate);
        }
        array_sam.status = list.Status.Description.replace(/ /g, '');
        this.detail_Data.push(array_sam);
      }
      this.loading.hide();

    }, error => {
      console.log(error);
      let errorBody = JSON.parse(error._body);
      console.log(errorBody);
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

  deleteItem(index) {

    this.loading.show();

    this.paymentService.account_paymentMethodCancel(this.detail_Data[index].payment_id).subscribe(data => {
      this.detail_Data.splice(index, 1);
      this.loading.hide();
    }, error => {
      console.log(error);
      let errorBody = JSON.parse(error._body);
      console.log(errorBody);
      if (errorBody.Code.Name == 'InvalidSessionKeyException') {
        this.authservice.createRandomSessionKey().subscribe(result => {
          if (result) {
            console.log(result);
            this.deleteItem(index);
          }
        }, error => {
          console.log(error);
          this.loading.hide();
        });
      }
      this.loading.hide();
    });
  }

  get_expiryDate(input_val) {
    let array_sam1 = input_val.split("T")[0];
    let array_sam2 = array_sam1.split("-");
    let return_val = array_sam2[1] + "/" + array_sam2[0].substr(2);
    return return_val;
  }

}
