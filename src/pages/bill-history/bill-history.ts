import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'

import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { ServiceProvider } from '../../providers/service/service';

import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';


/**
 * Generated class for the BillHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill-history',
  templateUrl: 'bill-history.html',
})
export class BillHistoryPage {

  fileTransfer: FileTransferObject = this.transfer.create();

  public user_Data = { "username": "", "address": "", "email": "", "phone": "", "status": "" };
  public send_data: any[];


  public detail_Data = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public transfer: FileTransfer,
    public file: File,
    public translate: TranslateProvider,
    public authservice: AuthserviceProvider,
    public bill_service: ServiceProvider,
    public plt: Platform,
  ) {
  }

  ionViewDidLoad() {
    this.ionicInit();

  }

  goback() {
    this.navCtrl.pop();
  }

  ionicInit() {
    this.loading.show();

    this.bill_service.get_billList()

      .subscribe(
        data => {
          if (data) {
            this.translate.translaterService();
            this.user_Data.email = localStorage.getItem("user_email");
            this.detail_Data = Array();
            for (let list of data.Items) {
              let array_data = { "bill_num": "", "due_date": "", "amount_owin": "" };
              array_data.bill_num = list.Number.replace(/ /g, '');
              array_data.amount_owin = list.AmountDue;
              array_data.due_date = (list.DueDate.split("T")[0]);
              this.detail_Data.push(array_data);

            }
            this.convert_billList();
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

  convert_billList() {
    let sam = this.detail_Data;
    this.detail_Data = new Array();
    for (let i = sam.length - 1; i >= 0; i--) {
      this.detail_Data.push(sam[i]);
    }
  }

  set_date(value) {
    let array_sam = value.split("-");
    return array_sam[1] + "-" + array_sam[2] + "-" + array_sam[0];
  }


  download(index) {
    let bill_download = { "bill_num": "", "due_date": "", "amount_owin": "", "status": "download_bill", "index": "" };
    bill_download.bill_num = this.detail_Data[index].bill_num;
    bill_download.due_date = this.detail_Data[index].due_date;
    bill_download.amount_owin = this.detail_Data[index].amount_owin;
    bill_download.index = index;

    this.loading.show();


    this.bill_service.get_billFile(this.detail_Data[index].bill_num).subscribe(result => {
      console.log(result);
      // console.log(result.Content.$value);

      if (result.Content != null && typeof (result.Content) != "undefined") {
        console.log("here");
        var pdf = 'data:application/pdf;base64,' + result.Content.$value;
        let pdfName = result.FileName;
        console.log("here");
        // var dlnk = document.getElementById('dwnldLnk' + index);
        // this.downPdf.href = pdf;

        // this.downPdf.click();
        this.download_pdf(pdf, pdfName);
        // window.open(pdf, "_blank");
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
            this.download(index);
          }
        }, error => {
          console.log(error);
          this.loading.hide();
        });
      }
      this.loading.hide();
    });
  }

  toUTF8Array(str) {
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6),
          0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
      else {
        i++;
        charcode = 0x10000 + (((charcode & 0x3ff) << 10)
          | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  }

  convertDataURIToBinary(dataURI) {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  download_pdf(pdf_byte, pdfName) {

    // file:///storage/emulated/0/Android/data/com.self.serviceapp/files/MyPDF2.pdf

    // this.file.checkDir('file:///storage/emulated/0/', 'Self_Service').then((result_check) => {
    //   console.log(result_check);
    //   this.file.writeFile('file:///storage/emulated/0/Self_Service/', pdfName, this.convertBaseb64ToBlob(pdf_byte, 'data:application/pdf;base64'), { replace: true });
    // }, (error) => {

    //   this.file.createDir('file:///storage/emulated/0/', 'Self_Service', false).then((DirectoryEntry) => {
    //     this.file.writeFile('file:///storage/emulated/0/Self_Service/', pdfName, this.convertBaseb64ToBlob(pdf_byte, 'data:application/pdf;base64'), { replace: true });
    //   }, (error) => {
    //     console.log("Create error");
    //   });
    // });

    let pathDirect = "";
    let pathFile = "";

    console.log(this.file);

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
      // pathDirect = "C://Users/VeeR/Downloads/";
      // pathFile = "C://Users/VeeR/Downloads/" + "Self_Service/";
    }

    this.file.checkDir(pathDirect, 'Self_Service').then((result_check) => {
      console.log(result_check);
      this.file.writeFile(pathFile, pdfName, this.convertBaseb64ToBlob(pdf_byte, 'data:application/pdf;base64'), { replace: true });
    }, (error) => {
      this.file.createDir(pathDirect, 'Self_Service', false).then((DirectoryEntry) => {
        this.file.writeFile(pathFile, pdfName, this.convertBaseb64ToBlob(pdf_byte, 'data:application/pdf;base64'), { replace: true });
      }, (error) => {
        console.log("Create error");
        console.log(error);
        this.toast.show(error.message);
      });
    });
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
