import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
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

  public bill_data = { "bill_amount": "", "bill_date": "" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public transfer: FileTransfer,
    public file: File,
    public translate: TranslateProvider,
    public menu: MenuController,
    public authservice: AuthserviceProvider,
    public bill_service: ServiceProvider,
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
    let status = "download_bill_total";
    let bill_download = { "email": "", "due_date": "", "amount_owin": "", "status": "download_bill_total", "index": "" };
    bill_download.email = localStorage.getItem("user_email");

    this.loading.show();

    this.bill_service.get_billList()

      .subscribe(
        data => {
          if (data) {
            this.bill_data.bill_amount = data.Items[0].AmountDue;
            this.bill_data.bill_date = this.set_date(data.Items[0].DueDate.split("T")[0]);

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
        this.bill_data.bill_date = this.set_date(data.Items[0].DueDate.split("T")[0]);
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

}
