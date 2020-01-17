import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders, HttpClientModule, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { map, catchError as _observableCatch, tap, mergeMap as _observableMergeMap } from 'rxjs/operators';
import { Login } from '../services/Data/login'
import { environment } from 'src/environments/environment'
// import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';

// const poolData = {
//   UserPoolId: 'us-east-1_f5CYhm9Hw', // Your user pool id here
//   ClientId: '6ff0qksomf8oj5ff8ifj7733tn' // Your client id here  
// };

// const userPool = new CognitoUserPool(poolData);
@Injectable()
export class AuthService {
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
  cognitoUser: any;
  serviceRoot = environment.serviceRoot;
  public error: any;
  constructor(private router: Router, private http: HttpClient, ) { }

  get isLogedIn() {
    return parseInt(localStorage.getItem('isLoggedIn'));
  }

  //   login(Logindata: Login)  
  //   {
  //     let _content = JSON.stringify(Logindata);
  //     let headers = new HttpHeaders({
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //   });  
  //     localStorage.setItem('isLoggedIn','1');
  //     debugger
  //  return this.http.post(this.serviceRoot+'/api/Account/login',_content,{headers});
  //     }




  login(login: Login): Observable<any> {
    debugger
    let url_ = this.serviceRoot + "/api/Account/login";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(login);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    };
    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processPostDealUserNote(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processPostDealUserNote(<any>response_);
        } catch (e) {
          return <Observable<any>><any>_observableThrow(e);
        }
      } else
        return <Observable<any>><any>_observableThrow(response_);
    }));

  }
  protected processPostDealUserNote(response: HttpResponseBase): Observable<any> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      this.error = "Invalid username or password";
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    
      }));
    }
    return _observableOf<any>(<any>null);
  }
  logout() {
    // this.getAuthenticatedUser().signOut();
    // this.cognitoUser = null;
    localStorage.setItem('isLoggedIn', '0')
    this.router.navigate(['/login']);
  }

}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
    return _observableThrow(result);
  else
    return _observableThrow(message);
}


function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = function () {
        observer.next(this.result);
        observer.complete();
      }
      reader.readAsText(blob);
    }
  });
}

