import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { APP_CONFIG, IAppConfig } from '../../model';
import { HttpClient } from '../../../node_modules/@angular/common/http';

import 'rxjs/add/observable/throw';

/*
  Generated class for the BillProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BillProvider {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    public http: Http,
    public httpclient: HttpClient,
  ) {
    console.log('Hello BillProvider Provider');
  }

  get_serviceDisplay() {
    let param = { "SessionKey": (localStorage.getItem("session_key")) };
    return this.http.post(this.config.apiEndpoint + 'Bill.svc/rest/BillList', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(
      );
  }

  get_bill() {
    let request_param = {
      "SessionKey": (localStorage.getItem("session_key")),
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
    return this.http.post(this.config.apiEndpoint + 'Bill.svc/rest/BillList', JSON.stringify(request_param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(
      );
  }

  get_billList() {
    let request_param = {
      "SessionKey": (localStorage.getItem("session_key")),
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
    return this.http.post(this.config.apiEndpoint + 'Bill.svc/rest/BillList', JSON.stringify(request_param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(
      );
  }

  get_billFile(bill_number) {
    return this.http.get(this.config.apiEndpoint + 'Bill.svc/rest/BillFile?SessionKey=' + encodeURIComponent(localStorage.getItem("session_key")) + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username + "&BillNumber=" + bill_number + "&BillType=pdf")
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(

      );
  }

}
