import { Component, OnInit } from '@angular/core';
import { cart, product, priceSummary } from '../data-types';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  deleteIcon = faTrash;

  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
    quantity: 0,
    items: 0
  };

  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      console.warn(result);
      this.cartData = result;
      let price = 0;
      let quantity = 1;
      let items = 1;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
          quantity = +item.quantity
          console.log(item.quantity);
          items = item.quantity
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 200;
      this.priceSummary.delivery = 49 * quantity + items;
      this.priceSummary.total = this.priceSummary.price - this.priceSummary.discount + this.priceSummary.delivery;

    })
    console.warn(this.priceSummary)

  }

  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId)
    .subscribe((result)=>{
      console.warn(result)
      this.ngOnInit();
    });
  }

 


}
