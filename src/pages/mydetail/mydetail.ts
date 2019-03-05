import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';


import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';

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

  public user_Data = { "username": "", "address": "", "email": "", "phone": "", "status": "" };

  public temp_Data = { "email": "", "old_userData": "", "new_userData": "", "detail": "", "status": "" };

  public change_state = { "username": false, "address": false, "email": false, "phone": false };

  public send_data: any[];
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
    public accountServer: AuthserviceProvider,
    public authservice: AuthserviceProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MydetailPage');
    this.ionicInit();
  }

  ionicInit() {


    console.log(localStorage.getItem("set_lng"));
    this.translate.translaterService();

    this.user_Data.email = localStorage.getItem("user_email");

    // this.user_Data.email = "veerhunter127@gmail.com";
    // this.user_Data.phone = "123456789";
    // this.user_Data.username = "VeeRHunter";
    // this.user_Data.address = "XX street, YY city, ZZ country";

    this.addressList = new Array();
    this.phoneList = new Array();


    this.loading.show();
    let status = "get_detail";
    this.user_Data.status = status;
    this.accountServer.get_accountDetail().subscribe(result => {
      console.log(result);
      this.user_Data.username = result.FullName;
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
      this.user_Data.email = result.ContactEmailAddressList[0].EmailAddress;
      if (Object(result).AddressList.Items[this.getMaxvalueIndex(this.addressList)].Address2 != null) {
        this.user_Data.address = Object(result).AddressList.Items[this.getMaxvalueIndex(this.addressList)].Address1 + Object(result).AddressList.Items[this.getMaxvalueIndex(this.addressList)].Address2;
      } else {
        this.user_Data.address = Object(result).AddressList.Items[this.getMaxvalueIndex(this.addressList)].Address1;
      }
      this.user_Data.phone = Object(result).ContactPhoneList[this.getMaxvalueIndex(this.phoneList)].Number;
      if (this.user_Data.phone.length > 8) {
        this.user_Data.phone = this.user_Data.phone.substr(this.user_Data.phone.length - 8);
      }
      this.loading.hide();
    }, error => {
      console.log("error");
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
      } else {
        this.toast.show(errorBody.Message);
      }
      this.loading.hide();
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

  change_user(name) {
    switch (name) {
      case "username":
        if (this.current_state('username')) {
          if (this.change_state.username) {
            this.temp_Data.new_userData = this.user_Data.username;
            this.temp_Data.detail = "username";
            if (this.temp_Data.old_userData != this.temp_Data.new_userData) {
              if (this.temp_Data.new_userData != "") {
                this.change_userState();
              } else {
                this.user_Data.username = this.temp_Data.old_userData;
              }
              this.change_state.username = !this.change_state.username;
            } else {
              this.change_state.username = !this.change_state.username;
            }
          } else {
            this.temp_Data.old_userData = this.user_Data.username;
            this.change_state.username = !this.change_state.username;
          }
        }
        break;
      case 'email':
        if (this.current_state('email')) {
          if (this.change_state.email) {
            this.temp_Data.new_userData = this.user_Data.email;
            this.temp_Data.detail = "email";
            // if (this.temp_Data.old_userData != this.temp_Data.new_userData) {
            //   if (this.temp_Data.new_userData != "" && (this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required'))) {
            //     this.update_email();
            //   } else {
            //     this.user_Data.email = this.temp_Data.old_userData;
            //   }
            // }
            this.change_state.email = !this.change_state.email;
          } else {
            this.temp_Data.old_userData = this.user_Data.email;
            this.change_state.email = !this.change_state.email;
          }
        }
        break;
      case 'address':
        if (this.current_state('address')) {
          if (this.change_state.address) {
            this.temp_Data.new_userData = this.user_Data.address;
            this.temp_Data.detail = "address";
            if (this.temp_Data.old_userData != this.temp_Data.new_userData) {
              if (this.temp_Data.new_userData != "") {
                this.update_address();
              } else {
                this.user_Data.address = this.temp_Data.old_userData;
              }
            }
            this.change_state.address = !this.change_state.address;
          } else {
            this.temp_Data.old_userData = this.user_Data.address;
            this.change_state.address = !this.change_state.address;
          }
        }
        break;
      case 'phone':
        if (this.current_state('phone')) {
          if (this.change_state.phone) {
            this.temp_Data.new_userData = this.user_Data.phone;
            this.temp_Data.detail = "phone";
            // if (this.temp_Data.old_userData != this.temp_Data.new_userData) {
            //   if (this.temp_Data.new_userData != null && this.phoneFormCtrl.valid) {
            //     this.change_state.phone = false
            //     this.update_phone();
            //   } else {
            //     this.user_Data.phone = this.temp_Data.old_userData;
            //   }
            // } else {
            // }
            this.change_state.phone = !this.change_state.phone;
          } else {
            this.temp_Data.old_userData = this.user_Data.phone;
            this.change_state.phone = !this.change_state.phone;
          }
        }
        break;
    }
    console.log(this.temp_Data);
  }

  completeAddCompany(comProfileForm) {
    if (this.current_state('email') && comProfileForm.valid && this.emailFormControl.valid) {
      if (this.change_state.email) {
        this.temp_Data.new_userData = this.user_Data.email;
        this.temp_Data.detail = "email";
        if (this.temp_Data.old_userData != this.temp_Data.new_userData) {
          if (this.temp_Data.new_userData != "") {
            this.update_email();
          } else {
            this.user_Data.email = this.temp_Data.old_userData;
          }
        }
        this.change_state.email = !this.change_state.email;
      } else {
        this.temp_Data.old_userData = this.user_Data.email;
        this.change_state.email = !this.change_state.email;
      }
    }
  }

  changePhone() {
    if (this.phoneFormCtrl.valid) {
      if (this.current_state('phone')) {
        if (this.change_state.phone) {
          this.temp_Data.new_userData = this.user_Data.phone;
          this.temp_Data.detail = "phone";
          if (this.temp_Data.old_userData != this.temp_Data.new_userData) {
            if (this.temp_Data.new_userData != null) {
              this.update_phone();
            } else {
              this.user_Data.phone = this.temp_Data.old_userData;
            }
          } else {
          }
          this.change_state.phone = !this.change_state.phone;
        } else {
          this.temp_Data.old_userData = this.user_Data.phone;
          this.change_state.phone = !this.change_state.phone;
        }
      }
    }
  }

  update_phone() {
    this.loading.show();
    let status = "get_detail";
    this.user_Data.status = status;
    console.log(this.user_Data);
    this.accountServer.update_phone(this.user_Data.phone).subscribe(result => {
      console.log(result);
      this.loading.hide();
    }, error => {
      console.log("error");
      if (error.indexOf("400") >= 0) {
        var user = this.accountServer.getLoggedUser();
        this.accountServer.login(user.username, user.password).subscribe(result => {
          this.update_phone();
        }, error => {
          this.loading.hide();
        });
      } else {
        this.loading.hide();
      }
    });
  }

  update_email() {
    this.loading.show();
    let status = "get_detail";
    this.user_Data.status = status;
    console.log(this.user_Data);
    this.accountServer.update_email(this.user_Data.email).subscribe(result => {
      console.log(result);
      this.loading.hide();
    }, error => {
      console.log("error");
      if (error.indexOf("400") >= 0) {
        var user = this.accountServer.getLoggedUser();
        this.accountServer.login(user.username, user.password).subscribe(result => {
          this.update_email();
        }, error => {
          this.loading.hide();
        });
      }
      else {
        this.loading.hide();
      }
    });
  }

  update_address() {
    this.loading.show();
    let status = "get_detail";
    this.user_Data.status = status;
    console.log(this.user_Data);
    this.accountServer.update_address(this.user_Data.address).subscribe(result => {
      console.log(result);
      this.loading.hide();
    }, error => {
      console.log("error");
      if (error.indexOf("400") >= 0) {
        var user = this.accountServer.getLoggedUser();
        this.accountServer.login(user.username, user.password).subscribe(result => {
          this.update_address();
        }, error => {
          this.loading.hide();
        });
      }
      else {
        this.loading.hide();
      }
    });
  }

  change_userState() {
    this.loading.show();

    this.temp_Data.email = localStorage.getItem("user_email");
    let status = "change_userinfo";
    this.temp_Data.status = status;


    this.accountServer.update_name(this.user_Data.username).subscribe(result => {
      console.log(result);
      this.loading.hide();
    }, error => {
      console.log("error");
      this.loading.hide();
      // if (error.indexOf("400") >= 0) {
      //   var user = this.accountServer.getLoggedUser();
      //   this.accountServer.login(user.username, user.password).subscribe(result => {
      //     this.change_userState();
      //   }, error => {
      //     loading.dismiss();
      //   });
      // }
      // else {
      //   loading.dismiss();
      // }

    });

  }

  current_state(value) {
    let return_value = false;
    switch (value) {
      case "username":
        if (this.change_state.address || this.change_state.email || this.change_state.phone) {
          return_value = false;
        } else {
          return_value = true;
        }
        break;
      case "address":
        if (this.change_state.username || this.change_state.email || this.change_state.phone) {
          return_value = false;
        } else {
          return_value = true;
        }
        break;
      case "email":
        if (this.change_state.address || this.change_state.username || this.change_state.phone) {
          return_value = false;
        } else {
          return_value = true;
        }
        break;
      case "phone":
        if (this.change_state.address || this.change_state.email || this.change_state.username) {
          return_value = false;
        } else {
          return_value = true;
        }
        break;

    }

    return return_value;
  }

}
