import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { User } from '../../services/Data/Users';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

    public users: User[];
    public orgLevel: number = 0;
    constructor(private commonSvc: CommonService) {

    }
    ngOnInit() {
     
    }
}
