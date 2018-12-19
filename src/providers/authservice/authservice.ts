import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { User, APP_CONFIG, IAppConfig } from '../../model';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { catchError, tap } from 'rxjs/operators';

/*
  Generated class for the AuthserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthserviceProvider {

  public urlHeader = "https://ua.selcomm.com/SelcommWS/1.0267/";

  constructor(@Inject(APP_CONFIG) public config: IAppConfig, public http: Http, public httpclient: HttpClient) {
    console.log('Hello AuthserviceProvider Provider');
  }


  login(username, password) {
    return this.http.post(this.urlHeader + 'Authentication.svc/rest/AuthenticateSimpleCreateSessionAndAuthenticateContact', JSON.stringify({
      PrivateKey: this.config.WebPrivateKey, DatabaseUserCode: this.config.DatabaseUserCode, DatabasePassword: this.config.DatabasePassword,
      UserCode: username, Password: password
    }))
      .map(token => {
        localStorage.setItem("sessionKey", JSON.parse(JSON.stringify(token))._body.replace(/"/g, ''));
        this.fillLoggedUser(username, password, token);
        return true;
      })
      .pipe(
      );
  }

  accountBalance() {

    return this.http.get(this.urlHeader + 'Account.svc/rest/AccountBalance?SessionKey=' + encodeURIComponent(localStorage.getItem("sessionKey")) + '&AccountNumber=' + JSON.parse(localStorage.getItem('currentUser')).username + '&IncludeUnbilledUsage=true&IncludeOneOffAndRecurringCharges=true')
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;

      })
      .pipe(

      );
  }

  getAccountDetail() {
    return this.http.get(this.urlHeader + 'Contact.svc/rest/Contact?SessionKey=' + encodeURIComponent(localStorage.getItem("sessionKey")) + '&ContactCode=' + JSON.parse(localStorage.getItem('currentUser')).username + '&LoadAddress=true&LoadContactPhones=true&LoadContactEmailAddresses=true&RefreshCache=true')
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;

      })
      .pipe(
      );
  }

  updateAddress(newAddress): Observable<any[]> {
    let encoded_sessionKey = encodeURIComponent(localStorage.getItem("sessionKey"));
    let param = {
      "SessionKey": localStorage.getItem("sessionKey"),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "Address": {
        "Address1": newAddress,
        "AddressType": {
          "Code": "BA",
        },
        "Country": {
          "Code": "AU"
        },
        "PostCode": {
          "Code": "2609"
        },
        "State": {
          "Code": "NSW",
        },
        "Suburb": "TEST",
      }
    };
    // return this.http.put(this.urlHeader + 'Address.svc/rest/AddressUpdateByContact', JSON.stringify(param))
    //   .map(token => {
    //     let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
    //     return returnData;

    //   })
    //   .pipe(
    //   );
    console.log(JSON.stringify(param));
    return this.httpclient.put<any[]>(this.urlHeader + 'Address.svc/rest/AddressUpdateByContact', JSON.stringify(param))
      .pipe(

        catchError(this.handleError('getData'))
      );
  }

  updateEmail(emailAddress): Observable<any[]> {

    let param = {
      "SessionKey": (localStorage.getItem("sessionKey")),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "EmailAddress": {
        "EmailAddress": emailAddress
      }
    }
    // return this.http.put(this.urlHeader + 'Email.svc/rest/EmailAddressUpdate ', JSON.stringify(param))
    //   .map(token => {
    //     let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
    //     return returnData;
    //   })
    //   .pipe(

    //   );
    return this.httpclient.put<any[]>(this.urlHeader + 'Email.svc/rest/EmailAddressUpdate ', JSON.stringify(param))
      .pipe(

        catchError(this.handleError('getData'))
      );
  }

  updatePhone(phoneNumber): Observable<any[]> {
    let param =
    {
      "SessionKey": (localStorage.getItem("sessionKey")),
      "ContactPhone": {
        "AreaCode": 2,
        "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
        "ContactPhoneType": {
          "Code": "HP",
        },
        "Number": phoneNumber,
        "Reference": 3594,
      }
    }
    // return this.http.put(this.urlHeader + 'ContactPhone.svc/rest/ContactPhoneUpdate', JSON.stringify(param))
    //   .map(token => {
    //     let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
    //     return returnData;

    //   })
    //   .pipe(

    //   );
    return this.httpclient.put<any[]>(this.urlHeader + 'ContactPhone.svc/rest/ContactPhoneUpdate', JSON.stringify(param))
      .pipe(

        catchError(this.handleError('getData'))
      );

  }

  updateName(userName) {
    let param =
    {
      "SessionKey": encodeURIComponent(localStorage.getItem("sessionKey")),
      "ContactPhone": {
        "AreaCode": 2,
        "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
        "ContactPhoneType": {
          "Code": "HP",
        },
        "Number": userName,
        "Reference": 3594,
      }
    }
    // return this.http.put(this.urlHeader + 'Account.svc/rest/Account?SessionKey=', JSON.stringify(param))
    //   .map(token => {
    //     let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
    //     return returnData;

    //   })
    //   .pipe(

    //   );
    // return this.http.get(this.urlHeader + 'Contact.svc/rest/BusinessNameUpdate?SessionKey=' + encodeURIComponent(localStorage.getItem("sessionKey")) + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username + "&BusinessName=" + userName)
    //   .pipe(

    //     catchError(this.handleError('getData'))
    //   );

    return this.http.get(this.urlHeader + 'Contact.svc/rest/BusinessNameUpdate?SessionKey=' + encodeURIComponent(localStorage.getItem("sessionKey")) + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username + "&BusinessName=" + userName)
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return token;

      })
      .pipe(
      );
  }


  fillLoggedUser(username, password, token) {
    var user: User = {
      id: 0,
      username: username,
      password: password,
      sessionKey: token
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.config.Usercode = username;
    this.config.Password = password;
  }

  convertGetParam(string, quoteStyle, charset, doubleEncode) {


    return string
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  private handleError(operation: String) {
    return (err: any) => {

      if (err instanceof HttpErrorResponse) {

        if (err.error.Message.indexOf("session key") >= 0)
          return Observable.throw(`status: 400`);
        else if (err.error.Code.Name.indexOf("Session") >= 0)
          return Observable.throw(`status: 400`);
        else
          return Observable.throw(`status: ${err.error.Message}`);
      }
    }

  }

  getLoggedUser(): User {
    if (localStorage.getItem("currentUser") != null) {
      return JSON.parse(localStorage.getItem("currentUser"));
    }
    return null;
  }

}
