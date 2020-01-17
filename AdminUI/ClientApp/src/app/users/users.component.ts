import { Component, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common.service';
import { UtilityService } from '../../shared/utils/utility.service';
import { User } from '../../services/Data/Users';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgxNotificationService } from 'ngx-notification';
import { FormGroup, FormControl, Validators } from '@angular/forms';

enum option {
    ADD = 1,
    EDIT = 2,
    DETAIL= 3
}
@Component({
    selector: 'app-users-component',
    templateUrl: './users.component.html',
    styleUrls: ['./style.css']
})
export class UsersComponent {
    ti:any
    title=['Mr.','Mrs.','Ms.','Miss'];
    form =new FormGroup({
        // FirstName : new FormControl('',Validators.required),
        email : new FormControl('',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}")]),
        Firstname:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]),
        Lastname:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]),
        Password:new FormControl('',[Validators.required,Validators.minLength(8)]),
        number:new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'),Validators.maxLength(10)]),
        Address:new FormControl('',[Validators.required]),
        
    })
    private modalRef: NgbModalRef;
    public model: User[];
    closeResult: string;
    public user: User;
    public modelDialog: {
        headerTitle: any,
        buttonTitle: any
    }
    public operationOption: any;


    displayedColumns: string[] = ['id', 'name', 'email', 'phone','action'];
    dataSource: MatTableDataSource<User>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
   
    constructor(private modalService: NgbModal,private ngxNotificationService: NgxNotificationService, private commonSvc: CommonService, private utilitySvc: UtilityService) {
        this.getUsers();
    }
    ngOnInit() {
        this.getUsers();
    }
    // getTitle(id) {
    //     return this.commonSvc.getOptionTitle(id)
    // }
    getUsers() {
        this.commonSvc.getUsers().subscribe((res) => {
            // this.ngxNotificationService.sendMessage('This is my message to you!', 'success', 'top-right');
           let data=JSON.parse(res);
            console.log(data);
         this.model = data;
         this.dataSource = new MatTableDataSource(data);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
        });
      
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
    
 
    open(content, type, modalDimension, userOption, user) {
        this.operationOption = userOption;
        if (option.EDIT == userOption) { 
            let headerTitle = "EDIT "+ "USER";
            let buttonTitle ="Save changes"
            this.modelDialog = { headerTitle, buttonTitle };
            this.user = user;
        }
        if (option.ADD == userOption) {
            let headerTitle = "ADD " + "USER";
            let buttonTitle = "Save"
            this.modelDialog = { headerTitle, buttonTitle };
            this.user = new User();
        }
        if (option.DETAIL == userOption) {
            let headerTitle = "USER"+" DETAIL";
            let buttonTitle = ""
            this.modelDialog = { headerTitle, buttonTitle };
            this.user = user;
        }
            if (modalDimension === 'sm' && type === 'modal_mini') {
                this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
                    this.closeResult = `Closed with: ${result}`;
                }, (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
            } else if (modalDimension === '' && type === 'Notification') {
                this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
                    this.closeResult = `Closed with: ${result}`;
                }, (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
            } else {
                
                this.modalService.open(content, { centered: true }).result.then((result) => {
                    this.closeResult = `Closed with: ${result}`;
                }, (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
            }
        
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
  

    addUser() {
        this.commonSvc.addUser(this.user).subscribe((isAdded) => {
            
                this.getUsers();
                this.modalService.dismissAll();
               // this.utilitySvc.showNotification('success', 'Record added successfully!');
              
            
        })
    }
    updateUser() {
        this.commonSvc.updateUser(this.user).subscribe((isUpdated) => {
    
                this.getUsers();
                this.modalService.dismissAll();
               // this.utilitySvc.showNotification('success', 'Record updated successfully!');
               
            
        })
    }
    deleteUser(UserId:any) {
        debugger
        this.commonSvc.deleteUser(UserId).subscribe((isDeleted) => {
            console.log("delete",isDeleted);
        this.getUsers();
            // if (isDeleted) {
            //     this.getUsers();
            //    // this.utilitySvc.showNotification('success', 'Congratulation! Deleted Successfully');
            // } else {
            //     this.utilitySvc.showNotification('danger', `Alert! ${this.getTitle(2)} is already in use.`);

            // }
        })
    }
    showDetail() {
        alert('ok');
    }
    getTitle(id) {
        return this.commonSvc.getOptionTitle(id)
    }
}
