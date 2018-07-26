import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';


import { TranslateService } from '@ngx-translate/core';


import { NewPaymentPage } from '../new-payment/new-payment';
import { NewpaymentCheckPage } from '../newpayment-check/newpayment-check';
import { PaymentProvider } from '../../providers/payment/payment';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public apiprovider: ApiproviderProvider, public translate: TranslateService, public alertCtrl: AlertController, public modalCtrl: ModalController
    , public paymentService: PaymentProvider) {
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
    
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
    this.account_number = JSON.parse(localStorage.getItem('currentUser')).username;
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();

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
      loading.dismiss();

    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }

  deleteItem(index) {

    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();

    this.paymentService.account_paymentMethodCancel(this.detail_Data[index].payment_id).subscribe(data => {
      this.detail_Data.splice(index, 1);
      loading.dismiss();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }

  get_expiryDate(input_val) {
    let array_sam1 = input_val.split("T")[0];
    let array_sam2 = array_sam1.split("-");
    let return_val = array_sam2[1] + "/" + array_sam2[0].substr(2);
    return return_val;
  }

}
