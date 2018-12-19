import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'

import { TranslateService } from '@ngx-translate/core';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { ServiceProvider } from '../../providers/service/service';

import { Base64 } from '@ionic-native/base64';


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

  public userData = { "username": "", "address": "", "email": "", "phone": "", "status": "" };
  public sendData: any[];


  public detailData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController
    , public toastCtrl: ToastController, public apiprovider: ApiproviderProvider, public transfer: FileTransfer, public file: File
    , public translate: TranslateService, public authservice: AuthserviceProvider, public billService: ServiceProvider,
    public base64: Base64) {
  }

  ionViewDidLoad() {
    this.ionicInit();

  }

  goback() {
    this.navCtrl.pop();
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

            if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
              this.translate.use('en');
            } else {
              this.translate.use(localStorage.getItem("setLang"));
            }
            this.userData.email = localStorage.getItem("userEmail");
            this.detailData = Array();
            for (let list of data.Items) {
              let arrayData = { "billNum": "", "dueDate": "", "amountOwin": "" };
              arrayData.billNum = list.Number.replace(/ /g, '');
              arrayData.amountOwin = list.AmountDue;
              arrayData.dueDate = (list.DueDate.split("T")[0]);
              this.detailData.push(arrayData);

            }
            this.convertBillList();
          }
          loading.dismiss();
        },
        error => {
          loading.dismiss();
        });
  }

  convertBillList() {
    let sam = this.detailData;
    this.detailData = new Array();
    for (let i = sam.length - 1; i >= 0; i--) {
      this.detailData.push(sam[i]);
    }
  }

  setDate(value) {
    let arraySam = value.split("-");
    return arraySam[1] + "-" + arraySam[2] + "-" + arraySam[0];
  }


  download(index) {
    let status = "download_bill";
    let billBownload = { "billNum": "", "dueDate": "", "amountOwin": "", "status": "download_bill", "index": "" };
    billBownload.billNum = this.detailData[index].billNum;
    billBownload.dueDate = this.detailData[index].dueDate;
    billBownload.amountOwin = this.detailData[index].amountOwin;
    billBownload.index = index;

    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();


    this.billService.getBillFile(this.detailData[index].billNum).subscribe(result => {
      loading.dismiss();
    }, error => {
      loading.dismiss();
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

  downloadPdf(index) {
    const url = "http://localhost/test_php/MyPDF.pdf";


    this.file.checkDir('file:///storage/emulated/0/', 'Self_Service').then((result_check) => {


    }, (error) => {

      this.file.createDir('file:///storage/emulated/0/', 'Self_Service', false).then((DirectoryEntry) => {


      }, (error) => {
        console.log("Create error");
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
