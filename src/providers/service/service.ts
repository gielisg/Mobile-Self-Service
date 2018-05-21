import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { User, APP_CONFIG, IAppConfig } from '../../model';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider');
  }

  get_serviceDisplay() {
    let param = { "SessionKey": localStorage.getItem("session_key") };
    return this.http.post('https://ua.selcomm.com/SelcommWS/1.0267/Bill.svc/rest/BillList', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

}
