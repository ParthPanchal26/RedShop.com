import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | product;
  sellerId: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;
  homeProduct: undefined | product[];
  clothes: undefined | product[];

  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      console.warn(result);
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user');

      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productId?.toString() === item.productId?.toString());
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }

    });


    this.product.homeProducts().subscribe((data) => {
      console.warn(data);
      this.homeProduct = data.slice(3, 7);
      this.clothes = data.filter((product: { category: string; }) => product.category === 'Clothes').slice(4, 8);
      console.warn(this.clothes)
    });


  }

  reload(){
    window.location.reload();
  }

  handelQuantity(val: string) {
    if (this.productQuantity < 30 && val == 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1;
    }
  }

  AddToCart() {
    if (this.productData) {
      this.removeCart = true
      this.productData.quantity = this.productQuantity;

      if (!localStorage.getItem('user')) {
        console.warn(this.productData);
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        console.warn("User logged in")
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn(userId);
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
          sellerId: this.productData.sellerId
        }
        delete cartData.id;
        console.warn(cartData)
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }

    }
  }

  RemoveToCart(productId: number) {
    
    console.warn(this.cartData);
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
      this.removeCart = false;
    } else {
      console.warn(this.cartData);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result) => {
        console.warn("Remove to cart called"+result);
        if (result) {
          this.product.getCartList(userId);
        }
      });
      this.removeCart = false;
    }
  }




}
