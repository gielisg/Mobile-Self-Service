import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { User, APP_CONFIG, IAppConfig } from '../../model';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { catchError } from 'rxjs/operators';

/*
  Generated class for the AuthserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthserviceProvider {


  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    public http: Http,
    public httpclient: HttpClient,
  ) {
    console.log('Hello AuthserviceProvider Provider');
  }


  login(username, password) {
    return this.http.post(this.config.apiEndpoint + 'Authentication.svc/rest/AuthenticateSimpleCreateSessionAndAuthenticateContact', JSON.stringify({
      PrivateKey: this.config.WebPrivateKey, DatabaseUserCode: this.config.DatabaseUserCode, DatabasePassword: this.config.DatabasePassword,
      UserCode: username, Password: password
    }))
      .map(token => {
        localStorage.setItem("session_key", JSON.parse(JSON.stringify(token))._body.replace(/"/g, ''));
        this.fillLoggedUser(username, password, token);
        return true;
      })
      .pipe(
      );
  }

  account_balance() {

    return this.http.get(this.config.apiEndpoint + 'Account.svc/rest/AccountBalance?SessionKey=' + encodeURIComponent(localStorage.getItem("session_key")) + '&AccountNumber=' + JSON.parse(localStorage.getItem('currentUser')).username + '&IncludeUnbilledUsage=true&IncludeOneOffAndRecurringCharges=true')
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  get_accountDetail() {
    return this.http.get(this.config.apiEndpoint + 'Contact.svc/rest/Contact?SessionKey=' + encodeURIComponent(localStorage.getItem("session_key")) + '&ContactCode=' + JSON.parse(localStorage.getItem('currentUser')).username + '&LoadAddress=true&LoadContactPhones=true&LoadContactEmailAddresses=true&RefreshCache=true')
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(
      );
  }

  update_address(new_address): Observable<any[]> {
    let param = {
      "SessionKey": localStorage.getItem("session_key"),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "Address": {
        "Address1": new_address,
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
    console.log(JSON.stringify(param));
    return this.httpclient.put<any[]>(this.config.apiEndpoint + 'Address.svc/rest/AddressUpdateByContact', JSON.stringify(param))
      .pipe(

        catchError(this.handleError('getData'))
      );
  }

  update_email(email_address): Observable<any[]> {

    let param = {
      "SessionKey": (localStorage.getItem("session_key")),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "EmailAddress": {
        "EmailAddress": email_address
      }
    }
    return this.httpclient.put<any[]>(this.config.apiEndpoint + 'Email.svc/rest/EmailAddressUpdate ', JSON.stringify(param))
      .pipe(

        catchError(this.handleError('getData'))
      );
  }

  update_phone(phone_number): Observable<any[]> {
    let param =
    {
      "SessionKey": (localStorage.getItem("session_key")),
      "ContactPhone": {
        "AreaCode": 2,
        "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
        "ContactPhoneType": {
          "Code": "HP",
        },
        "Number": phone_number,
        "Reference": 3594,
      }
    }
    return this.httpclient.put<any[]>(this.config.apiEndpoint + 'ContactPhone.svc/rest/ContactPhoneUpdate', JSON.stringify(param))
      .pipe(

        catchError(this.handleError('getData'))
      );

  }

  update_name(user_name) {

    return this.http.get(this.config.apiEndpoint + 'Contact.svc/rest/BusinessNameUpdate?SessionKey=' + encodeURIComponent(localStorage.getItem("session_key")) + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username + "&BusinessName=" + user_name)
      .map(token => {
        // let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
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

  convert_getParam(string, quoteStyle, charset, doubleEncode) {


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

  createRandomSessionKey() {

    return this.http.post(this.config.apiEndpoint + 'Authentication.svc/rest/AuthenticateSimpleCreateSessionAndAuthenticateContact',
      JSON.stringify({
        PrivateKey: this.config.WebPrivateKey,
        DatabaseUserCode: this.config.DatabaseUserCode,
        DatabasePassword: this.config.DatabasePassword,
        UserCode: JSON.parse(localStorage.getItem('currentUser')).username,
        Password: JSON.parse(localStorage.getItem('currentUser')).password
      }))
      .map(token => {
        localStorage.setItem("session_key", JSON.parse(JSON.stringify(token))._body.replace(/"/g, ''));
        return true;
      })
      .pipe(
      );

    // this.login(JSON.parse(localStorage.getItem('currentUser')).username, JSON.parse(localStorage.getItem('currentUser')).password);

  }

}
