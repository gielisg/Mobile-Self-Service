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

  public billData = { "billAmount": "", "billDate": "", "accountNumber": "" };

  constructor(public navCtrl: NavController, public translate: TranslateService, public navParams: NavParams, public loadingCtrl: LoadingController
    , public toastCtrl: ToastController, public apiprovider: ApiproviderProvider, public transfer: FileTransfer, public authservice: AuthserviceProvider
    , public file: File, public billService: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountPage');
    this.ionicInit();
  }
  gotoBillHistory() {
    this.navCtrl.push(BillHistoryPage);
  }
  gotoTransactionHistory() {
    this.navCtrl.push(TransactionHistoryPage);
  }
  gotoPaymentHistory() {
    this.navCtrl.push(PaymentMethodPage);
  }
  gotoPayNow() {
    this.navCtrl.push(PayNowPage, { navParams: this.billData.billAmount });
  }

  clickDownload() {
    let status = "downloadBillTotal";
    let billDownload = { "email": "", "dueDate": "", "amountOwin": "", "status": "downloadBillTotal", "index": "" };
    billDownload.email = localStorage.getItem("userEmail");
  }
  downloadBill() {

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

  setDate(value) {
    let arraySam = value.split("-");
    return arraySam[1] + "-" + arraySam[2] + "-" + arraySam[0];
  }

  ionicInit() {
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();

    this.billService.getBillList()

      .subscribe(
        data => {
          if (data) {
            this.billData.billAmount = data.Items[0].AmountDue;
            this.billData.billDate = this.setDate(data.Items[0].DueDate.split("T")[0]);
            this.billData.accountNumber = data.Items[0].ContactCode;
            
            if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
              this.translate.use('en');
            } else {
              this.translate.use(localStorage.getItem("setLang"));
              if (localStorage.getItem("setLang") == "en") {
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
