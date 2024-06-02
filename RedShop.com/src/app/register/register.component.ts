import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  FirstName: String = '';
  LastName: String = '';
  DOB: String = '';
  city: String = '';
  state: String = '';
  country: String = '';
  contactNo: String = '';
  email: String = '';
  password: String = '';
  // cPassword: String = '';

  registerUserData: any = {}

  constructor(private _auth: AuthService, private _router: Router, private user: UserService) { }

  ngOnInit(): void {
    this.user.userReload();
  }

  registerUser(){
      this._auth.registerUser(this.registerUserData).subscribe((res)=>{
        if(res){
          console.log(res);
          localStorage.setItem('token', res.token);
          this._router.navigate(['/login']);
        }
        else{
          console.log(res.console.error());
        }
      });
    }
    
    signUp(data: any){
    this.user.userSignUp(data);
  }

}
