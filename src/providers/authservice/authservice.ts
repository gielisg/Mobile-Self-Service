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
        this.fillLoggedUser(username, password, token);
        return true;

      })
      .pipe(

      );
  }

  get_billList() {
    console.log(JSON.stringify({
      PrivateKey: this.config.WebPrivateKey, DatabaseUserCode: this.config.DatabaseUserCode, DatabasePassword: this.config.DatabasePassword,

    }));

    // M7BeGsamuKVwMQg5|pOw2K41uggDNKHxtCUKuXw==|c7BxGR9Oq4+a/aYM8xm7/JhnVe4YhUa5sAGP8kclkLeffXWse6A=

    let request_param = {
      "SessionKey": "M7BeGsamuKVwMQg5|pOw2K41uggDNKHxtCUKuXw==|c7BxGR9Oq4+a/aYM8xm7/JhnVe4YhUa5sAGP8kclkLeffXWse6A=",
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
    let PagingSortsAndFilters = {
      "SkipRecords": 0, "PropertyName": {}, "Sort": {
        "Direction": "Descending",
        "TargetProperty": "Id",
      },
      "TakeRecords": 1,
    };
    return this.http.post('https://ua.selcomm.com/SelcommWS/1.0263/Bill.svc/rest/BillList', (request_param))
      .map(token => {
        console.log(token);
        return true;

      })
      .pipe(

      );


    // return this.http.post('https://ua.selcomm.com/SelcommWS/1.0263/Bill.svc/rest/BillList', JSON.stringify({
    //   "SessionKey": "bmpu2k9+VF4FXwM5|Xs0tz6kyAYykTKUOf4k+iw==|qCJNBy/is5n/2hgfU678/FsoovMgLCCrZ41v9XqHFsX+U6LGVPA=", "PagingSortsAndFilters": PagingSortsAndFilters
    // }))
    //   .map(token => {
    //     console.log(token);
    //     return true;

    //   })
    //   .pipe(

    //   );
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
