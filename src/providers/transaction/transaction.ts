import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { APP_CONFIG, IAppConfig } from '../../model';
import { HttpClient } from '../../../node_modules/@angular/common/http';

import 'rxjs/add/observable/throw';

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    public http: Http,
    public httpclient: HttpClient,
  ) {
    console.log('Hello TransactionProvider Provider');
  }

  getTransactionHistory() {
    let param = {
      "SessionKey": localStorage.getItem("session_key"),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "TransactionType": "R",
    };

    return this.http.post(this.config.apiEndpoint + 'Financial.svc/rest/FinancialTransactionListByReceipt', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(
      );
  }

}
