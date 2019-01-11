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
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { ServiceProvider } from '../../providers/service/service';

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
  public switch_mode: boolean;

  public bill_data = { "bill_amount": "", "bill_date": "", "account_number": "" };

  constructor(public navCtrl: NavController, public translate: TranslateService, public navParams: NavParams, public loadingCtrl: LoadingController
    , public toastCtrl: ToastController, public apiprovider: ApiproviderProvider, public transfer: FileTransfer, public authservice: AuthserviceProvider
    , public file: File, public bill_service: ServiceProvider) {
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
    this.navCtrl.push(PayNowPage, { navParams: this.bill_data.bill_amount });
  }

  click_download() {
    let status = "download_bill_total";
    let bill_download = { "email": "", "due_date": "", "amount_owin": "", "status": "download_bill_total", "index": "" };
    bill_download.email = localStorage.getItem("user_email");
  }
  download_bill() {

    const url = "http://localhost/test_php/MyPDF.pdf";

    this.file.checkDir('file:///storage/emulated/0/', 'Self_Service').then((result_check) => {



      this.fileTransfer.download(url, 'file:///storage/emulated/0/Self_Service/' + 'Bill Data.pdf').then((entry) => {
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

  set_date(value) {
    let array_sam = value.split("-");
    return array_sam[1] + "-" + array_sam[2] + "-" + array_sam[0];
  }

  ionicInit() {
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();

    this.bill_service.get_billList()

      .subscribe(
        data => {
          if (data) {
            this.bill_data.bill_amount = data.Items[0].AmountDue;
            this.bill_data.bill_date = this.set_date(data.Items[0].DueDate.split("T")[0]);
            this.bill_data.account_number = data.Items[0].ContactCode;
            
            if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
              this.translate.use('en');
            } else {
              this.translate.use(localStorage.getItem("set_lng"));
              if (localStorage.getItem("set_lng") == "en") {
                this.switch_mode = true;
              } else {
                this.switch_mode = false;
              }
            }

          }
          loading.dismiss();

        },
        error => {
          loading.dismiss();
        });
  }

}
