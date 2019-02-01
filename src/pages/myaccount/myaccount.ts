import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BillHistoryPage } from '../bill-history/bill-history';
import { TransactionHistoryPage } from '../transaction-history/transaction-history';
import { PaymentMethodPage } from '../payment-method/payment-method';
import { PayNowPage } from '../pay-now/pay-now';
import { FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'


import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { ServiceProvider } from '../../providers/service/service';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';

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

  public bill_data = { "bill_amount": "", "bill_date": "", "account_number": "", "bill_number": "" };

  constructor(
    public navCtrl: NavController,
    public translate: TranslateProvider,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public transfer: FileTransfer,
    public authservice: AuthserviceProvider,
    public file: File,
    public bill_service: ServiceProvider,
    public plt: Platform,
  ) {
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
    // let bill_download = { "email": "", "due_date": "", "amount_owin": "", "status": "download_bill_total", "index": "" };
    // bill_download.email = localStorage.getItem("user_email");

    // let status = "download_bill_total";
    let bill_download = { "email": "", "due_date": "", "amount_owin": "", "status": "download_bill_total", "index": "" };
    bill_download.email = localStorage.getItem("user_email");

    this.loading.show();

    this.bill_service.get_billFile(this.bill_data.bill_number)
      .subscribe(result => {
        console.log(result);

        if (Object(result).Content != null && typeof (Object(result).Content) != "undefined") {
          console.log("here");
          var pdf = 'data:application/pdf;base64,' + Object(result).Content.$value;
          let pdfName = Object(result).FileName;
          console.log("here");
          this.downloadPdf(pdf, pdfName);
        } else {
          this.toast.show('The Bill you trying to download is unavailable at the moment. Sorry for the inconvenience. Please try again later. Please contact Support Team. Error: Bill not available to download yet.');
        }

        this.loading.hide();

      }, error => {
        console.log(error);
        let errorBody = error.error;
        console.log(errorBody);
        if (errorBody.Code.Name == 'InvalidSessionKeyException') {
          this.authservice.createRandomSessionKey().subscribe(result => {
            if (result) {
              console.log(result);
              localStorage.setItem('sessionKey', Object(result));
              this.click_download();
            }
          }, error => {
            console.log(error);
            this.loading.hide();
          });
        }
        this.loading.hide();
      });

  }

  download_bill() {

    const url = "http://localhost/test_php/MyPDF.pdf";

    this.file.checkDir('file:///storage/emulated/0/', 'Self_Service').then((result_check) => {



      this.fileTransfer.download(url, 'file:///storage/emulated/0/Self_Service/' + 'Bill Data.pdf').then((entry) => {
        this.toast.show('download complete: ' + entry.toURL());
      }, (error) => {
        console.log('download failed');
      });

    }, (error) => {

      this.file.createDir('file:///storage/emulated/0/', 'Self_Service', false).then((DirectoryEntry) => {
        this.fileTransfer.download(url, 'file:///storage/emulated/0/Self_Service/' + 'Bill Data.pdf').then((entry) => {
          this.toast.show('download complete: ' + entry.toURL());
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

    this.loading.show();

    this.bill_service.get_billList()

      .subscribe(
        data => {
          if (data) {
            this.bill_data.bill_amount = data.Items[0].AmountDue;
            this.bill_data.bill_date = this.set_date(data.Items[0].DueDate.split("T")[0]);
            this.bill_data.account_number = data.Items[0].ContactCode;
            this.translate.translaterService();
            if (localStorage.getItem("set_lng") == "en") {
              this.switch_mode = true;
            } else {
              this.switch_mode = false;
            }

          }
          this.loading.hide();

        },
        error => {
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

  downloadPdf(pdfByte, pdfName) {

    let pathDirect = "";
    let pathFile = "";

    console.log(this.file);

    if (this.plt.is('android')) {
      pathDirect = this.file.externalApplicationStorageDirectory;
      pathFile = this.file.externalApplicationStorageDirectory + "Self_Service/";
    } else if (this.plt.is('ios')) {
      pathDirect = this.file.tempDirectory;
      pathFile = this.file.tempDirectory + "Self_Service/";
    }

    if (!this.plt.is('desktop')) {
      this.file.checkDir(pathDirect, 'Self_Service').then((resultCheck) => {
        console.log(resultCheck);
        this.file.writeFile(pathFile, pdfName, this.convertBaseb64ToBlob(pdfByte, 'data:application/pdf;base64'), { replace: true });
      }, (error) => {
        this.file.createDir(pathDirect, 'Self_Service', false).then((DirectoryEntry) => {
          this.file.writeFile(pathFile, pdfName, this.convertBaseb64ToBlob(pdfByte, 'data:application/pdf;base64'), { replace: true });
        }, (error) => {
          console.log("Create error");
        });
      });
    }

  }

  convertBaseb64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }



}
