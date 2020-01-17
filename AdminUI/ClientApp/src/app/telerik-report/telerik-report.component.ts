import { Component, OnInit,ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { employees } from '../../services/Data/employess';
import { images } from '../../services/Data/images';
import {MatDialogModule} from '@angular/material/dialog';
import {TelericServices} from '../../services/teleric.service'
import { TagTemplateDirective } from '@progress/kendo-angular-dropdowns';
import { threadId } from 'worker_threads';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Router } from '@angular/router';
import {GridComponent,GridDataResult,DataStateChangeEvent} from '@progress/kendo-angular-grid';
//import { Filter, filterData } from 'src/services/Data/filter';
declare const jQuery:any;
@Component({
  selector: 'app-telerik-report',
  templateUrl: './telerik-report.component.html',
  styleUrls: ['./telerik-report.component.css']
})
export class TelerikReportComponent implements OnInit {
display: boolean = false;
view:boolean=false;
public filterData: any;
public data:any=[];
public fielddata:string;
public value1:any;
public value2:any;
public searchname:any;
public search:any;
public operator1:any;
public logic:any;
public operator2:any;
public field:any;
public IsPublic:boolean=false;
public result:any;
public recentpop:any;
public filtered :boolean;
public filterdisplay: boolean ;
serviceRoot=environment.serviceRoot;
  constructor(private _telerikService:TelericServices,private http:HttpClient,private router: Router ) {
  }
  @ViewChild(DataBindingDirective,{ static: true }) dataBinding: DataBindingDirective;
  public gridData: any[] = employees;
  public gridView: any[];
  public mySelection: string[] = [];
  public x:number;
  public userID:any;
  public gridDataA: GridDataResult;
  public searchHistory:any;
  public state: State = {
    skip: 0,
    take: 10,
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [
        { field: 'full_name', operator: 'startswith', value:'ab'},
        { field: 'full_name', operator: 'contains', value:'z'},
      ]
    }
};
  ngOnInit(){
   var logedUser=JSON.parse(localStorage.getItem("UserDetails"));
   this.userID=logedUser.UserId;
   console.log(this.userID)
    this.gridView = this.gridData;
    this.http.get(this.serviceRoot+'/api/ReportUsers/savesearch').subscribe((x)=>{this.result = x
    console.log("hello",this.result);
   // this.result =[{"searchid":1,"userid":0,"field":"full_name","op1":"Contains","op2":"Contains","val1":"ab","val2":"","log":"And","searchname":"test1","isPublic":false},{"searchid":2,"userid":0,"field":"job_title","op1":"Contains","op2":"Contains","val1":"b","val2":"","log":"And","searchname":"test2","isPublic":false},{"searchid":3,"userid":0,"field":"full_name","op1":"Contains","op2":"Contains","val1":"cv","val2":"","log":"And","searchname":"test3","isPublic":false},{"searchid":4,"userid":0,"field":"phone","op1":"Contains","op2":"Contains","val1":"123","val2":"","log":"And","searchname":"test4","isPublic":false},{"searchid":5,"userid":0,"field":"job_title","op1":"Contains","op2":"Contains","val1":"ac","val2":"","log":"And","searchname":"test5","isPublic":false},{"searchid":6,"userid":0,"field":"full_name","op1":"Contains","op2":"Contains","val1":"vk","val2":"","log":"And","searchname":"test6","isPublic":false},{"searchid":7,"userid":0,"field":"full_name","op1":"Contains","op2":"Contains","val1":"ff","val2":"a","log":"And","searchname":"load","isPublic":false},{"searchid":8,"userid":1,"field":"full_name","op1":"Contains","op2":"Contains","val1":"ab","val2":"","log":"And","searchname":"test1","isPublic":true},{"searchid":9,"userid":1,"field":"job_title","op1":"Contains","op2":"Contains","val1":"ab","val2":"","log":"And","searchname":"test2","isPublic":true},{"searchid":10,"userid":1,"field":"country","op1":"Contains","op2":"Contains","val1":"usa","val2":"","log":"And","searchname":"test3","isPublic":true},{"searchid":11,"userid":1,"field":"address","op1":"Contains","op2":"Contains","val1":"i","val2":"","log":"And","searchname":"test4","isPublic":true},{"searchid":12,"userid":1,"field":"phone","op1":"Contains","op2":"Contains","val1":"99","val2":"","log":"And","searchname":"test5","isPublic":true},{"searchid":13,"userid":1,"field":null,"op1":null,"op2":null,"val1":null,"val2":null,"log":null,"searchname":"test6","isPublic":true},{"searchid":14,"userid":1,"field":"full_name","op1":"Contains","op2":"Contains","val1":"ba","val2":"","log":"And","searchname":"test 7","isPublic":true},{"searchid":15,"userid":1,"field":"country","op1":"Contains","op2":"Contains","val1":"i","val2":"","log":"And","searchname":"test8","isPublic":true},{"searchid":16,"userid":1,"field":"address","op1":"Contains","op2":"Contains","val1":"ab","val2":"","log":"And","searchname":"test9","isPublic":true},{"searchid":17,"userid":1,"field":"phone","op1":"Contains","op2":"Contains","val1":"8","val2":"","log":"And","searchname":"test10","isPublic":true},{"searchid":18,"userid":1,"field":"full_name","op1":"Contains","op2":"Contains","val1":"","val2":null,"log":"And","searchname":"test11","isPublic":true}];
      });
      this.http.get(this.serviceRoot+'/api/ReportUsers/getallsearch').subscribe((x)=>{this.searchHistory = x 
        console.log("this.serac1h",this.searchHistory);
      });
  }
  moreRecentSearches(){
    alert("recent");
  }
  showDialog() {
      this.display = true;
     
  }
  recentsearch()
  {
 
    this.recentpop = true;
  }
  updatedlg()
  {
     this.filtered=true;
  }
  saveFilter(){
    this.view=true;
       
       // this._telerikService.setFilterData(this.filterData).subscribe(); 
  }
  saveName(searchname)
  {  
      debugger;
   this.filterData={
    
       userId:this.userID,
       field:this.field,
       value1:this.value1,
       value2:this.value2,
       operator1:this.operator1,
       operator2:this.operator2,
       logic:this.logic,
       searchname:searchname,
       IsPublic:this.IsPublic
       
   }
console.log("filtered data",this.filterData)
this.display=false; 
`// this.data= JSON.parse(localStorage.getItem('SearchHistory'));
// this.data.push(this.filterData)
// localStorage.setItem('SearchHistory', JSON.stringify(this.data))`
this.view=false;
    this._telerikService.saveSearches(this.filterData).subscribe(res =>{
        console.log("Return : ",res);
    });
  }
  public onFilter(inputValue: string): void {
      this.display = true;
    this.gridView = process(this.gridData, {
        filter: {
            logic: "or",
            filters: [
                {
                    field: 'full_name',
                    operator: 'contains',
                    value: inputValue
                },
                {
                    field: 'job_title',
                    operator: 'contains',
                    value: inputValue
                },
                {
                    field: 'budget',
                    operator: 'contains',
                    value: inputValue
                },
                {
                    field: 'phone',
                    operator: 'contains',
                    value: inputValue
                },
            ],
        }
    }).data;
    this.dataBinding.skip = 0;
}
private photoURL(dataItem: any): string {
    const code: string = dataItem.img_id + dataItem.gender;
    const image: any = images;
    return image[code];
}
private flagURL(dataItem: any): string {
    const code: string = dataItem.country;
    const image: any = images;
    return image[code];
}
// dataStateChange(e){
//     debugger
//     console.log(e);
//     // console.log(e.filter.filters[0].filters[0].field)
//     debugger
//     let that = this;
//    (function ($) {
//       $(document).ready(function(){
          
