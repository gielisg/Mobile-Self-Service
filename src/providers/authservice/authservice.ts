import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { User, APP_CONFIG, IAppConfig } from '../../model';

/*
  Generated class for the AuthserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthserviceProvider {

  constructor(@Inject(APP_CONFIG) public config: IAppConfig, public http: Http) {
    console.log('Hello AuthserviceProvider Provider');
  }


  login(username, password) {
    console.log(JSON.stringify({
      PrivateKey: this.config.WebPrivateKey, DatabaseUserCode: this.config.DatabaseUserCode, DatabasePassword: this.config.DatabasePassword,
      UserCode: username, Password: password
    }));
    return this.http.post('https://ua.selcomm.com/SelcommWS/1.0267/Authentication.svc/rest/AuthenticateSimpleCreateSessionAndAuthenticateContact', JSON.stringify({
      PrivateKey: this.config.WebPrivateKey, DatabaseUserCode: this.config.DatabaseUserCode, DatabasePassword: this.config.DatabasePassword,
      UserCode: username, Password: password
    }))
      .map(token => {
        console.log(token);
        console.log(JSON.parse(JSON.stringify(token))._body.replace(/"/g, ''));
        localStorage.setItem("session_key", JSON.parse(JSON.stringify(token))._body.replace(/"/g, ''));
        this.fillLoggedUser(username, password, token);
        return true;
      })
      .pipe(

      );
  }

  account_balance() {
    return this.http.get('https://ua.selcomm.com/SelcommWS/1.0267/Account.svc/rest/AccountBalance?SessionKey=' + localStorage.getItem("session_key") + '&AccountNumber=' + JSON.parse(localStorage.getItem('currentUser')).username + '&IncludeUnbilledUsage=true&IncludeOneOffAndRecurringCharges=true')
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  get_accountDetail() {
    return this.http.get('https://ua.selcomm.com/SelcommWS/1.0267/Account.svc/rest/Account?SessionKey=' + localStorage.getItem("session_key") + '&AccountNumber=' + JSON.parse(localStorage.getItem('currentUser')).username + '&RefreshCache=true')
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  update_email() {
    return this.http.get('https://ua.selcomm.com/SelcommWS/1.0267/Account.svc/rest/Account?SessionKey=' + localStorage.getItem("session_key") + '&AccountNumber=' + JSON.parse(localStorage.getItem('currentUser')).username + '&RefreshCache=true')
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  update_address(new_address) {
    let param = {
      "SessionKey": localStorage.getItem("session_key"),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "Address": {
        "Address1": " 100 Rose Street",
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
    return this.http.put('https://ua.selcomm.com/SelcommWS/1.0267/Address.svc/rest/AddressUpdateByContact', (param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  update_phone() {
    return this.http.get('https://ua.selcomm.com/SelcommWS/1.0267/Account.svc/rest/Account?SessionKey=' + localStorage.getItem("session_key") + '&AccountNumber=' + JSON.parse(localStorage.getItem('currentUser')).username + '&RefreshCache=true')
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  update_name() {
    return this.http.get('https://ua.selcomm.com/SelcommWS/1.0267/Account.svc/rest/Account?SessionKey=' + localStorage.getItem("session_key") + '&AccountNumber=' + JSON.parse(localStorage.getItem('currentUser')).username + '&RefreshCache=true')
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  get_bill() {
    let request_param = {
      "SessionKey": localStorage.getItem("session_key"),
      "PagingSortsAndFilters": {
        "SkipRecords": 0,
        "PropertyName": {},
        "Sort": {
          "Direction": "Descending",
          "TargetProperty": "Id",
        },
        "TakeRecords": 1,
      }
    };
    console.log((request_param));
    return this.http.post('https://ua.selcomm.com/SelcommWS/1.0267/Bill.svc/rest/BillList', JSON.stringify(request_param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  get_billList() {
    let request_param = {
      "SessionKey": localStorage.getItem("session_key"),
      "PagingSortsAndFilters": {
        "SkipRecords": 0,
        "PropertyName": {},
        "Sort": {
          "Direction": "Descending",
          "TargetProperty": "Id",
        },
        "TakeRecords": 50,
      }
    };
    console.log((request_param));
    return this.http.post('https://ua.selcomm.com/SelcommWS/1.0267/Bill.svc/rest/BillList', JSON.stringify(request_param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

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


}
