import { SellerService } from './../services/seller.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../data-types';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  showLogin = false;
  authError = '';
  
  email: String = '';
  password: String = '';
  provider_name: String = '';
  DOB: String = '';
  city: String = '';
  state: String = '';
  country: String = '';
  contactNo: String = '';
  contactNo_2: String = '';

  constructor(private seller: SellerService, private router: Router) { }

  OnlyNumbersAllowed(event:any): boolean{
    const charcode = (event.which)?event.which: event.keycode;

    if(charcode > 31 && (charcode < 48 || charcode > 57)){
      return false;
    }
    return true;
  }

  ngOnInit(): void {
      this.seller.reloadSeller();
  }

  openLogin(){
    this.showLogin = false;
  }

  openSignUp(){
    this.showLogin = true;
  }

  SignUp(data:SignUp):void{
   this.seller.userSignUp(data);
  }

  login(data:SignUp){
    this.authError = "";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if(isError){
        this.authError = "Invalid Credentials";
      }
    })
  }



}
