import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { MydetailPage } from '../mydetail/mydetail';
import { MyServicesPage } from '../my-services/my-services';
import { MyDevicesPage } from '../my-devices/my-devices';
import { PayNowPage } from '../pay-now/pay-now';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'

import { TranslateService } from '@ngx-translate/core';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { ServiceProvider } from '../../providers/service/service';
import { MyaccountPage } from '../myaccount/myaccount';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fileTransfer: FileTransferObject = this.transfer.create();
  public switchMode: boolean;

  public billData = { "billAmount": "", "billDate": "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController
    , public toastCtrl: ToastController, public apiprovider: ApiproviderProvider, public transfer: FileTransfer
    , public file: File, public translate: TranslateService, public menu: MenuController, public authservice: AuthserviceProvider,
    public billService: ServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.ionicInit();
  }
  gotoMyDetail() {
    this.navCtrl.push(MydetailPage);
  }
  gotoMyAccount() {
    this.navCtrl.push(MyaccountPage);
  }
  gotoMyService() {
    this.navCtrl.push(MyServicesPage);
  }
  gotoMyDevice() {
    this.navCtrl.push(MyDevicesPage);
  }
  gotoPayNow() {
    this.navCtrl.push(PayNowPage, { navParams: this.billData.billAmount });
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

  click_download() {
    let status = "downloadBillTotal";
    let bill_download = { "email": "", "dueDate": "", "amountOwin": "", "status": "downloadBillTotal", "index": "" };
    bill_download.email = localStorage.getItem("userEmail");
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

          }
          loading.dismiss();

        },
        error => {
          loading.dismiss();
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

    this.billService.getBill().subscribe(data => {
      if (data) {

        this.menu.swipeEnable(true);
        if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
          this.translate.use('en');
          this.switchMode = true;
        } else {
          this.translate.use(localStorage.getItem("setLang"));
          if (localStorage.getItem("setLang") == "en") {
            this.switchMode = true;
          } else {
            this.switchMode = false;
          }
        }
        this.billData.billAmount = data.Items[0].AmountDue;
        this.billData.billDate = this.setDate(data.Items[0].DueDate.split("T")[0]);
      }
      loading.dismiss();

    },
      error => {
        loading.dismiss();
      });
  }

}
