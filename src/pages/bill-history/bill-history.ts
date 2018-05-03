import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'

import { TranslateService } from '@ngx-translate/core';


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

  public hand_code = [
    { "ID": "1", "user_id": "1", "bill_num": "12345", "due_date": "2018-03-30", "bill_amount": "250.8" },
    { "ID": "2", "user_id": "1", "bill_num": "45615", "due_date": "2018-03-19", "bill_amount": "365.65" },
    { "ID": "3", "user_id": "1", "bill_num": "25482", "due_date": "2018-03-29", "bill_amount": "253.64" },
    { "ID": "4", "user_id": "1", "bill_num": "38651", "due_date": "2018-03-01", "bill_amount": "254.36" },
    { "ID": "5", "user_id": "1", "bill_num": "21846", "due_date": "2018-03-31", "bill_amount": "365.6" },
    { "ID": "6", "user_id": "1", "bill_num": "21987", "due_date": "2018-03-22", "bill_amount": "965.36" },
    { "ID": "7", "user_id": "1", "bill_num": "29879", "due_date": "2018-04-07", "bill_amount": "864.24" },
    { "ID": "8", "user_id": "1", "bill_num": "24987", "due_date": "2018-04-05", "bill_amount": "349.63" },
    { "ID": "9", "user_id": "1", "bill_num": "35468", "due_date": "2018-04-25", "bill_amount": "325.5" },
    { "ID": "10", "user_id": "2", "bill_num": "32465", "due_date": "2018-03-30", "bill_amount": "453.45" },
    { "ID": "11", "user_id": "3", "bill_num": "46547", "due_date": "2018-03-30", "bill_amount": "453.45" },
    { "ID": "12", "user_id": "3", "bill_num": "46874", "due_date": "2018-03-30", "bill_amount": "349.63" },
    { "ID": "13", "user_id": "4", "bill_num": "54562", "due_date": "2018-03-30", "bill_amount": "864.24" },
    { "ID": "14", "user_id": "3", "bill_num": "48484", "due_date": "2018-03-28", "bill_amount": "253.64" },
    { "ID": "15", "user_id": "23", "bill_num": "16161", "due_date": "2018-03-30", "bill_amount": "453.45" },
    { "ID": "16", "user_id": "2", "bill_num": "46464", "due_date": "2018-03-30", "bill_amount": "349.63" },
    { "ID": "17", "user_id": "3", "bill_num": "28644", "due_date": "2018-03-30", "bill_amount": "864.24" },
    { "ID": "18", "user_id": "2", "bill_num": "56248", "due_date": "2018-03-30", "bill_amount": "253.64" },
    { "ID": "19", "user_id": "2", "bill_num": "56284", "due_date": "2018-03-30", "bill_amount": "453.45" },
    { "ID": "20", "user_id": "2", "bill_num": "64848", "due_date": "2018-03-19", "bill_amount": "349.63" },
    { "ID": "21", "user_id": "3", "bill_num": "64896", "due_date": "2018-04-25", "bill_amount": "864.24" },
    { "ID": "22", "user_id": "22", "bill_num": "54896", "due_date": "2018-03-19", "bill_amount": "253.64" },
    { "ID": "23", "user_id": "3", "bill_num": "18161", "due_date": "2018-04-25", "bill_amount": "453.45" },
    { "ID": "24", "user_id": "2", "bill_num": "64789", "due_date": "2018-04-25", "bill_amount": "349.63" },
    { "ID": "25", "user_id": "2", "bill_num": "51684", "due_date": "2018-04-25", "bill_amount": "864.24" },
    { "ID": "26", "user_id": "2", "bill_num": "16841", "due_date": "2018-03-19", "bill_amount": "253.64" },
    { "ID": "27", "user_id": "3", "bill_num": "16681", "due_date": "2018-04-25", "bill_amount": "453.45" },
    { "ID": "28", "user_id": "3", "bill_num": "18916", "due_date": "2018-03-01", "bill_amount": "349.63" },
    { "ID": "29", "user_id": "3", "bill_num": "61861", "due_date": "2018-03-19", "bill_amount": "864.24" },
    { "ID": "30", "user_id": "2", "bill_num": "16181", "due_date": "2018-03-01", "bill_amount": "864.24" },
    { "ID": "31", "user_id": "2", "bill_num": "16816", "due_date": "2018-03-01", "bill_amount": "253.64" },
    { "ID": "32", "user_id": "3", "bill_num": "", "due_date": "2018-03-19", "bill_amount": "453.45" }
  ];


  public detail_Data = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController
    , public toastCtrl: ToastController, public apiprovider: ApiproviderProvider, public transfer: FileTransfer, public file: File
    , public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillHistoryPage');
    this.ionicInit();

  }

  goback() {
    this.navCtrl.pop();
  }

  ionicInit() {

    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }

    this.user_Data.email = localStorage.getItem("user_email");
    this.detail_Data = Array();


    for (let list of this.hand_code) {
      let array_data = { "bill_num": "", "due_date": "", "amount_owin": "" };
      array_data.bill_num = list.bill_num;
      array_data.amount_owin = list.bill_amount;
      array_data.due_date = list.due_date;
      this.detail_Data.push(array_data);

    }

    // let loading = this.loadingCtrl.create({
    //   content: "Please Wait..."
    // });
    // loading.present();
    // let status = "get_bill_history";
    // this.user_Data.status = status;
    // this.apiprovider.postData(this.user_Data).then((result) => {
    //   console.log(Object(result));
    //   loading.dismiss();
    //   if (Object(result).status == "success") {
    //     for (let list of Object(result).detail) {
    //       let array_data = { "bill_num": "", "due_date": "", "amount_owin": "" };
    //       array_data.bill_num = list.bill_num;
    //       array_data.amount_owin = list.bill_amount;
    //       array_data.due_date = list.due_date;
    //       this.detail_Data.push(array_data);

    //     }
    //     console.log(this.user_Data);
    //   } else {
    //     let toast = this.toastCtrl.create({
    //       message: Object(result).detail,
    //       duration: 2000
    //     })
    //     toast.present();
    //   };

    // }, (err) => {
    //   let toast = this.toastCtrl.create({
    //     message: "No Network",
    //     duration: 2000
    //   })
    //   toast.present();
    //   loading.dismiss();
    // });

  }

  download(index) {
    console.log(this.detail_Data[index]);
    let status = "download_bill";
    let bill_download = { "bill_num": "", "due_date": "", "amount_owin": "", "status": "download_bill", "index": "" };
    bill_download.bill_num = this.detail_Data[index].bill_num;
    bill_download.due_date = this.detail_Data[index].due_date;
    bill_download.amount_owin = this.detail_Data[index].amount_owin;
    bill_download.index = index;
    // this.user_Data.status = status;
    // this.apiprovider.downloadData(bill_download);
    // this.apiprovider.postData(bill_download).then((result) => {
    //   console.log(Object(result));
    //   if (Object(result).status == "success") {
    //     this.download_pdf(index);
    //   } else {

    //   };

    // }, (err) => {
    //   let toast = this.toastCtrl.create({
    //     message: "No Network",
    //     duration: 2000
    //   })
    //   toast.present();
    // });
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


    // this.fileTransfer.download(url, 'file:///storage/emulated/0/Android/data/com.self.serviceapp/files/' + 'MyPDF' + index + '.pdf').then((entry) => {
    //   console.log(this.file.externalDataDirectory);
    //   this.file.moveFile('file:///storage/emulated/0/Android/data/com.self.serviceapp/files/', 'MyPDF' + index + '.pdf', 'file:///storage/emulated/0/Self_Service/', 'MyPDF' + index + '.pdf').then((entry_val) => {
    //     console.log('move complete: ' + entry_val.toURL());
    //   }, (error) => {
    //     console.log("move failed");
    //   })
    //   console.log('download complete: ' + entry.toURL());
    // }, (error) => {
    //   console.log('download failed');
    // });

  }

}
