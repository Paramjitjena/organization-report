import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/services/Data/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;
  public submitted: boolean = false;
  public error: any;
  public login1 = new Login();
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
    this.error=this.authSvc.error;
    console.log(this.error)
  }
  login(data) {
    console.log(data);
    this.submitted = true;
    // if (data.invalid)
    //     return true;
    // this.authSvc.login(data).subscribe((isloggedIn:any) => 
    //      {
    //           if(isloggedIn!="")
    //          {
    //            console.log("data",isloggedIn);
    //           this.router.navigate(['/']);    
    //          } 
    //          else  
    //          {
    //           this.error = 'Invalid user and password!';    
    //          }
    //    }) 

debugger
    this.authSvc.login(data).subscribe(
     
      res => {
        console.log("Return : ", res);
        if (res != null) {
          debugger
          localStorage.setItem('isLoggedIn', '1');
          var userdetail = {
            UserId: res.userId,
            Username: res.userName,
            IsAdmin: res.isAdmin
          }
          localStorage.setItem('UserDetails', JSON.stringify(userdetail));
          this.router.navigate(['/']);
        }
      });
  

  }

}
