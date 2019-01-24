import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/*
  Generated class for the TranslateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TranslateProvider {

  constructor(
    public translate: TranslateService,
  ) {
    console.log('Hello TranslateProvider Provider');
  }

  translaterService() {

    if (typeof (localStorage.getItem("set_lng")) == "undefined" || localStorage.getItem("set_lng") == "" || localStorage.getItem("set_lng") == null) {
      this.translate.use('en');
    } else {
      this.translate.use(localStorage.getItem("set_lng"));
    }

  }

}
