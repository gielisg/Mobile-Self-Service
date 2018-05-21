import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'

import { TranslateService } from '@ngx-translate/core';
import { AuthserviceProvider } from '../../providers/authservice/authservice';


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
    , public translate: TranslateService, public authservice: AuthserviceProvider) {
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

    this.authservice.get_billList()

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
              array_data.bill_num = list.Number;
              array_data.amount_owin = list.AmountDue;
              array_data.due_date = (list.DueDate.split("T")[0]);
              this.detail_Data.push(array_data);

            }

            console.log(data);
            // console.log(this.bill_data);

          }
          loading.dismiss();

        },
        error => {
          loading.dismiss();
        });

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
  }

  download_pdf(index) {
    const url = "http://localhost/test_php/MyPDF.pdf";

    // file:///storage/emulated/0/Android/data/com.self.serviceapp/files/MyPDF2.pdf

    this.file.checkDir('file:///storage/emulated/0/', 'Self_Service').then((result_check) => {

      console.log(result_check);


      this.fileTransfer.download(url, 'file:///storage/emulated/0/Self_Service/' + 'MyPDF' + index + '.pdf').then((entry) => {
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
        this.fileTransfer.download(url, 'file:///storage/emulated/0/Self_Service/' + 'MyPDF' + index + '.pdf').then((entry) => {
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

}
