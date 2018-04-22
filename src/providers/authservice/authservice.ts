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
