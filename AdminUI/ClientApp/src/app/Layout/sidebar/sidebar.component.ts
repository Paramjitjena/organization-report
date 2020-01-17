import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseLayoutComponent } from '../BaseLayoutComponent';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
 
// let data = JSON.parse(localStorage.getItem('options'));
// var result;
// result = data[0].name; 
export let ROUTES: RouteInfo[] = [
  { path: '/settings', title: 'Settings', icon: '', class: '' },
  {path:'/users',title:'Users',icon:'',class:''},
  {path:'/filters',title:'Save Searched',icon:'',class:''},
  {path:'/db-reports',title:'Report',icon:'',class:''},
  {path:'/reports',title:'Report',icon:'',class:''},
  { path: '/settings/options-configuration', title: 'Settings/options-configuration', icon: '', class: '' }
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent extends BaseLayoutComponent implements OnInit {
    @Output() cwt = new EventEmitter()
    menuItems: any[];
    public isAdmin:boolean=false;
     state = "expanded";
    //  IsAdmin: res.isAdmin
    constructor(authSvc: AuthService, private commonSvc: CommonService) 
    {
        super(authSvc);
        
    }
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    var userDetail=JSON.parse(localStorage.getItem("UserDetails"));
    
    this.isAdmin=userDetail.IsAdmin;
    console.log(this.isAdmin);
  }
      
isMobileMenu() {
 if ($(window).width() > 991) 
 {
          return false;
 }
      return true;
 };
  sidenav()
   {
    if (this.state == "expanded") {
        $('.sidebar').css('margin-left', '-153.5px');
      //  $('.main-panel').css('margin-left', '-180px');
      // var width=
      //   this.cwt.emit('100% - 70px')
      $('.main-panel').css('width', 'calc(100% - 53px)');
        this.state = "minimized";
    } else if (this.state == "minimized") {
        // this.cwt.emit('83%')
        $('.main-panel').css('width', 'calc(100% - 207px)');
            $('.sidebar').css('margin-left', '0px');
            this.state = "expanded";
        }
}


}