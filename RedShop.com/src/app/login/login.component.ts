import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../services/user.service';
import { SignUp, cart, login, product } from '../data-types';
import { ProductService } from '../services/product.service';
import { getTestBed } from '@angular/core/testing';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String = '';
  password: String = '';
  userAuthError: string = '';

  loginUserData: any = {}
  constructor(private _auth: AuthService, private _router: Router, private user: UserService, private product: ProductService) { }

  ngOnInit(): void {
    this.user.userReload();
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          if (res) {
            console.log(res)
            localStorage.setItem('token', res.token)
            this._router.navigate(['/home-menu'])
            window.location.reload();
          }
          else {
            console.log(res.console.error());
          }
        });

  }

  login(data:login){
    this.user.userLogin(data);

    this.user.invalidUserAuth.subscribe((res) => {
      if (res) {
        this.userAuthError = "Invalid Credentials";
      }
      else {
        this.localCartToRemoteCart();
      }
      setTimeout(() => {
        this.userAuthError = '';
      }, 3000)
    })
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product:product, index) => {
        let cartData: cart = {
          ...product,
          productId:product.id,
          userId  
        } 
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("added to cart")
            }
          })
        }, 500);
        if (cartDataList.length === index+1) {
          localStorage.removeItem('localCart')
        }
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);

  }
}
