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
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { ServiceProvider } from '../../providers/service/service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fileTransfer: FileTransferObject = this.transfer.create();
  public switch_mode: boolean;

  public bill_data = { "bill_amount": "", "bill_date": "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController
    , public toastCtrl: ToastController, public apiprovider: ApiproviderProvider, public transfer: FileTransfer
    , public file: File, public translate: TranslateService, public menu: MenuController, public authservice: AuthserviceProvider,
    public bill_service: ServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    // this.switch_mode = true;
    this.ionicInit();

    console.log(localStorage.getItem('currentUser'));

    console.log(this.switch_mode);
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
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();

    this.bill_service.get_billList()

      .subscribe(
        data => {
          if (data) {
            console.log(data);
            this.bill_data.bill_amount = data.Items[0].AmountDue;
            this.bill_data.bill_date = this.set_date(data.Items[0].DueDate.split("T")[0]);
            console.log(this.bill_data);

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

  ionicInit() {



    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();

    this.bill_service.get_bill().subscribe(data => {
      if (data) {

        this.menu.swipeEnable(true);
        console.log(localStorage.getItem("set_lng"));
        if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
          this.translate.use('en');
          this.switch_mode = true;
        } else {
          this.translate.use(localStorage.getItem("set_lng"));
          if (localStorage.getItem("set_lng") == "en") {
            this.switch_mode = true;
          } else {
            this.switch_mode = false;
          }
        }
        this.bill_data.bill_amount = data.Items[0].AmountDue;
        this.bill_data.bill_date = this.set_date(data.Items[0].DueDate.split("T")[0]);
      }
      loading.dismiss();

    },
      error => {
        loading.dismiss();
      });
    // this.authservice.account_balance().subscribe(result => {
    //   console.log(result);
    // }
    //   , error => {
    //     console.log("error");
    //   });
  }

}
