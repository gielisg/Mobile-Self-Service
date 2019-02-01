import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  public url_header = "https://ua.selcomm.com/SelcommWS/1.0267/";

  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider');
  }

  get_serviceDisplay() {
    let param = { "SessionKey": (localStorage.getItem("session_key")) };
    return this.http.post(this.url_header + 'Bill.svc/rest/BillList', JSON.stringify(param))
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
    return this.http.post(this.url_header + 'Bill.svc/rest/BillList', JSON.stringify(request_param))
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
    return this.http.post(this.url_header + 'Bill.svc/rest/BillList', JSON.stringify(request_param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(
      );
  }

  get_billFile(bill_number) {
    // let request_param = {
    //   "SessionKey": encodeURIComponent(localStorage.getItem("session_key")),
    //   "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
    //   "BillNumber": bill_number,
    //   "BillType": "pdf"
    // };
    return this.http.get(this.url_header + 'Bill.svc/rest/BillFile?SessionKey=' + encodeURIComponent(localStorage.getItem("session_key")) + "&ContactCode=" + JSON.parse(localStorage.getItem('currentUser')).username + "&BillNumber=" + bill_number + "&BillType=pdf")
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(

      );
  }

}