//                               var x=document.getElementsByClassName('k-input'); 
//                               that.field=e.filter.filters[0].filters[0].field;                         
//                               that.operator1=$(x[0]).text();
//                               that.operator2=$(x[2]).text();
//                               that.logic=$(x[1]).text();
//                               that.value1=$($('input.k-textbox:not(:first)')[0]).val();
//                               that.value2=$($('input.k-textbox:not(:first)')[1]).val();
//   })
//    })(jQuery);
// that.showDialog();
    
// }
public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridDataA = process(employees, this.state);
}
showFilter(index:any)
  {
  
     // this.router.navigate(['/']); 
      debugger;
    var op1:any;
    var op2:any;
    //var fieldd= 'full_name';
    // op1="contains";
    // op2="contains";
    let i=index;
     console.log(op1)
     console.log(op2)
//     this.state = {
//       skip: 0,
//       take: 10,
     
  
//       // Initial filter descriptor
//       filter: {
//         logic: 'and',
//         filters: [
//           { field: fieldd, operator:op1, value:this.recentSearch},
//           { field: fieldd, operator:op2, value:this.recentSearch},
        
//         ]
//       }
     
//   };
if(this.searchHistory[i].op1=="Contains"){
    op1="contains";
   }
   if(this.searchHistory[i].op2=="Contains"){
    op2="contains";
   }
   if(this.searchHistory[i].op1=="Is equal to"){
    op1="IsEqualTo";
   }
   if(this.searchHistory[i].op2=="Is equal to"){
    op2="IsEqualTo";
   }
   if(this.searchHistory[i].op1=="Is not equal to"){
    op1="IsNotEqualTo";
   }
   if(this.searchHistory[i].op2=="Is not equal to"){
    op2="IsNotEqualTo";
   }
 if(this.searchHistory[i].op1=="Starts with"){
  op1="startswith";
   }
   if(this.searchHistory[i].op2=="Starts with"){
    op2="startswith";
   }
   if(this.searchHistory[i].op1=="Ends with"){
    op1="endswith";
   }
   if(this.searchHistory[i].op2=="Ends with"){
    op2="endswith";
   }
   if(this.searchHistory[i].op1=="Does not contain"){
    op1="doesnotcontain";
   }
   if(this.searchHistory[i].op2=="Does not contain"){
    op2="doesnotcontain";
   }
   
   if(this.searchHistory[i].op1=="Is empty"){
    op1="isempty";
   }
   if(this.searchHistory[i].op2=="Is empty"){
    op2="isempty";
   }
   if(this.searchHistory[i].op1=="Is not empty"){
    op1="isnotempty";
   }
   if(this.searchHistory[i].op2=="Is not empty"){
    op2="isnotempty";
   }
   if(this.searchHistory[i].op1=="Is null"){
    op1="isnull";
   }
   if(this.searchHistory[i].op2=="Is null"){
    op2="isnull";
   }
   if(this.searchHistory[i].op1=="Is not null"){
    op1="isnotnull";
   }
   if(this.searchHistory[i].op2=="Is not null"){
    op2="isnotnull";
   }
 
   console.log(op1)
   console.log(op2)
  
  this.state = {
    skip: 0,
    take: 10,
   
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [
        { field: this.searchHistory[i].field, operator:op1, value:this.searchHistory[i].val1},
        { field: this.searchHistory[i].field, operator:op2, value:this.searchHistory[i].val2},
      
      ]
    }
};
  this.gridDataA = process(employees, this.state);
    this.filterdisplay=true;
  console.log("this",this.gridDataA)
  }
  dataStateChange1(e){
    debugger
    
    this.http.get(this.serviceRoot+'/api/ReportUsers/GetUserId').subscribe((x)=>{//this.userID = x
      
        console.log(this.userID);
    });
    console.log(e);
    // console.log(e.filter.filters[0].filters[0].field)
    debugger
    let that = this;
   (function ($) {
      $(document).ready(function(){
          
                              var x=document.getElementsByClassName('k-input'); 
                              that.field=e.filter.filters[0].filters[0].field;                         
                              that.operator1=$(x[0]).text();
                              that.operator2=$(x[2]).text();
                              that.logic=$(x[1]).text();
                              that.value1=$($('input.k-textbox:not(:first)')[0]).val();
                              that.value2=$($('input.k-textbox:not(:first)')[1]).val();
  })
   })(jQuery);
that.showDialog();
    
}
  }