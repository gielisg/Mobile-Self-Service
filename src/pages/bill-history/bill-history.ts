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

  public user_Data = { "username": "", "address": "", "email": "", "phone": "", "status": "" };
  public send_data: any[];


  public detail_Data = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController
    , public toastCtrl: ToastController, public apiprovider: ApiproviderProvider, public transfer: FileTransfer, public file: File
    , public translate: TranslateService, public authservice: AuthserviceProvider, public bill_service: ServiceProvider,
    public base64: Base64) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillHistoryPage');
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

    this.bill_service.get_billList()

      .subscribe(
        data => {
          if (data) {
            console.log(localStorage.getItem("set_lng"));
            if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
              this.translate.use('en');
            } else {
              this.translate.use(localStorage.getItem("set_lng"));
            }
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
            console.log(data);
            // console.log(this.bill_data);
          }
          loading.dismiss();
        },
        error => {
          loading.dismiss();
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
    console.log(array_sam);
    return array_sam[1] + "-" + array_sam[2] + "-" + array_sam[0];
  }


  download(index) {
    console.log(this.detail_Data[index]);
    let status = "download_bill";
    let bill_download = { "bill_num": "", "due_date": "", "amount_owin": "", "status": "download_bill", "index": "" };
    bill_download.bill_num = this.detail_Data[index].bill_num;
    bill_download.due_date = this.detail_Data[index].due_date;
    bill_download.amount_owin = this.detail_Data[index].amount_owin;
    bill_download.index = index;

    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();

    console.log(this.detail_Data[index].bill_num);
    console.log(this.detail_Data[index].bill_num);

    this.bill_service.get_billFile(this.detail_Data[index].bill_num).subscribe(result => {
      console.log(result);
      loading.dismiss();
    }, error => {
      loading.dismiss();
    });

    // this.download_pdf(index);

    // PDFJS.getDocument(pdfAsArray);

    // console.log(this.convertBaseb64ToBlob(pdf_byte, "data:application/pdf;base64"))

    // console.log(bill_download);
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
      // surrogate pair
      else {
        i++;
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
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

  download_pdf(index) {
    const url = "http://localhost/test_php/MyPDF.pdf";

    // file:///storage/emulated/0/Android/data/com.self.serviceapp/files/MyPDF2.pdf

    this.file.checkDir('file:///storage/emulated/0/', 'Self_Service').then((result_check) => {

      console.log(result_check);


      // this.file.writeFile('file:///storage/emulated/0/Self_Service/', 'fffffff.pdf', this.convertBaseb64ToBlob(pdf_byte, 'data:application/pdf;base64'), { replace: true });


    }, (error) => {

      this.file.createDir('file:///storage/emulated/0/', 'Self_Service', false).then((DirectoryEntry) => {

        // this.file.writeFile('file:///storage/emulated/0/Self_Service/', 'fffffff.pdf', this.convertBaseb64ToBlob(pdf_byte, 'data:application/pdf;base64'), { replace: true });

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
