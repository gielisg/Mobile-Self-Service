import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiurl: string = "http://192.168.2.124/test_php/";


@Injectable()
export class ApiproviderProvider {

  constructor(public http: Http) {
    console.log('Hello PeopleproviderProvider Provider');
  }


  postData(credentials) {
    // console.log(credentials);
    return new Promise((resolve, reject) => {

      this.http.post(apiurl, credentials).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });

    });
  }

}
