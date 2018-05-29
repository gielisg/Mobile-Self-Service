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
    console.log(JSON.stringify(request_param));
    return this.http.post('https://ua.selcomm.com/SelcommWS/1.0267/Bill.svc/rest/BillList', JSON.stringify(request_param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  get_billFile(bill_number) {
    let request_param = {
      "SessionKey": localStorage.getItem("session_key"),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "BillNumber": bill_number,
      "BillType": "pdf"
    };
    console.log((request_param));
    return this.http.get('https://ua.selcomm.com/SelcommWS/1.0267/Bill.svc/rest/BillFile?SessionKey=' + localStorage.getItem("session_key") + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username + "&BillNumber=" + bill_number + "&BillType=pdf")
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

}
