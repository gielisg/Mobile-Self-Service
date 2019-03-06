import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { MydetailPage } from '../mydetail/mydetail';
import { MyaccountPage } from '../myaccount/myaccount';
import { MyServicesPage } from '../my-services/my-services';
import { MyDevicesPage } from '../my-devices/my-devices';
import { PayNowPage } from '../pay-now/pay-now';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'

import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { ServiceProvider } from '../../providers/service/service';
import { TranslateProvider } from '../../providers/translate/translate';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fileTransfer: FileTransferObject = this.transfer.create();
  public switch_mode: boolean;

  public bill_data = { "bill_amount": "", "bill_date": "", 'billNumber': '' };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingProvider,
    private toast: ToastProvider,
    private transfer: FileTransfer,
    private file: File,
    private translate: TranslateProvider,
    private menu: MenuController,
    private authservice: AuthserviceProvider,
    private bill_service: ServiceProvider,
    private plt: Platform,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.ionicInit();
  }
  goto_mydetail() {
    this.navCtrl.push(MydetailPage);
  }
  goto_myaccount() {
    this.navCtrl.push(MyaccountPage);
  }
  goto_myservice() {
    this.navCtrl.push(MyServicesPage);
  }
  goto_mydevice() {
    this.navCtrl.push(MyDevicesPage);
  }
  goto_paynow() {
    this.navCtrl.push(PayNowPage, { navParams: this.bill_data.bill_amount });
  }

  download_bill() {

    const url = "http://localhost/test_php/MyPDF.pdf";

    this.file.checkDir('file:///storage/emulated/0/', 'Self_Service').then((result_check) => {

      this.fileTransfer.download(url, 'file:///storage/emulated/0/Self_Service/' + 'Bill Data.pdf').then((entry) => {
        this.toast.show('download complete: ' + entry.toURL())
      }, (error) => {
        console.log('download failed');
      });

    }, (error) => {

      this.file.createDir('file:///storage/emulated/0/', 'Self_Service', false).then((DirectoryEntry) => {
        this.fileTransfer.download(url, 'file:///storage/emulated/0/Self_Service/' + 'Bill Data.pdf').then((entry) => {
          this.toast.show('download complete: ' + entry.toURL())
        }, (error) => {
          console.log('download failed');
        });
      }, (error) => {
        console.log("Create error");
      });

    });
  }

  click_download() {
    // let status = "download_bill_total";
    let bill_download = { "email": "", "due_date": "", "amount_owin": "", "status": "download_bill_total", "index": "" };
    bill_download.email = localStorage.getItem("user_email");

    this.loading.show();

    this.bill_service.get_billFile(this.bill_data.billNumber).subscribe(result => {
      console.log(result);
      if (Object(result).Content != null && typeof (Object(result).Content) != "undefined") {
        console.log("here");
        var pdf = 'data:application/pdf;base64,' + Object(result).Content.$value;
        let pdfName = Object(result).FileName;
        this.downloadPdf(pdf, pdfName);
      } else {
        this.toast.show('The Bill you trying to download is unavailable at the moment. Sorry for the inconvenience. Please try again later. Please contact Support Team. Error: Bill not available to download yet.');
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

  downloadPdf(pdfByte, pdfName) {

    let pathDirect = "";
    let pathFile = "";


    if (this.plt.is('android')) {
      pathDirect = this.file.externalApplicationStorageDirectory;
      pathFile = this.file.externalApplicationStorageDirectory + "Self_Service/";
    } else if (this.plt.is('ios')) {
      pathDirect = this.file.tempDirectory;
      pathFile = this.file.tempDirectory + "Self_Service/";
    } else if (this.plt.is('windows')) {
      // this.toast.show(this.file.dataDirectory);
      // setTimeout(() => {
      //   this.toast.show(this.file.syncedDataDirectory);
      // }, 3000);
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


  set_date(value) {
    let array_sam = value.split("-");
    return array_sam[1] + "-" + array_sam[2] + "-" + array_sam[0];
  }

  ionicInit() {
    this.loading.show();

    console.log("data");

    this.bill_service.get_bill().subscribe(data => {
      if (data) {

        console.log(data);

        this.menu.swipeEnable(true);
        this.translate.translaterService();
        if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
          this.switch_mode = true;
        } else {
          if (localStorage.getItem("set_lng") == "en") {
            this.switch_mode = true;
          } else {
            this.switch_mode = false;
          }
        }
        this.bill_data.bill_amount = data.Items[0].AmountDue;
        this.bill_data.billNumber = data.Items[0].Number;
        this.bill_data.bill_date = this.set_date(data.Items[0].DueDate.split("T")[0]);
      }
      this.loading.hide();

      // this.toast.show(this.file.tempDirectory);

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
      } else {
        this.toast.show(errorBody.Message);
      }
      this.loading.hide();
    });
  }

}
