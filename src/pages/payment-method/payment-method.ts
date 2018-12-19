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


  public detailData = [];
  public accountNumber = "";

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
  gotoNewPayment() {
    let profileModal = this.modalCtrl.create(NewpaymentCheckPage);
    profileModal.onDidDismiss(data => {
      if (data == "open") {
        this.navCtrl.push(NewPaymentPage);
      }
    });
    profileModal.present();
  }

  ionicInit() {

    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }
    this.accountNumber = JSON.parse(localStorage.getItem('currentUser')).username;
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();

    this.paymentService.getPaymentAvailList().subscribe(data => {
      for (let list of data) {
        let arraySam = { "name": "", "type": "", "number": "", "expiry": "", "status": "open", "paymentId": 0 };
        arraySam.paymentId = list.Id;
        arraySam.name = list.AccountName;
        arraySam.number = list.AccountNumber;
        arraySam.type = list.PaymentMethod.Type.Description;
        if (list.ExpiryDate != null) {
          arraySam.expiry = this.getExpiryDate(list.ExpiryDate);
        }
        arraySam.status = list.Status.Description.replace(/ /g, '');
        this.detailData.push(arraySam);
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

    this.paymentService.accountPaymentMethodCancel(this.detailData[index].paymentId).subscribe(data => {
      this.detailData.splice(index, 1);
      loading.dismiss();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }

  getExpiryDate(inputVal) {
    let arraySam1 = inputVal.split("T")[0];
    let arraySam2 = arraySam1.split("-");
    let returnVal = arraySam2[1] + "/" + arraySam2[0].substr(2);
    return returnVal;
  }

}
