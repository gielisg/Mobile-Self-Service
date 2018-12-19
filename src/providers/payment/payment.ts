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
  public urlHeader = "https://ua.selcomm.com/SelcommWS/1.0267/";

  constructor(public http: Http) {
    console.log('Hello PaymentProvider Provider');
    if (new Date().toISOString().includes(".")) {
      this.startDate = new Date().toISOString().split(".")[0];
    } else {
      this.startDate = new Date().toISOString();
    }

    let tempDate = this.startDate;
    this.startDate = tempDate.split("T")[0].split("-")[0] + "-" + tempDate.split("T")[0].split("-")[1] + "-" + (parseInt(tempDate.split("T")[0].split("-")[2]) + 1).toString();
    this.startDate = this.startDate + "T" + "00:00:00";

  }


  getPaymentAvailList() {
    let encodedSessionKey = encodeURIComponent(localStorage.getItem("sessionKey"));
    return this.http.get(this.urlHeader + 'Payment.svc/rest/AccountPaymentMethodListValid?SessionKey=' + encodedSessionKey + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username)
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;

      })
      .pipe(
      );
  }
  accountPaymentMethod(paymentId) {
    let encodedSessionKey = encodeURIComponent(localStorage.getItem("sessionKey"));
    return this.http.get(this.urlHeader + 'Payment.svc/rest/AccountPaymentMethod?SessionKey=' + encodedSessionKey + "&Id=" + paymentId + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username)
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;

      })
      .pipe(
      );
  }

  accountPaymentMethodAdd(accountMethod) {
    let param = {
      "SessionKey": localStorage.getItem("sessionKey"),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "AccountPaymentMethod": {
        "AccountName": accountMethod.name,
        "AccountNumber": accountMethod.number,
        "ExpiryDate": accountMethod.expireDate,
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
    return this.http.post(this.urlHeader + 'Payment.svc/rest/AccountPaymentMethodAdd', JSON.stringify(param))
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;
      })
      .pipe(
      );
  }

  accountPaymentMethodCancel(paymentId) {
    let param = {
      "SessionKey": localStorage.getItem("sessionKey"),
      "Id": parseInt(paymentId),
      "StartDate": this.startDate,
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');


    let options = new RequestOptions({ headers: headers });


    return this.http.put(this.urlHeader + 'Payment.svc/rest/AccountPaymentMethodCancel', JSON.stringify(param), options)
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;
      })
      .pipe(
      );
  }

  accountPaymentMethodMakeDefault(paymentId) {
    let param = {
      "SessionKey": localStorage.getItem("sessionKey"),
      "Id": parseInt(paymentId),
      "StartDate": this.startDate,
      "StatusCode": "O"
    };
    return this.http.put(this.urlHeader + 'Payment.svc/rest/AccountPaymentMethodMakeDefault', JSON.stringify(param))
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;
      })
      .pipe(
      );
  }

  accountPaymentMethodUpdate(accountMethod) {
    let param = {
      "SessionKey": localStorage.getItem("sessionKey"),
      "AccountPaymentMethod": {
        "AccountName": accountMethod.name,
        "AccountNumber": accountMethod.number,
        "ExpiryDate": accountMethod.expireDate,
        "Exported": false,
        "Id": accountMethod.paymentId,
        "PaymentMethod": {
          "Code": "MC",
        },
        "StartDate": this.startDate,
        "SubscriberOwns": true,
      }
    };
    return this.http.put(this.urlHeader + 'Payment.svc/rest/AccountPaymentMethodUpdate', JSON.stringify(param))
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;
      })
      .pipe(
      );
  }

  paymentRequestCreate(paymentRequest) {
    let param = {
      "SessionKey": localStorage.getItem("sessionKey"),
      "PaymentRequest": {
        "AccountPaymentMethod": {
          "Id": paymentRequest.paymentId,
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
    return this.http.post(this.urlHeader + 'Payment.svc/rest/PaymentRequestCreate', JSON.stringify(param))
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;
      })
      .pipe(
      );
  }

  paymentMethodFromAccountNumberAndType() {
    let encodedSessionKey = encodeURIComponent(localStorage.getItem("sessionKey"));
    return this.http.get(this.urlHeader + 'Payment.svc/rest/PaymentMethodFromAccountNumberAndType?SessionKey=' + encodedSessionKey + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username + "&PaymentMethodTypeCode=C")
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;
      })
      .pipe(
      );
  }



}
