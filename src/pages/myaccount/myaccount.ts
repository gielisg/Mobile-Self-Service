import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { BillHistoryPage } from '../bill-history/bill-history';
import { TransactionHistoryPage } from '../transaction-history/transaction-history';
import { PaymentMethodPage } from '../payment-method/payment-method';
import { PayNowPage } from '../pay-now/pay-now';
import { FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';
import { File } from '@ionic-native/file'


import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {

  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public navCtrl: NavController, public translate: TranslateService, public navParams: NavParams, public loadingCtrl: LoadingController
    , public toastCtrl: ToastController, public apiprovider: ApiproviderProvider, public transfer: FileTransfer
    , public file: File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountPage');
    this.ionicInit();
  }
  goto_billHistory() {
    this.navCtrl.push(BillHistoryPage);
  }
  goto_transactionHistory() {
    this.navCtrl.push(TransactionHistoryPage);
  }
  goto_paymentHistory() {
    this.navCtrl.push(PaymentMethodPage);
  }
  goto_payNow() {
    this.navCtrl.push(PayNowPage);
  }

  click_download() {
    let status = "download_bill_total";
    let bill_download = { "email": "", "due_date": "", "amount_owin": "", "status": "download_bill_total", "index": "" };
    bill_download.email = localStorage.getItem("user_email");

    this.apiprovider.postData(bill_download).then((result) => {
      console.log(Object(result));
      if (Object(result).status == "success") {
        this.download_bill();
      } else {

      };

    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "No Network",
        duration: 2000
      })
      toast.present();
    });
  }
  download_bill() {

    const url = "http://localhost/test_php/MyPDF.pdf";

    this.file.checkDir('file:///storage/emulated/0/', 'Self_Service').then((result_check) => {

      console.log(result_check);


      this.fileTransfer.download(url, 'file:///storage/emulated/0/Self_Service/' + 'Bill Data.pdf').then((entry) => {
        console.log(this.file.externalDataDirectory);
        console.log('download complete: ' + entry.toURL());
        let toast = this.toastCtrl.create({
          message: 'download complete: ' + entry.toURL(),
          duration: 2000
        });
        toast.present();
      }, (error) => {
        console.log('download failed');
      });

    }, (error) => {

      this.file.createDir('file:///storage/emulated/0/', 'Self_Service', false).then((DirectoryEntry) => {
        this.fileTransfer.download(url, 'file:///storage/emulated/0/Self_Service/' + 'Bill Data.pdf').then((entry) => {
          console.log(this.file.externalDataDirectory);
          console.log('download complete: ' + entry.toURL());
          let toast = this.toastCtrl.create({
            message: 'download complete: ' + entry.toURL(),
            duration: 2000
          })
          toast.present();
        }, (error) => {
          console.log('download failed');
        });
      }, (error) => {
        console.log("Create error");
      });

    });
  }

  ionicInit() {
    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
  }

}
