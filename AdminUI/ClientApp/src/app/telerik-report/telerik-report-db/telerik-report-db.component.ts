import { Component, OnInit,ViewChild } from '@angular/core';
import { TelericServices } from 'src/services/teleric.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { employees } from '../../../services/Data/employess';
import { HttpClient } from '@angular/common/http';
import { images } from '../../../services/Data/images';
import { ReportUsers } from 'src/services/report-users';
import {environment} from 'src/environments/environment';
declare const jQuery:any;

@Component({
  selector: 'app-telerik-report-db',
  templateUrl: './telerik-report-db.component.html',
  styleUrls: ['./telerik-report-db.component.css']
})
export class TelerikReportDBComponent implements OnInit {
   public display: boolean = false;
  public users:ReportUsers[];
  public value1:any;
public value2:any;
public filterData: any;
public searchname:any;
public search:any;
public operator1:any;
public logic:any;
public operator2:any;
public userID:any;
public result:any;
public field:any;
public IsPublic:any;
serviceRoot=environment.serviceRoot;
view:boolean=false;
  constructor(private _telericService:TelericServices,private http:HttpClient) { }

  @ViewChild(DataBindingDirective,{ static: true }) dataBinding: DataBindingDirective;
  public gridData: any[];
  public gridView: any[];
  public mySelection: string[] = [];

  ngOnInit(){
    var logedUser=JSON.parse(localStorage.getItem("UserDetails"));
    this.userID=logedUser.UserId;
    console.log(this.userID)
    this._telericService.getReportUsers().subscribe((res)=>{
      this.users=res; 
      console.log("users",this.users)
      this.gridData=this.users;      
     });
     this.http.get(this.serviceRoot+'/api/ReportUsers/savesearch').subscribe((x)=>{this.result = x
        console.log("hello",this.result);
     });
    
  }


  showDialog()
  {
      this.display = true;
  }

  saveFilter()
  {
      this.view = true;
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

 this.view=false;
     this._telericService.saveSearches(this.filterData).subscribe(res =>{
         console.log("Return : ",res);
     });
  }



  public onFilter(inputValue: string): void {
    this.display = true;
    this.users = process(this.gridData, {
        filter: {
            logic: "or",
            filters: [
                {
                    field: 'fullname',
                    operator: 'contains',
                    value: inputValue
                },
                {
                    field: 'id',
                    operator: 'contains',
                    value: inputValue
                },
                {
                    field: 'employeeid',
                    operator: 'contains',
                    value: inputValue
                },
                {
                    field: 'active',
                    operator: 'contains',
                    value: inputValue
                },
            ],
        }
    }).data;

    this.dataBinding.skip = 0;
}

dataStateChange(e)
{

    debugger;
    let that = this;
    (function ($) {
       $(document).ready(function(){
           debugger
                               var x=document.getElementsByClassName('k-input'); 
                               that.field=e.filter.filters[0].filters[0].field;                         
                               that.operator1=$(x[0]).text();
                               that.operator2=$(x[2]).text();
                               that.logic=$(x[1]).text();
                               console.log("that",that.logic);
                               that.value1=$($('input.k-textbox:not(:first)')[0]).val();
                               console.log("value1",that.value1);
                               that.value2=$($('input.k-textbox:not(:first)')[1]).val();
                               console.log("value2",that.value2);
   })
    })(jQuery);
 that.showDialog();
     

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
