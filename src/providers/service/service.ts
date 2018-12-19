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

  public urlHeader = "https://ua.selcomm.com/SelcommWS/1.0267/";

  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider');
  }

  getServiceDisplay() {
    let param = { "SessionKey": (localStorage.getItem("sessionKey")) };
    return this.http.post(this.urlHeader + 'Bill.svc/rest/BillList', JSON.stringify(param))
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;
      })
      .pipe(
      );
  }

  getBill() {
    let requestParam = {
      "SessionKey": (localStorage.getItem("sessionKey")),
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
    return this.http.post(this.urlHeader + 'Bill.svc/rest/BillList', JSON.stringify(requestParam))
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;
      })
      .pipe(
      );
  }

  getBillList() {
    let requestParam = {
      "SessionKey": (localStorage.getItem("sessionKey")),
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
    return this.http.post(this.urlHeader + 'Bill.svc/rest/BillList', JSON.stringify(requestParam))
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;
      })
      .pipe(
      );
  }

  getBillFile(billNumber) {
    let requestParam = {
      "SessionKey": encodeURIComponent(localStorage.getItem("sessionKey")),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "BillNumber": billNumber,
      "BillType": "pdf"
    };
    return this.http.get(
      this.urlHeader + 'Bill.svc/rest/BillFile?SessionKey=' +
      encodeURIComponent(localStorage.getItem("sessionKey")) + "&ContactCode=" +
      JSON.parse(localStorage.getItem('currentUser')).username + "&BillNumber=" + billNumber + "&BillType=pdf"
    )
      .map(token => {
        let returnData = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return returnData;
      })
      .pipe(

      );
  }

}
