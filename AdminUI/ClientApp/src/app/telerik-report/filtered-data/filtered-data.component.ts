import { Component, OnInit } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { employees } from '../../../services/Data/employess';
import { images } from '../../../services/Data/images';
import {GridComponent,GridDataResult,DataStateChangeEvent} from '@progress/kendo-angular-grid';
import { saveAs } from '@progress/kendo-drawing/pdf';
import {environment} from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import{TelericServices} from '../../../services/teleric.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-filtered-data',
  templateUrl: './filtered-data.component.html',
  styleUrls: ['./filtered-data.component.css']
})
export class FilteredDataComponent implements OnInit {
  public filterData:any;
  searchHistory:any;
  display:boolean=false;
  public isAdmin:any;

  displayedColumns: string[] = ['searchname', 'val1', 'val2','op1','op2','log','menu'];
  serviceRoot=environment.serviceRoot;
  public gridData: GridDataResult;
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
 
  
  constructor(private http:HttpClient,private _telerikService:TelericServices,private router:Router) {
    
   }
  ngOnInit()
  {
    this.isAdmin=JSON.parse(localStorage.getItem("UserDetails"));
    console.log(this.isAdmin)
    this.gridData = process(employees, this.state);
    this.setSearches();
    
  }
  setSearches(){
    if(this.isAdmin.IsAdmin==true){
    this.http.get(this.serviceRoot+'/api/ReportUsers/getallsearch').subscribe((x)=>{this.searchHistory = x 
      console.log("this.serach",this.searchHistory);
    });
  }
  else if(this.isAdmin.IsAdmin==false){
    let userId=this.isAdmin.UserId;
    this.http.get(`${this.serviceRoot}/api/ReportUsers/getallsearch/${userId}`).subscribe((x)=>{this.searchHistory = x 
      console.log("this.serach",this.searchHistory);
    });
  }
  }
  showFilter(index:any)
  {
    this.display=true;
    let i=index;
    var op1:any;
    var op2:any;
    console.log(this.searchHistory[i])
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
  this.gridData = process(employees, this.state);
    this.display=true;
  console.log("this",this.gridData);
  }
  public makePublic(item)
  {
    console.log(item);

     this._telerikService.MakePublic(item).subscribe((data:any)=>{
       
      this.router.navigate(['/reports']);
     });   
  }

public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(employees, this.state);
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
}