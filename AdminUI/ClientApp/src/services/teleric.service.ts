import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,throwError as _observableThrow, of as _observableOf } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders,HttpClientModule, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { map, catchError as _observableCatch, tap, mergeMap as _observableMergeMap } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {ReportUsers} from "../services/report-users"
import {Filter} from "../services/Data/filter"
declare const kendo: any;
export class TelericServices
{
    public model:[];
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
    serviceRoot=environment.serviceRoot;
    constructor(private router: Router, private http: HttpClient,)
    {}

    getReportUsers(){
        debugger
        console.log(this.http.get<ReportUsers[]>(this.serviceRoot+'/api/ReportUsers/users'));
        return this.http.get<ReportUsers[]>(this.serviceRoot+'/api/ReportUsers/users');

       }
  
       MakePublic(item)
       {
         debugger
       let headers = new HttpHeaders({
             "Content-Type": "application/json",
             "Accept": "application/json"
         }); 
         let data={
             "userId":item.userid,
             "searchId":item.searchid
         }
       console.log("var",data);
         
       //let userId=sessionStorage.getItem("")
            return this.http.post(`${this.serviceRoot}/api/ReportUsers/public`,data,{headers})
       }     
    
    getFilterdata():Observable<Filter>
    {
     var  result
     this.http.get(this.serviceRoot+'/api/Users/filter').subscribe((result)=>{
     result=Observable.of(<Filter[]>result);
     console.log(result)
    });
   return result
    }
/////////////////////////////////////////////////////////////////
saveSearches(filter: Filter): Observable<any> {
    let url_ = this.serviceRoot + "/api/ReportUsers/addFilter";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(filter);

    let options_ : any = {
        body: content_,
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
            "Content-Type": "application/json", 
            "Accept": "application/json"
        })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
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
////////////////////////////////////////////////////////




    // saveSearches(filter: Filter): Observable<any> {
    //     let headers = new HttpHeaders({
    //         "Content-Type": "application/json",
    //         "Accept": "application/json"
    //     });  
    //     return this.http.post<Filter>(this.serviceRoot+'/api/ReportUsers/addFilter', filter,{headers})
          
    //   }
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