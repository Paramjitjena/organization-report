import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { UtilityService } from '../shared/utils/utility.service';
import {filterData,Filter} from '../services/Data/filter';
import {environment} from 'src/environments/environment'
import { Observable,throwError as _observableThrow, of as _observableOf } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders,HttpClientModule, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { map, catchError as _observableCatch, tap, mergeMap as _observableMergeMap } from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Component, ViewChild } from '@angular/core';
import { User } from './Data/Users';
@Injectable()
export class CommonService {
  serviceRoot=environment.serviceRoot;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
    constructor(private router: Router,private utilitySvc: UtilityService, private http: HttpClient,) {

  }

  
    initializeData(): Observable<string>  
    {
        return Observable.of("Data Initialized");

    }
    getUsers(): Observable<any> {
        let url_ = this.serviceRoot + "/api/Users/getUsers";
        url_ = url_.replace(/[?&]$/, "");
        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };
        return this.http.request("get", url_,options_).pipe(_observableMergeMap((response_ : any) => {
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
  

    addUser(data): Observable<any> {
        debugger
        let headers = new HttpHeaders({
              "Content-Type": "application/json;charset=utf-8"
            //   "Accept": "application/json"
          });
         let user={
            "Title":data.Title,
            "FirstName":data.FirstName,
            "LastName": data.LastName,
            "Email":data.Email,
            "Password":data.Password,
            "Phone":Number(data.Phone),
            "Address":data.Address,
            "IsAdmin": data.IsAdmin,
            "CreationDate": null
         }
     let  UD=JSON.stringify(user);
       console.log(user)
          
             return this.http.post(`${this.serviceRoot}/api/Users/addUser`,UD,{headers});
        }



    updateUser(data): Observable<any> {
        debugger
        let headers = new HttpHeaders({
              "Content-Type": "application/json",
              "Accept": "application/json"
          }); 
          let user={
            "UserId":data.UserId,
            "Title":data.Title,
            "FirstName":data.FirstName,
            "LastName": data.LastName,
            "Email":data.Email,
            "Phone":Number(data.Phone),
            "Address":data.Address,
            "IsAdmin": data.IsAdmin,
         }
         let  UD=JSON.stringify(user);
        console.log("var",UD);

     return this.http.post(`${this.serviceRoot}/api/Users/updateUser`,UD,{headers})
    }
    deleteUser(id): Observable<any> {
        debugger
        let headers = new HttpHeaders({
              "Content-Type": "application/json;charset=utf-8"
            //   "Accept": "application/json"
          });
       
          

       return this.http.post(`${this.serviceRoot}/api/Users/deleteUser/${id}`,{headers});
       
    }


  protected processPostDealUserNote(response: HttpResponseBase): Observable<any> {
      const status = response.status;
      const responseBlob = 
          response instanceof HttpResponse ? response.body : 
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;
  
      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<any>(<any>null);
  }
  getOptionTitle(id): string 
  {
      let data = JSON.parse(localStorage.getItem('options'));
      var result;
      for (let i = 0; i < data.length; i++) {
          if (data[i].id == id) {
              result = data[i].name;
              break;
          }
      }
      return result;
  }

}
function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if(result !== null && result !== undefined)
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
          reader.onload = function() { 
              observer.next(this.result);
              observer.complete();
          }
          reader.readAsText(blob); 
      }
  });
}
