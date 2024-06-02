import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SignUp, cart, order } from '../data-types';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartPageComponent } from '../cart-page/cart-page.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  prefill: SignUp | undefined;
  sellerId: number|undefined;
  constructor(private product: ProductService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore).email;
    this.prefill = userData;
    console.log(this.prefill)


    this.product.currentCart().subscribe((result) => {
      let price = 0;
      let quantity = 1;
      let items = 1;
      let sellId;
      this.cartData = result;

      // this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
          quantity = +item.quantity
          console.log(item.quantity);
          items = item.quantity
          sellId = item.sellerId;
        }
      })
      this.totalPrice = price - price / 200 + (49 * quantity + items);
      this.sellerId = sellId;
      console.warn(this.totalPrice);
      console.warn(this.sellerId);

    });


    

  }


  // orderNow(data: order) {

  //   if (data.FirstName !== '' || data.LastName !== '' || data.Pin_Code !== "" || 0 || data.contact_No !== "" || 0 || data.email !== '') {
  //     let user = localStorage.getItem('user');
  //     let userId = user && JSON.parse(user).id;
  //     if (this.totalPrice) {
  //       let orderData: order = {
  //         ...data,
  //         totalPrice: this.totalPrice,
  //         cartData: this.cartData,
  //         userId,
  //       }

  //       this.cartData?.forEach((item) => {
  //         setTimeout(() => {
  //           item.id && this.product.deleteCartItems(item.id)
  //         }, 600)
  //       })

  //       this.product.orderNow(orderData).subscribe((result) => {
  //         if (result) {
  //           console.warn(result)
  //           this.orderMsg = "Order Placed";
  //           setTimeout(() => {
  //             this.orderMsg = undefined;
  //             this.router.navigate(['/My-Orders'])
  //           }, 2000)
  //         }

  //       })
  //     }
  //   }
  //   else {
  //     alert("Invalid Credentials! Please Enter All Details!")
  //   }
  // }

  orderNow(data: order) {
    if (
      data.FirstName !== '' ||
      data.LastName !== '' ||
      data.Pin_Code !== '' ||
      data.contact_No !== '' ||
      data.email !== ''
    ) {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      if (this.totalPrice) {
        let orderData: any = {
          ...data,
          totalPrice: this.totalPrice,
          userId: userId,
          sellerId: this.sellerId
        };

        if (this.cartData && this.cartData.length > 0) {
          let cartItem = this.cartData; // Assuming there is only one item in cartData

          for (let key in cartItem) {
            if (key !== 'cartData') {
              orderData[key] = cartItem[key as keyof typeof cartItem];
            }
          }
        }

        let selledInfo: any[] = [];
        selledInfo.push(orderData);

        this.product.sellerSelledInfo(selledInfo);

        this.cartData?.forEach((item) => {
          setTimeout(() => {
            item.id && this.product.deleteCartItems(item.id);
          }, 600);
        });

        this.product.orderNow(orderData).subscribe((result) => {
          if (result) {
            console.warn(result);
            this.orderMsg = 'Order Placed';
            setTimeout(() => {
              this.orderMsg = undefined;
              this.router.navigate(['/My-Orders']);
            }, 2000);
          }
        });

      }
    } else {
      alert('Invalid Credentials! Please Enter All Details!');
    }
  }


}