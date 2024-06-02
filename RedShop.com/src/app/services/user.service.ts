import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, login } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SignUp) {
    this.http.post("http://localhost:3000/users", user, { observe: 'response' }).subscribe((result) => {
      console.warn(result);
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/home-menu']);
      }
    })
  }

  userLogin(data: login) {
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body?.length) {
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/home-menu']);
        this.invalidUserAuth.emit(false);
      }
      else{
        this.invalidUserAuth.emit(true);
      }
    })
  }

  userReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/home-menu']);
    }
  }

}
