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

  public user_Data = { "username": "", "address": "", "email": "", "phone": "", "status": "" };

  public temp_Data = { "email": "", "old_userData": "", "new_userData": "", "detail": "", "status": "" };

  public change_state = { "username": false, "address": false, "email": false, "phone": false };

  public send_data: any[];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
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


    console.log(localStorage.getItem("set_lng"));
    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }

    this.user_Data.email = localStorage.getItem("user_email");

    // this.user_Data.email = "veerhunter127@gmail.com";
    // this.user_Data.phone = "123456789";
    // this.user_Data.username = "VeeRHunter";
    // this.user_Data.address = "XX street, YY city, ZZ country";


    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    let status = "get_detail";
    this.user_Data.status = status;
    console.log(this.user_Data);
    this.accountServer.get_accountDetail().subscribe(result => {
      console.log(result);
      this.user_Data.username = result.FullName;
      this.user_Data.email = result.ContactEmailAddressList[0].EmailAddress;
      this.user_Data.address = result.AddressList;
      this.user_Data.phone = result.ContactPhoneList;
      loading.dismiss();
    }, error => {
      console.log("error");
      loading.dismiss();
    });
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
            if (this.temp_Data.old_userData != this.temp_Data.new_userData) {
              if (this.temp_Data.new_userData != "" && (this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required'))) {
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

  update_phone() {
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    let status = "get_detail";
    this.user_Data.status = status;
    console.log(this.user_Data);
    this.accountServer.update_phone(this.user_Data.phone).subscribe(result => {
      console.log(result);
      loading.dismiss();
    }, error => {
      console.log("error");
      loading.dismiss();
    });
  }

  update_email() {
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    let status = "get_detail";
    this.user_Data.status = status;
    console.log(this.user_Data);
    this.accountServer.update_email(this.user_Data.email).subscribe(result => {
      console.log(result);
      loading.dismiss();
    }, error => {
      console.log("error");
      loading.dismiss();
    });
  }

  update_address() {
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    let status = "get_detail";
    this.user_Data.status = status;
    console.log(this.user_Data);
    this.accountServer.update_address(this.user_Data.address).subscribe(result => {
      console.log(result);
      loading.dismiss();
    }, error => {
      console.log("error");
      loading.dismiss();
    });
  }

  change_userState() {

    this.temp_Data.email = localStorage.getItem("user_email");
    let status = "change_userinfo";
    this.temp_Data.status = status;
    // this.apiprovider.postData(this.temp_Data).then((result) => {
    //   console.log(Object(result));
    //   if (Object(result).status == "success") {

    //     localStorage.setItem("user_email", this.user_Data.email);

    //     let toast = this.toastCtrl.create({
    //       message: Object(result).detail,
    //       duration: 2000
    //     })
    //     toast.present();

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
    // });
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
