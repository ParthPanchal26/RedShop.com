import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';

  searchResult: undefined | product[];
  constructor(public _authService: AuthService, private route: Router, private product: ProductService, private location: Location, public _user: UserService, private seller:SellerService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // console.log(val)
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.provider_name;
          this.menuType = "seller";
        // console.warn("In Seller Area");
        }else if(localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          // this.sellerName = userData.provider_name;
          // console.warn("In Seller Area");
          this.menuType = "user";
          this.product.getCartList(userData.id);
        }
        else {
          // console.warn("Outside Seller Area");
          this.menuType = "default";
        }
      }
    })
  }

  logout() {
    if (localStorage.getItem('seller')) {
      localStorage.removeItem('seller');
      this.route.navigate(['/home-menu']);
    }
  }

  userLogOut(){
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.route.navigate(['/']);
      this.product.cartData.emit([]);
    }
  }

  redirectToDetails(id: number) {
    this.route.navigate([`/product-details/${id}`]);
    this.location.replaceState(`/product-details/${id}`);
    window.location.reload();
  }

  // Search Product Intigration
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        console.warn(result);
        if (result.length > 7) {
          result.length = 7;
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(value: string) {
    console.warn(value);
    this.route.navigate([`/search-page/${value}`]);
    this.location.replaceState(`/search-page/${value}`);
    window.location.reload();
  }

}
