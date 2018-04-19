import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { MydetailPage } from '../mydetail/mydetail';
import { MyaccountPage } from '../myaccount/myaccount';
import { MyServicesPage } from '../my-services/my-services';
import { MyDevicesPage } from '../my-devices/my-devices';
import { PayNowPage } from '../pay-now/pay-now';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController
    , public toastCtrl: ToastController, public apiprovider: ApiproviderProvider, public transfer: FileTransfer
    , public file: File, public translate: TranslateService, public menu: MenuController) {

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
    this.navCtrl.push(PayNowPage);
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

  ionicInit() {
    this.menu.swipeEnable(true);
    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }
  }

}
