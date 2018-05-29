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
        console.log(token);
        console.log(JSON.parse(JSON.stringify(token))._body.replace(/"/g, ''));
        localStorage.setItem("session_key", JSON.parse(JSON.stringify(token))._body.replace(/"/g, ''));
        this.fillLoggedUser(username, password, token);
        return true;
      })
      .pipe(

      );
  }

  account_balance() {
    return this.http.get('https://ua.selcomm.com/SelcommWS/1.0267/Account.svc/rest/AccountBalance?SessionKey=' + localStorage.getItem("session_key") + '&AccountNumber=' + JSON.parse(localStorage.getItem('currentUser')).username + '&IncludeUnbilledUsage=true&IncludeOneOffAndRecurringCharges=true')
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  get_accountDetail() {
    let get_param = this.convert_getParam(localStorage.getItem("session_key"), "", "", "");
    console.log(get_param);
    // console.log(this.http.get('https://ua.selcomm.com/SelcommWS/1.0267/Account.svc/rest/Account?SessionKey=' + get_param + '&AccountNumber=' + JSON.parse(localStorage.getItem('currentUser')).username + '&RefreshCache=true'));
    return this.http.get('https://ua.selcomm.com/SelcommWS/1.0267/Account.svc/rest/Account?SessionKey=' + get_param + '&AccountNumber=' + JSON.parse(localStorage.getItem('currentUser')).username + '&RefreshCache=true')
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(
      );
  }

  update_address(new_address) {
    let param = {
      "SessionKey": localStorage.getItem("session_key"),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "Address": {
        "Address1": new_address,
        "AddressType": {
          "Code": "BA",
        },
        "Country": {
          "Code": "AU"
        },
        "PostCode": {
          "Code": "2609"
        },
        "State": {
          "Code": "NSW",
        },
        "Suburb": "TEST",
      }
    };

    console.log(param);
    console.log(JSON.stringify(param));
    return this.http.put('https://ua.selcomm.com/SelcommWS/1.0267/Address.svc/rest/AddressUpdateByContact', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  update_email(email_address) {
    let param = {
      "SessionKey": localStorage.getItem("session_key"),
      "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
      "EmailAddress": {
        "EmailAddress": email_address
      }
    }
    console.log(param);
    return this.http.put('https://ua.selcomm.com/SelcommWS/1.0267/Email.svc/rest/EmailAddressUpdate ', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;
      })
      .pipe(

      );
  }

  update_phone(phone_number) {
    let param =
      {
        "SessionKey": localStorage.getItem("session_key"),
        "ContactPhone": {
          "AreaCode": 2,
          "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
          "ContactPhoneType": {
            "Code": "HP",
          },
          "Number": phone_number,
          "Reference": 3594,
        }
      }
    return this.http.put('https://ua.selcomm.com/SelcommWS/1.0267/ContactPhone.svc/rest/ContactPhoneUpdate', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

      })
      .pipe(

      );
  }

  update_name(user_name) {
    let param =
      {
        "SessionKey": localStorage.getItem("session_key"),
        "ContactPhone": {
          "AreaCode": 2,
          "ContactCode": JSON.parse(localStorage.getItem('currentUser')).username,
          "ContactPhoneType": {
            "Code": "HP",
          },
          "Number": user_name,
          "Reference": 3594,
        }
      }
    return this.http.put('https://ua.selcomm.com/SelcommWS/1.0267/Account.svc/rest/Account?SessionKey=', JSON.stringify(param))
      .map(token => {
        let return_data = JSON.parse((JSON.parse(JSON.stringify(token))._body));
        return return_data;

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

  convert_getParam(string, quoteStyle, charset, doubleEncode) {


    return string
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");




    // var optTemp = 0
    // var i = 0
    // var noquotes = false
    // if (typeof quoteStyle === 'undefined' || quoteStyle === null) {
    //   quoteStyle = 2
    // }
    // string = string || ''
    // string = string.toString()

    // if (doubleEncode !== false) {
    //   // Put this first to avoid double-encoding
    //   string = string.replace(/&/g, '&amp;')
    // }

    // string = string
    //   .replace(/</g, '&lt;')
    //   .replace(/>/g, '&gt;')

    // var OPTS = {
    //   'ENT_NOQUOTES': 0,
    //   'ENT_HTML_QUOTE_SINGLE': 1,
    //   'ENT_HTML_QUOTE_DOUBLE': 2,
    //   'ENT_COMPAT': 2,
    //   'ENT_QUOTES': 3,
    //   'ENT_IGNORE': 4
    // }
    // if (quoteStyle === 0) {
    //   noquotes = true
    // }
    // if (typeof quoteStyle !== 'number') {
    //   // Allow for a single string or an array of string flags
    //   quoteStyle = [].concat(quoteStyle)
    //   for (i = 0; i < quoteStyle.length; i++) {
    //     // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
    //     if (OPTS[quoteStyle[i]] === 0) {
    //       noquotes = true
    //     } else if (OPTS[quoteStyle[i]]) {
    //       optTemp = optTemp | OPTS[quoteStyle[i]]
    //     }
    //   }
    //   quoteStyle = optTemp
    // }
    // if (quoteStyle & OPTS.ENT_HTML_QUOTE_SINGLE) {
    //   string = string.replace(/'/g, '&#039;')
    // }
    // if (!noquotes) {
    //   string = string.replace(/"/g, '&quot;')
    // }

    // return string
  }

}
