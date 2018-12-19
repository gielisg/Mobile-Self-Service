import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';
import { FormControl, Validators } from '@angular/forms';


import { TranslateService } from '@ngx-translate/core';
import { AuthserviceProvider } from '../../providers/authservice/authservice';

/**
 * Generated class for the MydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mydetail',
  templateUrl: 'mydetail.html',
})
export class MydetailPage {

  public userData = { "username": "", "address": "", "email": "", "phone": "", "status": "" };

  public tempData = { "email": "", "oldUserData": "", "newUserData": "", "detail": "", "status": "" };

  public changeState = { "username": false, "address": false, "email": false, "phone": false };

  public sendData: any[];
  public addressList: any[];
  public phoneList: any[];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  phoneFormCtrl = new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9]{8}"),
  ]);

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController
    , public toastCtrl: ToastController, public apiprovider: ApiproviderProvider, public translate: TranslateService
    , public accountServer: AuthserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MydetailPage');
    this.ionicInit();
  }

  ionicInit() {


    console.log(localStorage.getItem("setLang"));
    if (typeof (localStorage.getItem("setLang")) == "undefined" || localStorage.getItem("setLang") == "" || localStorage.getItem("setLang") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("setLang"));
    }

    this.userData.email = localStorage.getItem("userEmail");

    // this.userData.email = "veerhunter127@gmail.com";
    // this.userData.phone = "123456789";
    // this.userData.username = "VeeRHunter";
    // this.userData.address = "XX street, YY city, ZZ country";

    this.addressList = new Array();
    this.phoneList = new Array();


    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    let status = "getDetail";
    this.userData.status = status;
    this.accountServer.getAccountDetail().subscribe(result => {
      console.log(result);
      this.userData.username = result.FullName;
      for (let list of Object(result).ContactPhoneList) {
        if (list.LastUpdated != null) {
          this.phoneList.push(Date.parse(list.LastUpdated));
        }
      }
      for (let list of Object(result).AddressList.Items) {
        if (list.LastUpdated != null) {
          this.addressList.push(Date.parse(list.LastUpdated));
        }
      }
      this.userData.email = result.ContactEmailAddressList[0].EmailAddress;
      if (Object(result).AddressList.Items[this.getMaxvalueIndex(this.addressList)].Address2 != null) {
        this.userData.address = Object(result).AddressList.Items[this.getMaxvalueIndex(this.addressList)].Address1 + Object(result).AddressList.Items[this.getMaxvalueIndex(this.addressList)].Address2;
      } else {
        this.userData.address = Object(result).AddressList.Items[this.getMaxvalueIndex(this.addressList)].Address1;
      }
      this.userData.phone = Object(result).ContactPhoneList[this.getMaxvalueIndex(this.phoneList)].Number;
      if (this.userData.phone.length > 8) {
        this.userData.phone = this.userData.phone.substr(this.userData.phone.length - 8);
      }
      loading.dismiss();
    }, error => {
      console.log("error");
      loading.dismiss();
    });
  }

  getMaxvalueIndex(arraySam) {
    let maxValue = arraySam[0];
    let returnIndex = 0;

    for (let list of arraySam) {
      if (maxValue < list) {
        maxValue = list;
      }
    }

    for (let i = 0; i < arraySam.length; i++) {
      if (arraySam[i] == maxValue) {
        returnIndex = i;
      }
    }
    return returnIndex;
  }

  changeUser(name) {
    switch (name) {
      case "username":
        if (this.currentState('username')) {
          if (this.changeState.username) {
            this.tempData.newUserData = this.userData.username;
            this.tempData.detail = "username";
            if (this.tempData.oldUserData != this.tempData.newUserData) {
              if (this.tempData.newUserData != "") {
                this.changeUserState();
              } else {
                this.userData.username = this.tempData.oldUserData;
              }
              this.changeState.username = !this.changeState.username;
            } else {
              this.changeState.username = !this.changeState.username;
            }
          } else {
            this.tempData.oldUserData = this.userData.username;
            this.changeState.username = !this.changeState.username;
          }
        }
        break;
      case 'email':
        if (this.currentState('email')) {
          if (this.changeState.email) {
            this.tempData.newUserData = this.userData.email;
            this.tempData.detail = "email";
            // if (this.tempData.oldUserData != this.tempData.newUserData) {
            //   if (this.tempData.newUserData != "" && (this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required'))) {
            //     this.updateEmail();
            //   } else {
            //     this.userData.email = this.tempData.oldUserData;
            //   }
            // }
            this.changeState.email = !this.changeState.email;
          } else {
            this.tempData.oldUserData = this.userData.email;
            this.changeState.email = !this.changeState.email;
          }
        }
        break;
      case 'address':
        if (this.currentState('address')) {
          if (this.changeState.address) {
            this.tempData.newUserData = this.userData.address;
            this.tempData.detail = "address";
            if (this.tempData.oldUserData != this.tempData.newUserData) {
              if (this.tempData.newUserData != "") {
                this.updateAddress();
              } else {
                this.userData.address = this.tempData.oldUserData;
              }
            }
            this.changeState.address = !this.changeState.address;
          } else {
            this.tempData.oldUserData = this.userData.address;
            this.changeState.address = !this.changeState.address;
          }
        }
        break;
      case 'phone':
        if (this.currentState('phone')) {
          if (this.changeState.phone) {
            this.tempData.newUserData = this.userData.phone;
            this.tempData.detail = "phone";
            // if (this.tempData.oldUserData != this.tempData.newUserData) {
            //   if (this.tempData.newUserData != null && this.phoneFormCtrl.valid) {
            //     this.changeState.phone = false
            //     this.updatePhone();
            //   } else {
            //     this.userData.phone = this.tempData.oldUserData;
            //   }
            // } else {
            // }
            this.changeState.phone = !this.changeState.phone;
          } else {
            this.tempData.oldUserData = this.userData.phone;
            this.changeState.phone = !this.changeState.phone;
          }
        }
        break;
    }
    console.log(this.tempData);
  }

  completeAddCompany(comProfileForm) {
    if (this.currentState('email') && comProfileForm.valid && this.emailFormControl.valid) {
      if (this.changeState.email) {
        this.tempData.newUserData = this.userData.email;
        this.tempData.detail = "email";
        if (this.tempData.oldUserData != this.tempData.newUserData) {
          if (this.tempData.newUserData != "") {
            this.updateEmail();
          } else {
            this.userData.email = this.tempData.oldUserData;
          }
        }
        this.changeState.email = !this.changeState.email;
      } else {
        this.tempData.oldUserData = this.userData.email;
        this.changeState.email = !this.changeState.email;
      }
    }
  }

  changePhone() {
    if (this.phoneFormCtrl.valid) {
      if (this.currentState('phone')) {
        if (this.changeState.phone) {
          this.tempData.newUserData = this.userData.phone;
          this.tempData.detail = "phone";
          if (this.tempData.oldUserData != this.tempData.newUserData) {
            if (this.tempData.newUserData != null) {
              this.updatePhone();
            } else {
              this.userData.phone = this.tempData.oldUserData;
            }
          } else {
          }
          this.changeState.phone = !this.changeState.phone;
        } else {
          this.tempData.oldUserData = this.userData.phone;
          this.changeState.phone = !this.changeState.phone;
        }
      }
    }
  }

  updatePhone() {
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    let status = "getDetail";
    this.userData.status = status;
    console.log(this.userData);
    this.accountServer.updatePhone(this.userData.phone).subscribe(result => {
      console.log(result);
      loading.dismiss();
    }, error => {
      console.log("error");
      if (error.indexOf("400") >= 0) {
        var user = this.accountServer.getLoggedUser();
        this.accountServer.login(user.username, user.password).subscribe(result => {
          this.updatePhone();
        }, error => {
          loading.dismiss();
        });
      }
      else {
        loading.dismiss();
      }
    });
  }

  updateEmail() {
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    let status = "getDetail";
    this.userData.status = status;
    console.log(this.userData);
    this.accountServer.updateEmail(this.userData.email).subscribe(result => {
      console.log(result);
      loading.dismiss();
    }, error => {
      console.log("error");
      if (error.indexOf("400") >= 0) {
        var user = this.accountServer.getLoggedUser();
        this.accountServer.login(user.username, user.password).subscribe(result => {
          this.updateEmail();
        }, error => {
          loading.dismiss();
        });
      }
      else {
        loading.dismiss();
      }
    });
  }

  updateAddress() {
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    let status = "getDetail";
    this.userData.status = status;
    console.log(this.userData);
    this.accountServer.updateAddress(this.userData.address).subscribe(result => {
      console.log(result);
      loading.dismiss();
    }, error => {
      console.log("error");
      if (error.indexOf("400") >= 0) {
        var user = this.accountServer.getLoggedUser();
        this.accountServer.login(user.username, user.password).subscribe(result => {
          this.updateAddress();
        }, error => {
          loading.dismiss();
        });
      }
      else {
        loading.dismiss();
      }
    });
  }

  changeUserState() {
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();

    this.tempData.email = localStorage.getItem("userEmail");
    let status = "changeUserinfo";
    this.tempData.status = status;


    this.accountServer.updateName(this.userData.username).subscribe(result => {
      console.log(result);
      loading.dismiss();
    }, error => {
      console.log("error");
      loading.dismiss();
      // if (error.indexOf("400") >= 0) {
      //   var user = this.accountServer.getLoggedUser();
      //   this.accountServer.login(user.username, user.password).subscribe(result => {
      //     this.changeUserState();
      //   }, error => {
      //     loading.dismiss();
      //   });
      // }
      // else {
      //   loading.dismiss();
      // }

    });

  }

  currentState(value) {
    let returnValue = false;
    switch (value) {
      case "username":
        if (this.changeState.address || this.changeState.email || this.changeState.phone) {
          returnValue = false;
        } else {
          returnValue = true;
        }
        break;
      case "address":
        if (this.changeState.username || this.changeState.email || this.changeState.phone) {
          returnValue = false;
        } else {
          returnValue = true;
        }
        break;
      case "email":
        if (this.changeState.address || this.changeState.username || this.changeState.phone) {
          returnValue = false;
        } else {
          returnValue = true;
        }
        break;
      case "phone":
        if (this.changeState.address || this.changeState.email || this.changeState.username) {
          returnValue = false;
        } else {
          returnValue = true;
        }
        break;

    }

    return returnValue;
  }

}
