import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { APP_CONFIG, IAppConfig } from '../../model';

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {

  public startDate: any;

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    public http: Http) {
    console.log('Hello PaymentProvider Provider');
    if (new Date().toISOString().includes(".")) {
      this.startDate = new Date().toISOString().split(".")[0];
    } else {
      this.startDate = new Date().toISOString();
    }

    if (new Date().toISOString().includes(".")) {
      this.startDate = new Date().toISOString().split(".")[0];
    } else {
      this.startDate = new Date().toISOString();
    }
    console.log(this.startDate);

  }


  get_paymentAvailList() {
    let encoded_session_Key = encodeURIComponent(localStorage.getItem("session_key"));
    return this.http.get(this.config.apiEndpoint + 'Payment.svc/rest/AccountPaymentMethodListValid?SessionKey=' + encoded_session_Key + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username)
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(
      );
  }

  account_paymentMethod(payment_id) {
    let encoded_session_Key = encodeURIComponent(localStorage.getItem("session_key"));
    return this.http.get(this.config.apiEndpoint + 'Payment.svc/rest/AccountPaymentMethod?SessionKey=' + encoded_session_Key + "&Id=" + payment_id + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username)
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
          "Code": account_method.cardType,
          "Type": {
            "Code": account_method.cardCodeType,
          }
        },
        "StartDate": this.startDate,
        "SubscriberOwns": true,
        "Source": "",
        "CreateOption": "AlwaysCreate",
        "Default": "false",
      }
    };
    return this.http.post(this.config.apiEndpoint + 'Payment.svc/rest/AccountPaymentMethodAdd', JSON.stringify(param))
      .map((token: any) => {
        // let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        let return_data = token._body;
        return return_data;
      })
      .pipe(
      );
  }

  account_paymentMethodCancel(payment_id) {
    let param = {
      "SessionKey": localStorage.getItem("session_key"),
      "Id": parseInt(payment_id),
      // "StartDate": this.startDate,
      "Note": 'AccooutPaymentMethodCancel Test',
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');


    let options = new RequestOptions({ headers: headers });


    return this.http.put(this.config.apiEndpoint + 'Payment.svc/rest/AccountPaymentMethodCancel', JSON.stringify(param), options)
      .map((token: any) => {
        console.log(token);
        console.log(token._body);
        let return_data = token._body;
        // if (JSON.stringify(token) == '') {
        //   return_data = '';
        // } else {
        //   return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        // }
        // let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
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
    return this.http.put(this.config.apiEndpoint + 'Payment.svc/rest/AccountPaymentMethodMakeDefault', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(
      );
  }

  accountPaymentMethodDefault() {
    let sendParam = 'Payment.svc/rest/AccountPaymentMethodDefault?SessionKey=' + encodeURIComponent(localStorage.getItem("session_key")) +
      '&ContactCode=' + JSON.parse(localStorage.getItem('currentUser')).username;

    return this.http.get(this.config.apiEndpoint + sendParam)
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(
      );
  }

  setAccountBalanceByCard(balanceData) {

    let sendParam = 'Payment.svc/rest/PaymentRequestSimpleByCreditCard?SessionKey=' + encodeURIComponent(localStorage.getItem("session_key")) +
      '&ContactCode=' + JSON.parse(localStorage.getItem('currentUser')).username +
      '&CardNumber=' + balanceData.cardNum + '&CardName=' + balanceData.name + '&ExpiryDate=' + balanceData.expireDate + '&Amount=' + balanceData.amount;

    return this.http.get(this.config.apiEndpoint + sendParam)
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(
      );

  }

  setAccountBalanceByDefault(amount) {

    let sendParam = 'Payment.svc/rest/PaymentRequestSimpleByDefaultPaymentMethod?SessionKey=' + encodeURIComponent(localStorage.getItem("session_key")) +
      '&ContactCode=' + JSON.parse(localStorage.getItem('currentUser')).username +
      '&Amount=' + amount;

    return this.http.get(this.config.apiEndpoint + sendParam)
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
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
        "Id": account_method.paymentId,
        "PaymentMethod": {
          "Code": "MC",
        },
        "StartDate": this.startDate,
        "SubscriberOwns": true,
      }
    };
    return this.http.put(this.config.apiEndpoint + 'Payment.svc/rest/AccountPaymentMethodUpdate', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
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
    return this.http.post(this.config.apiEndpoint + 'Payment.svc/rest/PaymentRequestCreate', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(
      );
  }

  payment_MethodFromAccountNumberAndType() {
    let encoded_session_Key = encodeURIComponent(localStorage.getItem("session_key"));
    return this.http.get(this.config.apiEndpoint + 'Payment.svc/rest/PaymentMethodFromAccountNumberAndType?SessionKey=' + encoded_session_Key + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username + "&PaymentMethodTypeCode=C")
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(
      );
  }



}
