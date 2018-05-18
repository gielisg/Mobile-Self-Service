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
        localStorage.setItem("auth_token", JSON.parse(JSON.stringify(token))._body.replace(/"/g, ''));
        this.fillLoggedUser(username, password, token);
        return true;

      })
      .pipe(

      );
  }

  get_bill() {
    // M7BeGsamuKVwMQg5|pOw2K41uggDNKHxtCUKuXw==|c7BxGR9Oq4+a/aYM8xm7/JhnVe4YhUa5sAGP8kclkLeffXWse6A=
    let request_param = {
      "SessionKey": localStorage.getItem("auth_token"),
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
    // M7BeGsamuKVwMQg5|pOw2K41uggDNKHxtCUKuXw==|c7BxGR9Oq4+a/aYM8xm7/JhnVe4YhUa5sAGP8kclkLeffXWse6A=
    let request_param = {
      "SessionKey": localStorage.getItem("auth_token"),
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
