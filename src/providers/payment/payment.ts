import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { User, APP_CONFIG, IAppConfig } from '../../model';
import { getLocaleDateTimeFormat } from '@angular/common';

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {

  public startDate: any;
  public url_header = "https://ua.selcomm.com/SelcommWS/1.0267/";

  constructor(public http: Http) {
    console.log('Hello PaymentProvider Provider');
    if (new Date().toISOString().includes(".")) {
      this.startDate = new Date().toISOString().split(".")[0];
    } else {
      this.startDate = new Date().toISOString();
    }
  }


  get_paymentAvailList() {
    let encoded_session_Key = encodeURIComponent(localStorage.getItem("session_key"));
    console.log(encoded_session_Key);
    return this.http.get(this.url_header + 'Payment.svc/rest/AccountPaymentMethodListValid?SessionKey=' + encoded_session_Key + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username)
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(
      );
  }
  account_paymentMethod(payment_id) {
    let encoded_session_Key = encodeURIComponent(localStorage.getItem("session_key"));
    console.log(encoded_session_Key);
    return this.http.get(this.url_header + 'Payment.svc/rest/AccountPaymentMethod?SessionKey=' + encoded_session_Key + "&Id=" + payment_id + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username)
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(
      );
  }
  
  account_paymentMethodAdd(account_method) {
    let param = {
      "SessionKey": localStorage.getItem("session_key"),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "AccountPaymentMethod": {
        "AccountName": account_method.name,
        "AccountNumber": account_method.number,
        "ExpiryDate": account_method.expireDate,
        "PaymentMethod": {
          "Code": "MC",
          "Type": {
            "Code": "C",
          }
        },
        "StartDate": this.startDate,
        "SubscriberOwns": true,
        "Source": "",
        "CreateOption": "NewOnly",
      }
    };
    console.log(JSON.stringify(param));
    return this.http.post(this.url_header + 'Payment.svc/rest/AccountPaymentMethodAdd', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        console.log(return_data);
        return return_data;
      })
      .pipe(
      );
  }

  account_paymentMethodCancel(payment_id) {
    let param = {
      "SessionKey": localStorage.getItem("session_key"),
      "Id": parseInt(payment_id),
      "StartDate": this.startDate,
    };
    console.log(JSON.stringify(param));
    return this.http.put(this.url_header + 'Payment.svc/rest/AccountPaymentMethodCancel', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        console.log(return_data);
        return return_data;
      })
      .pipe(
      );
  }

  account_paymentMethodMakeDefault(payment_id) {
    let param = {
      "SessionKey": localStorage.getItem("session_key"),
      "Id": parseInt(payment_id),
      "StartDate": this.startDate,
      "StatusCode": "O"
    };
    console.log(JSON.stringify(param));
    return this.http.put(this.url_header + 'Payment.svc/rest/AccountPaymentMethodMakeDefault', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        console.log(return_data);
        return return_data;
      })
      .pipe(
      );
  }

  account_paymentMethodUpdate(account_method) {
    let param = {
      "SessionKey": localStorage.getItem("session_key"),
      "AccountPaymentMethod": {
        "AccountName": account_method.name,
        "AccountNumber": account_method.number,
        "ExpiryDate": account_method.expireDate,
        "Exported": false,
        "Id": account_method.payment_id,
        "PaymentMethod": {
          "Code": "MC",
        },
        "StartDate": this.startDate,
        "SubscriberOwns": true,
      }
    };
    console.log(JSON.stringify(param));
    return this.http.put(this.url_header + 'Payment.svc/rest/AccountPaymentMethodUpdate', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        console.log(return_data);
        return return_data;
      })
      .pipe(
      );
  }

  payment_RequestCreate(paymentRequest) {
    let param = {
      "SessionKey": localStorage.getItem("session_key"),
      "PaymentRequest": {
        "AccountPaymentMethod": {
          "Id": paymentRequest.payment_id,
        },
        "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
        "FinancialTransaction": {
          "Source": {
            "Code": "PT"
          }
        },
        "RequestAmount": paymentRequest.amount,
        "PaymentSource": {
          "Id": 3
        },
        "SendEmail": false,
      }
    };
    console.log(JSON.stringify(param));
    return this.http.post(this.url_header + 'Payment.svc/rest/PaymentRequestCreate', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        console.log(return_data);
        return return_data;
      })
      .pipe(
      );
  }

  payment_MethodFromAccountNumberAndType() {
    let encoded_session_Key = encodeURIComponent(localStorage.getItem("session_key"));
    console.log(encoded_session_Key);
    return this.http.get(this.url_header + 'Payment.svc/rest/PaymentMethodFromAccountNumberAndType?SessionKey=' + encoded_session_Key + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username + "&PaymentMethodTypeCode=C")
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(
      );
  }



}
